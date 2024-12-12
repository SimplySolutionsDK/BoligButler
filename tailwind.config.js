/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7fa',
          100: '#ebeef5',
          200: '#d8dfe9',
          300: '#b8c4d9',
          400: '#92a3c4',
          500: '#7485af',
          600: '#5c6b97',
          700: '#4c577a',
          800: '#424b66',
          900: '#3a4156',
          950: '#262939',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
