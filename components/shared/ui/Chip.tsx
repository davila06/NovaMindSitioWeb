import { cn } from '@/lib/utils'

type ChipVariant = 'default' | 'violet' | 'gold' | 'emerald' | 'rose' | 'cyan'

const variantClasses: Record<ChipVariant, string> = {
  default:  'border-brand-lavender/25 bg-brand-card/60 text-text-muted',
  violet:   'border-brand-violet/40 bg-brand-violet/15 text-brand-lavender',
  gold:     'border-brand-gold/30 bg-brand-gold/10 text-brand-gold',
  emerald:  'border-brand-lavender/30 bg-brand-lavender/10 text-brand-lavender',
  rose:     'border-rose-500/30 bg-rose-500/10 text-rose-300',
  cyan:     'border-brand-violet/30 bg-brand-violet/10 text-brand-iris',
}

type ChipProps = {
  children: React.ReactNode
  variant?: ChipVariant
  className?: string
}

/** Badge/chip compacto para categorías, tags y etiquetas */
export function Chip({ children, variant = 'default', className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
