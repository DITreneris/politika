import { Target, BookOpen, ClipboardCheck, ArrowRight } from 'lucide-react';
import { Progress } from '../utils/progress';

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
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
            <Target className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Prompt Anatomija
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Išmokite kurti efektyvius AI promptus su 6 blokų sistema.
          <br />
          <span className="text-blue-600 font-semibold">Orientuota į verslo problemų sprendimą.</span>
        </p>
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg flex items-center gap-2 mx-auto"
        >
          Pradėti mokymą
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{modulesCompleted}/3</p>
              <p className="text-gray-600">Baigti moduliai</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <ClipboardCheck className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{totalTasks}</p>
              <p className="text-gray-600">Atliktos užduotys</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {progress.quizCompleted ? `${progress.quizScore}%` : '-'}
              </p>
              <p className="text-gray-600">Apklausos rezultatas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ką išmoksite?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">6 Blokų Sistema</h3>
              <p className="text-gray-600 text-sm">
                Išmokite hierarchinę prompt struktūrą nuo svarbiausio iki papildomų parametrų
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Verslo Pavyzdžiai</h3>
              <p className="text-gray-600 text-sm">
                Visi pavyzdžiai orientuoti į realias verslo problemas ir scenarijus
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <ClipboardCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Praktinės Užduotys</h3>
              <p className="text-gray-600 text-sm">
                Kiekviename modulyje praktinės užduotys su verslo scenarijais
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Progreso Sekimas</h3>
              <p className="text-gray-600 text-sm">
                Stebėkite savo pažangą ir rezultatus kiekviename modulyje
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
