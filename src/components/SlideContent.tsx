import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Progress } from '../utils/progress';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  type: string;
  practicalTask?: {
    title: string;
    placeholder: string;
  };
}

interface SlideContentProps {
  slide: Slide;
  moduleId: number;
  onTaskComplete: (taskId: number) => void;
  progress: Progress;
}

export default function SlideContent({
  slide,
  moduleId,
  onTaskComplete,
  progress,
}: SlideContentProps) {
  const [taskAnswers, setTaskAnswers] = useState<Record<number, string>>({});
  const isTaskCompleted = progress.completedTasks[moduleId]?.includes(slide.id) || false;

  const handleTaskSubmit = () => {
    if (taskAnswers[slide.id]?.trim()) {
      onTaskComplete(slide.id);
    }
  };

  const handleTaskChange = (value: string) => {
    setTaskAnswers((prev) => ({ ...prev, [slide.id]: value }));
  };

  // Render different slide types
  switch (slide.type) {
    case 'intro':
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-bold text-xl mb-3 text-blue-900">
              Apie šį mokymą
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Šis mokymas padės jums kurti efektyvius promptus, kurie duoda nuoseklius,
              profesionalius rezultatus. Išmoksite hierarchinę struktūrą, kuri paverčia
              chaotišką AI komunikaciją sistemingu ir valdomu procesu.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">
                Po šio mokymo galėsite:
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Struktūruoti promptus profesionaliai</li>
                <li>• Gauti nuspėjamus rezultatus</li>
                <li>• Taupyti laiką ir išteklius</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Mokymo trukmė:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 3 moduliai</li>
                <li>• Praktinės užduotys</li>
                <li>• ~45 minučių</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm text-yellow-900 leading-relaxed">
              <strong className="block mb-2">Praktinė užduotis:</strong>
              Pagalvokite apie vieną verslo užduotį, kurią norėtumėte automatizuoti ar pagerinti naudojant AI. 
              Šį pavyzdį naudosime viso mokymo metu.
            </p>
          </div>
        </div>
      );

    case 'hierarchy':
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Kodėl hierarchija svarbi?</h3>
            <p className="text-gray-700 mb-4">
              AI modeliai skaito ir apdoroja informaciją nuosekliai. Svarbiausia informacija
              turi būti pateikta pirmiausia, kad rezultatas atitiktų jūsų lūkesčius.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { num: '1', name: 'Meta blokas', priority: 'Kritinis', color: 'red' },
              { num: '2', name: 'Input blokas', priority: 'Labai svarbus', color: 'orange' },
              { num: '3', name: 'Output blokas', priority: 'Labai svarbus', color: 'orange' },
              { num: '4', name: 'Reasoning blokas', priority: 'Svarbus', color: 'yellow' },
              { num: '5', name: 'Quality Control', priority: 'Rekomenduojama', color: 'green' },
              { num: '6', name: 'Advanced Parameters', priority: 'Pasirenkama', color: 'blue' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 bg-white border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                  {item.num}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {item.priority}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>Praktinė užduotis:</strong> Pabandykite sukurti promptą be struktūros
              (kaip paprastai darote). Išsaugokite - palyginsime su struktūruota versija pabaigoje.
            </p>
          </div>
        </div>
      );

    case 'meta':
      return (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-red-900">
              Klausimas: Kas esate ir ką darote?
            </h3>
            <p className="text-gray-700">
              Meta blokas nustato AI tapatybę ir kontekstą. Tai kaip darbo aprašymas,
              kuris lemia, kaip AI interpretuoja jūsų užduotį.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-300">
              <h4 className="font-semibold text-red-600 mb-3">Blogas pavyzdys:</h4>
              <p className="text-sm text-gray-600 italic">
                Sukurkite man pardavimų ataskaitą.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Problema: neaiški perspektyva
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <h4 className="font-semibold text-green-600 mb-3">Geras pavyzdys:</h4>
              <p className="text-sm text-gray-700 italic">
                Jūs esate vyresnysis verslo analitikas su 10 metų patirtimi e-commerce srityje.
                Jūsų tikslas - parengti pardavimų ataskaitą valdybos nariams, kurie priims
                strateginius sprendimus Q4 ketvirčiui.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Meta bloko komponentai:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>Rolė:</strong> specializacija, patirties lygis
              </li>
              <li>
                <strong>Dominės kontekstas:</strong> pramonė, specifika
              </li>
              <li>
                <strong>Tikslinė auditorija:</strong> kam skirtas rezultatas
              </li>
              <li>
                <strong>Verslo kontekstas:</strong> kodėl tai svarbu
              </li>
            </ul>
          </div>

          {slide.practicalTask && (
            <div className="mt-8 p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm font-semibold text-yellow-900 mb-4">
                {slide.practicalTask.title}
              </p>
              <textarea
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-sm mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                placeholder={slide.practicalTask.placeholder}
                value={taskAnswers[slide.id] || ''}
                onChange={(e) => handleTaskChange(e.target.value)}
                disabled={isTaskCompleted}
              />
              {!isTaskCompleted ? (
                <button
                  onClick={handleTaskSubmit}
                  disabled={!taskAnswers[slide.id]?.trim()}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Išsaugoti užduotį
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Užduotis atlikta!</span>
                </div>
              )}
            </div>
          )}
        </div>
      );

    case 'input':
      return (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-orange-900">
              Klausimas: Kokia faktinė informacija, duomenys, apribojimai?
            </h3>
            <p className="text-gray-700">
              Input blokas nurodo KONKRETIUS duomenis, su kuriais AI turi dirbti.
              Aiškus input = aiškus output.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-semibold mb-3">Ką įtraukti į Input bloką?</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Konkretūs skaičiai, datos, metrikos</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Dokumentų ištraukos ar nuorodos</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Apribojimai (biudžetas, laikas)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Taisyklės, standartai, gairės</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-red-50 p-4 rounded border border-red-200">
                <p className="text-xs text-red-700 font-semibold mb-2">
                  Ne konkretus input:
                </p>
                <p className="text-sm italic">Įvertinkite mūsų pardavimus.</p>
              </div>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <p className="text-xs text-green-700 font-semibold mb-2">
                  Konkretus input:
                </p>
                <p className="text-sm italic">
                  Įvertinkite Q3 2024 pardavimus. Duomenys: 250k EUR pajamos (+15% vs Q2),
                  1200 užsakymų, vidutinis čekis 208 EUR.
                </p>
              </div>
            </div>
          </div>

          {slide.practicalTask && (
            <div className="mt-8 p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm font-semibold text-yellow-900 mb-4">
                {slide.practicalTask.title}
              </p>
              <textarea
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-sm mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                placeholder={slide.practicalTask.placeholder}
                value={taskAnswers[slide.id] || ''}
                onChange={(e) => handleTaskChange(e.target.value)}
                disabled={isTaskCompleted}
              />
              {!isTaskCompleted ? (
                <button
                  onClick={handleTaskSubmit}
                  disabled={!taskAnswers[slide.id]?.trim()}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Išsaugoti užduotį
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Užduotis atlikta!</span>
                </div>
              )}
            </div>
          )}
        </div>
      );

    case 'output':
      return (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-orange-900">
              Klausimas: Kokį formatą ir struktūrą noriu?
            </h3>
            <p className="text-gray-700">
              Output blokas nurodo TIKSLŲ rezultato formatą. Tai pašalina nereikalingus
              taisymo iteracijos ciklus.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-gray-300">
            <h4 className="font-semibold mb-3">Pavyzdys: Verslo strategijos planas</h4>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <p className="text-blue-600 mb-2">Lentelė su stulpeliais:</p>
              <div className="space-y-1 text-xs">
                <p>• Modulis - pavadinimas ir numeris</p>
                <p>• Trukmė - minutės</p>
                <p>• Tikslas - ką dalyviai išmoks</p>
                <p>• Veikla - konkretūs metodai</p>
                <p>• Rezultatas - išmatuojamas rezultatas</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-blue-900">Formatų tipai:</h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Lentelė</li>
                <li>• Dokumentas</li>
                <li>• Sąrašas</li>
                <li>• Diagrama</li>
                <li>• Kodas</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-green-900">Reikalavimai:</h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Ilgis</li>
                <li>• Detalumo lygis</li>
                <li>• Tonas</li>
                <li>• Kalba</li>
                <li>• Priedai</li>
              </ul>
            </div>
          </div>

          {slide.practicalTask && (
            <div className="mt-8 p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm font-semibold text-yellow-900 mb-4">
                {slide.practicalTask.title}
              </p>
              <textarea
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-sm mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                placeholder={slide.practicalTask.placeholder}
                value={taskAnswers[slide.id] || ''}
                onChange={(e) => handleTaskChange(e.target.value)}
                disabled={isTaskCompleted}
              />
              {!isTaskCompleted ? (
                <button
                  onClick={handleTaskSubmit}
                  disabled={!taskAnswers[slide.id]?.trim()}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Išsaugoti užduotį
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Užduotis atlikta!</span>
                </div>
              )}
            </div>
          )}
        </div>
      );

    case 'reasoning':
      return (
        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-yellow-900">
              Klausimas: Kaip mąstyti prieš pateikiant atsakymą?
            </h3>
            <p className="text-gray-700">
              Reasoning blokas nurodo AI, kokią logiką taikyti. Tai pagerina sprendimų
              kokybę ir padeda išvengti paviršutiniškų atsakymų.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg">
            <h4 className="font-semibold mb-4">6 žingsnių mąstymo struktūra:</h4>
            <div className="space-y-3">
              {[
                { num: 1, step: 'Apibrėžti problemą', desc: 'Kokia tikroji problema?' },
                { num: 2, step: 'Analizuoti duomenis', desc: 'Kokius duomenis turime?' },
                { num: 3, step: 'Nustatyti trūkstamus elementus', desc: 'Ko trūksta?' },
                { num: 4, step: 'Variantai', desc: 'Kokie galimi sprendimai?' },
                { num: 5, step: 'Kompromisai', desc: 'Kiekvieno privalumai ir trūkumai?' },
                { num: 6, step: 'Išvada', desc: 'Rekomendacija su pagrindu' },
              ].map((item) => (
                <div
                  key={item.num}
                  className="flex gap-3 items-start bg-white p-3 rounded-lg border"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 flex-shrink-0">
                    {item.num}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.step}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {slide.practicalTask && (
            <div className="mt-8 p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm font-semibold text-yellow-900 mb-4">
                {slide.practicalTask.title}
              </p>
              <textarea
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-sm mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                placeholder={slide.practicalTask.placeholder}
                value={taskAnswers[slide.id] || ''}
                onChange={(e) => handleTaskChange(e.target.value)}
                disabled={isTaskCompleted}
              />
              {!isTaskCompleted ? (
                <button
                  onClick={handleTaskSubmit}
                  disabled={!taskAnswers[slide.id]?.trim()}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Išsaugoti užduotį
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Užduotis atlikta!</span>
                </div>
              )}
            </div>
          )}
        </div>
      );

    case 'quality':
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-green-900">
              Kaip patikrinti rezultato kokybę?
            </h3>
            <p className="text-gray-700">
              Quality control blokas nustato kriterijus, pagal kuriuos AI įvertina
              savo darbą prieš pateikiant rezultatą.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-gray-300">
            <h4 className="font-semibold mb-4">Universali kokybės kriterijai:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                <span className="text-green-600 font-bold">•</span>
                <span>Loginė seka - informacija seka logiškai</span>
              </div>
              <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                <span className="text-green-600 font-bold">•</span>
                <span>Pilnumas - visi klausimai atsakyti</span>
              </div>
              <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded">
                <span className="text-green-600 font-bold">•</span>
                <span>Faktinė tikslumas - visi duomenys teisingi</span>
              </div>
              <div className="flex items-start gap-2 p-2 bg-purple-50 rounded">
                <span className="text-green-600 font-bold">•</span>
                <span>Įvairūs metodai - ne tik vienas būdas</span>
              </div>
              <div className="flex items-start gap-2 p-2 bg-pink-50 rounded">
                <span className="text-green-600 font-bold">•</span>
                <span>Išmatuojami rezultatai - turi KPI</span>
              </div>
            </div>
          </div>

          {slide.practicalTask && (
            <div className="mt-8 p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm font-semibold text-yellow-900 mb-4">
                {slide.practicalTask.title}
              </p>
              <textarea
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-sm mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                placeholder={slide.practicalTask.placeholder}
                value={taskAnswers[slide.id] || ''}
                onChange={(e) => handleTaskChange(e.target.value)}
                disabled={isTaskCompleted}
              />
              {!isTaskCompleted ? (
                <button
                  onClick={handleTaskSubmit}
                  disabled={!taskAnswers[slide.id]?.trim()}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Išsaugoti užduotį
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Užduotis atlikta!</span>
                </div>
              )}
            </div>
          )}
        </div>
      );

    case 'advanced':
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-bold text-lg mb-3 text-blue-900">
              Kokie modelio specifiniai parametrai?
            </h3>
            <p className="text-gray-700">
              Advanced parameters blokas leidžia tiksliai kontroliuoti AI elgesį.
              Šis blokas yra pasirenkamas, bet gali žymiai pagerinti rezultatus.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
              <h4 className="font-semibold mb-3 text-purple-900">Temperature</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-50 rounded">
                  <p>Žemas (0.0-0.3) - Faktinis</p>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <p>Vidutinis (0.4-0.7) - Subalansuotas</p>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <p>Aukštas (0.8-1.0) - Kūrybiškas</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <h4 className="font-semibold mb-3 text-green-900">Reasoning gylis</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <p>Greitas - Paprasti klausimai</p>
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <p>Normalus - Standartinės užduotys</p>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <p>Gilus - Sudėtinga analizė</p>
                </div>
              </div>
            </div>
          </div>

          {slide.practicalTask && (
            <div className="mt-8 p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm font-semibold text-yellow-900 mb-4">
                {slide.practicalTask.title}
              </p>
              <textarea
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-sm mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                placeholder={slide.practicalTask.placeholder}
                value={taskAnswers[slide.id] || ''}
                onChange={(e) => handleTaskChange(e.target.value)}
                disabled={isTaskCompleted}
              />
              {!isTaskCompleted ? (
                <button
                  onClick={handleTaskSubmit}
                  disabled={!taskAnswers[slide.id]?.trim()}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Išsaugoti užduotį
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Užduotis atlikta!</span>
                </div>
              )}
            </div>
          )}
        </div>
      );

    case 'full-example':
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-300">
            <h3 className="font-bold mb-2">Užduotis: Q4 Pardavimų Strategijos Prezentacija</h3>
          </div>

          <div className="space-y-2 text-sm">
            <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
              <p className="text-xs font-bold text-red-700 mb-1">1. META</p>
              <p className="text-xs">
                Jūs esate vyresnysis verslo strategas su 12 metų B2B SaaS patirtimi.
                Jūsų tikslas - parengti Q4 pardavimų strategijos prezentaciją valdybos nariams,
                kurie priims strateginius sprendimus 2025 metams.
              </p>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
              <p className="text-xs font-bold text-orange-700 mb-1">2. INPUT</p>
              <p className="text-xs">
                Q1-Q3 2024: 2.1M EUR (+22% vs 2023), 156 naujų klientų, vidutinis čekis 13.5k EUR.
                Konkurentai: Competitor A (+18%), Competitor B (+15%). Biudžetas Q4: 500k EUR.
              </p>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
              <p className="text-xs font-bold text-yellow-700 mb-1">3. OUTPUT</p>
              <p className="text-xs">
                10 skaidrių: Executive Summary, Dabartinė situacija, Konkurentų analizė,
                Q4 tikslai, Strategija, Veiksmų planas, Biudžetas, Rizikos, Metrikos, Išvados.
                Formatas: PowerPoint, lietuvių kalba, verslo tonas.
              </p>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
              <p className="text-xs font-bold text-green-700 mb-1">4. REASONING</p>
              <p className="text-xs">
                1) Apibrėžti pagrindinę žinutę 2) Analizuoti duomenis 3) Įvertinti variantus
                4) Palyginti su konkurentais 5) Nustatyti kompromisus 6) Rekomenduoti strategiją
              </p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
              <p className="text-xs font-bold text-blue-700 mb-1">5. QUALITY</p>
              <p className="text-xs">
                ✓ Aiški žinutė ✓ Duomenimis pagrįsta ✓ Realistiškas ROI ✓ Veiksmų planas
                ✓ Rizikų analizė ✓ Išmatuojami tikslai
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
              <p className="text-xs font-bold text-purple-700 mb-1">6. ADVANCED</p>
              <p className="text-xs">
                Temperature: 0.4, Reasoning: Gilus, Kalba: LT, Formatas: Verslo dokumentas
              </p>
            </div>
          </div>

          {slide.practicalTask && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-900 mb-3">
                <strong>{slide.practicalTask.title}</strong>
              </p>
              <textarea
                className="w-full h-32 p-3 border rounded text-sm mb-3"
                placeholder={slide.practicalTask.placeholder}
                value={taskAnswers[slide.id] || ''}
                onChange={(e) => handleTaskChange(e.target.value)}
                disabled={isTaskCompleted}
              />
              {!isTaskCompleted ? (
                <button
                  onClick={handleTaskSubmit}
                  disabled={!taskAnswers[slide.id]?.trim()}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Išsaugoti užduotį
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Užduotis atlikta!</span>
                </div>
              )}
            </div>
          )}
        </div>
      );

    case 'comparison':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
              <h4 className="font-bold text-red-900 mb-3">Nestruktūruotas</h4>
              <div className="bg-white p-3 rounded text-sm italic text-gray-700">
                <p>Sukurkite man mokymo programą apie AI. Turi būti įdomi ir praktinė.</p>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Neaiški tikslinė auditorija</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Nėra konkretių duomenų</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Neapibrėžtas formatas</span>
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <h4 className="font-bold text-green-900 mb-3">Struktūruotas</h4>
              <div className="bg-white p-3 rounded text-xs text-gray-700 max-h-40 overflow-y-auto">
                <p className="font-semibold text-red-700">META: Jūs esate mokymo kūrėjas...</p>
                <p className="font-semibold text-orange-700 mt-1">INPUT: 4 valandos, 12-15 žmonių...</p>
                <p className="font-semibold text-yellow-700 mt-1">OUTPUT: Lentelė su 5 stulpeliais...</p>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Aiški auditorija</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Konkretūs parametrai</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Tikslus formatas</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Rezultatų palyginimas:</h4>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-white p-3 rounded">
                <p className="text-2xl font-bold text-red-600">40%</p>
                <p className="text-xs">nestruktūruotas</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-xs">struktūruotas</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-2xl font-bold text-blue-600">60%</p>
                <p className="text-xs">mažiau taisymų</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>Praktinė užduotis:</strong> Palyginkite savo pirmąjį promptą su nauja
              struktūruota versija
            </p>
          </div>
        </div>
      );

    case 'summary':
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-300">
            <h3 className="font-bold text-xl mb-3">Ką išmokote</h3>
            <p className="text-gray-700">
              Sveikiname! Dabar žinote, kaip profesionaliai struktūruoti promptus naudojant
              6 blokų sistemą.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">6 pagrindiniai blokai:</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>1.</strong> Meta - rolė ir kontekstas</p>
                <p><strong>2.</strong> Input - duomenys ir apribojimai</p>
                <p><strong>3.</strong> Output - formato reikalavimai</p>
                <p><strong>4.</strong> Reasoning - mąstymo struktūra</p>
                <p><strong>5.</strong> Quality - kokybės kriterijai</p>
                <p><strong>6.</strong> Advanced - parametrai</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Pagrindinės idėjos:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Hierarchija yra kritinė</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Konkretumas &gt; bendrumas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Pavyzdžiai pagerina rezultatus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Kokybės kontrolė būtina</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Šablonai taupo laiką</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
            <h4 className="font-semibold mb-3">Kiti žingsniai:</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>1. Sukurkite 3 promptus šią savaitę naudodami 6 blokų struktūrą</p>
              <p>2. Palyginkite rezultatus su senais metodais</p>
              <p>3. Dokumentuokite geriausius pavyzdžius savo prompt bibliotekoje</p>
              <p>4. Dalinkitės žiniomis su komanda</p>
              <p>5. Toliau tobulinkitės - kiekvienas promptas yra mokymosi galimybė</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-lg border-2 border-yellow-300">
            <h4 className="font-semibold text-yellow-900 mb-3">Prisiminkite:</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Kokybė &gt; Greitis:</strong> 5 minutės gerai struktūruotam promptui
                taupo valandas taisymuose
              </p>
              <p>
                <strong>Iteruokite:</strong> Pirmasis bandymas retai būna tobulas - mokykitės ir
                tobulinkitės
              </p>
              <p>
                <strong>Dokumentuokite:</strong> Geri promptai yra pakartotinai naudojami turtai
              </p>
              <p>
                <strong>Dalinkitės:</strong> Geriausias būdas išmokti - mokyti kitus
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Sėkmės su AI!</h3>
            <p className="text-sm opacity-90">
              Struktūruoti promptai = nuspėjami rezultatai = didesnis efektyvumas
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-6">
          <p className="text-gray-700">
            {slide.title} - {slide.subtitle}
          </p>
          {slide.practicalTask && (
            <div className="mt-8 p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm font-semibold text-yellow-900 mb-4">
                {slide.practicalTask.title}
              </p>
              <textarea
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-sm mb-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                placeholder={slide.practicalTask.placeholder}
                value={taskAnswers[slide.id] || ''}
                onChange={(e) => handleTaskChange(e.target.value)}
                disabled={isTaskCompleted}
              />
              {!isTaskCompleted ? (
                <button
                  onClick={handleTaskSubmit}
                  disabled={!taskAnswers[slide.id]?.trim()}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Išsaugoti užduotį
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Užduotis atlikta!</span>
                </div>
              )}
            </div>
          )}
        </div>
      );
  }
}
