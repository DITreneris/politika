import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure we're in the project root
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    // Only include tests in the src directory (relative to project root)
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.idea/**',
      '**/.git/**',
      '**/.cache/**',
      '**/.cursor/**',
      '**/.vscode/**',
      // Exclude system directories that might contain test files
      '**/AppData/**',
      '**/Local Settings/**',
      '**/Desktop/**',
      '**/Local/**',
      // Exclude anything outside project root
      '**/../**',
      // Exclude Cursor/VS Code extension directories
      '**/.cursor/extensions/**',
      '**/.vscode/extensions/**',
      '**/AppData/Local/Programs/**',
      '**/Local Settings/Programs/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/',
        '**/coverage/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
