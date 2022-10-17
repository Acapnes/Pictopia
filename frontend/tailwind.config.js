module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "soft-black": "#171717",
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
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
