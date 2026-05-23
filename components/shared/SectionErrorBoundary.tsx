'use client'

import { Component, type ReactNode, type ErrorInfo } from 'react'
import { trackEvent } from '@/lib/analytics-client'

type Props = {
  children: ReactNode
  /** Optional custom fallback UI */
  fallback?: ReactNode
  /** Identifier for analytics (e.g. "HeroSection") */
  section?: string
}

type State = { hasError: boolean; errorMessage: string }

/**
 * Enterprise-grade per-section ErrorBoundary.
 * Wraps any section so a rendering crash doesn't take down the whole page.
 * Reports the error to analytics and renders a minimal fallback.
 */
export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, errorMessage: '' }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    const section = this.props.section ?? 'unknown'
    // Report to analytics
    try {
      trackEvent('section_error', {
        section,
        message: error.message,
        componentStack: info.componentStack?.slice(0, 500) ?? '',
      })
    } catch { /* analytics must never throw */ }

    // Report to monitoring endpoint (fire-and-forget)
    try {
      navigator.sendBeacon(
        '/api/monitoring/error',
        // Pass a Blob so the browser sends Content-Type: application/json
        new Blob([JSON.stringify({
          source: `section.${section}`,
          message: `[${section}] ${error.message}`,
          severity: 'error',
          stack: error.stack?.slice(0, 2000),
          route: typeof window !== 'undefined' ? window.location.pathname : '',
        })], { type: 'application/json' }),
      )
    } catch { /* ignore */ }
  }

  override render() {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback) return this.props.fallback

    return (
      <div
        role="alert"
        className="flex min-h-[120px] items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/5 px-6 py-8 text-center"
      >
        <div>
          <p className="text-sm font-semibold text-rose-400">Esta sección no pudo cargarse</p>
          <p className="mt-1 text-xs text-text-subtle">Recarga la página o contáctanos si el problema persiste.</p>
          <button
            onClick={() => this.setState({ hasError: false, errorMessage: '' })}
            className="mt-3 rounded-lg border border-rose-500/30 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }
}
