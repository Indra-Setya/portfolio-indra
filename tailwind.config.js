/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#0B0D12',
          surfaceDark: '#12151C',
          surfaceHoverDark: '#171B24',
          borderDark: 'rgba(255, 255, 255, 0.08)',
          light: '#FAFAF9',
          surfaceLight: '#FFFFFF',
          surfaceHoverLight: '#F4F4F5',
          borderLight: 'rgba(15, 23, 42, 0.08)',
        },
        accent: {
          DEFAULT: '#5B6CFF', // Indigo Accent
          hover: '#4A5AE8',
          light: '#5B6CFF',
          muted: 'rgba(91, 108, 255, 0.1)',
          border: 'rgba(91, 108, 255, 0.25)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        control: '8px',
        card: '16px',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
