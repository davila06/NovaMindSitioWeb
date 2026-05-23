'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Command } from 'lucide-react'

const shortcuts = [
  { key: '?', description: 'Mostrar/ocultar atajos de teclado' },
  { key: 'Escape', description: 'Cerrar diálogos y menús' },
  { key: 'G + I', description: 'Ir al inicio (home)' },
  { key: 'G + P', description: 'Ir a productos' },
  { key: 'G + B', description: 'Ir al blog' },
  { key: 'G + C', description: 'Ir a contacto' },
  { key: 'G + D', description: 'Ir a demos' },
]

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)
  const pendingKey = useRef('')

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (e.key === '?') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        return
      }

      // G + X navigation shortcuts
      if (e.key.toLowerCase() === 'g') {
        pendingKey.current = 'g'
        return
      }
      if (pendingKey.current === 'g') {
        pendingKey.current = ''
        const nav: Record<string, string> = { i: '/', p: '/productos', b: '/blog', c: '/contacto', d: '/demos' }
        const dest = nav[e.key.toLowerCase()]
        if (dest) window.location.href = dest
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Atajos de teclado"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-void/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm rounded-3xl border border-brand-lavender/20 bg-brand-card/95 p-6 shadow-elevated backdrop-blur-xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="h-4 w-4 text-brand-lavender" />
            <h2 className="font-display text-base font-semibold text-[#f0f8ff]">Atajos de teclado</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted transition hover:bg-brand-lavender/10 hover:text-[#f0f8ff]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="space-y-2">
          {shortcuts.map((s) => (
            <li key={s.key} className="flex items-center justify-between gap-4">
              <span className="text-sm text-text-muted">{s.description}</span>
              <kbd className="shrink-0 rounded-md border border-brand-lavender/20 bg-brand-elevated px-2 py-0.5 font-mono text-xs text-brand-lavender">
                {s.key}
              </kbd>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-center text-xs text-text-subtle">
          Presiona <kbd className="rounded border border-brand-lavender/20 bg-brand-elevated px-1 font-mono text-[10px] text-brand-lavender">?</kbd> para cerrar
        </p>
      </div>
    </div>
  )
}
