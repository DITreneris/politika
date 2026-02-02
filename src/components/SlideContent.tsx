import { useState, useEffect } from 'react';
import { CheckCircle, Sparkles, MessageCircle, Languages, Lightbulb, Target, Layers, Repeat, MessageSquare, Database, FileText } from 'lucide-react';
import { Progress } from '../utils/progress';
import { CopyButton, TemplateBlock, PracticalTask } from './slides';
import type {
  Slide,
  TestQuestion,
  DefinitionsContent,
  PromptTypesContent,
  PromptTechniquesContent,
  WorkflowSummaryContent,
  PromptTemplateContent,
  TransitionContent,
  HierarchyBlock,
  QualityCriteria,
  FullExampleBlock,
} from '../types/modules';

interface SlideContentProps {
  slide: Slide;
  moduleId: number;
  onTaskComplete: (taskId: number) => void;
  progress: Progress;
}

// Color style mappings for dynamic classes (using safelist)
const colorStyles: Record<string, { bg: string; bgDark: string; text: string; textDark: string; border: string }> = {
  rose: {
    bg: 'bg-rose-100',
    bgDark: 'dark:bg-rose-900/30',
    text: 'text-rose-700',
    textDark: 'dark:text-rose-300',
    border: 'border-rose-500',
  },
  orange: {
    bg: 'bg-orange-100',
    bgDark: 'dark:bg-orange-900/30',
    text: 'text-orange-700',
    textDark: 'dark:text-orange-300',
    border: 'border-orange-500',
  },
  amber: {
    bg: 'bg-amber-100',
    bgDark: 'dark:bg-amber-900/30',
    text: 'text-amber-700',
    textDark: 'dark:text-amber-300',
    border: 'border-amber-500',
  },
  emerald: {
    bg: 'bg-emerald-100',
    bgDark: 'dark:bg-emerald-900/30',
    text: 'text-emerald-700',
    textDark: 'dark:text-emerald-300',
    border: 'border-emerald-500',
  },
  brand: {
    bg: 'bg-brand-100',
    bgDark: 'dark:bg-brand-900/30',
    text: 'text-brand-700',
    textDark: 'dark:text-brand-300',
    border: 'border-brand-500',
  },
  violet: {
    bg: 'bg-violet-100',
    bgDark: 'dark:bg-violet-900/30',
    text: 'text-violet-700',
    textDark: 'dark:text-violet-300',
    border: 'border-violet-500',
  },
};

const getColorClasses = (color: string) => colorStyles[color] || colorStyles.brand;

export default function SlideContent({
  slide,
  moduleId,
  onTaskComplete,
  progress,
}: SlideContentProps) {
  const isTaskCompleted = progress.completedTasks[moduleId]?.includes(slide.id) || false;

  const handleTaskComplete = (taskId: number) => {
    if (!progress.completedTasks[moduleId]?.includes(taskId)) {
      onTaskComplete(taskId);
    }
  };

  // Practical Task wrapper component
  const PracticalTaskSection = () => {
    if (!slide.practicalTask) return null;
    return (
      <PracticalTask
        task={slide.practicalTask}
        slideId={slide.id}
        moduleId={moduleId}
        onTaskComplete={handleTaskComplete}
        progress={progress}
      />
    );
  };

  // Render different slide types
  switch (slide.type) {
    case 'intro':
      return <IntroSlide />;

    case 'definitions':
      return <DefinitionsSlide content={slide.content as DefinitionsContent} />;

    case 'prompt-types':
      return <PromptTypesSlide content={slide.content as PromptTypesContent} />;

    case 'prompt-techniques':
      return <PromptTechniquesSlide content={slide.content as PromptTechniquesContent} />;

    case 'workflow-summary':
      return <WorkflowSummarySlide content={slide.content as WorkflowSummaryContent} />;

    case 'prompt-template':
      return <PromptTemplateSlide content={slide.content as PromptTemplateContent} />;

    case 'transition-3-to-6':
      return <TransitionSlide content={slide.content as TransitionContent} />;

    case 'hierarchy':
      return <HierarchySlide />;

    case 'meta':
      return <MetaBlockSlide onRenderTask={PracticalTaskSection} />;

    case 'input':
      return <InputBlockSlide onRenderTask={PracticalTaskSection} />;

    case 'output':
      return <OutputBlockSlide onRenderTask={PracticalTaskSection} />;

    case 'reasoning-models':
      return <ReasoningModelsSlide onRenderTask={PracticalTaskSection} />;

    case 'reasoning':
      return <ReasoningBlockSlide onRenderTask={PracticalTaskSection} />;

    case 'quality':
      return <QualityBlockSlide onRenderTask={PracticalTaskSection} />;

    case 'advanced':
      return <AdvancedBlockSlide onRenderTask={PracticalTaskSection} />;

    case 'advanced-2':
      return <AdvancedParameters2Slide onRenderTask={PracticalTaskSection} />;

    case 'full-example':
      return <FullExampleSlide onRenderTask={PracticalTaskSection} />;

    case 'comparison':
      return <ComparisonSlide />;

    case 'summary':
      return <SummarySlide />;

    case 'test-intro':
      return <TestIntroSlide />;

    case 'test-section':
      return (
        <TestSectionSlide
          questions={slide.testQuestions || []}
          onComplete={() => handleTaskComplete(slide.id)}
          isCompleted={isTaskCompleted}
        />
      );

    case 'test-results':
      return <TestResultsSlide />;

    case 'practice-intro':
      return <PracticeIntroSlide />;

    case 'practice-scenario':
      return <PracticeScenarioSlide slide={slide} onRenderTask={PracticalTaskSection} />;

    case 'practice-summary':
      return <PracticeSummarySlide />;

    default:
      return (
        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            {slide.title} - {slide.subtitle}
          </p>
          <PracticalTaskSection />
        </div>
      );
  }
}

// ============= SLIDE COMPONENTS =============

