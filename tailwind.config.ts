import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f6f6f7",
          100: "#e3e3e5",
          200: "#c7c7cb",
          300: "#a4a4ab",
          400: "#7e7e87",
          500: "#62626b",
          600: "#4d4d54",
          700: "#3d3d43",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        gold: {
          300: "#f3e5ab",
          400: "#e6c687",
          500: "#d4af37",
          600: "#aa8c2c",
        },
        darkBg: "#0b0c0e",
        darkSurface: "#121418",
        darkBorder: "rgba(255, 255, 255, 0.08)",
        lightBg: "#f8f9fa",
        lightSurface: "#ffffff",
        lightBorder: "rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.35em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "pulse-subtle": "pulseSubtle 3s infinite ease-in-out",
        "shimmer": "shimmer 2s infinite linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
