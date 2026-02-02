/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Safelist for dynamic classes used in SlideContent.tsx
  safelist: [
    // Background colors
    {
      pattern: /bg-(rose|orange|amber|emerald|brand|violet|cyan|fuchsia)-(50|100|200|800|900)/,
      variants: ['dark'],
    },
    // Text colors
    {
      pattern: /text-(rose|orange|amber|emerald|brand|violet|cyan|fuchsia)-(300|400|600|700|800|900)/,
      variants: ['dark'],
    },
    // Border colors
    {
      pattern: /border-(rose|orange|amber|emerald|brand|violet|cyan|fuchsia)-(200|300|500|700|800)/,
      variants: ['dark'],
    },
  ],
  theme: {
    extend: {
      colors: {
        // Navy blue - trust, expertise, professionalism (like consulting firms)
        brand: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0a1929',
        },
        // Gold - achievement, premium, success (like business awards)
        accent: {
          50: '#fdfaf3',
          100: '#faf0d7',
          200: '#f5e1ae',
          300: '#efd07c',
          400: '#e6bc4a',
          500: '#d4a520',
          600: '#b8860b',
          700: '#966d09',
          800: '#7a5807',
          900: '#644806',
          950: '#3d2c04',
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
