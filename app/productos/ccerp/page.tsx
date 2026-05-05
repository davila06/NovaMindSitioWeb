import type { Metadata } from 'next'
import { ProductPageContent } from '@/components/products/ProductPageContent'
import { productBySlug } from '@/data/products'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'CCERP | ERP Multiempresa con IA',
  description: 'Finanzas, ventas e inventario en una sola plataforma.',
  path: '/productos/ccerp',
})

export default function CcerpPage() {
  return <ProductPageContent product={productBySlug.ccerp} />
}
