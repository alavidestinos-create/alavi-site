import type { Config } from "tailwindcss";

// Paleta premium ALAVI: navy profundo + teal elegante, com neutros quentes
// (areia/off-white) para respiro visual e um dourado usado apenas em
// detalhes pontuais (nunca como cor de fundo dominante).
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
        sand: {
          50: "#fdfbf7",
          100: "#f8f2e8",
          200: "#efe3cd",
          300: "#e1cea6",
          400: "#cdb27a",
        },
        gold: {
          400: "#c6a15b",
          500: "#b08d43",
          600: "#93753a",
        },
        cream: "#fbf9f4",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(3, 32, 80, 0.10)",
        premium: "0 12px 40px -12px rgba(3, 32, 80, 0.18)",
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        reveal: "reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
