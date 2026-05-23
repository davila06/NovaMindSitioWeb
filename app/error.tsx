'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { captureClientError } from '@/lib/monitoring'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    captureClientError({
      source: 'frontend.error_boundary',
      message: error.message,
      severity: 'error',
      stack: error.stack,
      route: window.location.pathname,
      context: { digest: error.digest },
    })
  }, [error])

  return (
    <div className="mx-auto mt-20 max-w-2xl px-4" role="alert" aria-live="assertive">
      <div className="rounded-3xl border border-rose-500/25 bg-brand-card/90 p-10 text-center shadow-elevated backdrop-blur-xl">
        {/* Brand mark */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10">
          <svg className="h-8 w-8 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-[#f0f8ff]">Ocurrió un error inesperado</h2>
        <p className="mt-3 text-text-muted">Estamos monitoreando esta falla automáticamente. Puedes intentar de nuevo ahora.</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-violet px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-iris"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-brand-lavender/20 px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-brand-lavender/40 hover:text-[#f0f8ff]"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
