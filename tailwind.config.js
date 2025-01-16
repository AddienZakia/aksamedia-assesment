/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        darkBlue: {
          main: "#0081BD",
          hover: "#075E87",
        },
        lightBlue: "#E4F7FE",
      },
    },
  },
  plugins: [],
};
