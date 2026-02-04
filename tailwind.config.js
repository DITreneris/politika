/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Optimized safelist - only classes actually used in SlideContent.tsx
  // This reduces CSS bundle size significantly
  safelist: [
    // Background colors - only specific shades used
    'bg-rose-50', 'bg-rose-100', 'bg-rose-500', 'dark:bg-rose-900/10', 'dark:bg-rose-900/20', 'dark:bg-rose-900/30',
    'bg-orange-50', 'bg-orange-100', 'bg-orange-500', 'dark:bg-orange-900/20', 'dark:bg-orange-900/30',
    'bg-amber-100', 'bg-amber-500', 'dark:bg-amber-900/30',
    'bg-emerald-50', 'bg-emerald-100', 'bg-emerald-500', 'dark:bg-emerald-900/10', 'dark:bg-emerald-900/20', 'dark:bg-emerald-900/30',
    'bg-brand-50', 'bg-brand-100', 'bg-brand-500', 'dark:bg-brand-900/20', 'dark:bg-brand-900/30',
    'bg-violet-50', 'bg-violet-100', 'bg-violet-500', 'dark:bg-violet-900/20', 'dark:bg-violet-900/30',
    'bg-cyan-50', 'dark:bg-cyan-900/20',
    'bg-fuchsia-50', 'dark:bg-fuchsia-900/20',
    'bg-accent-50', 'dark:bg-accent-900/20',
    // Text colors - only specific shades used
    'text-rose-300', 'text-rose-400', 'text-rose-600', 'text-rose-700', 'text-rose-800', 'text-rose-900', 'dark:text-rose-100', 'dark:text-rose-200', 'dark:text-rose-300', 'dark:text-rose-400',
    'text-orange-300', 'text-orange-700', 'text-orange-900', 'dark:text-orange-100', 'dark:text-orange-300',
    'text-amber-300', 'text-amber-700', 'dark:text-amber-300',
    'text-emerald-300', 'text-emerald-400', 'text-emerald-600', 'text-emerald-700', 'dark:text-emerald-300', 'dark:text-emerald-400',
    'text-brand-300', 'text-brand-700', 'text-brand-900', 'dark:text-brand-100', 'dark:text-brand-300',
    'text-violet-300', 'text-violet-600', 'text-violet-700', 'text-violet-800', 'dark:text-violet-200', 'dark:text-violet-300', 'dark:text-violet-400',
    'text-cyan-300', 'text-cyan-700', 'dark:text-cyan-300',
    'text-fuchsia-300', 'text-fuchsia-700', 'dark:text-fuchsia-300',
    // Border colors - only specific shades used
    'border-rose-200', 'border-rose-300', 'border-rose-500', 'border-rose-800',
    'border-orange-500',
    'border-amber-500',
    'border-emerald-200', 'border-emerald-300', 'border-emerald-500', 'border-emerald-700', 'border-emerald-800',
    'border-brand-200', 'border-brand-300', 'border-brand-500', 'border-brand-700', 'border-brand-800',
    'border-violet-300', 'border-violet-500', 'border-violet-700', 'border-violet-800',
    'border-cyan-300', 'border-cyan-700',
    'border-fuchsia-300', 'border-fuchsia-700',
    'border-accent-200', 'border-accent-800',
  ],
  theme: {
    extend: {
      colors: {
        // EU blue - trust, governance, institutional clarity
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#b8dcff',
          300: '#86c4ff',
          400: '#4ba3ff',
          500: '#1f7aff',
          600: '#145fe6',
          700: '#114bba',
          800: '#123f96',
          900: '#133877',
          950: '#0b214b',
        },
        // EU yellow - accent for highlights, CTAs and status
        accent: {
          50: '#fffbea',
          100: '#fff3c4',
          200: '#ffe58a',
          300: '#ffd24d',
          400: '#ffbe1a',
          500: '#f2a900',
          600: '#d98a00',
          700: '#b36a00',
          800: '#8f5200',
          900: '#754300',
          950: '#432500',
        },
        // Slate for neutral UI elements
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'celebrate': 'celebrate 0.6s ease-out',
        'confetti': 'confetti 1s ease-out forwards',
        'check-pop': 'checkPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'progress-fill': 'progressFill 1s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        celebrate: {
          '0%': { transform: 'scale(0) rotate(-45deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(10deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(720deg)', opacity: '0' },
        },
        checkPop: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        progressFill: {
          '0%': { strokeDashoffset: '226' },
          '100%': { strokeDashoffset: 'var(--progress-offset)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
