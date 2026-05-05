import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { products } from '@/data/products'
import { Card } from '@/components/shared/ui/Card'
import { Button } from '@/components/shared/ui/Button'
import { Bot, Landmark, Building2, ShieldCheck, PawPrint, TrendingUp, Workflow } from 'lucide-react'

const iconMap = {
  voicebot: Bot,
  planillascr: Landmark,
  ccerp: Building2,
  mindflow: TrendingUp,
  'mindflow-ai-sales-engine': Workflow,
  iads: ShieldCheck,
  pawtrack: PawPrint,
}

export function ProductGrid() {
  return (
    <SectionWrapper id="productos">
      <Container>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Portafolio de productos</p>
          <h2 className="mt-2 bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">Soluciones diseñadas para operaciones reales</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = iconMap[product.slug as keyof typeof iconMap]
            return (
              <Card key={product.slug} className="group flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-medium">
                <div>
                  <Icon className="h-7 w-7 text-brand-accent" />
                  <h3 className="mt-4 font-display text-xl text-slate-100">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-300">{product.shortDescription}</p>
                </div>
                <Button
                  href={`/productos/${product.slug}`}
                  className="mt-6 w-fit"
                  trackingContext={{
                    page: 'home',
                    section: 'product_grid',
                    ctaLabel: product.slug === 'pawtrack' ? 'descargar_gratis' : 'ver_producto',
                    destination: `/productos/${product.slug}`,
                    product: product.slug,
                    intent: product.slug === 'pawtrack' ? 'download' : 'explore',
                  }}
                >
                  {product.slug === 'pawtrack' ? 'Descargar gratis' : 'Ver como funciona'}
                </Button>
              </Card>
            )
          })}
        </div>
      </Container>
    </SectionWrapper>
  )
}
