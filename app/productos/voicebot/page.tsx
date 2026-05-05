import type { Metadata } from 'next'
import { ProductPageContent } from '@/components/products/ProductPageContent'
import { productBySlug } from '@/data/products'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'VoiceBot Multi-Tenant | Contact Center con IA',
  description: 'Omnicanalidad, automatizacion y atencion inteligente.',
  path: '/productos/voicebot',
})

export default function VoicebotPage() {
  return <ProductPageContent product={productBySlug.voicebot} />
}
