import { CheckCircle, BookOpen, ArrowRight, Target, Brain, Settings } from 'lucide-react';
import { Progress } from '../utils/progress';
import modulesData from '../data/modules.json';

interface ModulesPageProps {
  onModuleSelect: (moduleId: number) => void;
  progress: Progress;
}

// Using Lucide icons instead of emoji for better consistency

export default function ModulesPage({ onModuleSelect, progress }: ModulesPageProps) {
  const getModuleProgress = (moduleId: number) => {
    const module = modulesData.modules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const completedTasks = progress.completedTasks[moduleId]?.length || 0;
    const totalTasks = module.slides.filter(s => s.practicalTask).length;
    const isCompleted = progress.completedModules.includes(moduleId);
    
    if (isCompleted) return 100;
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mokymo Moduliai</h1>
        <p className="text-gray-600">Išmokite kurti efektyvius promptus su verslo pavyzdžiais</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modulesData.modules.map((module) => {
          const moduleProgress = getModuleProgress(module.id);
          const isCompleted = progress.completedModules.includes(module.id);

          return (
            <div
              key={module.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
              onClick={() => onModuleSelect(module.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                    {module.icon === 'Target' && <Target className="w-6 h-6 text-white" />}
                    {module.icon === 'Brain' && <Brain className="w-6 h-6 text-white" />}
                    {module.icon === 'Settings' && <Settings className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{module.title}</h2>
                    <p className="text-sm text-gray-600">{module.subtitle}</p>
                  </div>
                </div>
                {isCompleted && (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                )}
              </div>

              <p className="text-gray-700 mb-4 text-sm">{module.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Pažanga</span>
                  <span>{moduleProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Verslo pavyzdžiai:</p>
                <div className="space-y-1">
                  {module.businessExamples.slice(0, 2).map((example, idx) => (
                    <div key={idx} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      • {example.title}
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                {isCompleted ? 'Peržiūrėti' : 'Pradėti'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