function IntroSlide() {
  return (
    <div className="space-y-6">
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-6 rounded-xl">
        <h3 className="font-bold text-xl mb-3 text-brand-900 dark:text-brand-100">
          Apie šį mokymą
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Šis mokymas padės jums kurti efektyvius promptus, kurie duoda nuoseklius,
          profesionalius rezultatus. Išmoksite hierarchinę struktūrą, kuri paverčia
          chaotišką DI komunikaciją sistemingu ir valdomu procesu.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">
            Po šio mokymo galėsite:
          </h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            {['Struktūruoti promptus profesionaliai', 'Gauti nuspėjamus rezultatus', 'Taupyti laiką ir išteklius'].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-violet-50 dark:bg-violet-900/20 p-5 rounded-xl">
          <h4 className="font-bold text-violet-900 dark:text-violet-100 mb-3">Mokymo trukmė:</h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• 3 moduliai</li>
            <li>• Praktinės užduotys</li>
            <li>• ~45 minučių</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-5 bg-accent-50 dark:bg-accent-900/20 rounded-xl border-l-4 border-accent-500">
        <p className="text-sm text-accent-900 dark:text-accent-100 leading-relaxed">
          <strong className="block mb-2">💡 Praktinė užduotis:</strong>
          Pagalvokite apie vieną verslo užduotį, kurią norėtumėte automatizuoti ar pagerinti naudojant DI.
          Šį pavyzdį naudosime viso mokymo metu.
        </p>
      </div>
    </div>
  );
}

function DefinitionsSlide({ content }: { content?: DefinitionsContent }) {
  const getAspectIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      MessageCircle: <MessageCircle className="w-8 h-8" />,
      Languages: <Languages className="w-8 h-8" />,
      Lightbulb: <Lightbulb className="w-8 h-8" />,
      Target: <Target className="w-8 h-8" />,
      Layers: <Layers className="w-8 h-8" />,
      Repeat: <Repeat className="w-8 h-8" />,
    };
    return icons[iconName] || <Sparkles className="w-8 h-8" />;
  };

  const aspectColors = ['violet', 'brand', 'accent'];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 to-violet-50 dark:from-brand-900/20 dark:to-violet-900/20 p-6 rounded-xl border-l-4 border-brand-500">
        <h3 className="font-bold text-lg mb-3 text-brand-900 dark:text-brand-100 flex items-center gap-2">
          <span className="text-2xl">💬</span> Kas yra Promptas?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {content?.promptDefinition}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-2xl">🔧</span> Kas yra Prompt Inžinerija?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {content?.engineeringDefinition}
        </p>

        <div className="grid grid-cols-1 gap-4">
          {content?.aspects.map((aspect, idx) => {
            const color = aspectColors[idx] || 'brand';
            return (
              <div
                key={idx}
                className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg bg-${color === 'accent' ? 'accent' : color}-50 dark:bg-${color === 'accent' ? 'accent' : color}-900/20 border-${color === 'accent' ? 'accent' : color}-200 dark:border-${color === 'accent' ? 'accent' : color}-800`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl flex-shrink-0 bg-${color === 'accent' ? 'accent' : color}-100 dark:bg-${color === 'accent' ? 'accent' : color}-900/30 text-${color === 'accent' ? 'accent' : color}-600 dark:text-${color === 'accent' ? 'accent' : color}-400`}>
                    {getAspectIcon(aspect.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-${color === 'accent' ? 'accent' : color}-200 dark:bg-${color === 'accent' ? 'accent' : color}-800 text-${color === 'accent' ? 'accent' : color}-700 dark:text-${color === 'accent' ? 'accent' : color}-300`}>
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-gray-900 dark:text-white">{aspect.title}</h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{aspect.description}</p>
                    <div className="bg-white dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pavyzdys</p>
                        <CopyButton text={aspect.example} size="sm" />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic">{aspect.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-6 rounded-xl text-white text-center">
        <p className="text-lg font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          {content?.keyInsight}
          <Sparkles className="w-5 h-5" />
        </p>
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl space-y-3">
        <p className="text-sm text-brand-800 dark:text-brand-200">
          <strong>💡 Svarbu:</strong> Prompt inžinerija pirmiausia yra inžinerinis procesas.
          Kūrybiškumas padeda, bet branduolys yra aiški specifikacija, struktūra ir iteracija.
        </p>
        {content?.sources && content.sources.length > 0 && (
          <div className="text-xs text-brand-700 dark:text-brand-300">
            <p className="font-semibold mb-2">Šaltiniai (gairės):</p>
            <ul className="space-y-1">
              {content.sources.map((source, idx) => (
                <li key={idx}>
                  <a href={source.url} target="_blank" rel="noreferrer" className="underline hover:text-brand-900 dark:hover:text-brand-100">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function PromptTypesSlide({ content }: { content?: PromptTypesContent }) {
  const typeColors: Record<string, { bg: string; border: string; text: string }> = {
    brand: { bg: 'bg-brand-50 dark:bg-brand-900/20', border: 'border-brand-300 dark:border-brand-700', text: 'text-brand-700 dark:text-brand-300' },
    accent: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', border: 'border-cyan-300 dark:border-cyan-700', text: 'text-cyan-700 dark:text-cyan-300' },
    violet: { bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20', border: 'border-fuchsia-300 dark:border-fuchsia-700', text: 'text-fuchsia-700 dark:text-fuchsia-300' },
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 via-cyan-50 to-fuchsia-50 dark:from-brand-900/20 dark:via-cyan-900/20 dark:to-fuchsia-900/20 p-6 rounded-xl">
        <p className="text-gray-700 dark:text-gray-300">
          Efektyvus bendravimas su DI remiasi trijų tipų promptų derinimu.
          Kiekvienas tipas atlieka skirtingą funkciją ir papildo kitus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {content?.types.map((type, idx) => {
          const colors = typeColors[type.color] || typeColors.brand;
          return (
            <div key={idx} className={`p-5 rounded-2xl border-2 ${colors.bg} ${colors.border} transition-all hover:shadow-lg`}>
              <h4 className={`font-bold text-lg mb-3 ${colors.text}`}>{type.name.toUpperCase()}</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">{type.description}</p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Pavyzdys:</p>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic">„{type.example}"</p>
                      <CopyButton text={type.example} size="sm" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Rezultatas:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{type.result}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 p-5 rounded-xl border-l-4 border-violet-500">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
            <CheckCircle className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <p className="font-bold text-violet-800 dark:text-violet-200 mb-1">Praktinis patarimas:</p>
            <p className="text-sm text-violet-700 dark:text-violet-300">{content?.practicalTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromptTechniquesSlide({ content }: { content?: PromptTechniquesContent }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Promptavimo technikų logika</h3>
        <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside">
          {content?.logicSteps.map((step, idx) => <li key={idx}>{step}</li>)}
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content?.techniques.map((technique, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{technique.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{technique.description}</p>
            <div className="bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pavyzdys</p>
                <CopyButton text={technique.example} size="sm" />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line font-mono">{technique.example}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowSummarySlide({ content }: { content?: WorkflowSummaryContent }) {
  // Paveikslėlių masyvas pagal diagramų seką
  const diagramImages = ['/LLM_1.png', '/LLM_2.png'];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 p-6 rounded-xl">
        <p className="text-gray-700 dark:text-gray-300">{content?.intro}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {content?.diagrams.map((diagram, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <div className="mb-4">
              <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{diagram.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{diagram.subtitle}</p>
            </div>
            
            {/* Vizualizacijos paveikslėlis */}
            {diagramImages[idx] && (
              <div className="mb-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <img 
                  src={diagramImages[idx]} 
                  alt={diagram.title}
                  className="w-full h-auto rounded-lg shadow-sm object-contain"
                  loading="lazy"
                />
              </div>
            )}

            {/* Tekstinė diagrama (kaip papildoma informacija) */}
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-3">
              {diagram.steps.map((step, stepIdx) => (
                <div key={stepIdx} className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    {step.toLowerCase().includes('input') && <MessageSquare className="w-4 h-4 text-brand-600 dark:text-brand-300" />}
                    {step.toLowerCase().includes('llm') && <Sparkles className="w-4 h-4 text-accent-600 dark:text-accent-300" />}
                    {step.toLowerCase().includes('duomenys') && <Database className="w-4 h-4 text-brand-600 dark:text-brand-300" />}
                    {!step.toLowerCase().includes('input') && !step.toLowerCase().includes('llm') && !step.toLowerCase().includes('duomenys') && <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />}
                    {step}
                  </div>
                  {stepIdx < diagram.steps.length - 1 && <span className="text-gray-400">→</span>}
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic">{diagram.note}</p>
          </div>
        ))}
      </div>

      {content?.examples && content.examples.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {content.examples.map((example, idx) => (
            <TemplateBlock key={idx} label={example.title} template={example.prompt} />
          ))}
        </div>
      )}
    </div>
  );
}

function PromptTemplateSlide({ content }: { content?: PromptTemplateContent }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 p-6 rounded-xl">
        <p className="text-gray-700 dark:text-gray-300">
          Gero prompto šablonas remiasi 3 blokais: META, INPUT ir OUTPUT.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {content?.blocks.map((block, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold">{idx + 1}</span>
              <h4 className="font-bold text-gray-900 dark:text-white">{block.title}</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{block.description}</p>
            <div className="bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Pavyzdys</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">{block.example}</p>
            </div>
          </div>
        ))}
      </div>

      {content?.template && <TemplateBlock label="Kopijuojamas šablonas" template={content.template} />}
      {content?.example && <TemplateBlock label="Pilnas pavyzdys" template={content.example} />}
    </div>
  );
}

function TransitionSlide({ content }: { content?: TransitionContent }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{content?.title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{content?.note}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content?.mapping.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold">{idx + 1}</span>
              <h4 className="font-bold text-gray-900 dark:text-white">{item.from}</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.to}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">{content?.takeaway}</p>
      </div>
    </div>
  );
}

function HierarchySlide() {
  const blocks: HierarchyBlock[] = [
    { num: '1', name: 'Meta blokas', desc: 'Rolė, patirtis, tikslas, auditorija', priority: 'Kritinis', color: 'rose' },
    { num: '2', name: 'Input blokas', desc: 'Duomenys, skaičiai, faktai, apribojimai', priority: 'Labai svarbus', color: 'orange' },
    { num: '3', name: 'Output blokas', desc: 'Formatas, struktūra, ilgis, kalba', priority: 'Labai svarbus', color: 'orange' },
    { num: '4', name: 'Reasoning blokas', desc: 'Mąstymo seka, logika, žingsniai', priority: 'Svarbus', color: 'amber' },
    { num: '5', name: 'Quality Control', desc: 'Tikrinimo kriterijai, validacija', priority: 'Rekomenduojama', color: 'emerald' },
    { num: '6', name: 'Advanced Parameters', desc: 'Temperature, reasoning gylis', priority: 'Pasirenkama', color: 'brand' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Kodėl hierarchija svarbi?</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          DI modeliai skaito ir apdoroja informaciją nuosekliai. Svarbiausia informacija
          turi būti pateikta pirmiausia, kad rezultatas atitiktų jūsų lūkesčius.
        </p>
      </div>

      <div className="space-y-3">
        {blocks.map((item) => {
          const colors = getColorClasses(item.color);
          return (
            <div key={item.num} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-full ${colors.bg} ${colors.bgDark} flex items-center justify-center font-bold ${colors.text} ${colors.textDark} flex-shrink-0`}>
                {item.num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.desc}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.bgDark} ${colors.text} ${colors.textDark} flex-shrink-0`}>
                {item.priority}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-5 bg-accent-50 dark:bg-accent-900/20 rounded-xl border border-accent-200 dark:border-accent-800">
        <p className="text-sm text-accent-900 dark:text-accent-100">
          <strong>💡 Praktinė užduotis:</strong> Pabandykite sukurti promptą be struktūros
          (kaip paprastai darote). Išsaugokite - palyginsime su struktūruota versija pabaigoje.
        </p>
      </div>
    </div>
  );
}

function MetaBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  return (
    <div className="space-y-6">
      <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-rose-900 dark:text-rose-100">
          Klausimas: Kas esate ir ką darote?
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Meta blokas nustato DI tapatybę ir kontekstą. Tai kaip darbo aprašymas,
          kuris lemia, kaip DI interpretuoja jūsų užduotį.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-xl border-2 border-rose-200 dark:border-rose-800 relative">
          <div className="flex justify-between items-start mb-3">
            <span className="badge bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">❌ Blogas</span>
            <CopyButton text="Sukurk man pardavimų ataskaitą." size="sm" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">Sukurk man pardavimų ataskaitą.</p>
          <p className="text-xs text-rose-600 dark:text-rose-400">Problema: neaiški perspektyva</p>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 relative">
          <div className="flex justify-between items-start mb-3">
            <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">✓ Geras</span>
            <CopyButton text="Tu esi vyresnysis verslo analitikas su 10 metų patirtimi e-commerce srityje. Tavo tikslas - parengti pardavimų ataskaitą valdybos nariams, kurie priims strateginius sprendimus Q4 ketvirčiui." size="sm" />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            Tu esi vyresnysis verslo analitikas su 10 metų patirtimi e-commerce srityje.
            Tavo tikslas - parengti pardavimų ataskaitą valdybos nariams, kurie priims
            strateginius sprendimus Q4 ketvirčiui.
          </p>
        </div>
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
        <h4 className="font-bold mb-3 text-brand-900 dark:text-brand-100">Meta bloko komponentai:</h4>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li><strong className="text-brand-700 dark:text-brand-300">Rolė:</strong> specializacija, patirties lygis</li>
          <li><strong className="text-brand-700 dark:text-brand-300">Domenės kontekstas:</strong> pramonė, specifika</li>
          <li><strong className="text-brand-700 dark:text-brand-300">Tikslinė auditorija:</strong> kam skirtas rezultatas</li>
          <li><strong className="text-brand-700 dark:text-brand-300">Verslo kontekstas:</strong> kodėl tai svarbu</li>
        </ul>
      </div>

      <TemplateBlock label="Kopijuojamas šablonas" template="META: Tu esi [vaidmuo]. Tikslas: [rezultatas]. Auditorija: [kam]." />
      {onRenderTask()}
    </div>
  );
}

function InputBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-orange-900 dark:text-orange-100">
          Klausimas: Kokia faktinė informacija, duomenys, apribojimai?
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Input blokas nurodo KONKRETIUS duomenis, su kuriais DI turi dirbti. Aiškus input = aiškus output.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700">
          <h4 className="font-bold mb-3 text-gray-900 dark:text-white">Ką įtraukti į Input bloką?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {['Konkretūs skaičiai, datos, metrikos', 'Dokumentų ištraukos ar nuorodos', 'Apribojimai (biudžetas, laikas)', 'Taisyklės, standartai, gairės'].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-800">
            <p className="text-xs text-rose-700 dark:text-rose-400 font-bold mb-2 uppercase tracking-wider">❌ Ne konkretus input:</p>
            <p className="text-sm italic text-gray-600 dark:text-gray-400">Įvertink mūsų pardavimus.</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mb-2 uppercase tracking-wider">✓ Konkretus input:</p>
            <p className="text-sm italic text-gray-700 dark:text-gray-300">
              Įvertink Q3 2024 pardavimus. Duomenys: 250k EUR pajamos (+15% vs Q2), 1200 užsakymų, vidutinis čekis 208 EUR.
            </p>
          </div>
        </div>
      </div>

      <TemplateBlock label="Kopijuojamas šablonas" template="INPUT: Duomenys: [faktai/skaičiai]. Apribojimai: [laikas/biudžetas]." />
      {onRenderTask()}
    </div>
  );
}

function OutputBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-orange-900 dark:text-orange-100">
          Klausimas: Kokį formatą ir struktūrą noriu?
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Output blokas nurodo TIKSLŲ rezultato formatą. Tai pašalina nereikalingus taisymo iteracijos ciklus.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Pavyzdys: Q4 Pardavimų Analizės Ataskaita</h4>
        <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl text-sm mb-3">
          <p className="text-brand-700 dark:text-brand-300 mb-2 font-semibold">Formatas: Executive Summary (1-2 puslapiai)</p>
          <p className="text-gray-600 dark:text-gray-400 mb-3">Struktūra:</p>
          <ol className="space-y-1 text-gray-700 dark:text-gray-300 list-decimal list-inside ml-2">
            <li>Pagrindinės metrikos (KPI dashboard su skaičiais)</li>
            <li>Tendencijos (palyginimas su Q3 ir praėjusių metų Q4)</li>
            <li>Kategorijų analizė (top 3 produktų grupės)</li>
            <li>Rekomendacijos Q1 (3 konkrečios, veiksmais pagrįstos)</li>
          </ol>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl text-sm">
          <p className="text-emerald-700 dark:text-emerald-300 mb-2 font-semibold">Papildomi reikalavimai:</p>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>• Kalba: lietuvių</li>
            <li>• Tonas: profesionalus, verslo</li>
            <li>• Stilius: aiškus, be žargono</li>
            <li>• Priedai: 1 diagrama (tendencijų grafikas)</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
          <h4 className="font-bold mb-3 text-brand-900 dark:text-brand-100">Formatų tipai:</h4>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Lentelė</li>
            <li>• Dokumentas</li>
            <li>• Sąrašas</li>
            <li>• Diagrama</li>
            <li>• Kodas</li>
          </ul>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl">
          <h4 className="font-bold mb-3 text-emerald-900 dark:text-emerald-100">Reikalavimai:</h4>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Ilgis</li>
            <li>• Detalumo lygis</li>
            <li>• Tonas</li>
            <li>• Kalba</li>
            <li>• Priedai</li>
          </ul>
        </div>
      </div>

      <TemplateBlock label="Kopijuojamas šablonas" template="OUTPUT: Format: [struktūra]. Ilgis: [apimtis]. Tonas: [stilius]." />
      {onRenderTask()}
    </div>
  );
}

function ReasoningModelsSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  const cotExample = `REASONING (CoT):
1. Apibrėžk Q3 pardavimų metrikas
2. Palygink su Q2 ir praėjusių metų Q3
3. Identifikuok pagrindines tendencijas
4. Suformuluok išvadą apie Q4 prognozę`;

  const totExample = `REASONING (ToT):
1. Įvardink problemą: mažas LinkedIn įsitraukimas
2. Sugeneruok 3 sprendimo variantus:
   a) Informacinis postas
   b) Klausimo forma
   c) Provokuojanti įžvalga
