'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { CalendarDays, X } from 'lucide-react'

type ProductDemoBarProps = {
  productName: string
}

export function ProductDemoBar({ productName }: ProductDemoBarProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    function onScroll() {
      if (!dismissed && window.scrollY > 600) setVisible(true)
      else if (window.scrollY <= 600) setVisible(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  if (dismissed) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-brand-lavender/20 bg-brand-surface/97 backdrop-blur-2xl transition-transform duration-300 md:bottom-0 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 shrink-0 text-brand-lavender" aria-hidden="true" />
          <p className="text-sm font-semibold text-[#f0f8ff]">
            <span className="hidden sm:inline">¿Listo para ver {productName} en acción? </span>
            Agenda tu demo de 30 minutos
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button href="/contacto" className="text-xs">
            Agendar ahora
          </Button>
          <button
            onClick={() => { setVisible(false); setDismissed(true) }}
            aria-label="Cerrar barra de demo"
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:text-[#f0f8ff] transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
