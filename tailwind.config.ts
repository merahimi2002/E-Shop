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
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        synthwave: {
          ...require("daisyui/src/theming/themes")["synthwave"],
          primary: "#3d50d0",
          secondary: "#8032ba",
        },
      },
      {
        winter: {
          ...require("daisyui/src/theming/themes")["winter"],
        },
      },
    ],
  },
};
export default config;
