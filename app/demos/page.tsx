import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Button } from '@/components/shared/ui/Button'
import { createPageMetadata } from '@/lib/seo'
import { ArrowUpRight, Layers3 } from 'lucide-react'
import { businessProducts } from '@/data/products'

export const metadata: Metadata = createPageMetadata({
  title: 'Explora las plataformas | Novamind Global',
  description: 'Consulta las plataformas empresariales de Novamind y solicita información sobre la disponibilidad de una demostración.',
  path: '/demos',
})

export default function DemosPage() {
  return (
    <>
      <SectionWrapper className="pt-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">Plataformas Novamind</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-[-0.03em] text-[#f0f8ff] sm:text-5xl">
              Explora las soluciones
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              Revisa el alcance descrito para cada plataforma. La disponibilidad
              y el formato de una demostración se confirman al solicitarla.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {businessProducts.map((product) => (
              <div
                key={product.slug}
                className="group flex flex-col rounded-2xl border border-brand-lavender/18 bg-brand-card/80 p-6 transition hover:-translate-y-1 hover:shadow-violet"
              >
                <div className="relative mb-5 flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-brand-lavender/15 bg-brand-void/80">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-lavender/25 bg-brand-violet/20">
                    <Layers3 className="h-6 w-6 text-brand-lavender" aria-hidden="true" />
                  </div>
                  <span className="absolute right-3 top-3 rounded-full bg-brand-void/80 px-2 py-0.5 text-[10px] font-medium text-text-muted">
                    Plataforma
                  </span>
                </div>

                <h2 className="font-display text-xl font-bold text-[#f0f8ff]">{product.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-text-muted">{product.shortDescription}</p>

                <div className="mt-5 flex gap-2">
                  <Button href={`/productos/${product.slug}`} className="flex-1 text-center">
                    Explorar plataforma
                  </Button>
                  <Button
                    href={`/contacto?plan=saas-${product.slug}`}
                    variant="ghost"
                    className="flex-1"
                  >
                    Consultar
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA final */}
          <div className="mt-12 rounded-2xl border border-brand-violet/30 bg-brand-violet/10 p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-[#f0f8ff]">
              ¿Quieres consultar una demostración?
            </h2>
            <p className="mt-3 text-text-muted">
              Cuéntanos qué necesitas evaluar y confirmaremos la disponibilidad y el formato posible.
            </p>
            <Button href="/contacto" className="mt-6">
              Consultar disponibilidad <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    </>
  )
}
