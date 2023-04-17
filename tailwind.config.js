/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/ComponentsYudha/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        disabled: "#D4D2D5",
        primary: "#13293D",
        "primary-hover": "#071F34",
        secondary: "#3CB474",
        "secondary-hover": "#2A8A57",
        danger: "#D51A52",
        "danger-hover": "#B41545",
        "danger-secondary": "#B43C3C",
        "danger-secondary-hover": "#981F1F",
        black: "#13293D",
        variant: "#4B5563",
        "variant-hover": "#374151",
        gray: {
          100: "#fafbfc",
          200: "#877768",
          300: "#79747e",
          400: "#1c1b1f",
          500: "#0b1f30",
          600: "#0d1e2e",
          700: "#0b1c2b",
          800: "#06121a",
          900: "rgba(0, 0, 0, 0.45)",
        },
        darkslategray: { 100: "#374151", 200: "#13293D", 300: "#13293d" },
        white: "#FFFFFF",
        neutrals: "#fff",
        gainsboro: {
          100: "#E0E5EC",
          200: "#e0e5ec",
          300: "rgba(224, 229, 236, 0.5)",
        },
        black: "#000",
        lightcoral: "#FF8692",
        dimgray: "#5d5145",
        crimson: "#ff2048",
        seagreen: "#2a8a57",
        slamon: "#ff8682",
        brown: "#b43c3c",
        mediumseagreen: "#3cb474",
        "grayscale-black": "#1a141f",
        "grayscale-spacer-light": "#e5e0eb",
        "grayscale-border": "#aba7af",
        "blackish-green": "#112211",
        beige: "#c8e0c8",
        "mint-green": "#8dd3bb",
        "gray-200": "#eaecf0",
        "gray-50": "#f9fafb",
        "gray-500": "#667085",
        "gray-900": "#101828",
        "gray-300": "#d0d5dd",
        "gray-800": "#1d2939",
        "gray-700": "#344054",
        darkorchid: "#CC2BD2",
        ffff: "#ffff",
        steelblue: "#2c5072",
        fontFamily: {
          "body-txt-body-s-regular": "Poppins",
          "montserrat-semibold-14": "Montserrat",
          "yeseva-one": "Yeseva One",
          inherit: "inherit",
          "text-sm-normal": "Inter",
        },
        // borderRadius: { "81xl": "100px", lg: "18px", xl: "20px" },
        // fontSize: {
        //   sm: "14px",
        //   base: "16px",
        //   "5xs": "8px",
        //   lg: "18px",
        //   xl: "20px",
        //   "31xl": "50px",
        //   "5xl": "24px",
        //   xs: "12px",
        //   "3xl": "22px",
        //   "25xl": "44px",
        //   "19xl": "38px",
        //   "21xl": "40px",
        //   "17xl": "36px",
        //   "9xl": "28px",
        //   "13xl": "32px",
        //   "7xl": "26px",
        // },
        screens: {
          yu_lg: { max: "1200px" },
          yu_md: { max: "960px" },
          yu_sm: { max: "420px" },
          yu_mq720: { raw: "screen and (max-width: 720px)" },
        },
      },
    },
    plugins: [require("flowbite/plugin"), require("@tailwindcss/forms")],
    // corePlugins: { preflight: false },
  },
};
