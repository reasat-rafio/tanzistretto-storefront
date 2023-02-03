/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {
      colors: {
        "pastel-blue": "#B7C4CF",
        almond: "#EEE3CB",
        "dark-vanilla": "#D7C0AE",
        cinereous: "#967E76",
        alabaster: "#edece9",
        primary: "#1c1c1c",
        secondary: "#a18565",
      },
      fontFamily: {
    
        "body": ["Basis Grotesque Pro Light", "sans-serif"],
        title: ["Canela Web", "Spectral", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
