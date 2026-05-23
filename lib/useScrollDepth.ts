'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics-client'

const MILESTONES = [25, 50, 75, 100] as const

/**
 * Fires analytics events at 25 / 50 / 75 / 100% scroll depth.
 * Uses IntersectionObserver on sentinel elements so it doesn't
 * hurt performance with scroll event listeners.
 */
export function useScrollDepth(pagePath?: string) {
  const firedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    firedRef.current.clear()
    const sentinels: HTMLElement[] = []

    for (const pct of MILESTONES) {
      const sentinel = document.createElement('div')
      sentinel.setAttribute('aria-hidden', 'true')
      sentinel.style.cssText = `position:absolute;left:0;width:1px;height:1px;pointer-events:none;`
      sentinel.dataset.depthSentinel = String(pct)
      document.body.appendChild(sentinel)

      // Position sentinel at pct% of document height
      const setTop = () => {
        const docH = document.documentElement.scrollHeight
        sentinel.style.top = `${Math.floor(docH * (pct / 100))}px`
      }
      setTop()

      const ro = new ResizeObserver(setTop)
      ro.observe(document.body)

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting && !firedRef.current.has(pct)) {
            firedRef.current.add(pct)
            trackEvent('scroll_depth', {
              percent: pct,
              page: pagePath ?? window.location.pathname,
            })
          }
        },
        { threshold: 0 },
      )
      io.observe(sentinel)

      sentinels.push(sentinel)
    }

    return () => {
      sentinels.forEach((s) => {
        try { s.parentNode?.removeChild(s) } catch { /* ignore */ }
      })
    }
  }, [pagePath])
}
