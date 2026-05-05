'use client'

import { useEffect } from 'react'

type ClientErrorEvent = {
  source: string
  message: string
  severity: 'error' | 'critical'
  stack?: string
  route?: string
  context?: Record<string, unknown>
}

function reportClientError(event: ClientErrorEvent) {
  const payload = {
    ...event,
    route: event.route || window.location.pathname,
  }

  const jsonPayload = JSON.stringify(payload)

  if (navigator.sendBeacon) {
    const blob = new Blob([jsonPayload], { type: 'application/json' })
    const sent = navigator.sendBeacon('/api/monitoring/error', blob)
    if (sent) return
  }

  fetch('/api/monitoring/error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonPayload,
    keepalive: true,
  }).catch(() => {
    // Avoid throwing from error reporting in the browser runtime.
  })
}

export function GlobalErrorListeners() {
  useEffect(() => {
    function onError(event: ErrorEvent) {
      reportClientError({
        source: 'frontend.window_error',
        message: event.message || 'Unhandled client error',
        severity: 'error',
        stack: event.error instanceof Error ? event.error.stack : undefined,
        context: {
          fileName: event.filename || 'unknown',
          line: event.lineno,
          column: event.colno,
        },
      })
    }

    function onUnhandledRejection(event: PromiseRejectionEvent) {
      const reason = event.reason
      if (reason instanceof Error) {
        reportClientError({
          source: 'frontend.unhandled_rejection',
          message: reason.message,
          severity: 'error',
          stack: reason.stack,
        })
        return
      }

      reportClientError({
        source: 'frontend.unhandled_rejection',
        message: typeof reason === 'string' ? reason : 'Unhandled promise rejection',
        severity: 'error',
        context: { reason },
      })
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onUnhandledRejection)

    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onUnhandledRejection)
    }
  }, [])

  return null
}
