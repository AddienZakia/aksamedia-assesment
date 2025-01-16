/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        darkBlue: {
          main: "#0081BD",
          hover: "#075E87",
        },
        lightBlue: "#E4F7FE",
        darkMode: {
          main: "#041c32",
          surface: "#1c2d42",
          hover: "#39475b",
          typo: "#939aa6",
        },
      },
    },
  },
  plugins: [],
};
