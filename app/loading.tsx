import { Container } from '@/components/layout/Container'

export default function Loading() {
  return (
    <Container className="py-20">
      <div
        role="status"
        aria-label="Cargando contenido"
        aria-live="polite"
        className="mx-auto max-w-4xl space-y-6 animate-pulse"
      >
        {/* Hero skeleton */}
        <div className="h-3 w-24 rounded-full bg-brand-elevated" />
        <div className="h-10 w-3/4 rounded-xl bg-brand-elevated" />
        <div className="h-10 w-1/2 rounded-xl bg-brand-card" />
        <div className="mt-2 space-y-2">
          <div className="h-4 w-full rounded-lg bg-brand-card" />
          <div className="h-4 w-5/6 rounded-lg bg-brand-card" />
        </div>
        {/* Card skeletons */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-brand-lavender/10 bg-brand-card/60 p-6">
              <div className="h-9 w-9 rounded-xl bg-brand-elevated" />
              <div className="mt-4 h-4 w-2/3 rounded bg-brand-elevated" />
              <div className="mt-2 h-3 w-full rounded bg-brand-card" />
              <div className="mt-1 h-3 w-4/5 rounded bg-brand-card" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

