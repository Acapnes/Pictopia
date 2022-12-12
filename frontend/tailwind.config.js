module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        header_height: "5.2rem",
      },
      colors: {
        "rough-soft-black": "#0d0d0d",
        "soft-black": "#171717",
        "light-soft-black": "#282828",
        "extra-light-soft-black": "#363636",
        "2xl-extra-light-soft-black": "#424242",
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
