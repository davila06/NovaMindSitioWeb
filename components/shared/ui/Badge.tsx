import { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-brand-lavender/35 bg-brand-violet/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-lavender">
      {children}
    </span>
  )
}
