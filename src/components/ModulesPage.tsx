import { CheckCircle, ArrowRight, Target, Brain, Settings, Lock, Sparkles } from 'lucide-react';
import { Progress } from '../utils/progress';
import modulesData from '../data/modules.json';
import CircularProgress from './CircularProgress';

interface ModulesPageProps {
  onModuleSelect: (moduleId: number) => void;
  progress: Progress;
}

// Level colors for modules based on type: learn, test, practice (business-oriented)
const levelStyles = {
  learn: {
    gradient: 'from-brand-700 to-brand-800',
    bg: 'bg-brand-50 dark:bg-brand-900/20',
    border: 'border-brand-200 dark:border-brand-800',
    text: 'text-brand-700 dark:text-brand-300',
    badge: '📚 Mokymas',
    icon: '🎯',
  },
  test: {
    gradient: 'from-slate-600 to-slate-700',
    bg: 'bg-slate-50 dark:bg-slate-900/20',
    border: 'border-slate-200 dark:border-slate-800',
    text: 'text-slate-700 dark:text-slate-300',
    badge: '📝 Testas',
    icon: '🧠',
  },
  practice: {
    gradient: 'from-accent-600 to-accent-700',
    bg: 'bg-accent-50 dark:bg-accent-900/20',
    border: 'border-accent-200 dark:border-accent-800',
    text: 'text-accent-700 dark:text-accent-300',
    badge: '💼 Praktika',
    icon: '⚙️',
  },
};

const moduleLevels = ['learn', 'test', 'practice'] as const;

export default function ModulesPage({ onModuleSelect, progress }: ModulesPageProps) {
  const getModuleProgress = (moduleId: number) => {
    const module = modulesData.modules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const completedTasks = progress.completedTasks[moduleId]?.length || 0;
    // Count slides that have practicalTask, testQuestions, or scenario
    const totalTasks = module.slides.filter(s => 
      (s as { practicalTask?: unknown }).practicalTask || 
      (s as { testQuestions?: unknown }).testQuestions ||
      (s as { scenario?: unknown }).scenario
    ).length;
    const isCompleted = progress.completedModules.includes(moduleId);
    
    if (isCompleted) return 100;
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  // Check if module is locked (previous not completed)
  const isModuleLocked = (moduleIndex: number) => {
    if (moduleIndex === 0) return false;
    const previousModuleId = modulesData.modules[moduleIndex - 1]?.id;
    return !progress.completedModules.includes(previousModuleId);
  };

  const completedCount = progress.completedModules.length;
  const totalModules = modulesData.modules.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 dark:bg-brand-900/30 rounded-full text-brand-700 dark:text-brand-300 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>{completedCount}/{totalModules} moduliai baigti</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Mokymo Moduliai
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Išmokite kurti efektyvius promptus su verslo pavyzdžiais. 
          Kiekvienas modulis stato ant ankstesnio žinių.
        </p>
      </div>

      {/* Overall progress */}
      <div className="flex justify-center">
        <div className="card px-8 py-4 inline-flex items-center gap-6">
          <CircularProgress
            progress={(completedCount / totalModules) * 100}
            size={60}
            strokeWidth={6}
          />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Bendra pažanga</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {completedCount} iš {totalModules} modulių
            </p>
          </div>
        </div>
      </div>

      {/* Modules grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modulesData.modules.map((module, index) => {
          const moduleProgress = getModuleProgress(module.id);
          const isCompleted = progress.completedModules.includes(module.id);
          const locked = isModuleLocked(index);
          const level = moduleLevels[index];
          const styles = levelStyles[level];

          return (
            <div
              key={module.id}
              className={`card relative overflow-hidden transition-all duration-300 animate-fade-in ${
                locked 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'card-hover'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => !locked && onModuleSelect(module.id)}
              role="button"
              tabIndex={locked ? -1 : 0}
              onKeyDown={(e) => {
                if (!locked && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onModuleSelect(module.id);
                }
              }}
              aria-label={locked ? `Modulis užrakintas: ${module.title}` : `Atidaryti modulį: ${module.title}`}
              aria-disabled={locked}
            >
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${styles.gradient}`} />
              
              {/* Locked overlay */}
              {locked && (
                <div className="absolute inset-0 bg-gray-100/80 dark:bg-gray-900/80 z-10 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-10 h-10 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Baigkite ankstesnį modulį</p>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`bg-gradient-to-br ${styles.gradient} p-3 rounded-xl shadow-lg`}>
                      {module.icon === 'Target' && <Target className="w-6 h-6 text-white" />}
                      {module.icon === 'Brain' && <Brain className="w-6 h-6 text-white" />}
                      {module.icon === 'Settings' && <Settings className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles.bg} ${styles.text}`}>
                          {styles.badge}
                        </span>
                        {isCompleted && (
                          <span className="badge-success text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Baigta
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{module.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{module.subtitle}</p>
                
                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {module.description}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                    <span>Pažanga</span>
                    <span className="font-bold">{moduleProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${styles.gradient} h-2.5 rounded-full transition-all duration-500 ease-out relative`}
                      style={{ width: `${moduleProgress}%` }}
                    >
                      {moduleProgress > 0 && moduleProgress < 100 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Business examples */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Verslo pavyzdžiai:</p>
                  <div className="space-y-1.5">
                    {module.businessExamples.slice(0, 2).map((example, idx) => (
                      <div 
                        key={idx} 
                        className={`text-xs text-gray-600 dark:text-gray-400 ${styles.bg} p-2 rounded-lg`}
                      >
                        • {example.title}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <button 
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                    locked
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : `bg-gradient-to-r ${styles.gradient} text-white shadow-lg hover:shadow-xl active:scale-95`
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!locked) onModuleSelect(module.id);
                  }}
                  disabled={locked}
                  aria-label={isCompleted ? 'Peržiūrėti modulį' : 'Pradėti modulį'}
                >
                  {locked ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Užrakinta
                    </>
                  ) : isCompleted ? (
                    <>
                      Peržiūrėti
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : moduleProgress > 0 ? (
                    <>
                      Tęsti
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Pradėti
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {completedCount === totalModules && (
        <div className="card p-6 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 border-2 border-brand-200 dark:border-brand-800 text-center animate-bounce-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Visi moduliai baigti! 🎉
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Puikiai! Dabar galite išbandyti savo žinias apklausoje.
          </p>
        </div>
      )}
    </div>
  );
}
