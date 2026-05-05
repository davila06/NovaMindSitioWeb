'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    const payload = {
      source: 'frontend.error_boundary',
      message: error.message,
      severity: 'error',
      stack: error.stack,
      route: window.location.pathname,
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
      // Avoid throwing from the error boundary itself.
    })
  }, [error])

  return (
    <div className="mx-auto mt-20 max-w-2xl rounded-2xl border border-rose-400/30 bg-slate-900/85 p-8 text-slate-100 shadow-elevated">
      <h2 className="font-display text-2xl">Ocurrió un error inesperado</h2>
      <p className="mt-3 text-slate-300">Estamos monitoreando esta falla. Puedes intentar de nuevo en este momento.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-xl border border-brand-interactive/30 bg-brand-interactive/20 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-brand-interactive/30"
      >
        Reintentar
      </button>
    </div>
  )
}
