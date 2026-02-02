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

    case 'reasoning':
      return <ReasoningBlockSlide onRenderTask={PracticalTaskSection} />;

    case 'quality':
      return <QualityBlockSlide onRenderTask={PracticalTaskSection} />;

    case 'advanced':
      return <AdvancedBlockSlide onRenderTask={PracticalTaskSection} />;

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
        <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Prompting'o technikų logika</h3>
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
  const getWorkflowIcon = (step: string) => {
    if (step.toLowerCase().includes('input')) return <MessageSquare className="w-4 h-4 text-brand-600 dark:text-brand-300" />;
    if (step.toLowerCase().includes('llm')) return <Sparkles className="w-4 h-4 text-accent-600 dark:text-accent-300" />;
    if (step.toLowerCase().includes('duomenys')) return <Database className="w-4 h-4 text-brand-600 dark:text-brand-300" />;
    return <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 p-6 rounded-xl">
        <p className="text-gray-700 dark:text-gray-300">{content?.intro}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {content?.diagrams.map((diagram, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <div className="mb-3">
              <h4 className="font-bold text-gray-900 dark:text-white">{diagram.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{diagram.subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              {diagram.steps.map((step, stepIdx) => (
                <div key={stepIdx} className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    {getWorkflowIcon(step)}
                    {step}
                  </div>
                  {stepIdx < diagram.steps.length - 1 && <span className="text-gray-400">→</span>}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">{diagram.note}</p>
          </div>
        ))}
      </div>

      {content?.examples && content.examples.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            <CopyButton text="Sukurkite man pardavimų ataskaitą." size="sm" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">Sukurkite man pardavimų ataskaitą.</p>
          <p className="text-xs text-rose-600 dark:text-rose-400">Problema: neaiški perspektyva</p>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 relative">
          <div className="flex justify-between items-start mb-3">
            <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">✓ Geras</span>
            <CopyButton text="Jūs esate vyresnysis verslo analitikas su 10 metų patirtimi e-commerce srityje. Jūsų tikslas - parengti pardavimų ataskaitą valdybos nariams, kurie priims strateginius sprendimus Q4 ketvirčiui." size="sm" />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            Jūs esate vyresnysis verslo analitikas su 10 metų patirtimi e-commerce srityje.
            Jūsų tikslas - parengti pardavimų ataskaitą valdybos nariams, kurie priims
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
            <p className="text-sm italic text-gray-600 dark:text-gray-400">Įvertinkite mūsų pardavimus.</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mb-2 uppercase tracking-wider">✓ Konkretus input:</p>
            <p className="text-sm italic text-gray-700 dark:text-gray-300">
              Įvertinkite Q3 2024 pardavimus. Duomenys: 250k EUR pajamos (+15% vs Q2), 1200 užsakymų, vidutinis čekis 208 EUR.
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
        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Pavyzdys: Verslo strategijos planas</h4>
        <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl text-sm">
          <p className="text-brand-700 dark:text-brand-300 mb-2 font-semibold">Lentelė su stulpeliais:</p>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>• Modulis - pavadinimas ir numeris</li>
            <li>• Trukmė - minutės</li>
            <li>• Tikslas - ką dalyviai išmoks</li>
            <li>• Veikla - konkretūs metodai</li>
            <li>• Rezultatas - išmatuojamas rezultatas</li>
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

function ReasoningBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  const steps = [
    { num: 1, step: 'Apibrėžti problemą', desc: 'Kokia tikroji problema?' },
    { num: 2, step: 'Analizuoti duomenis', desc: 'Kokius duomenis turime?' },
    { num: 3, step: 'Nustatyti trūkstamus elementus', desc: 'Ko trūksta?' },
    { num: 4, step: 'Variantai', desc: 'Kokie galimi sprendimai?' },
    { num: 5, step: 'Kompromisai', desc: 'Kiekvieno privalumai ir trūkumai?' },
    { num: 6, step: 'Išvada', desc: 'Rekomendacija su pagrindu' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-amber-900 dark:text-amber-100">
          Klausimas: Kaip mąstyti prieš pateikiant atsakymą?
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Reasoning blokas nurodo DI, kokią logiką taikyti. Tai pagerina sprendimų kokybę ir padeda išvengti paviršutiniškų atsakymų.
        </p>
      </div>

      <div className="bg-gradient-to-r from-violet-50 to-brand-50 dark:from-violet-900/20 dark:to-brand-900/20 p-6 rounded-xl">
        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">6 žingsnių mąstymo struktūra:</h4>
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

      <TemplateBlock label="Kopijuojamas šablonas" template="REASONING: 1) [žingsnis] 2) [žingsnis] 3) [žingsnis]" />
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

      <TemplateBlock label="Kopijuojamas šablonas" template="QUALITY: ✓ [kriterijus] ✓ [kriterijus] ✓ [kriterijus]" />
      {onRenderTask()}
    </div>
  );
}

function AdvancedBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  return (
    <div className="space-y-6">
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-brand-900 dark:text-brand-100">
          Kokie modelio specifiniai parametrai?
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Advanced parameters blokas leidžia tiksliai kontroliuoti DI elgesį. Šis blokas yra pasirenkamas, bet gali žymiai pagerinti rezultatus.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-violet-200 dark:border-violet-800">
          <h4 className="font-bold mb-3 text-violet-900 dark:text-violet-100">Temperature</h4>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300">Žemas (0.0-0.3) - Faktinis</p>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300">Vidutinis (0.4-0.7) - Subalansuotas</p>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300">Aukštas (0.8-1.0) - Kūrybiškas</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
          <h4 className="font-bold mb-3 text-emerald-900 dark:text-emerald-100">Reasoning gylis</h4>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300">Greitas - Paprasti klausimai</p>
            </div>
            <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300">Normalus - Standartinės užduotys</p>
            </div>
            <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300">Gilus - Sudėtinga analizė</p>
            </div>
          </div>
        </div>
      </div>

      <TemplateBlock label="Kopijuojamas šablonas" template="ADVANCED: Temperature: [0.2–0.7]. Reasoning: [normal/extended]." />
      {onRenderTask()}
    </div>
  );
}

function FullExampleSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  const blocks: FullExampleBlock[] = [
    { num: 1, name: 'META', color: 'rose', content: 'Jūs esate vyresnysis verslo strategas su 12 metų B2B SaaS patirtimi. Jūsų tikslas - parengti Q4 pardavimų strategijos prezentaciją valdybos nariams, kurie priims strateginius sprendimus 2025 metams.' },
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
  const unstructuredPrompt = 'Sukurkite man mokymo programą apie DI. Turi būti įdomi ir praktinė.';
  const structuredPrompt = 'META: Jūs esate mokymo kūrėjas. Tikslas – parengti 4 val. DI įvadinį mokymą. Auditorija – 12–15 pradedančiųjų.\nINPUT: Apribojimai – 1 lektorius, be praktinių įrankių demonstracijų.\nOUTPUT: Lentelė su 5 stulpeliais: modulis, trukmė, tikslas, veikla, rezultatas. Tonas – aiškus, profesionalus.';

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
            <p className="font-semibold text-rose-700 dark:text-rose-400">META: Jūs esate mokymo kūrėjas. Tikslas – parengti 4 val. DI įvadinį mokymą. Auditorija – 12–15 pradedančiųjų.</p>
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
