'use client'

import { ReactNode } from 'react'

type ModalProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-brand-interactive/22 bg-slate-900/85 p-6 text-slate-100 shadow-elevated">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-xl text-transparent">{title}</h3>
          <button onClick={onClose} className="text-sm text-slate-300">Cerrar</button>
        </div>
        {children}
      </div>
    </div>
  )
}
