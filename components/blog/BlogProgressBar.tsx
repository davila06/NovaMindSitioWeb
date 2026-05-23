'use client'

import { useEffect, useRef, useState } from 'react'

export function BlogProgressBar() {
  const [progress, setProgress] = useState(0)
  const articleRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    articleRef.current = document.querySelector('article')

    function onScroll() {
      const article = articleRef.current
      if (!article) return
      const rect = article.getBoundingClientRect()
      const articleTop = rect.top + window.scrollY
      const articleHeight = rect.height
      const scrolled = window.scrollY - articleTop
      const pct = Math.min(Math.max((scrolled / articleHeight) * 100, 0), 100)
      setProgress(pct)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura"
    >
      <div
        className="h-full bg-gradient-to-r from-brand-violet via-brand-iris to-brand-gold transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
