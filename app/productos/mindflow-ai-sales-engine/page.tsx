import type { Metadata } from 'next'
import { ProductPageContent } from '@/components/products/ProductPageContent'
import { productBySlug } from '@/data/products'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'MindFlow AI Sales Engine | AI Sales Engine Enterprise',
  description: 'Revenue execution end-to-end con arquitectura event-driven, reglas, automatizacion y gobierno SaaS.',
  path: '/productos/mindflow-ai-sales-engine',
})

export default function MindflowAiSalesEnginePage() {
  return <ProductPageContent product={productBySlug['mindflow-ai-sales-engine']} />
}
