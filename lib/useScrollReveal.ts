'use client'

import { useEffect, useRef, type RefObject } from 'react'

type Options = {
  threshold?: number
  rootMargin?: string
  /** Once = trigger once and disconnect (default: true) */
  once?: boolean
}

/**
 * Adds `data-revealed="true"` to the referenced element when it enters
 * the viewport. Pair with the `.reveal` CSS class in globals.css.
 *
 * Respects `prefers-reduced-motion` — skips animation when motion is reduced.
 *
 * Usage:
 *   const ref = useScrollReveal<HTMLDivElement>()
 *   <div ref={ref} className="reveal"> ... </div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: Options = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const { threshold = 0.12, rootMargin = '0px 0px -40px 0px', once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip if reduced-motion preferred — mark as immediately visible
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.revealed = 'true'
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.dataset.revealed = 'true'
          if (once) io.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}