3. Įvertink kiekvieno privalumus ir trūkumus
4. Pasirink geriausią pagal B2B auditorijos poreikius`;

  const cotTemplate = `REASONING (CoT):
1. Apibrėžk problemą
2. Išanalizuok duomenis
3. Padaryk išvadą`;

  const totTemplate = `REASONING (ToT):
1. Įvardink problemą
2. Sugeneruok [N] sprendimo variantus
3. Įvertink kiekvieno privalumus ir trūkumus
4. Pasirink geriausią`;

  return (
    <div className="space-y-6">
      {/* 1. Klausimas */}
      <div className="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-violet-900 dark:text-violet-100">
          Klausimas: Kaip per Reasoning bloką valdoma DI sprendimo logika?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Tai nėra DI „natūralus mąstymas". Tai – struktūra, kurią tu nurodai prompt'e, kad DI spręstų užduotį tinkamu būdu.
        </p>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mt-3">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Reasoning blokas nusprendžia:</p>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-violet-600 dark:text-violet-400 mt-0.5">•</span>
              <span>ar DI eis viena nuoseklia logine seka</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 dark:text-violet-400 mt-0.5">•</span>
              <span>ar išbandys kelias alternatyvas ir pasirinks geriausią</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 2. Vizualizacija */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
        <h4 className="font-bold mb-4 text-gray-900 dark:text-white text-center">Mąstymo modelių vizualizacija</h4>
        <div className="flex justify-center mb-3">
          <img 
            src="/mastymo_modeliai.png" 
            alt="Mąstymo modeliai: Chain of Thought vs Tree of Thoughts"
            className="max-w-full h-auto rounded-lg shadow-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Diagrama parodo skirtumą tarp linijinio (CoT) ir šakoto (ToT) mąstymo modelių
        </p>
      </div>

      {/* 3. Grandinė (CoT) */}
      <div className="bg-gradient-to-br from-brand-50 to-cyan-50 dark:from-brand-900/20 dark:to-cyan-900/20 p-6 rounded-xl border-2 border-brand-200 dark:border-brand-800">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🔗</span>
          <div>
            <h4 className="font-bold text-xl text-brand-900 dark:text-brand-100">GRANDINĖ – Chain of Thought (CoT)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Viena linijinė minčių seka. Sprendimas vyksta žingsnis po žingsnio.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">Kada naudoti:</p>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 mt-0.5">•</span>
                <span>kai yra vienas aiškus atsakymas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 mt-0.5">•</span>
                <span>kai reikia loginio paaiškinimo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 mt-0.5">•</span>
                <span>kai svarbus nuoseklumas ir tikslumas</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">Tinka:</p>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 mt-0.5">•</span>
                <span>analizėms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 mt-0.5">•</span>
                <span>skaičiavimams</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-600 dark:text-brand-400 mt-0.5">•</span>
                <span>procesų paaiškinimams</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CoT pavyzdys */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg relative">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider">Pavyzdys:</span>
            <CopyButton text={cotExample} size="sm" />
          </div>
          <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto">
            {cotExample}
          </pre>
        </div>
      </div>

      {/* 4. Medis (ToT) */}
      <div className="bg-gradient-to-br from-emerald-50 to-violet-50 dark:from-emerald-900/20 dark:to-violet-900/20 p-6 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🌳</span>
          <div>
            <h4 className="font-bold text-xl text-emerald-900 dark:text-emerald-100">MEDIS – Tree of Thoughts (ToT)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Kelios mąstymo šakos (alternatyvos). DI išbando kelis variantus ir pasirenka geriausią.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">Kada naudoti:</p>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                <span>kai yra keli galimi sprendimai</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                <span>kai reikia kūrybos ar strategijos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                <span>kai svarbu įvertinti pliusus ir minusus</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">Tinka:</p>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                <span>strateginiams sprendimams</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                <span>marketingui</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                <span>idėjų generavimui</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ToT pavyzdys */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg relative">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Pavyzdys:</span>
            <CopyButton text={totExample} size="sm" />
          </div>
          <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto">
            {totExample}
          </pre>
        </div>
      </div>

      {/* 5. Kaip pasirinkti */}
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-2 border-amber-200 dark:border-amber-800">
        <h4 className="font-bold mb-4 text-amber-900 dark:text-amber-100 text-center">Kaip pasirinkti?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border-2 border-brand-200 dark:border-brand-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">→</span>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Aiškus atsakymas</p>
            </div>
            <p className="text-lg font-bold text-brand-700 dark:text-brand-300">CoT</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Chain of Thought</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">→</span>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Reikia pasirinkti iš kelių</p>
            </div>
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">ToT</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Tree of Thoughts</p>
          </div>
        </div>
      </div>

      {/* 6. Kopijuojami šablonai */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TemplateBlock label="CoT šablonas" template={cotTemplate} />
        <TemplateBlock label="ToT šablonas" template={totTemplate} />
      </div>

      {/* 7. Svarbi pastaba */}
      <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl border-l-4 border-amber-500">
        <h4 className="font-bold mb-3 text-amber-900 dark:text-amber-100 flex items-center gap-2">
          <span className="text-xl">⚠️</span> Svarbi pastaba
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Jei nenurodysi reasoning struktūros, DI pasirinks ją atsitiktinai arba paviršutiniškai.
        </p>
        <p className="text-sm text-amber-800 dark:text-amber-200 font-semibold">
          👉 Geri rezultatai prasideda nuo teisingo mąstymo modelio pasirinkimo.
        </p>
      </div>

      {onRenderTask()}
    </div>
  );
}

function ReasoningBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  const steps = [
    { num: 1, step: 'Apibrėžti problemą', desc: 'Kokia tikroji problema, kurią reikia išspręsti?' },
    { num: 2, step: 'Analizuoti turimus duomenis', desc: 'Ką jau žinome? Kokie faktai, apribojimai, kontekstas?' },
    { num: 3, step: 'Nustatyti trūkstamus elementus', desc: 'Ko trūksta pilnam sprendimui? Kokios prielaidos daromos?' },
    { num: 4, step: 'Įvardinti galimus variantus', desc: 'Kokie galimi sprendimo būdai?' },
    { num: 5, step: 'Įvertinti kompromisus', desc: 'Kiekvieno varianto privalumai ir trūkumai?' },
    { num: 6, step: 'Išvada', desc: 'Kurį sprendimą rekomenduoti ir kodėl?' },
  ];

  const liteSteps = [
    'Kokia problema?',
    'Kokie 2–3 galimi sprendimai?',
    'Kuris geriausias ir kodėl?',
  ];

  const example1 = `REASONING:
