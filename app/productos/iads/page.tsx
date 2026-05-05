import type { Metadata } from 'next'
import { ProductPageContent } from '@/components/products/ProductPageContent'
import { productBySlug } from '@/data/products'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'IAsistente Digital de Servicios - IADS | Seguros, Cobros y Reclamos Inteligentes',
  description: 'Gestion integral de polizas, cobros, reclamos y trazabilidad operativa.',
  path: '/productos/iads',
})

export default function IadsPage() {
  return <ProductPageContent product={productBySlug.iads} />
}
