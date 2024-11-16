/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hitam': '#09090B',
        'secondary': '#18181B',
        'abutua': '#242427',
        'abumuda': '#5D5D65',
        'ungu': '#8474DB',
        'kuning': '#ECB423',
        'oren': '#F59E0B'
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'], // Menjadikan Be Vietnam Pro sebagai font sans default
      },
    },
  },
  plugins: [],
}