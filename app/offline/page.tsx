import type { Metadata } from 'next'
import Link from 'next/link'
import { ReloadButton } from './ReloadButton'

export const metadata: Metadata = {
  title: 'Sin conexión | Novamind Global',
  robots: { index: false, follow: false },
}

const quickProducts = [
  { label: 'MindFlow', href: '/productos/mindflow', desc: 'Contact center IA' },
  { label: 'PlanillasCR', href: '/productos/planillascr', desc: 'Nómina digital' },
  { label: 'CC-ERP', href: '/productos/ccerp', desc: 'ERP multiempresa' },
  { label: 'Voicebot', href: '/productos/voicebot', desc: 'Atención al cliente' },
]

export default function OfflinePage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-brand-lavender/20 bg-brand-card/80">
          <svg className="h-10 w-10 text-brand-lavender" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3l18 18M8.56 2.75c4.37-1.3 9.17-.15 12.12 3.06M3.35 7.48a11.18 11.18 0 011.56-1.87M10.71 5.05A16 16 0 0122.54 9M1.42 9a15.91 15.91 0 014.7-2.88M5.5 12.5c2.1-2.1 5.33-2.7 8-1.6M9 17c1.1-1.1 2.83-1.4 4.24-.7M12.5 21.5a.5.5 0 100-1 .5.5 0 000 1z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">Sin conexión</h1>
        <p className="mt-4 text-text-muted">
          Parece que no tienes conexión a Internet en este momento. Verifica tu red e intenta de nuevo.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ReloadButton />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-brand-lavender/20 px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-brand-lavender/40 hover:text-[#f0f8ff]"
          >
            Ir al inicio
          </Link>
        </div>

        {/* Quick product links for offline browsing of cached pages */}
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
            Productos disponibles sin conexión
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {quickProducts.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="flex flex-col items-start rounded-xl border border-brand-lavender/15 bg-brand-card/60 px-4 py-3 text-left transition hover:border-brand-lavender/30 hover:bg-brand-elevated/60"
              >
                <span className="text-sm font-semibold text-[#f0f8ff]">{p.label}</span>
                <span className="mt-0.5 text-xs text-text-muted">{p.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-text-subtle">
          Novamind Global · Costa Rica
        </p>
      </div>
    </main>
  )
}
