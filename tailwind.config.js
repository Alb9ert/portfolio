/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["PP Neue Montreal", "sans-serif"],
      },
      colors: {
        arcade: "#57ac77",
        arcadegreen: "#ac6457d0",
      },
    },
  },
  plugins: [],
};
