module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        header_height: "5.2rem",
      },
      colors: {
        "soft-black": "#171717",
        "light-soft-black": "#282828",
        "rough-soft-black": "#0d0d0d",
        "pretty-pink": "#f472b6",
        "pretty-rough-pink": "#e011b4",
        "pretty-yellow": "#FCBA28",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2160px",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
