import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          void: "var(--color-navy-950)",
          surface: "var(--color-navy-900)",
          card: "var(--color-navy-800)",
          elevated: "#152b49",
          violet: "var(--color-blue-600)",
          iris: "var(--color-blue-700)",
          lavender: "var(--color-cyan-400)",
          cobalt: "var(--color-blue-700)",
          azure: "var(--color-blue-600)",
          gold: "var(--color-cyan-400)",
          goldLight: "var(--color-cyan-100)",
          indigo: "var(--color-blue-700)",
          deep: "var(--color-blue-700)",
          teal: "var(--color-cyan-400)",
          cta: "var(--color-blue-600)",
          accent: "var(--color-cyan-400)",
          interactive: "var(--color-blue-600)",
          energy: "var(--color-cyan-400)",
          danger: "#ef4444",
          mist: "var(--color-navy-800)",
          surface2: "var(--color-blue-100)",
        },
        ui: {
          dark: "#060b16",
          card: "#102242",
          soft: "#eff6ff",
        },
        text: {
          primary: "#eff6ff",
          muted: "#9cb3d9",
          subtle: "#93a7c4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-sora)"],
        serif: ["var(--font-playfair)"],
      },
      boxShadow: {
        soft: "0 12px 30px rgba(3, 8, 18, 0.45)",
        medium: "0 18px 45px rgba(3, 8, 18, 0.55)",
        elevated: "0 24px 72px rgba(3, 8, 18, 0.70)",
        violet: "0 0 28px rgba(11, 99, 246, 0.30)",
        "violet-lg": "0 0 48px rgba(25, 195, 255, 0.28)",
      },
      borderRadius: {
        xl: "0.95rem",
        "2xl": "1.25rem",
      },
      backgroundImage: {
        glow: "radial-gradient(ellipse 80% 50% at 10% 0%, rgba(11,99,246,0.2), transparent 60%), radial-gradient(ellipse 60% 40% at 90% 5%, rgba(25,195,255,0.14), transparent 50%)",
        grid: "linear-gradient(to right, rgba(25,195,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(25,195,255,0.10) 1px, transparent 1px)",
        "brand-gradient": "linear-gradient(135deg, #084EC1, #0B63F6, #19C3FF)",
        "gold-gradient": "linear-gradient(135deg, #0B63F6, #DFF7FF)",
        "futurist-gradient": "linear-gradient(135deg, #07111F, #0B172A)",
        "energy-gradient": "linear-gradient(135deg, #084EC1, #19C3FF)",
        "hero-gradient": "linear-gradient(135deg, #084EC1, #0B63F6, #19C3FF)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 32s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
