module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {},
      colors: {
        "extra-rough-soft-black": "#050505",
        "rough-soft-black": "#0d0d0d",
        "soft-black": "#171717",
        "light-soft-black": "#282828",
        "extra-light-soft-black": "#363636",
        "2xl-extra-light-soft-black": "#424242",
        "pretty-light-gray": "#e5e7eb",
        "pretty-light-pink": "#f78dc5",
        "pretty-pink": "#f472b6",
        "pretty-rough-pink": "#e011b4",
        "pretty-yellow": "#FCBA28",
        "pretty-rough-yellow": "#f3a83c",
        "pretty-red": "#f25852",
        "pretty-rough-red": "#f03e37",
      },
      screens: {
        "2xs": "320px",
        xs: "425px",
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
