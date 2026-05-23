import { cn } from '@/lib/utils'

type SkeletonProps = {
  className?: string
}

/** Bloque shimmer animado para estados de carga */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-shimmer rounded-lg', className)}
      aria-hidden="true"
    />
  )
}

/** Stack de líneas skeleton para texto */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-3/5' : 'w-full'}`} />
      ))}
    </div>
  )
}

/** Card skeleton completa */
export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-brand-lavender/15 bg-brand-card/60 p-6">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="mt-4 h-5 w-2/3" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  )
}

