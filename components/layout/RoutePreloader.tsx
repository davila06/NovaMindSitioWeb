'use client'

import { useEffect } from 'react'
import Router from 'next/router'

/**
 * Prefetches the top-priority routes when the browser is idle.
 * Uses requestIdleCallback (with setTimeout fallback) so it doesn't
 * block any critical rendering work.
 *
 * Only runs once on mount — no re-runs needed.
 */

const PRIORITY_ROUTES = [
  '/contacto',
  '/productos/mindflow-ai-sales-engine',
  '/productos/voicebot',
  '/productos/planillascr',
  '/blog',
  '/sobre-nosotros',
]

export function RoutePreloader() {
  useEffect(() => {
    const prefetch = () => {
      PRIORITY_ROUTES.forEach((route) => {
        try {
          // next/router prefetch works in Pages Router;
          // in App Router, <Link> handles this automatically, but
          // calling router.prefetch() for non-visible routes is still valid.
          Router.prefetch(route).catch(() => {})
        } catch { /* ignore */ }

        // Also use fetch for App Router RSC prefetch
        if ('fetch' in window) {
          fetch(route, {
            method: 'GET',
            headers: { 'Purpose': 'prefetch', 'Sec-Purpose': 'prefetch' },
          }).catch(() => {})
        }
      })
    }

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(prefetch, { timeout: 3000 })
      return () => cancelIdleCallback(id)
    } else {
      const t = setTimeout(prefetch, 2000)
      return () => clearTimeout(t)
    }
  }, [])

  return null
}
