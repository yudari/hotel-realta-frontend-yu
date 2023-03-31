/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        disabled: "#D4D2D5",
        primary: "#2563EB",
        "primary-hover": "#1D4ED8",
        secondary: "#3CB474",
        "secondary-hover": "#2A8A57",
        danger: "#D51A52",
        "danger-hover": "#B41545",
        "danger-secondary": "#B43C3C",
        "danger-secondary-hover": "#981F1F",
        black: "#13293D",
        variant: "#4B5563",
        "variant-hover": "#374151",
      },
    },
  },
  plugins: [],
};
