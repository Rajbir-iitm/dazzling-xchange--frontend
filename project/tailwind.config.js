import { theme } from './src/theme/theme.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        accent: theme.colors.accent,
        neutral: theme.colors.neutral,
        success: theme.colors.success,
        warning: theme.colors.warning,
        error: theme.colors.error,
        info: theme.colors.info,
        // Keep existing brand colors for backwards compatibility
        brand: {
          50: '#E6FFF4',
          100: '#C9FFE9', 
          200: '#99FFD4',
          300: '#66FFBF',
          400: '#33FFA9',
          500: '#16d68f', // Main brand color (matches existing site)
          600: '#14c07f',
          700: '#12a66f',
          800: '#0f8a5e',
          900: '#0d6e4e',
        },
      },
      fontFamily: {
        primary: theme.typography.fontFamily.primary,
        mono: theme.typography.fontFamily.mono
      },
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      lineHeight: theme.typography.lineHeight,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      boxShadow: {
        ...theme.shadows,
        'glow-primary': `0 0 20px ${theme.colors.primary}30`
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.3s ease-out forwards'
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};
