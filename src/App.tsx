import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Home, BookOpen, ClipboardCheck, Moon, Sun, Sparkles, Menu, X } from 'lucide-react';
import Celebration from './components/Celebration';
import { ErrorBoundary, LoadingSpinner } from './components/ui';
import { getProgress, saveProgress, flushProgressSave } from './utils/progress';
import { loadModules, getModulesDataSync, preloadModules } from './data/modulesLoader';
import type { ModulesData } from './types/modules';
import appConfig from './data/appConfig.json';

// Lazy load heavy components for better initial load
const HomePage = lazy(() => import('./components/HomePage'));
const ModulesPage = lazy(() => import('./components/ModulesPage'));
const ModuleView = lazy(() => import('./components/ModuleView'));
const QuizPage = lazy(() => import('./components/QuizPage'));

type Page = 'home' | 'modules' | 'module' | 'quiz';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [progress, setProgress] = useState(getProgress());
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState<'task' | 'module' | 'quiz'>('task');
  const [modulesData, setModulesData] = useState<ModulesData | null>(getModulesDataSync());
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load modules data on mount
  useEffect(() => {
    if (!modulesData) {
      loadModules().then(setModulesData);
    }
    // Preload modules for faster navigation
    preloadModules();
  }, [modulesData]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Flush progress save on page unload to prevent data loss
  useEffect(() => {
    const handleBeforeUnload = () => {
      flushProgressSave();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Close mobile menu when clicking outside or when page changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('nav')) {
          setIsMobileMenuOpen(false);
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isMobileMenuOpen]);

  const handleModuleSelect = useCallback((moduleId: number) => {
    setSelectedModule(moduleId);
    setCurrentPage('module');
  }, []);

  // Get next module ID
  const getNextModuleId = useCallback((currentModuleId: number): number | null => {
    if (!modulesData) return null;
    const moduleIds = modulesData.modules.map(m => m.id);
    const currentIndex = moduleIds.indexOf(currentModuleId);
    if (currentIndex < moduleIds.length - 1) {
      return moduleIds[currentIndex + 1];
    }
    return null;
  }, [modulesData]);

  const handleModuleComplete = (moduleId: number) => {
    if (!progress.completedModules.includes(moduleId)) {
      setProgress(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
      }));
      
      // Show celebration
      setCelebrationType('module');
      setShowCelebration(true);
    }
  };

  // Navigate to next module (called from ModuleView)
  const handleContinueToNextModule = (currentModuleId: number) => {
    const nextModuleId = getNextModuleId(currentModuleId);
    if (nextModuleId) {
      setSelectedModule(nextModuleId);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // All modules completed, go to quiz
      setCurrentPage('quiz');
      setSelectedModule(null);
    }
  };

  const handleTaskComplete = (moduleId: number, taskId: number) => {
    if (!progress.completedTasks[moduleId]?.includes(taskId)) {
      setProgress(prev => ({
        ...prev,
        completedTasks: {
          ...prev.completedTasks,
          [moduleId]: [...(prev.completedTasks[moduleId] || []), taskId],
        },
      }));
      
      // Show task celebration
      setCelebrationType('task');
      setShowCelebration(true);
    }
  };

  const totalModules = modulesData?.modules.length || 0;
  const completedModulesCount = progress.completedModules.length;
  const overallProgress = totalModules > 0 ? Math.round((completedModulesCount / totalModules) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Celebration overlay */}
      <Celebration
        show={showCelebration}
        type={celebrationType}
        onComplete={() => setShowCelebration(false)}
      />
      
      {/* Navigation */}
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200/50 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-2 rounded-xl">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {appConfig.navTitlePrefix}{' '}
                <span className="gradient-text">{appConfig.navTitleEmphasis}</span>
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {/* Progress indicator */}
              {overallProgress > 0 && (
                <div className="flex items-center gap-2 mr-4 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/20 rounded-full">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all duration-500"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    {overallProgress}%
                  </span>
                </div>
              )}
              
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Perjungti tamsųjį režimą"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 min-h-[44px] ${
                  currentPage === 'home'
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95'
                }`}
                aria-label="Pagrindinis puslapis"
                aria-current={currentPage === 'home' ? 'page' : undefined}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Pagrindinis</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentPage('modules');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 min-h-[44px] ${
                  currentPage === 'modules' || currentPage === 'module'
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95'
                }`}
                aria-label="Moduliai"
                aria-current={currentPage === 'modules' || currentPage === 'module' ? 'page' : undefined}
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Moduliai</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentPage('quiz');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 min-h-[44px] ${
                  currentPage === 'quiz'
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95'
                }`}
                aria-label="Apklausa"
                aria-current={currentPage === 'quiz' ? 'page' : undefined}
              >
                <ClipboardCheck className="w-5 h-5" />
                <span className="font-medium">Apklausa</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {overallProgress > 0 && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-50 dark:bg-brand-900/20 rounded-full">
                  <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all duration-500"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    {overallProgress}%
                  </span>
                </div>
              )}
              
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Perjungti tamsųjį režimą"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={isMobileMenuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200/50 dark:border-gray-800 animate-fade-in overflow-hidden">
              <div className="py-2 space-y-1">
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left min-h-[48px] ${
                    currentPage === 'home'
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95'
                  }`}
                  aria-label="Pagrindinis puslapis"
                  aria-current={currentPage === 'home' ? 'page' : undefined}
                >
                  <Home className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Pagrindinis</span>
                </button>
                
                <button
                  onClick={() => {
                    setCurrentPage('modules');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left min-h-[48px] ${
                    currentPage === 'modules' || currentPage === 'module'
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95'
                  }`}
                  aria-label="Moduliai"
                  aria-current={currentPage === 'modules' || currentPage === 'module' ? 'page' : undefined}
                >
                  <BookOpen className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Moduliai</span>
                </button>
                
                <button
                  onClick={() => {
                    setCurrentPage('quiz');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left min-h-[48px] ${
                    currentPage === 'quiz'
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95'
                  }`}
                  aria-label="Apklausa"
                  aria-current={currentPage === 'quiz' ? 'page' : undefined}
                >
                  <ClipboardCheck className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Apklausa</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner size="lg" text="Kraunama..." />}>
            {currentPage === 'home' && (
              <HomePage
                onStart={() => setCurrentPage('modules')}
                progress={progress}
              />
            )}
            {currentPage === 'modules' && (
              <ModulesPage
                onModuleSelect={handleModuleSelect}
                progress={progress}
              />
            )}
            {currentPage === 'module' && selectedModule && (
              <ModuleView
                moduleId={selectedModule}
                onBack={() => {
                  setCurrentPage('modules');
                  setSelectedModule(null);
                }}
                onComplete={handleModuleComplete}
                onTaskComplete={handleTaskComplete}
                onContinueToNext={handleContinueToNextModule}
                progress={progress}
                totalModules={totalModules}
              />
            )}
            {currentPage === 'quiz' && (
              <QuizPage
                onBack={() => setCurrentPage('home')}
                progress={progress}
                onQuizComplete={(score) => {
                  setProgress(prev => ({
                    ...prev,
                    quizScore: score,
                    quizCompleted: true,
                  }));
                }}
              />
            )}
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-300">{appConfig.footerTitle}</span>
            </div>
            <div className="text-center">
              <span>© 2024-2026 </span>
              <span className="font-medium text-gray-700 dark:text-gray-300">{appConfig.footerAuthor}</span>
              <span className="mx-2">•</span>
              <span>{appConfig.footerTagline}</span>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/DITreneris" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
