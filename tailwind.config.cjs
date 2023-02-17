/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#1D818C",
        "dark-purple-light": "#BEFBFF",
        "light-white": "rgba(255, 255, 255, 0.17)",
        "my-brown": "#852500",
      },
      container: {
        center: true,
        padding: "1.5rem",
      },
      gridTemplateColumns: {
        gridAutoFit: "repeat(auto-fit, minmax(300px, 1fr))",
      },
      boxShadow: {
        myshadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
    },
  },
  plugins: [],
};
