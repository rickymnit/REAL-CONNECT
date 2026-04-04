import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: "#D4A574",
          50: "#FAF5F0",
          100: "#F5EBE0",
          200: "#EBD6C0",
          300: "#E0C1A0",
          400: "#D4A574",
          500: "#C48A54",
          600: "#A67040",
          700: "#855830",
          800: "#644020",
          900: "#432810",
        },
        secondary: {
          DEFAULT: "#7A9E7E",
          50: "#F0F5F1",
          100: "#E1EBE3",
          200: "#C3D7C7",
          300: "#A5C3AB",
          400: "#7A9E7E",
          500: "#5A7E5E",
          600: "#4A6E4E",
          700: "#3A5E3E",
          800: "#2A4E2E",
          900: "#1A3E1E",
        },
        accent: {
          DEFAULT: "#8B4557",
          50: "#F5F0F2",
          100: "#EBE0E4",
          200: "#D7C1C9",
          300: "#C3A2AE",
          400: "#8B4557",
          500: "#6B3543",
          600: "#5B2533",
          700: "#4B1523",
          800: "#3B0513",
          900: "#2B0003",
        },
        // Background colors
        cream: {
          DEFAULT: "#FAF9F6",
          50: "#FFFFFF",
          100: "#FAF9F6",
          200: "#F5F0E8",
          300: "#F0E8DC",
        },
        // Text colors
        charcoal: {
          DEFAULT: "#2D2D2D",
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#6B6B6B",
          600: "#4D4D4D",
          700: "#2D2D2D",
          800: "#1A1A1A",
          900: "#0D0D0D",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
