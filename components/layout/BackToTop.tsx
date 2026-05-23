'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollTop}
      aria-label="Volver al inicio de la página"
      className={`fixed bottom-24 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-brand-lavender/30 bg-brand-card/90 text-brand-lavender shadow-soft backdrop-blur-xl transition-all duration-300 hover:border-brand-violet hover:bg-brand-elevated hover:text-brand-iris md:bottom-10 md:right-6 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  )
}
