import { useState, useEffect } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { useAutoSave, loadAutoSave, clearAutoSave } from '../../../utils/useAutoSave';
import { Progress } from '../../../utils/progress';
import { PracticalTask as PracticalTaskType } from '../../../types/modules';
import CopyButton from './CopyButton';

interface PracticalTaskProps {
  task: PracticalTaskType;
  slideId: number;
  moduleId: number;
  onTaskComplete: (taskId: number) => void;
  progress: Progress;
}

export default function PracticalTask({
  task,
  slideId,
  moduleId,
  onTaskComplete,
  progress,
}: PracticalTaskProps) {
  const autoSaveKey = `task-draft-${moduleId}-${slideId}`;
  const savedDraft = loadAutoSave<string>(autoSaveKey, '');
  const [answer, setAnswer] = useState(savedDraft);
  const [showSaved, setShowSaved] = useState(false);
  const isTaskCompleted = progress.completedTasks[moduleId]?.includes(slideId) || false;

  // Auto-save draft answers
  useAutoSave(autoSaveKey, answer, 1500);

  // Show saved indicator when value changes
  useEffect(() => {
    if (answer && answer.trim() && !isTaskCompleted) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [answer, isTaskCompleted]);

  // Clear draft when task is completed
  useEffect(() => {
    if (isTaskCompleted) {
      clearAutoSave(autoSaveKey);
    }
  }, [isTaskCompleted, autoSaveKey]);

  const handleSubmit = () => {
    if (answer?.trim()) {
      onTaskComplete(slideId);
      clearAutoSave(autoSaveKey);
    }
  };

  return (
    <div className="mt-8 p-6 bg-accent-50 dark:bg-accent-900/20 rounded-2xl border-l-4 border-accent-400 relative">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent-600 dark:text-accent-400" />
        <p className="font-bold text-accent-800 dark:text-accent-200">
          {task.title}
        </p>
      </div>

      {task.template && (
        <div className="mb-4 bg-white dark:bg-gray-800 border border-accent-200 dark:border-accent-800 rounded-xl p-4 relative group">
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {task.templateLabel || 'Kopijuoti pavyzdį'}
            </p>
            <CopyButton text={task.template} />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line font-mono">
            {task.template}
          </p>
          {task.explanation && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
              {task.explanation}
            </p>
          )}
        </div>
      )}

      <div className="relative">
        <textarea
          className="input min-h-[120px] font-mono text-sm"
          placeholder={task.placeholder}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isTaskCompleted}
          aria-label="Užduoties atsakymo laukas"
        />
        {showSaved && !isTaskCompleted && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg animate-fade-in">
            <CheckCircle className="w-3 h-3" />
            <span>Išsaugota</span>
          </div>
        )}
      </div>

      {!isTaskCompleted ? (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Atsakymas automatiškai išsaugomas
          </p>
          <button
            onClick={handleSubmit}
            disabled={!answer?.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Išsaugoti užduotį
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 mt-4 text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-3 rounded-xl animate-fade-in">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Užduotis atlikta! 🎉</span>
        </div>
      )}
    </div>
  );
}
