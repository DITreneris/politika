import { useState, useEffect } from 'react';
import { Home, BookOpen, ClipboardCheck } from 'lucide-react';
import HomePage from './components/HomePage';
import ModulesPage from './components/ModulesPage';
import ModuleView from './components/ModuleView';
import QuizPage from './components/QuizPage';
import { getProgress, saveProgress } from './utils/progress';

type Page = 'home' | 'modules' | 'module' | 'quiz';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const handleModuleSelect = (moduleId: number) => {
    setSelectedModule(moduleId);
    setCurrentPage('module');
  };

  const handleModuleComplete = (moduleId: number) => {
    setProgress(prev => ({
      ...prev,
      completedModules: [...prev.completedModules, moduleId],
    }));
  };

  const handleTaskComplete = (moduleId: number, taskId: number) => {
    setProgress(prev => ({
      ...prev,
      completedTasks: {
        ...prev.completedTasks,
        [moduleId]: [...(prev.completedTasks[moduleId] || []), taskId],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Prompt Anatomija</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'home'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Pagrindinis puslapis"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Pagrindinis</span>
              </button>
              <button
                onClick={() => setCurrentPage('modules')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'modules' || currentPage === 'module'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Moduliai"
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline">Moduliai</span>
              </button>
              <button
                onClick={() => setCurrentPage('quiz')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'quiz'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Apklausa"
              >
                <ClipboardCheck className="w-5 h-5" />
                <span className="hidden sm:inline">Apklausa</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            progress={progress}
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
      </main>
    </div>
  );
}

export default App;
