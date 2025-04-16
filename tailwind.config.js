/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <- 👈 Agrega esta línea
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
