/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Asegúrate de usar 'class' si activas el modo oscuro manualmente
  content: [
    // Example content paths...
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {},

  },
  plugins: [],
  variants: {
    extend: {
      colors: {
        primary: {
          light: "#f3f4f6", // Color claro
          dark: "#1f2937", // Color oscuro
        },
        text: {
          light: "#1f2937",
          dark: "#f3f4f6",
        },
      },
    },
  },
};
