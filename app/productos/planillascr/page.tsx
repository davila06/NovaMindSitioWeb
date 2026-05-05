import type { Metadata } from 'next'
import { ProductPageContent } from '@/components/products/ProductPageContent'
import { productBySlug } from '@/data/products'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'PlanillasCR | Nomina y RRHH Costa Rica',
  description: 'Cumplimiento legal y automatizacion de planillas.',
  path: '/productos/planillascr',
})

export default function PlanillasPage() {
  return <ProductPageContent product={productBySlug.planillascr} />
}
