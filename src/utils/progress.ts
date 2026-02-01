export interface Progress {
  completedModules: number[];
  completedTasks: Record<number, number[]>;
  quizCompleted: boolean;
  quizScore: number | null;
}

const STORAGE_KEY = 'prompt-anatomy-progress';

export const getProgress = (): Progress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return getDefaultProgress();
    }
  }
  return getDefaultProgress();
};

export const saveProgress = (progress: Progress): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const resetProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

const getDefaultProgress = (): Progress => ({
  completedModules: [],
  completedTasks: {},
  quizCompleted: false,
  quizScore: null,
});
