import { Container } from '@/components/layout/Container'
import { trustBadges } from '@/data/site'

export function TrustBar() {
  return (
    <div className="py-4">
      <Container>
        <div className="grid gap-3 rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-4 shadow-soft sm:grid-cols-2 xl:grid-cols-4">
          {trustBadges.map((badge) => (
            <div key={badge} className="rounded-xl border border-brand-interactive/16 bg-slate-950/72 px-4 py-3 text-center text-sm font-medium text-slate-200">
              {badge}
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
