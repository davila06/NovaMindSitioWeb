'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    const payload = {
      source: 'frontend.global_error_boundary',
      message: error.message,
      severity: 'critical',
      stack: error.stack,
      context: {
        digest: error.digest,
      },
    }

    fetch('/api/monitoring/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Avoid throwing from the global error boundary itself.
    })
  }, [error])

  return (
    <html lang="es">
      <body className="bg-slate-950 p-8 text-slate-100">
        <main className="mx-auto mt-16 max-w-2xl rounded-2xl border border-rose-400/30 bg-slate-900/85 p-8 shadow-elevated">
          <h1 className="font-display text-3xl">Error crítico de aplicación</h1>
          <p className="mt-3 text-slate-300">
            El equipo fue notificado automáticamente. Intenta recargar o vuelve en unos minutos.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-xl border border-brand-interactive/30 bg-brand-interactive/20 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-brand-interactive/30"
          >
            Reintentar
          </button>
        </main>
      </body>
    </html>
  )
}
