import { products } from '@/data/products'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Button } from '@/components/shared/ui/Button'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/lib/types'

type RelatedProductsProps = {
  currentSlug: string
}

export function RelatedProducts({ currentSlug }: RelatedProductsProps) {
  const related = products.filter((p) => p.slug !== currentSlug).slice(0, 3)

  return (
    <SectionWrapper>
      <Container>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">También puede interesarte</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-[#f0f8ff]">Más soluciones Novamind</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((product: Product) => (
            <div
              key={product.slug}
              className="flex flex-col rounded-2xl border border-brand-lavender/15 bg-brand-card/80 p-6 transition hover:border-brand-lavender/35 hover:-translate-y-1 hover:shadow-soft"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">Producto</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-[#f0f8ff]">{product.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-text-muted">{product.shortDescription}</p>
              <Button
                href={`/productos/${product.slug}`}
                variant="ghost"
                className="mt-5 gap-1.5"
              >
                Ver producto <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
