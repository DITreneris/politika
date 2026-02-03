import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { useAutoSave, loadAutoSave, clearAutoSave } from '../useAutoSave';

// Setup localStorage mock if not available
const setupLocalStorage = () => {
  if (typeof localStorage === 'undefined') {
    const store: Record<string, string> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).localStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach(key => delete store[key]);
      },
      get length() {
        return Object.keys(store).length;
      },
      key: (index: number) => {
        const keys = Object.keys(store);
        return keys[index] || null;
      },
    };
  }
};

// Setup Storage prototype if not available
const setupStorage = () => {
  if (typeof Storage === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).Storage = class Storage {
      private store: Record<string, string> = {};
      getItem(key: string) { return this.store[key] || null; }
      setItem(key: string, value: string) { this.store[key] = value.toString(); }
      removeItem(key: string) { delete this.store[key]; }
      clear() { this.store = {}; }
      get length() { return Object.keys(this.store).length; }
      key(index: number) { return Object.keys(this.store)[index] || null; }
    };
  }
};

// Test wrapper component for useAutoSave hook
function TestComponent({ storageKey, value, delay }: { storageKey: string; value: unknown; delay?: number }) {
  useAutoSave(storageKey, value, delay);
  return null;
}

describe('useAutoSave', () => {
  beforeEach(() => {
    setupLocalStorage();
    setupStorage();
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    vi.useFakeTimers();
    // Mock console methods
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    vi.restoreAllMocks();
  });

  describe('useAutoSave hook', () => {
    it('should save value to localStorage after delay', () => {
      const { unmount } = render(
        React.createElement(TestComponent, { storageKey: 'test-key', value: 'test-value', delay: 1000 })
      );

      expect(localStorage.getItem('test-key')).toBeNull();

      // Fast-forward time
      vi.advanceTimersByTime(1000);

      // With fake timers, the effect should have run synchronously
      expect(localStorage.getItem('test-key')).toBe(JSON.stringify('test-value'));

      unmount();
    });

    it('should debounce saves (only save once for rapid changes)', () => {
      const { rerender, unmount } = render(
        React.createElement(TestComponent, { storageKey: 'test-key', value: 'value1', delay: 1000 })
      );

      // Change value multiple times quickly
      rerender(React.createElement(TestComponent, { storageKey: 'test-key', value: 'value2', delay: 1000 }));
      rerender(React.createElement(TestComponent, { storageKey: 'test-key', value: 'value3', delay: 1000 }));
      rerender(React.createElement(TestComponent, { storageKey: 'test-key', value: 'value4', delay: 1000 }));

      // Fast-forward time
      vi.advanceTimersByTime(1000);

      // Should only save the last value
      expect(localStorage.getItem('test-key')).toBe(JSON.stringify('value4'));

      unmount();
    });

    it('should not save undefined values', () => {
      const { unmount } = render(
        React.createElement(TestComponent, { storageKey: 'test-key', value: undefined, delay: 1000 })
      );

      vi.advanceTimersByTime(1000);

      expect(localStorage.getItem('test-key')).toBeNull();

      unmount();
    });

    it('should not save null values', () => {
      const { unmount } = render(
        React.createElement(TestComponent, { storageKey: 'test-key', value: null, delay: 1000 })
      );

      vi.advanceTimersByTime(1000);

      expect(localStorage.getItem('test-key')).toBeNull();

      unmount();
    });

    it('should not save empty string values', () => {
      const { unmount } = render(
        React.createElement(TestComponent, { storageKey: 'test-key', value: '', delay: 1000 })
      );

      vi.advanceTimersByTime(1000);

      expect(localStorage.getItem('test-key')).toBeNull();

      unmount();
    });

    it('should cleanup timeout on unmount', () => {
      const { unmount } = render(
        React.createElement(TestComponent, { storageKey: 'test-key', value: 'value', delay: 1000 })
      );

      unmount();

      vi.advanceTimersByTime(1000);

      // Should not save after unmount
      expect(localStorage.getItem('test-key')).toBeNull();
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage.setItem to throw error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = vi.fn(() => {
        throw new Error('Quota exceeded');
      });

      const { unmount } = render(
        React.createElement(TestComponent, { storageKey: 'test-key', value: 'value', delay: 1000 })
      );

      vi.advanceTimersByTime(1000);

      // Should not throw, just log warning
      // With fake timers, this should happen synchronously
      expect(console.warn).toHaveBeenCalled();

      // Restore
      localStorage.setItem = originalSetItem;
      unmount();
    });
  });

  describe('loadAutoSave', () => {
    beforeEach(() => {
      // Ensure we're using real timers for these tests
      vi.useRealTimers();
      // Clear any mocks from previous tests
      vi.restoreAllMocks();
      // Reset localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
      // Restore original Storage methods
      vi.restoreAllMocks();
    });

    it('should load saved value from localStorage', () => {
      localStorage.setItem('test-key', JSON.stringify('saved-value'));

      const result = loadAutoSave('test-key', 'default-value');

      expect(result).toBe('saved-value');
    });

    it('should return default value when key does not exist', () => {
      const result = loadAutoSave('non-existent-key', 'default-value');

      expect(result).toBe('default-value');
    });

    it('should return default value when JSON is invalid', () => {
      localStorage.setItem('test-key', 'invalid json{');

      const result = loadAutoSave('test-key', 'default-value');

      expect(result).toBe('default-value');
    });

    it('should handle complex objects', () => {
      const complexObject = {
        name: 'test',
        items: [1, 2, 3],
        nested: { value: 'nested' },
      };

      localStorage.setItem('test-key', JSON.stringify(complexObject));

      const result = loadAutoSave('test-key', {});

      expect(result).toEqual(complexObject);
    });
  });

  describe('clearAutoSave', () => {
    it('should remove key from localStorage', () => {
      localStorage.setItem('test-key', JSON.stringify('value'));

      clearAutoSave('test-key');

      expect(localStorage.getItem('test-key')).toBeNull();
    });

    it('should handle errors gracefully', () => {
      // Mock localStorage.removeItem to throw error
      const originalRemoveItem = Storage.prototype.removeItem;
      Storage.prototype.removeItem = vi.fn(() => {
        throw new Error('Storage error');
      });

      // Should not throw
      expect(() => clearAutoSave('test-key')).not.toThrow();

      // Restore
      Storage.prototype.removeItem = originalRemoveItem;
    });
  });
});
