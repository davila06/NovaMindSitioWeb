'use client'

import { useEffect, useRef, useState } from 'react'

type RevealVariant = 'slide-up' | 'fade-in' | 'scale-in'

/**
 * Activa una clase de animación CSS cuando el elemento entra en viewport.
 * @param variant  tipo de animación (default: 'slide-up')
 * @param threshold  porcentaje visible antes de disparar (default: 0.15)
 */
export function useReveal(variant: RevealVariant = 'slide-up', threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const animClass = revealed ? `reveal-${variant}` : 'opacity-0'

  return { ref, animClass, revealed }
}
