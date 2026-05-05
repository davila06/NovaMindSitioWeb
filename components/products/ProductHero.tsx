import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Badge } from '@/components/shared/ui/Badge'
import { Product } from '@/lib/types'

export function ProductHero({ product }: { product: Product }) {
  return (
    <SectionWrapper className="pb-8 pt-12">
      <Container>
        <div className="grid gap-8 rounded-3xl border border-brand-interactive/20 bg-gradient-futurist p-6 shadow-elevated lg:grid-cols-[1fr_0.9fr] lg:p-8">
          <div>
            <Badge>Producto Novamind</Badge>
            <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.06] tracking-[-0.03em] text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text">
              {product.heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{product.heroSubtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {product.audiences.map((item) => (
                <span key={item} className="rounded-full border border-brand-interactive/35 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-brand-interactive/25 bg-slate-950/85 p-6 text-white shadow-elevated">
            <p className="text-sm text-slate-300">Indicadores de valor</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {product.heroStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-brand-interactive/20 bg-brand-interactive/10 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</p>
                  <p className="mt-2 font-display text-3xl text-brand-surface">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