1. Problema: Įmonėje darbuotojai naudoja ChatGPT be taisyklių.
2. Duomenys: 40 darbuotojų, jautrūs duomenys, nėra DI politikos.
3. Trūksta: aiškių naudojimo ribų ir atsakomybės.
4. Variantai:
   a) Visiškai uždrausti DI
   b) Leisti naudoti be ribojimų
   c) Parengti DI politiką
5. Kompromisai:
   a) Saugu, bet mažina efektyvumą
   b) Greita, bet rizikinga
   c) Reikalauja darbo, bet valdoma
6. Išvada: Rekomenduoti DI politikos sukūrimą.`;

  const example2 = `REASONING:
1. Problema: LinkedIn įrašai nesulaukia reakcijų.
2. Duomenys: B2B auditorija, mažas įsitraukimas.
3. Trūksta: aiškaus CTA.
4. Variantai:
   a) Informacinis postas
   b) Klausimo forma
   c) Provokuojanti įžvalga
5. Kompromisai:
   a) Saugu, bet nuobodu
   b) Skatina komentarus
   c) Rizikinga, bet viral
6. Išvada: Rinktis klausimo formą.`;

  const fullTemplate = `REASONING:
1. Problema:
2. Turimi duomenys:
3. Ko trūksta:
4. Galimi variantai:
5. Kompromisai:
6. Išvada:`;

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-amber-900 dark:text-amber-100">
          Klausimas: Kaip mąstyti prieš pateikiant atsakymą?
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Reasoning blokas nurodo DI, kokią sprendimo logiką taikyti prieš pateikdamas atsakymą. Jis naudojamas tada, kai reikia ne tik teksto, bet pagrįsto sprendimo.
        </p>
      </div>

      {/* Kada naudoti / kada nenaudoti */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
          <h4 className="font-bold mb-3 text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
            <span className="text-xl">✅</span> Naudok, kai:
          </h4>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
              <span>reikia sprendimo ar rekomendacijos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
              <span>yra keli galimi variantai</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
              <span>reikia įvertinti rizikas ar kompromisus</span>
            </li>
          </ul>
        </div>

        <div className="bg-rose-50 dark:bg-rose-900/20 p-5 rounded-xl border-2 border-rose-200 dark:border-rose-800">
          <h4 className="font-bold mb-3 text-rose-900 dark:text-rose-100 flex items-center gap-2">
            <span className="text-xl">❌</span> NENAUDOK, kai:
          </h4>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-600 dark:text-rose-400 mt-0.5">•</span>
              <span>reikia greito fakto</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 dark:text-rose-400 mt-0.5">•</span>
              <span>reikia perrašyti ar sutrumpinti tekstą</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 dark:text-rose-400 mt-0.5">•</span>
              <span>atsakymas turi būti vienas ir akivaizdus</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Trumpa (Lite) versija */}
      <div className="bg-brand-50 dark:bg-brand-900/20 p-6 rounded-xl border-2 border-brand-200 dark:border-brand-800">
        <h4 className="font-bold mb-3 text-brand-900 dark:text-brand-100">
          📝 Trumpa (Lite) Reasoning versija – 80% atvejų
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Tinka kasdieniams verslo klausimams:
        </p>
        <div className="space-y-2">
          {liteSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg">
              <span className="text-brand-600 dark:text-brand-400 font-bold">{idx + 1}.</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pilna (Advanced) struktūra */}
      <div className="bg-gradient-to-r from-violet-50 to-brand-50 dark:from-violet-900/20 dark:to-brand-900/20 p-6 rounded-xl">
        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">
          🧠 Pilna Reasoning struktūra (Advanced)
        </h4>
        <div className="space-y-3">
          {steps.map((item) => (
            <div key={item.num} className="flex gap-3 items-start bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center font-bold text-violet-700 dark:text-violet-300 flex-shrink-0">
                {item.num}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.step}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verslo pavyzdžiai */}
      <div className="space-y-4">
        <h4 className="font-bold text-lg text-gray-900 dark:text-white">Verslo pavyzdžiai:</h4>
        
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 relative">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-block px-2 py-1 bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 text-xs font-semibold rounded">
              Pavyzdys №1 – Sprendimas
            </span>
            <CopyButton text={example1} size="sm" />
          </div>
          <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto">
            {example1}
          </pre>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 relative">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-block px-2 py-1 bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 text-xs font-semibold rounded">
              Pavyzdys №2 – Marketingas
            </span>
            <CopyButton text={example2} size="sm" />
          </div>
          <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto">
            {example2}
          </pre>
        </div>
      </div>

      {/* Kopijuojamas šablonas */}
      <TemplateBlock label="Kopijuojamas šablonas" template={fullTemplate} />

      {/* Svarbi pastaba */}
      <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl border-l-4 border-amber-500">
        <h4 className="font-bold mb-3 text-amber-900 dark:text-amber-100 flex items-center gap-2">
          <span className="text-xl">⚠️</span> Svarbi pastaba
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Reasoning blokas nepadarys stebuklo, jei:
        </p>
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
            <span>problema apibrėžta netiksliai</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
            <span>pateikti klaidingi duomenys</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
            <span>neaiškus galutinis tikslas</span>
          </li>
        </ul>
        <p className="text-sm text-amber-800 dark:text-amber-200 mt-3 font-semibold">
          👉 Geras reasoning prasideda nuo aiškios problemos.
        </p>
      </div>

      {onRenderTask()}
    </div>
  );
}

function QualityBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  const criteria: QualityCriteria[] = [
    { text: 'Loginė seka - informacija seka logiškai', color: 'brand' },
    { text: 'Pilnumas - visi klausimai atsakyti', color: 'emerald' },
    { text: 'Faktinis tikslumas - visi duomenys teisingi', color: 'amber' },
    { text: 'Įvairūs metodai - ne tik vienas būdas', color: 'violet' },
    { text: 'Išmatuojami rezultatai - turi KPI', color: 'rose' },
  ];

  const reasoningCriteria = [
    'Ar aiškiai išvardintos prielaidos?',
    'Ar nurodyta, kur modelis spėja, o kur remiasi faktais?',
    'Ar parodyta sprendimo logika, ne tik išvada?',
    'Ar modelis įvardija ribotumus?',
    'Ar yra alternatyvos / priešingos hipotezės?',
  ];

  const redFlags = [
    'Atsakymas per greitas ir per tikras',
    'Nėra „nežinau"',
    'Nėra alternatyvų',
    'Visi sakiniai „užtikrinti"',
    'Nėra ribų („depends", „if", „assumption")',
  ];

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-emerald-900 dark:text-emerald-100">
          Kaip patikrinti rezultato kokybę?
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Quality control blokas nustato kriterijus, pagal kuriuos DI įvertina savo darbą prieš pateikiant rezultatą.
        </p>
      </div>

      {/* Reasoning Quality ≠ Answer Quality */}
      <div className="bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-300 dark:border-rose-700 p-6 rounded-xl">
        <h4 className="font-bold text-lg mb-4 text-rose-900 dark:text-rose-100">
          ⚠️ Svarbu: Reasoning Quality ≠ Answer Quality
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Geras atsakymas nebūtinai reiškia gerą reasoning. DI gali pateikti gražų, bet nepagrįstą atsakymą.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">❌</span>
              <span className="font-bold text-red-900 dark:text-red-100">Gražus, bet nepagrįstas</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Atsakymas atrodo profesionalus, bet nėra aiškios logikos ar prielaidų.
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">✅</span>
              <span className="font-bold text-emerald-900 dark:text-emerald-100">Aiškiai pagrįstas</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Net jei ribotas, atsakymas turi aiškią logiką, prielaidas ir ribotumus.
            </p>
          </div>
        </div>
      </div>

      {/* Universalūs kriterijai */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Universalūs kokybės kriterijai:</h4>
        <div className="space-y-2 text-sm">
          {criteria.map((item, idx) => {
            const colors = getColorClasses(item.color);
            return (
              <div key={idx} className={`flex items-start gap-2 p-3 ${colors.bg} ${colors.bgDark} rounded-xl`}>
                <CheckCircle className={`w-4 h-4 ${colors.text} ${colors.textDark} mt-0.5 flex-shrink-0`} />
                <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reasoning Quality kriterijai */}
      <div className="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-xl border-2 border-violet-300 dark:border-violet-700">
        <h4 className="font-bold mb-4 text-violet-900 dark:text-violet-100">
          🧠 Reasoning Quality kriterijai (anti-bullshit sluoksnis)
        </h4>
        <div className="space-y-2 text-sm">
          {reasoningCriteria.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl">
              <span className="text-violet-600 dark:text-violet-400 font-bold mt-0.5">•</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Red Flags */}
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-2 border-amber-300 dark:border-amber-700">
        <h4 className="font-bold mb-4 text-amber-900 dark:text-amber-100">
          🚩 Blogo reasoning požymiai (red flags)
        </h4>
        <div className="space-y-2 text-sm">
          {redFlags.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl">
              <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">⚠</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Patobulinti QC šablonai */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
          <h4 className="font-bold mb-3 text-gray-900 dark:text-white">A. Inline Quality Control (prompt'e)</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Prieš pateikiant galutinį atsakymą, DI turi patikrinti:
          </p>
          <TemplateBlock 
            label="Kopijuojamas šablonas:" 
            template={`Prieš pateikiant galutinį atsakymą:
