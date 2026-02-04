import { Target, BookOpen, ClipboardCheck, ArrowRight, Sparkles, Zap, CheckCircle } from 'lucide-react';
import { Progress } from '../utils/progress';
import PromptLibrary from './PromptLibrary';
import CircularProgress from './CircularProgress';
import appConfig from '../data/appConfig.json';

interface HomePageProps {
  onStart: () => void;
  progress: Progress;
}

export default function HomePage({ onStart, progress }: HomePageProps) {
  const modulesCompleted = progress.completedModules.length;
  const totalTasks = Object.values(progress.completedTasks).reduce(
    (sum, tasks) => sum + tasks.length,
    0
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-brand-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-200/10 to-accent-200/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative text-center py-16 md:py-24 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 dark:bg-brand-900/30 rounded-full text-brand-700 dark:text-brand-300 text-sm font-medium mb-6 animate-bounce-in">
            <Sparkles className="w-4 h-4" />
            <span>{appConfig.homeBadgeText}</span>
          </div>
          
          {/* Main icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-500 to-accent-500 p-6 rounded-3xl shadow-2xl shadow-brand-500/30 hover:scale-110 transition-transform duration-300 animate-bounce-in">
                <Target className="w-16 h-16 text-white" />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 bg-accent-400 p-2 rounded-xl shadow-lg animate-float">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            DI <span className="gradient-text">{appConfig.appNameEmphasis}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Išmokite kurti efektyvius DI promptus su{' '}
            <span className="font-semibold text-brand-600 dark:text-brand-400">6 blokų sistema</span>
          </p>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Orientuota į verslo problemų sprendimą. 
            <span className="font-medium"> ~45 min.</span>
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>3 praktiniai moduliai</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Verslo pavyzdžiai</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Baigiamoji apklausa</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <button
            onClick={onStart}
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3 group"
            aria-label="Pradėti mokymą"
          >
            {modulesCompleted > 0 ? 'Tęsti mokymą' : 'Pradėti mokymą'}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* Progress if started */}
          {modulesCompleted > 0 && (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Jūsų progresas: {modulesCompleted}/3 moduliai baigti
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-hover p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-4">
            <CircularProgress
              progress={(modulesCompleted / 3) * 100}
              size={70}
              strokeWidth={7}
              showPercentage={false}
            />
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{modulesCompleted}/3</p>
              <p className="text-gray-600 dark:text-gray-400">Baigti moduliai</p>
            </div>
          </div>
        </div>

        <div className="card-hover p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-2xl">
              <ClipboardCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalTasks}</p>
              <p className="text-gray-600 dark:text-gray-400">Atliktos užduotys</p>
            </div>
          </div>
        </div>

        <div className="card-hover p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-4">
            <div className="bg-accent-100 dark:bg-accent-900/30 p-4 rounded-2xl">
              <Target className="w-8 h-8 text-accent-600 dark:text-accent-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {progress.quizCompleted ? `${progress.quizScore}%` : '-'}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Apklausos rezultatas</p>
              {progress.quizCompleted && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      (progress.quizScore || 0) >= 70 
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' 
                        : 'bg-gradient-to-r from-orange-400 to-orange-500'
                    }`}
                    style={{ width: `${progress.quizScore || 0}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="card p-8 md:p-10 animate-fade-in">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Ką išmoksite?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Praktinė 6 blokų sistema, kuri pavers jūsų DI komunikaciją sisteminga ir efektyvia
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4 p-5 rounded-2xl hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300 group cursor-default">
            <div className="bg-brand-100 dark:bg-brand-900/30 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">6 Blokų Sistema</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Išmokite hierarchinę prompt struktūrą: Meta, Input, Output, Reasoning, Quality, Advanced
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 group cursor-default">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Verslo Pavyzdžiai</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Visi pavyzdžiai orientuoti į realias verslo problemas ir scenarijus
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-300 group cursor-default">
            <div className="bg-violet-100 dark:bg-violet-900/30 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
              <ClipboardCheck className="w-7 h-7 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Praktinės Užduotys</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Kiekviename modulyje praktinės užduotys su verslo scenarijais
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all duration-300 group cursor-default">
            <div className="bg-accent-100 dark:bg-accent-900/30 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7 text-accent-600 dark:text-accent-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Progreso Sekimas</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Stebėkite savo pažangą ir rezultatus kiekviename modulyje
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt Library */}
      <PromptLibrary />
    </div>
  );
}
