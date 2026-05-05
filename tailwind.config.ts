import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#2B2E83',
          teal: '#2F7ED8',
          cta: '#F97316',
          accent: '#5BC0EB',
          interactive: '#38BDF8',
          energy: '#FACC15',
          danger: '#EF4444',
          mist: '#1E293B',
          surface: '#F8FAFC',
        },
        ui: {
          dark: '#0F172A',
          card: '#1E293B',
          soft: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-sora)'],
      },
      boxShadow: {
        soft: '0 12px 30px rgba(15, 23, 42, 0.22)',
        medium: '0 18px 45px rgba(15, 23, 42, 0.28)',
        elevated: '0 24px 72px rgba(15, 23, 42, 0.4)',
      },
      borderRadius: {
        xl: '0.95rem',
        '2xl': '1.25rem',
      },
      backgroundImage: {
        glow: 'radial-gradient(circle at top right, rgba(91, 192, 235, 0.18), transparent 45%), radial-gradient(circle at bottom left, rgba(249, 115, 22, 0.18), transparent 42%)',
        grid: 'linear-gradient(to right, rgba(56,189,248,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.14) 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(135deg, #2B2E83, #2F7ED8, #5BC0EB)',
        'energy-gradient': 'linear-gradient(135deg, #FACC15, #F97316, #EF4444)',
        'futurist-gradient': 'linear-gradient(135deg, #0F172A, #1E293B)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
