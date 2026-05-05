import { Card } from '@/components/shared/ui/Card'

export function FeatureGrid({ items, title }: { items: string[]; title: string }) {
  return (
    <section>
      <h2 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item} className="text-sm text-slate-200">
            {item}
          </Card>
        ))}
      </div>
    </section>
  )
}
