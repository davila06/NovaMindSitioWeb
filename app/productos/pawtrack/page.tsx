import type { Metadata } from 'next'
import { ProductPageContent } from '@/components/products/ProductPageContent'
import { productBySlug } from '@/data/products'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Mi Mascotica | Descarga gratuita para encontrar mascotas',
  description: 'App gratuita con QR y matching visual para reunificar mascotas.',
  path: '/productos/pawtrack',
})

export default function PawtrackPage() {
  return <ProductPageContent product={productBySlug.pawtrack} />
}
