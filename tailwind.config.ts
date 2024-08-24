import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        FadeIn: "FadeIn",
      },
      keyframes: {
        FadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            "li::marker": {
              color: "#d90077"
            },
          },
        },
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        CustomTheme: {
          primary: "#4c00b0",
          secondary: "#d90077",
          accent: "#00bfa5",
          neutral: "#ffcc00",
          "base-100": "#f4f4f4",
          "base-200": "#000000",
          "info-content": "#2e2e3a",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#4c00b0",
          secondary: "#d90077",
          accent: "#00bfa5",
          neutral: "#ffcc00",
          "base-100": "#000000",
          "base-200": "#f4f4f4",
          "info-content": "#2e2e3a",
        },
      },
      "light",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
export default config;
