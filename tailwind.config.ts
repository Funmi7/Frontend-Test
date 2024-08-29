import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purple: "#5e3bee",
        black: "#0f1011",
        gray: "#fbfbfb",
        "gray-100": "#fbfbfb",
        "gray-200": "#ebeceb66",
        "gray-300": "#666",
        "gray-400": "#eae8eb",
        "black-100": "#0b0a1d",
        "black-200": "#17181a",
        "black-300": "#0f1011",
        "black-400": "#252526",
        "black-500": "#454545",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
