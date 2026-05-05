import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return <div className={`rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-6 shadow-soft backdrop-blur ${className}`}>{children}</div>
}
