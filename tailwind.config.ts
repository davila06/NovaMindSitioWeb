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
          // ── Bases midnight signal ─────────────────────
          void: "#060b16",
          surface: "#0b1730",
          card: "#102242",
          elevated: "#173058",
          // ── Naranja dominante ─────────────────────────
          violet: "#ea580c",
          iris: "#fb923c",
          lavender: "#7dd3fc",
          cobalt: "#38bdf8",
          azure: "#0ea5e9",
          // ── Naranja cálido complementario ─────────────
          gold: "#f97316",
          goldLight: "#fdba74",
          // ── Azul profundo ─────────────────────────────
          indigo: "#1d4ed8",
          // ── Legado (compatibilidad) ────────────────────
          deep: "#1e40af",
          teal: "#0284c7",
          cta: "#ea580c",
          accent: "#7dd3fc",
          interactive: "#38bdf8",
          energy: "#f97316",
          danger: "#ef4444",
          mist: "#102242",
          surface2: "#eff6ff",
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
        violet: "0 0 28px rgba(249, 115, 22, 0.45)",
        "violet-lg": "0 0 48px rgba(56, 189, 248, 0.45)",
      },
      borderRadius: {
        xl: "0.95rem",
        "2xl": "1.25rem",
      },
      backgroundImage: {
        glow: "radial-gradient(ellipse 80% 50% at 10% 0%, rgba(249,115,22,0.30), transparent 60%), radial-gradient(ellipse 60% 40% at 90% 5%, rgba(14,165,233,0.22), transparent 50%)",
        grid: "linear-gradient(to right, rgba(56,189,248,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.10) 1px, transparent 1px)",
        "brand-gradient": "linear-gradient(135deg, #ea580c, #fb923c, #38bdf8)",
        "gold-gradient": "linear-gradient(135deg, #f97316, #fdba74)",
        "futurist-gradient": "linear-gradient(135deg, #060b16, #0b1730)",
        "energy-gradient": "linear-gradient(135deg, #ea580c, #38bdf8)",
        "hero-gradient": "linear-gradient(135deg, #ea580c, #fb923c, #38bdf8)",
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
