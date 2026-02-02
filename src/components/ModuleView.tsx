import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import { Progress } from '../utils/progress';
import { getModulesSync, preloadModules } from '../data/modulesLoader';
import { LoadingSpinner } from './ui';
import SlideContent from './SlideContent';
import CircularProgress from './CircularProgress';

interface ModuleViewProps {
  moduleId: number;
  onBack: () => void;
  onComplete: (moduleId: number) => void;
  onTaskComplete: (moduleId: number, taskId: number) => void;
  onContinueToNext: (currentModuleId: number) => void;
  progress: Progress;
  totalModules: number;
}

function ModuleView({
  moduleId,
  onBack,
  onComplete,
  onTaskComplete,
  onContinueToNext,
  progress,
  totalModules,
}: ModuleViewProps) {
  // Get modules data (synchronously if already loaded)
  const modules = getModulesSync();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModuleComplete, setShowModuleComplete] = useState(false);

  // Memoize module lookup
  const module = useMemo(() => 
    modules?.find((m) => m.id === moduleId),
    [modules, moduleId]
  );

  // Memoize module index and related calculations
  const moduleIndex = useMemo(() => 
    modules?.findIndex(m => m.id === moduleId) ?? -1,
    [modules, moduleId]
  );

  const isLastModule = useMemo(() => 
    moduleIndex >= 0 && moduleIndex === (modules?.length ?? 0) - 1,
    [moduleIndex, modules?.length]
  );

  const isModuleCompleted = useMemo(() => 
    progress.completedModules.includes(moduleId),
    [progress.completedModules, moduleId]
  );

  const nextSlide = useCallback(() => {
    if (!module) return;
    if (currentSlide < module.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Last slide - show module complete screen
      if (!progress.completedModules.includes(moduleId)) {
        onComplete(moduleId);
      }
      setShowModuleComplete(true);
    }
  }, [currentSlide, module, progress.completedModules, moduleId, onComplete]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSlide]);

  const handleTaskComplete = useCallback((taskId: number) => {
    if (!progress.completedTasks[moduleId]?.includes(taskId)) {
      onTaskComplete(moduleId, taskId);
    }
  }, [progress.completedTasks, moduleId, onTaskComplete]);

  // Memoize current slide data and related calculations (only if module exists)
  const currentSlideData = useMemo(() => 
    module?.slides[currentSlide],
    [module, currentSlide]
  );

  const isLastSlide = useMemo(() => 
    currentSlide === (module?.slides.length ?? 0) - 1,
    [currentSlide, module]
  );

  const isFirstSlide = useMemo(() => 
    currentSlide === 0,
    [currentSlide]
  );

  const slideProgress = useMemo(() => 
    module ? ((currentSlide + 1) / module.slides.length) * 100 : 0,
    [currentSlide, module]
  );

  // Reset state when module changes
  useEffect(() => {
    setCurrentSlide(0);
    setShowModuleComplete(false);
  }, [moduleId]);

  // Preload next module and slide components in background
  useEffect(() => {
    if (!modules) return;

    // Preload modules data
    preloadModules();

    // Preload next module's slide components when current module is loaded
    const nextModuleIndex = moduleIndex + 1;
    if (nextModuleIndex < modules.length) {
      // Preload SlideContent components in background
      import('./SlideContent').then(() => {
        // Components are now ready for next module
      });
    }
  }, [moduleId, moduleIndex, modules]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!showModuleComplete) {
          nextSlide();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!showModuleComplete) {
          prevSlide();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onBack, showModuleComplete]);

  // Show loading if modules not yet loaded or module not found
  if (!modules || !module) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Kraunama..." />
      </div>
    );
  }

  // Module complete screen
  if (showModuleComplete) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="card p-8 md:p-12 text-center">
          {/* Trophy icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-accent-400 to-accent-500 shadow-lg shadow-accent-500/30 animate-bounce-in">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Modulis baigtas! 🎉
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            {module.title}
          </p>
          
          {/* Progress info */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="badge-brand">
              Modulis {moduleIndex + 1} / {totalModules}
            </div>
            <div className="badge-success">
              <CheckCircle className="w-4 h-4 mr-1" />
              Užbaigta
            </div>
          </div>
          
          {/* Overall progress */}
          <div className="mb-8">
            <CircularProgress
              progress={(progress.completedModules.length / totalModules) * 100}
              size={100}
              strokeWidth={10}
              label="Bendra pažanga"
            />
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBack}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Grįžti į modulius
            </button>
            
            <button
              onClick={() => onContinueToNext(moduleId)}
              className="btn-primary flex items-center justify-center gap-2"
            >
              {isLastModule ? (
                <>
                  Pradėti apklausą
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Tęsti į kitą modulį
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
          
          {/* Next module preview */}
          {!isLastModule && (
            <div className="mt-8 p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-200 dark:border-brand-800">
              <p className="text-sm text-brand-700 dark:text-brand-300 font-medium">
                Kitas: {modules[moduleIndex + 1]?.title}
              </p>
              <p className="text-xs text-brand-600 dark:text-brand-400 mt-1">
                {modules[moduleIndex + 1]?.subtitle}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            aria-label="Grįžti į modulių sąrašą"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Atgal į modulius</span>
          </button>
          
        </div>
      </div>

      {/* Slide Content with side navigation */}
      <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4">
        <div className="flex justify-center">
          <button
            onClick={prevSlide}
            disabled={isFirstSlide}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Ankstesnė skaidrė"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden lg:inline">Atgal</span>
          </button>
        </div>

        <div className="card p-6 md:p-10 min-h-[500px] animate-fade-in">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="badge-brand">
                Modulis {moduleIndex + 1}
              </span>
              {isModuleCompleted && (
                <span className="badge-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Baigtas
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {currentSlideData.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{currentSlideData.subtitle}</p>
          </div>

          <SlideContent
            slide={currentSlideData}
            moduleId={moduleId}
            onTaskComplete={handleTaskComplete}
            progress={progress}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={nextSlide}
            className="btn-primary flex items-center gap-2"
            aria-label={isLastSlide ? 'Baigti modulį' : 'Kita skaidrė'}
          >
            <span className="hidden lg:inline">
              {isLastSlide ? 'Baigti' : 'Pirmyn'}
            </span>
            {!isLastSlide && <ChevronRight className="w-5 h-5" />}
            {isLastSlide && <CheckCircle className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Progress info moved below content */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between gap-4">
          {/* Module indicator */}
          <div className="hidden sm:flex items-center gap-2">
            {modules.map((m, idx) => (
              <div
                key={m.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  m.id === moduleId
                    ? 'bg-brand-500 text-white scale-110'
                    : progress.completedModules.includes(m.id)
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {progress.completedModules.includes(m.id) ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  idx + 1
                )}
              </div>
            ))}
          </div>

          {/* Slide counter */}
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Skaidrė</p>
            <p className="text-lg font-bold text-brand-600 dark:text-brand-400">
              {currentSlide + 1}/{module.slides.length}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-500 to-accent-500 h-2.5 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${slideProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Naudokite <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">←</kbd> <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">→</kbd> klavišus navigacijai
        </p>
      </div>

      {/* Slide dots */}
      <div className="mt-4 flex justify-center">
        <div className="flex gap-1 md:gap-2 flex-wrap justify-center max-w-md">
          {module.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                idx === currentSlide
                  ? 'bg-brand-500 w-6 md:w-8 shadow-md'
                  : idx < currentSlide
                  ? 'bg-brand-300 dark:bg-brand-700'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Eiti į skaidrę ${idx + 1}`}
              aria-current={idx === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
// Custom comparison to handle early return case
export default memo(ModuleView, (prevProps, nextProps) => {
  // Re-render if moduleId changes
  if (prevProps.moduleId !== nextProps.moduleId) return false;
  
  // Re-render if progress changes (completed modules or tasks)
  if (
    prevProps.progress.completedModules.length !== nextProps.progress.completedModules.length ||
    JSON.stringify(prevProps.progress.completedTasks) !== JSON.stringify(nextProps.progress.completedTasks)
  ) {
    return false;
  }
  
  // Re-render if totalModules changes
  if (prevProps.totalModules !== nextProps.totalModules) return false;
  
  // Don't re-render if only callback references changed (they should be stable)
  return true;
});
