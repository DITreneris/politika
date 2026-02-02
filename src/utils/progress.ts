import { logError, logWarning, logInfo } from './logger';

export interface Progress {
  completedModules: number[];
  completedTasks: Record<number, number[]>;
  quizCompleted: boolean;
  quizScore: number | null;
}

// Internal storage format with versioning
interface ProgressV2 {
  version: 2;
  completedModules: number[];
  completedTasks: Record<number, number[]>;
  quizCompleted: boolean;
  quizScore: number | null;
  createdAt?: string;
  updatedAt?: string;
}

// Legacy format (v1) - without version field
interface ProgressV1 {
  completedModules: number[];
  completedTasks: Record<number, number[]>;
  quizCompleted: boolean;
  quizScore: number | null;
}

const STORAGE_KEY = 'prompt-anatomy-progress';
const CURRENT_SCHEMA_VERSION = 2;

/**
 * Check if data is ProgressV1 format (no version field)
 */
function isProgressV1(data: unknown): data is ProgressV1 {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return (
    'completedModules' in obj &&
    'completedTasks' in obj &&
    'quizCompleted' in obj &&
    'quizScore' in obj &&
    !('version' in obj)
  );
}

/**
 * Check if data is ProgressV2 format
 */
function isProgressV2(data: unknown): data is ProgressV2 {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return (
    obj.version === 2 &&
    'completedModules' in obj &&
    'completedTasks' in obj &&
    'quizCompleted' in obj &&
    'quizScore' in obj
  );
}

/**
 * Validate Progress structure
 */
function validateProgress(data: unknown): data is Progress {
  if (!data || typeof data !== 'object') return false;
  
  const obj = data as Record<string, unknown>;
  
  // Check required fields
  if (!Array.isArray(obj.completedModules)) return false;
  if (typeof obj.completedTasks !== 'object' || obj.completedTasks === null) return false;
  if (typeof obj.quizCompleted !== 'boolean') return false;
  if (obj.quizScore !== null && typeof obj.quizScore !== 'number') return false;
  
  // Validate completedModules array
  if (!obj.completedModules.every((item: unknown) => typeof item === 'number')) {
    return false;
  }
  
  // Validate completedTasks structure
  const tasks = obj.completedTasks as Record<string, unknown>;
  for (const key in tasks) {
    if (!Array.isArray(tasks[key])) return false;
    if (!(tasks[key] as unknown[]).every((item: unknown) => typeof item === 'number')) {
      return false;
    }
  }
  
  return true;
}

/**
 * Migrate ProgressV1 to ProgressV2
 */
function migrateV1ToV2(v1: ProgressV1): ProgressV2 {
  return {
    version: CURRENT_SCHEMA_VERSION,
    completedModules: v1.completedModules,
    completedTasks: v1.completedTasks,
    quizCompleted: v1.quizCompleted,
    quizScore: v1.quizScore,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Convert ProgressV2 to Progress (public interface)
 */
function v2ToProgress(v2: ProgressV2): Progress {
  return {
    completedModules: v2.completedModules,
    completedTasks: v2.completedTasks,
    quizCompleted: v2.quizCompleted,
    quizScore: v2.quizScore,
  };
}

/**
 * Get progress from localStorage with validation and migration
 */
export const getProgress = (): Progress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (!stored) {
    return getDefaultProgress();
  }
  
  try {
    const parsed = JSON.parse(stored);
    
    // Handle v1 format (legacy - no version field)
    if (isProgressV1(parsed)) {
      logInfo('Migrating progress from v1 to v2', { stored });
      const migrated = migrateV1ToV2(parsed);
      // Save migrated version
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return v2ToProgress(migrated);
    }
    
    // Handle v2 format
    if (isProgressV2(parsed)) {
      // Validate structure
      if (!validateProgress(parsed)) {
        logWarning('Progress v2 validation failed, resetting to default', { parsed });
        resetProgress();
        return getDefaultProgress();
      }
      return v2ToProgress(parsed);
    }
    
    // Unknown format - try to validate as Progress (for backward compatibility)
    if (validateProgress(parsed)) {
      logWarning('Unknown progress format, but valid structure. Migrating to v2', { parsed });
      const migrated = migrateV1ToV2(parsed as ProgressV1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return v2ToProgress(migrated);
    }
    
    // Invalid format - reset
    logError(new Error('Invalid progress format'), { stored, parsed });
    resetProgress();
    return getDefaultProgress();
    
  } catch (error) {
    logError(error instanceof Error ? error : new Error('Failed to parse progress'), { stored });
    resetProgress();
    return getDefaultProgress();
  }
};

/**
 * Debounce helper function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Queue for pending progress saves
let saveQueue: ProgressV2 | null = null;

/**
 * Internal function to actually save to localStorage
 */
function performSave(): void {
  if (!saveQueue) return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveQueue));
    saveQueue = null;
  } catch (error) {
    logError(error instanceof Error ? error : new Error('Failed to save progress'), {});
    saveQueue = null;
  }
}

// Debounced save function (500ms delay)
const debouncedSave = debounce(performSave, 500);

/**
 * Flush pending saves immediately (useful for critical saves or before page unload)
 */
export const flushProgressSave = (): void => {
  if (saveQueue) {
    performSave();
  }
};

/**
 * Save progress to localStorage with versioning and debouncing
 * Multiple rapid calls will be batched and saved after 500ms of inactivity
 */
export const saveProgress = (progress: Progress): void => {
  try {
    const existing = getExistingCreatedAt();
    const now = new Date().toISOString();
    
    const v2: ProgressV2 = {
      version: CURRENT_SCHEMA_VERSION,
      completedModules: progress.completedModules,
      completedTasks: progress.completedTasks,
      quizCompleted: progress.quizCompleted,
      quizScore: progress.quizScore,
      updatedAt: now,
      // Preserve createdAt if exists, otherwise set it now
      createdAt: existing.createdAt || now,
    };
    
    // Update queue and trigger debounced save
    saveQueue = v2;
    debouncedSave();
  } catch (error) {
    logError(error instanceof Error ? error : new Error('Failed to save progress'), { progress });
  }
};

/**
 * Get existing createdAt from localStorage (if exists)
 */
function getExistingCreatedAt(): { createdAt?: string } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (isProgressV2(parsed) && parsed.createdAt) {
        return { createdAt: parsed.createdAt };
      }
    }
  } catch {
    // Ignore errors
  }
  return {};
}

/**
 * Reset progress (clear localStorage)
 */
export const resetProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    logError(error instanceof Error ? error : new Error('Failed to reset progress'), {});
  }
};

/**
 * Get default progress structure
 */
const getDefaultProgress = (): Progress => ({
  completedModules: [],
  completedTasks: {},
  quizCompleted: false,
  quizScore: null,
});

// Export migration function for testing
export { migrateV1ToV2, validateProgress, isProgressV1, isProgressV2 };