- patikrink loginę nuoseklumą (ar visi teiginiai dera tarpusavyje?)
- pažymėk prielaidas (kokie faktai remiasi spėjimais, o ne duomenimis?)
- nurodyk neapibrėžtumus (kur trūksta duomenų ar yra rizika?)
- ištaisyk faktinius spėjimus (ar visi skaičiai ir faktai tikslūs?)`}
          />
          <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-1">Verslo pavyzdys:</p>
            <p className="text-xs text-gray-700 dark:text-gray-300 italic">
              "Prieš pateikiant Q4 strategijos rekomendacijas, patikrink: ar visi KPI dera su biudžetu? Pažymėk, kurios prognozės remiasi spėjimais. Nurodyk, jei trūksta konkurentų duomenų."
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
          <h4 className="font-bold mb-3 text-gray-900 dark:text-white">B. Post-hoc Quality Audit (antras žingsnis)</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Po pirmo atsakymo, prašyk DI peržiūrėti ir išvardyti:
          </p>
          <TemplateBlock 
            label="Kopijuojamas šablonas:" 
            template={`Peržiūrėk ankstesnį atsakymą ir išvardyk:
1) Loginius trūkumus (kur logika nebaigta ar prieštaringa?)
2) Nepagrįstus teiginius (kur trūksta duomenų ar šaltinių?)
3) Prielaidas (kokie faktai remiasi spėjimais, o ne įrodymais?)
4) Pagerinimo pasiūlymus (ką galima patobulinti ar papildyti?)`}
          />
          <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-1">Verslo pavyzdys:</p>
            <p className="text-xs text-gray-700 dark:text-gray-300 italic">
              "Peržiūrėk Q4 pardavimų analizės ataskaitą. Išvardyk: 1) Ar palyginimas su Q3 yra pilnas? 2) Ar rekomendacijos remiasi tik skaičiais, be rinkos konteksto? 3) Kokios prielaidos apie Q1 augimą? 4) Ką dar reikėtų pridėti valdybai?"
            </p>
          </div>
        </div>
      </div>

      {/* Mikro-užduotis */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border-2 border-blue-300 dark:border-blue-700">
        <h4 className="font-bold mb-4 text-blue-900 dark:text-blue-100">💡 Mikro-užduotis</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Pateiktas atsakymas atrodo geras. Pažymėk:
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl">
            <span className="text-blue-600 dark:text-blue-400 font-bold">1.</span>
            <span className="text-gray-700 dark:text-gray-300">2 prielaidas</span>
          </div>
          <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl">
            <span className="text-blue-600 dark:text-blue-400 font-bold">2.</span>
            <span className="text-gray-700 dark:text-gray-300">1 galimą hallucinaciją</span>
          </div>
          <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl">
            <span className="text-blue-600 dark:text-blue-400 font-bold">3.</span>
            <span className="text-gray-700 dark:text-gray-300">1 vietą, kur reikėtų papildomo šaltinio</span>
          </div>
        </div>
      </div>

      {/* Susiejimas su Promptų anatomija */}
      <div className="bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/20 dark:to-brand-900/20 p-6 rounded-xl border-2 border-emerald-300 dark:border-emerald-700">
        <h4 className="font-bold mb-3 text-gray-900 dark:text-white">
          🔗 Kaip tai susijungia su visa Promptų anatomija?
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong>Quality Control yra saugos diržas</strong>, kuris kompensuoja:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
          <li>Silpną kontekstą (Input blokas)</li>
          <li>Neaiškų taską (Meta blokas)</li>
          <li>Per drąsų modelį (Advanced parametrai)</li>
        </ul>
        <p className="mt-3 text-sm font-semibold text-emerald-900 dark:text-emerald-100">
          Tai ne „dar vienas blokas", o apsauga nuo klaidų.
        </p>
      </div>

      {onRenderTask()}
    </div>
  );
}

function AdvancedBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  return (
    <div className="space-y-6">
      {/* Tikslas ir apibrėžimas */}
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-brand-900 dark:text-brand-100">
          🧠 Advanced Parameters – tikslumas vs kūryba
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          <strong>Tikslas:</strong> valdyti DI atsakymų nuspėjamumą, gylį ir kūrybiškumą pagal verslo užduotį.
        </p>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-brand-200 dark:border-brand-800">
          <h4 className="font-semibold mb-2 text-brand-800 dark:text-brand-200">🔧 Kas yra Advanced Parameters?</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Tai neprivalomas, bet labai galingas prompto blokas, leidžiantis:
          </p>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
            <li>sumažinti „fantazijas"</li>
            <li>padidinti analizės gylį</li>
            <li>tiksliai valdyti toną ir rezultatą</li>
          </ul>
        </div>
      </div>

      {/* Temperature sekcija su vizualiu skalės pavyzdžiu */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-violet-200 dark:border-violet-800">
        <h4 className="font-bold text-lg mb-4 text-violet-900 dark:text-violet-100">
          🌡️ Temperature – kūrybos valdiklis
        </h4>
        
        {/* Vizualus skalės pavyzdys */}
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">⬅️ Tikslumas</span>
            <span className="text-gray-600 dark:text-gray-400">Kūrybiškumas ➡️</span>
          </div>
          <div className="w-full h-3 bg-gradient-to-r from-blue-500 via-emerald-500 to-orange-500 rounded-full"></div>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">0.0–0.3 | Žemas → faktai, analizė, instrukcijos</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">👉 Kuo žemesnė temperatūra – tuo mažiau improvizacijos.</p>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-500">
            <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">0.4–0.7 | Vidutinis → subalansuotas verslo naudojimas</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
            <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">0.8–1.0 | Aukštas → idėjos, marketingas, kūryba</p>
          </div>
        </div>
      </div>

      {/* Reasoning gylis sekcija */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
        <h4 className="font-bold text-lg mb-4 text-emerald-900 dark:text-emerald-100">
          🧠 Reasoning gylis – mąstymo intensyvumas
        </h4>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Greitas → paprasti klausimai, Q&A</p>
          </div>
          <div className="p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
            <p className="font-semibold text-brand-900 dark:text-brand-100 mb-1">Normalus → standartinės verslo užduotys</p>
          </div>
          <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
            <p className="font-semibold text-violet-900 dark:text-violet-100 mb-1">Gilus → analizė, strategija, sprendimų palyginimas</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">👉 Gilus = daugiau laiko, bet geresnė logika.</p>
          </div>
        </div>
      </div>

      {/* Business cheat sheet */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-amber-200 dark:border-amber-800">
        <h4 className="font-bold text-lg mb-4 text-amber-900 dark:text-amber-100">
          📊 Kada ką naudoti? (Business cheat sheet)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-amber-50 dark:bg-amber-900/20">
                <th className="p-3 text-left border-b border-amber-200 dark:border-amber-800">Užduotis</th>
                <th className="p-3 text-left border-b border-amber-200 dark:border-amber-800">Temperature</th>
                <th className="p-3 text-left border-b border-amber-200 dark:border-amber-800">Reasoning</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3">Ataskaitos, analizė</td>
                <td className="p-3">0.1–0.3</td>
                <td className="p-3">Gilus</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <td className="p-3">SOP, instrukcijos</td>
                <td className="p-3">0.1–0.2</td>
                <td className="p-3">Normalus</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3">El. laiškai, HR</td>
                <td className="p-3">0.4–0.5</td>
                <td className="p-3">Normalus</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <td className="p-3">Marketingas, tekstai</td>
                <td className="p-3">0.6–0.8</td>
                <td className="p-3">Normalus</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3">Strategija, idėjos</td>
                <td className="p-3">0.5–0.6</td>
                <td className="p-3">Gilus</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Safe default */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-6 rounded-xl">
        <h4 className="font-bold text-lg mb-3 text-emerald-900 dark:text-emerald-100">
          ✅ SAFE DEFAULT (80% verslo atvejų)
        </h4>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">ADVANCED:</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Temperature: 0.4–0.6</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">Reasoning: Normal</p>
        </div>
        <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          <p className="font-semibold mb-2">📌 Naudok, kai:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>nori stabilaus rezultato</li>
            <li>dirbi su vidiniais dokumentais</li>
            <li>nenori „per kūrybiško" DI</li>
          </ul>
        </div>
      </div>

      {/* Ready-to-copy pavyzdžiai */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-violet-200 dark:border-violet-800">
        <h4 className="font-bold text-lg mb-4 text-violet-900 dark:text-violet-100">
          📋 Ready-to-copy pavyzdžiai
        </h4>
        <div className="space-y-4">
          {/* Pavyzdys 1: Verslo analizė */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-blue-900 dark:text-blue-100">🔍 Verslo analizė</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 mb-2 relative group">
              <CopyButton
                text={`ADVANCED:
