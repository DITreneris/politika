import { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import promptLibrary from '../data/promptLibrary.json';

export default function PromptLibrary() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="card p-8 md:p-10 animate-fade-in">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-accent-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Promptų biblioteka
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Universalūs promptai kasdieniam darbui: kopijuokite ir pritaikykite.
          </p>
        </div>
      </div>

      {/* Quick Guide */}
      <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-brand-800 dark:text-brand-300 mb-2 text-sm">
          💡 Kaip naudoti?
        </h3>
        <ol className="text-sm text-brand-700 dark:text-brand-400 space-y-1">
          <li><span className="font-medium">1.</span> Paspauskite <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-gray-800 rounded border text-xs font-medium"><Copy className="w-3 h-3" /> Kopijuoti</span> mygtuką</li>
          <li><span className="font-medium">2.</span> Įklijuokite į ChatGPT, Claude ar kitą DI įrankį</li>
          <li><span className="font-medium">3.</span> Pakeiskite <code className="bg-white dark:bg-gray-800 px-1 rounded text-xs">[tekstą laužtiniuose skliaustuose]</code> savo duomenimis</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {promptLibrary.prompts.map((item) => (
          <div
            key={item.id}
            className="group relative bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-5 border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
              <button
                onClick={() => handleCopy(item.id, item.prompt)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  copiedId === item.id
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:border-brand-300 dark:hover:border-brand-700 hover:text-brand-600'
                }`}
                aria-label={`Kopijuoti promptą: ${item.title}`}
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Nukopijuota</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline">Kopijuoti</span>
                  </>
                )}
              </button>
            </div>

            {/* Prompt content */}
            <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-4 font-mono leading-relaxed">
              {item.prompt}
            </div>
            
            {/* Copy success indicator */}
            {copiedId === item.id && (
              <div className="absolute bottom-3 right-3 badge-success animate-fade-in">
                <Check className="w-3 h-3 mr-1" />
                Nukopijuota!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
