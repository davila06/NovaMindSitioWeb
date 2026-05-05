import type { Metadata } from 'next'
import { ProductPageContent } from '@/components/products/ProductPageContent'
import { productBySlug } from '@/data/products'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'MindFlow | Ventas Automatizadas y Revenue Operations',
  description: 'Captura, scoring, asignacion, seguimiento y onboarding en una sola plataforma comercial.',
  path: '/productos/mindflow',
})

export default function MindflowPage() {
  return <ProductPageContent product={productBySlug.mindflow} />
}