Temperature: 0.2
Reasoning: Deep

Užduotis:
Išanalizuok šios įmonės procesą ir pateik 3 problemas bei 3 realias optimizavimo rekomendacijas.`}
                className="absolute top-2 right-2"
                size="sm"
              />
              <div className="pr-8">
                <div className="mb-2">ADVANCED:</div>
                <div className="mb-1">Temperature: 0.2</div>
                <div className="mb-3">Reasoning: Deep</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Užduotis:</div>
                <div>Išanalizuok šios įmonės procesą ir pateik 3 problemas bei 3 realias optimizavimo rekomendacijas.</div>
              </div>
            </div>
          </div>

          {/* Pavyzdys 2: Marketingo tekstas */}
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-orange-900 dark:text-orange-100">📣 Marketingo tekstas</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 mb-2 relative group">
              <CopyButton
                text={`ADVANCED:
Temperature: 0.7
Reasoning: Normal

Užduotis:
Parašyk LinkedIn įrašą apie naują paslaugą. Tonas – profesionalus, orientuotas į naudą verslui.`}
                className="absolute top-2 right-2"
                size="sm"
              />
              <div className="pr-8">
                <div className="mb-2">ADVANCED:</div>
                <div className="mb-1">Temperature: 0.7</div>
                <div className="mb-3">Reasoning: Normal</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Užduotis:</div>
                <div>Parašyk LinkedIn įrašą apie naują paslaugą. Tonas – profesionalus, orientuotas į naudą verslui.</div>
              </div>
            </div>
          </div>

          {/* Pavyzdys 3: SOP / instrukcija */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-emerald-900 dark:text-emerald-100">⚙️ SOP / instrukcija</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 mb-2 relative group">
              <CopyButton
                text={`ADVANCED:
Temperature: 0.1
Reasoning: Normal

Užduotis:
Sukurk žingsnis po žingsnio instrukciją naujam darbuotojui, be interpretacijų.`}
                className="absolute top-2 right-2"
                size="sm"
              />
              <div className="pr-8">
                <div className="mb-2">ADVANCED:</div>
                <div className="mb-1">Temperature: 0.1</div>
                <div className="mb-3">Reasoning: Normal</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Užduotis:</div>
                <div>Sukurk žingsnis po žingsnio instrukciją naujam darbuotojui, be interpretacijų.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dažniausios klaidos */}
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-xl">
        <h4 className="font-bold text-lg mb-3 text-red-900 dark:text-red-100">
          ⚠️ Dažniausios klaidos
        </h4>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-red-500 mr-2">❌</span>
            <span>Aukšta temperature analizei → „gražu, bet netikslu"</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2">❌</span>
            <span>Deep reasoning paprastoms užduotims → per lėta</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2">❌</span>
            <span>Keiti parametrus, bet nekeiti užduoties formuluotės</span>
          </li>
        </ul>
      </div>

      {/* Mini taisyklė */}
      <div className="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-6 rounded-xl">
        <h4 className="font-bold text-lg mb-3 text-violet-900 dark:text-violet-100">
          🧩 Mini taisyklė įsiminti
        </h4>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
            Temperature valdo <span className="text-violet-600 dark:text-violet-400">KŪRYBĄ</span>
          </p>
          <p className="text-gray-800 dark:text-gray-200 font-semibold">
            Reasoning valdo <span className="text-violet-600 dark:text-violet-400">MĄSTYMĄ</span>
          </p>
        </div>
      </div>

      <TemplateBlock label="Kopijuojamas šablonas" template="ADVANCED: Temperature: [0.2–0.7]. Reasoning: [normal/extended]." />
      {onRenderTask()}
    </div>
  );
}

function AdvancedParameters2Slide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  return (
    <div className="space-y-6">
      {/* Tikslas ir įspėjimas */}
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-brand-900 dark:text-brand-100">
          ⚙️ Advanced Parameters (II) – atsakymo kontrolė
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          <strong>Tikslas:</strong> valdyti atsakymo ilgį, fokusą ir pasikartojimus be papildomo „prompt triukšmo".
        </p>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200 font-semibold">
            ⚠️ Advanced parameters niekada neišgelbės blogai suformuluotos užduoties.
          </p>
          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
            Pirma – aiški užduotis. Tik tada – parametrai.
          </p>
        </div>
      </div>

      {/* Max Tokens */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
        <h4 className="font-bold text-lg mb-4 text-blue-900 dark:text-blue-100">
          🧮 Max Tokens – atsakymo ilgis (SAUGIAUSIAS parametras)
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          <strong>Valdo:</strong> kiek teksto DI gali sugeneruoti
        </p>
        
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/20">
                <th className="p-3 text-left border-b border-blue-200 dark:border-blue-800">Reikšmė</th>
                <th className="p-3 text-left border-b border-blue-200 dark:border-blue-800">Kada naudoti</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-mono">50–100</td>
                <td className="p-3">Trumpi atsakymai, Q&A, santraukos</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <td className="p-3 font-mono">150–300</td>
                <td className="p-3">El. laiškai, vidiniai dokumentai</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-mono">400–800</td>
                <td className="p-3">Analizės, ataskaitos</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <td className="p-3 font-mono">1000+</td>
                <td className="p-3">Strategija, mokymai, ilgasis turinys</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500 mb-3">
          <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Verslo pavyzdys</p>
          <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 relative group">
            <CopyButton
              text={`ADVANCED:
Max tokens: 150

Užduotis:
Atsakyk 3 punktais. Be pavyzdžių ir išplėtimų.`}
              className="absolute top-2 right-2"
              size="sm"
            />
            <div className="pr-8">
              <div className="mb-2">ADVANCED:</div>
              <div className="mb-3">Max tokens: 150</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Užduotis:</div>
              <div>Atsakyk 3 punktais. Be pavyzdžių ir išplėtimų.</div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border-l-4 border-red-500">
          <p className="text-sm text-red-800 dark:text-red-200">
            <span className="font-semibold">❌ Klaida:</span> Didinti Max Tokens vietoje to, kad paprašytum struktūros ar punktų.
          </p>
        </div>
      </div>

      {/* Top-p */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-violet-200 dark:border-violet-800">
        <h4 className="font-bold text-lg mb-4 text-violet-900 dark:text-violet-100">
          🎯 Top-p – atsakymo fokusas
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          <strong>Valdo:</strong> kiek skirtingų variantų DI svarsto prieš pateikdamas atsakymą
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">0.3–0.5 → vienas kryptingas sprendimas</p>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-500">
            <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">0.6–0.8 → subalansuota</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
            <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">0.9–1.0 → daug alternatyvų (idėjų generavimas)</p>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500 mb-3">
          <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Verslo pavyzdys</p>
          <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 relative group">
            <CopyButton
              text={`ADVANCED:
Top-p: 0.4

Užduotis:
Pateik vieną geriausią sprendimą. Nevardink alternatyvų.`}
              className="absolute top-2 right-2"
              size="sm"
            />
            <div className="pr-8">
              <div className="mb-2">ADVANCED:</div>
              <div>Top-p: 0.4</div>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            <strong>Užduotis:</strong> Pateik vieną geriausią sprendimą. Nevardink alternatyvų.
          </p>
        </div>

        <div className="bg-violet-50 dark:bg-violet-900/20 p-3 rounded-lg border-l-4 border-violet-500">
          <p className="text-sm text-violet-800 dark:text-violet-200">
            <span className="font-semibold">🧠 Taisyklė:</span> Aukšta Temperature + aukštas Top-p = mažas nuspėjamumas
          </p>
        </div>
      </div>

      {/* Frequency Penalty */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-amber-200 dark:border-amber-800">
        <h4 className="font-bold text-lg mb-4 text-amber-900 dark:text-amber-100">
          🔁 Frequency Penalty – pasikartojimų mažinimas
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          <strong>Valdo:</strong> žodžių ir frazių kartojimą tekste
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">0.0 → leidžia kartotis</p>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-l-4 border-amber-500">
            <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">0.5 → subtili kontrolė</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
            <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">0.8 → griežta kontrolė</p>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500 mb-3">
          <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Verslo pavyzdys</p>
          <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 relative group">
            <CopyButton
              text={`ADVANCED:
