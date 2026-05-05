import { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-brand-interactive/35 bg-brand-interactive/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
      {children}
    </span>
  )
}
