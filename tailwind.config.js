/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefdfc',
          100: '#fdf9f7',
          200: '#fbf2ed',
          300: '#f8e8e0',
          400: '#f4d9cc',
          500: '#f8ae9c',
          600: '#f15e3a',
          700: '#d94a2a',
          800: '#b53d24',
          900: '#933424',
        },
        secondary: {
          50: '#fefef9',
          100: '#fdfde8',
          200: '#fbfbc5',
          300: '#f7f79e',
          400: '#f2f275',
          500: '#ecdd20',
          600: '#d4c219',
          700: '#b0a314',
          800: '#8c8212',
          900: '#736a14',
        },
        accent: {
          50: '#f0fdfb',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#9bd2c4',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        }
      }
    },
  },
  plugins: [],
} 