/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "pastel-blue": "#B7C4CF",
        almond: "#EEE3CB",
        "dark-vanilla": "#D7C0AE",
        cinereous: "#967E76",
      },
    },
  },
  plugins: [],
};
