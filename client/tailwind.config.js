/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#a3468cff",
        primaryLight: "#732b68ff",
      },
      fontFamily: {
        concertOne: ["Concert One", "sans-serif"],
        ropaSans: ["Ropa Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
