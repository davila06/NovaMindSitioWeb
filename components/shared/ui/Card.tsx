import { ReactNode } from 'react'

type CardVariant = 'default' | 'featured' | 'metric'

type CardProps = {
  children: ReactNode
  className?: string
  variant?: CardVariant
  /** Número ordinal decorativo (ej. "01") */
  ordinal?: string
}

const variantStyles: Record<CardVariant, string> = {
  default:  'overflow-hidden rounded-2xl border border-brand-lavender/15 bg-brand-card/80 p-6 shadow-soft backdrop-blur',
  featured: 'overflow-hidden rounded-2xl border border-brand-violet/40 bg-gradient-to-b from-brand-elevated/90 to-brand-card/90 p-6 shadow-[inset_0_1px_0_rgba(167,139,250,0.12)] shadow-medium backdrop-blur',
  metric:   'rounded-2xl border border-brand-gold/25 bg-brand-elevated/40 p-8 text-center backdrop-blur',
}

export function Card({ children, className = '', variant = 'default', ordinal }: CardProps) {
  return (
    <div className={`relative ${variantStyles[variant]} ${className}`}>
      {ordinal && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-2 select-none font-display text-[5rem] font-bold leading-none text-brand-lavender opacity-[0.06]"
        >
          {ordinal}
        </span>
      )}
      {children}
    </div>
  )
}
