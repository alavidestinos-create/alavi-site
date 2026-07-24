import type { Config } from "tailwindcss";

// Paleta extraída por amostragem de cor (Pillow) do arquivo de logo
// "ChatGPT Image 23_07_2026, 23_24_41.png" encontrado na pasta do projeto.
// Ainda assim, é uma extração de UM arquivo de logo — confirme com a versão
// final aprovada da identidade visual (todos os arquivos de marca) antes de
// considerar definitiva.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f4f8fb",
          100: "#e5eef5",
          200: "#c7daeb",
          300: "#9ebfdc",
          400: "#2c5f8a",
          500: "#215282",
          600: "#174578",
          700: "#0f386c",
          800: "#082c5f",
          900: "#032050",
          950: "#011b48",
        },
        teal: {
          50: "#effafb",
          100: "#d7f2f4",
          200: "#aee5ea",
          300: "#7ed5dd",
          400: "#29b1bd",
          500: "#259dab",
          600: "#218a9a",
          700: "#1d7788",
          800: "#196576",
          900: "#155464",
          950: "#134c5b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(3, 32, 80, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