Frequency penalty: 0.8

Užduotis:
Parašyk tekstą be pasikartojančių frazių ar klišių.`}
              className="absolute top-2 right-2"
              size="sm"
            />
            <div className="pr-8">
              <div className="mb-2">ADVANCED:</div>
              <div>Frequency penalty: 0.8</div>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            <strong>Užduotis:</strong> Parašyk tekstą be pasikartojančių frazių ar klišių.
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border-l-4 border-amber-500">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-semibold mb-2">📌 Labai naudinga:</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 ml-4 list-disc space-y-1">
            <li>marketingui</li>
            <li>prezentacijoms</li>
            <li>ilgoms ataskaitoms</li>
          </ul>
        </div>
      </div>

      {/* Presence Penalty */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-rose-200 dark:border-rose-800">
        <h4 className="font-bold text-lg mb-4 text-rose-900 dark:text-rose-100">
          ✨ Presence Penalty – naujų krypčių skatinimas
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          <strong>Valdo:</strong> ar DI laikosi temos, ar aktyviai ieško naujų idėjų
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">0.0–0.3 → laikosi temos</p>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-500">
            <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">0.5 → švelnus išėjimas į naujus kampus</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
            <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">0.8–1.0 → radikaliai naujos kryptys</p>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500 mb-3">
          <p className="text-sm text-red-800 dark:text-red-200 font-semibold mb-2">🚫 NENAUDOTI:</p>
          <ul className="text-sm text-red-700 dark:text-red-300 ml-4 list-disc space-y-1">
            <li>analizėse</li>
            <li>politikose</li>
            <li>teisiniuose tekstuose</li>
          </ul>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500 mb-3">
          <p className="text-sm text-emerald-800 dark:text-emerald-200 font-semibold mb-2">✅ TINKA:</p>
          <ul className="text-sm text-emerald-700 dark:text-emerald-300 ml-4 list-disc space-y-1">
            <li>brainstormingui</li>
            <li>inovacijoms</li>
            <li>strateginėms dirbtuvėms</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Verslo taisyklė:</span> Presence penalty analizėse laikyti ≤ 0.3
          </p>
        </div>
      </div>

      {/* Safe default */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-6 rounded-xl">
        <h4 className="font-bold text-lg mb-3 text-emerald-900 dark:text-emerald-100">
          ✅ SAFE DEFAULT (80% verslo atvejų)
        </h4>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg relative group">
          <CopyButton
            text={`ADVANCED:
