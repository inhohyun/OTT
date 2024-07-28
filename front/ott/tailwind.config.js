/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#fee500",
        black: "#000",
        gray: "#242424",
      },
      spacing: {},
      fontFamily: {
        "reggae-one": "'Reggae One'",
        "zen-kaku-gothic-antique": "'Zen Kaku Gothic Antique'",
      },
    },
    fontSize: {
      inherit: "inherit",
      xxs: "0.625rem",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
