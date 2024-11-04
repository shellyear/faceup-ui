/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightblue: "#0e9af7",
        darkblue: "#0b88db"
      },
    },
  },
  plugins: [require("daisyui")],
};