Max tokens: 300
Top-p: 0.7
Frequency penalty: 0.5
Presence penalty: 0.3`}
            className="absolute top-2 right-2"
            size="sm"
          />
          <div className="pr-8">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">ADVANCED:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Max tokens: 300</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Top-p: 0.7</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Frequency penalty: 0.5</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Presence penalty: 0.3</p>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          <p className="font-semibold mb-2">📌 Stabilu, nuspėjama, saugu vidiniam naudojimui.</p>
        </div>
      </div>

      {/* Finalinė taisyklė */}
      <div className="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-6 rounded-xl">
        <h4 className="font-bold text-lg mb-3 text-violet-900 dark:text-violet-100">
          🧠 Viena taisyklė įsiminti
        </h4>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
            Jei DI atsakymas blogas –<br />
            <span className="text-violet-600 dark:text-violet-400">90% atvejų kalta užduotis, ne parametrai.</span>
          </p>
        </div>
      </div>

      <TemplateBlock label="Kopijuojamas šablonas" template="ADVANCED: Max tokens: [150-300]. Top-p: [0.5-0.8]. Frequency penalty: [0.3-0.5]. Presence penalty: [0.0-0.3]." />
      {onRenderTask()}
    </div>
  );
}

function FullExampleSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  const blocks: FullExampleBlock[] = [
    { num: 1, name: 'META', color: 'rose', content: 'Tu esi vyresnysis verslo strategas su 12 metų B2B SaaS patirtimi. Tavo tikslas - parengti Q4 pardavimų strategijos prezentaciją valdybos nariams, kurie priims strateginius sprendimus 2025 metams.' },
    { num: 2, name: 'INPUT', color: 'orange', content: 'Q1-Q3 2024: 2.1M EUR (+22% vs 2023), 156 naujų klientų, vidutinis čekis 13.5k EUR. Konkurentai: Competitor A (+18%), Competitor B (+15%). Biudžetas Q4: 500k EUR.' },
    { num: 3, name: 'OUTPUT', color: 'amber', content: '10 skaidrių: Executive Summary, Dabartinė situacija, Konkurentų analizė, Q4 tikslai, Strategija, Veiksmų planas, Biudžetas, Rizikos, Metrikos, Išvados. Formatas: PowerPoint, lietuvių kalba, verslo tonas.' },
    { num: 4, name: 'REASONING', color: 'emerald', content: '1) Apibrėžti pagrindinę žinutę 2) Analizuoti duomenis 3) Įvertinti variantus 4) Palyginti su konkurentais 5) Nustatyti kompromisus 6) Rekomenduoti strategiją' },
    { num: 5, name: 'QUALITY', color: 'brand', content: '✓ Aiški žinutė ✓ Duomenimis pagrįsta ✓ Realistiškas ROI ✓ Veiksmų planas ✓ Rizikų analizė ✓ Išmatuojami tikslai' },
    { num: 6, name: 'ADVANCED', color: 'violet', content: 'Temperature: 0.4, Reasoning: Gilus, Kalba: LT, Formatas: Verslo dokumentas' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/20 dark:to-brand-900/20 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Užduotis: Q4 Pardavimų Strategijos Prezentacija</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Pilnas promptas su visais 6 blokais</p>
      </div>

      <div className="space-y-3 text-sm">
        {blocks.map((block) => {
          const colors = getColorClasses(block.color);
          return (
            <div key={block.num} className={`${colors.bg} ${colors.bgDark} p-4 rounded-xl border-l-4 ${colors.border}`}>
              <p className={`text-xs font-bold ${colors.text} ${colors.textDark} mb-1 uppercase tracking-wider`}>
                {block.num}. {block.name}
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-300">{block.content}</p>
            </div>
          );
        })}
      </div>

      {onRenderTask()}
    </div>
  );
}

function ComparisonSlide() {
  const unstructuredPrompt = 'Sukurk man mokymo programą apie DI. Turi būti įdomi ir praktinė.';
  const structuredPrompt = 'META: Tu esi mokymo kūrėjas. Tikslas – parengti 4 val. DI įvadinį mokymą. Auditorija – 12–15 pradedančiųjų.\nINPUT: Apribojimai – 1 lektorius, be praktinių įrankių demonstracijų.\nOUTPUT: Lentelė su 5 stulpeliais: modulis, trukmė, tikslas, veikla, rezultatas. Tonas – aiškus, profesionalus.';

  return (
    <div className="space-y-6">
      <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl border border-brand-200 dark:border-brand-800">
        <p className="text-sm text-brand-800 dark:text-brand-200">
          <strong>Kas lyginama:</strong> ta pati užduotis, bet skirtinga struktūra (be blokų vs su blokais).
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-rose-50 dark:bg-rose-900/20 p-5 rounded-xl border-2 border-rose-200 dark:border-rose-800">
          <h4 className="font-bold text-rose-900 dark:text-rose-100 mb-3 flex items-center gap-2">❌ Nestruktūruotas</h4>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-sm italic text-gray-700 dark:text-gray-300 mb-4 relative whitespace-pre-line">
            <CopyButton text={unstructuredPrompt} className="absolute top-2 right-2" size="sm" />
            <p>{unstructuredPrompt}</p>
          </div>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p className="flex items-start gap-2"><span className="text-rose-600">•</span><span>Neaiški tikslinė auditorija</span></p>
            <p className="flex items-start gap-2"><span className="text-rose-600">•</span><span>Nėra konkretių duomenų</span></p>
            <p className="flex items-start gap-2"><span className="text-rose-600">•</span><span>Neapibrėžtas formatas</span></p>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">✓ Struktūruotas</h4>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-xs text-gray-700 dark:text-gray-300 max-h-40 overflow-y-auto mb-4 relative whitespace-pre-line">
            <CopyButton text={structuredPrompt} className="absolute top-2 right-2" size="sm" />
                <p className="font-semibold text-rose-700 dark:text-rose-400">META: Tu esi mokymo kūrėjas. Tikslas – parengti 4 val. DI įvadinį mokymą. Auditorija – 12–15 pradedančiųjų.</p>
            <p className="font-semibold text-orange-700 dark:text-orange-400 mt-1">INPUT: Apribojimai – 1 lektorius, be praktinių įrankių demonstracijų.</p>
            <p className="font-semibold text-amber-700 dark:text-amber-400 mt-1">OUTPUT: Lentelė su 5 stulpeliais: modulis, trukmė, tikslas, veikla, rezultatas. Tonas – aiškus, profesionalus.</p>
          </div>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <p className="flex items-start gap-2"><span className="text-emerald-600">•</span><span>Aiški auditorija</span></p>
            <p className="flex items-start gap-2"><span className="text-emerald-600">•</span><span>Konkretūs parametrai</span></p>
            <p className="flex items-start gap-2"><span className="text-emerald-600">•</span><span>Tikslus formatas</span></p>
          </div>
        </div>
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 p-6 rounded-xl">
        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Rezultatų palyginimas:</h4>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-3xl font-bold text-rose-600">40%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">nestruktūruotas</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-3xl font-bold text-emerald-600">85%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">struktūruotas</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-3xl font-bold text-brand-600">60%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">mažiau taisymų</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummarySlide() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/20 dark:to-brand-900/20 p-6 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
        <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">🎉 Ką išmokote</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Sveikiname! Dabar žinote, kaip profesionaliai struktūruoti promptus naudojant 6 blokų sistemą.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-brand-200 dark:border-brand-800">
          <h4 className="font-bold text-brand-900 dark:text-brand-100 mb-4">6 pagrindiniai blokai:</h4>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p><strong>1.</strong> Meta - rolė ir kontekstas</p>
            <p><strong>2.</strong> Input - duomenys ir apribojimai</p>
            <p><strong>3.</strong> Output - formato reikalavimai</p>
            <p><strong>4.</strong> Reasoning - mąstymo struktūra</p>
            <p><strong>5.</strong> Quality - kokybės kriterijai</p>
            <p><strong>6.</strong> Advanced - parametrai</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-4">Pagrindinės idėjos:</h4>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {['Hierarchija yra kritinė', 'Konkretumas > bendrumas', 'Pavyzdžiai pagerina rezultatus', 'Kokybės kontrolė būtina'].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-8 rounded-xl text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Sėkmės su DI! 🚀</h3>
        <p className="text-brand-100">Struktūruoti promptai = nuspėjami rezultatai = didesnis efektyvumas</p>
      </div>
    </div>
  );
}

function TestIntroSlide() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-50 to-brand-50 dark:from-violet-900/20 dark:to-brand-900/20 p-6 rounded-xl border-2 border-violet-200 dark:border-violet-800">
        <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">📝 Žinių Patikrinimas</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Šiame modulyje patikrinsite, ar supratote 6 blokų sistemą.
          Kiekvienas klausimas turi paaiškinimą, todėl tai yra ir mokymosi galimybė.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">📊 Testo struktūra</h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• 10 klausimų apie 6 blokus</li>
            <li>• Klausimai sugrupuoti pagal temas</li>
            <li>• Kiekvienas turi paaiškinimą</li>
            <li>• Nėra laiko limito</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">🎯 Tikslas</h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Įtvirtinti žinias</li>
            <li>• Identifikuoti spragas</li>
            <li>• Pasiruošti praktikai</li>
            <li>• ≥70% = sėkmė</li>
          </ul>
        </div>
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
        <p className="text-brand-800 dark:text-brand-200 text-sm">
          <strong>💡 Patarimas:</strong> Jei nežinote atsakymo, pasirinkite tai, kas atrodo logiškiausia.
          Po kiekvieno klausimo pamatysite paaiškinimą.
        </p>
      </div>
    </div>
  );
}

function TestSectionSlide({
  questions,
  onComplete,
  isCompleted,
}: {
  questions: TestQuestion[];
  onComplete: () => void;
  isCompleted: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setAnswers({});
    setShowResults(false);
  }, [questions]);

  const handleAnswer = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheck = () => {
    setShowResults(true);
    const allCorrect = questions.every((q) => answers[q.id] === q.correct);
    if (allCorrect || Object.keys(answers).length === questions.length) {
      onComplete();
    }
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="space-y-6">
      {questions.map((q, qIdx) => {
        const userAnswer = answers[q.id];
        const isCorrect = userAnswer === q.correct;

        return (
          <div
            key={q.id}
            className={`bg-white dark:bg-gray-800 p-5 rounded-xl border-2 transition-all ${
              showResults
                ? isCorrect
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <p className="font-bold text-gray-900 dark:text-white mb-4">
              {qIdx + 1}. {q.question}
            </p>

            <div className="space-y-2">
              {q.options.map((option, idx) => {
                const isSelected = userAnswer === idx;
                const isCorrectOption = idx === q.correct;

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(q.id, idx)}
                    disabled={showResults}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      showResults
                        ? isCorrectOption
                          ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30'
                          : isSelected && !isCorrectOption
                          ? 'border-rose-500 bg-rose-100 dark:bg-rose-900/30'
                          : 'border-gray-200 dark:border-gray-700'
                        : isSelected
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          showResults
                            ? isCorrectOption
                              ? 'border-emerald-500 bg-emerald-500'
                              : isSelected
                              ? 'border-rose-500 bg-rose-500'
                              : 'border-gray-300'
                            : isSelected
                            ? 'border-brand-500 bg-brand-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {showResults && isCorrectOption && <CheckCircle className="w-4 h-4 text-white" />}
                        {isSelected && !showResults && <div className="w-3 h-3 rounded-full bg-white" />}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showResults && (
              <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                <p className={`text-sm ${isCorrect ? 'text-emerald-800 dark:text-emerald-200' : 'text-amber-800 dark:text-amber-200'}`}>
                  <strong>{isCorrect ? '✓ Teisingai!' : '✗ Neteisingai.'}</strong> {q.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {!showResults && !isCompleted && (
        <button
          onClick={handleCheck}
          disabled={!allAnswered}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Patikrinti atsakymus
        </button>
      )}

      {showResults && (
        <div className="text-center p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
          <p className="text-brand-800 dark:text-brand-200 font-medium">
            ✓ Atsakymai patikrinti. Tęskite į kitą skaidrę.
          </p>
        </div>
      )}
    </div>
  );
}

function TestResultsSlide() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/20 dark:to-brand-900/20 p-8 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
          <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">Testas Baigtas! 🎉</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Puikiai! Dabar galite pereiti prie praktinių užduočių ir pritaikyti savo žinias realiems scenarijams.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">📚 Ką išmokote:</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            'Meta blokas = rolė ir kontekstas',
            'Input = konkretūs duomenys',
            'Output = formatas ir struktūra',
            'Reasoning = mąstymo logika',
            'Quality = kokybės kriterijai',
            'Advanced = parametrų kontrolė',
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PracticeIntroSlide() {
  const scenarios = [
    { icon: '📊', title: 'Pardavimų Analizė', desc: 'E-commerce quarterly review valdybai' },
    { icon: '📈', title: 'Marketingo Planas', desc: 'B2B Q1 strategijos dokumentas' },
    { icon: '👥', title: 'HR Dokumentas', desc: 'Darbuotojų apklausos analizė' },
    { icon: '🚀', title: 'Produkto Aprašymas', desc: 'SaaS produkto launch tekstai' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 p-6 rounded-xl border-2 border-accent-200 dark:border-accent-800">
        <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">💼 Praktinis Pritaikymas</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Dabar pritaikysite 6 blokų sistemą realiems verslo scenarijams.
          Kiekvienas scenarijus turi skirtingą kontekstą ir iššūkius.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">🎯 4 Verslo Scenarijai:</h4>
        <div className="space-y-3">
          {scenarios.map((s, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{s.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
        <p className="text-brand-800 dark:text-brand-200 text-sm">
          <strong>💡 Patarimas:</strong> Pirmame scenarijuje galite peržiūrėti pavyzdinį sprendimą.
          Kituose scenarijuose bandykite sukurti promptą savarankiškai.
        </p>
      </div>
    </div>
  );
}

function PracticeScenarioSlide({ slide, onRenderTask }: { slide: Slide; onRenderTask: () => JSX.Element | null }) {
  if (!slide.scenario) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-brand-200 dark:border-brand-800">
        <h4 className="font-bold text-brand-900 dark:text-brand-100 mb-4 flex items-center gap-2">
          <span className="text-xl">📋</span> Scenarijaus Aprašymas
        </h4>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Kontekstas</p>
            <p className="text-gray-700 dark:text-gray-300">{slide.scenario.context}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Turimi Duomenys</p>
            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg font-mono text-sm">
              {slide.scenario.data}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Apribojimai</p>
            <p className="text-gray-700 dark:text-gray-300">{slide.scenario.constraints}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Laukiamas Rezultatas</p>
            <p className="text-gray-700 dark:text-gray-300">{slide.scenario.expectedFormat}</p>
          </div>
        </div>
      </div>

      {onRenderTask()}
    </div>
  );
}

function PracticeSummarySlide() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-accent-50 dark:from-emerald-900/20 dark:to-accent-900/20 p-8 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-brand-500 mb-4">
          <span className="text-4xl">🎓</span>
        </div>
        <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">Mokymas Baigtas! 🎉</h3>
        <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
          Sveikiname! Jūs sėkmingai baigėte Prompt Anatomijos mokymą ir dabar galite kurti profesionalius,
          struktūruotus promptus.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">✅ Ką išmokote:</h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• 6 blokų sistemą</li>
            <li>• Hierarchijos svarbą</li>
            <li>• Konkretaus input'o naudą</li>
            <li>• Kokybės kontrolę</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">🚀 Kiti žingsniai:</h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Praktikuokite kasdien</li>
            <li>• Kurkite šablonų biblioteką</li>
            <li>• Dalinkitės su komanda</li>
            <li>• Iteruokite ir tobulinkite</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-6 rounded-xl text-white text-center">
        <h4 className="text-xl font-bold mb-2">Struktūra = Rezultatas</h4>
        <p className="text-brand-100">5 minutės geram promptui = valandos sutaupytos vėliau</p>
      </div>
    </div>
  );
}
