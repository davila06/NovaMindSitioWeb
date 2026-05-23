import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MarketPageLayout } from '@/components/shared/MarketPageLayout'
import { industries, industryBySlug } from '@/lib/market'
import { createPageMetadata, siteConfig } from '@/lib/seo'

type IndustryPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params
  const industry = industryBySlug[slug]

  if (!industry) {
    return createPageMetadata({
      title: 'Industrias | Novamind Global',
      description: 'Soluciones IA para industrias con operaciones complejas.',
      path: '/industrias',
    })
  }

  return createPageMetadata({
    title: `${industry.title} | Novamind Global`,
    description: industry.subtitle,
    path: `/industrias/${industry.slug}`,
  })
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params
  const industry = industryBySlug[slug]

  if (!industry) {
    notFound()
  }

  const industryUrl = `${siteConfig.url}/industrias/${industry.slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: industry.title,
        description: industry.subtitle,
        url: industryUrl,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: ['Costa Rica', 'LATAM'],
        serviceType: 'AI and SaaS enterprise solutions',
        inLanguage: 'es-CR',
        offers: {
          '@type': 'Offer',
          url: `${siteConfig.url}/contacto`,
          description: 'Solicita una demo o diagnóstico operativo gratuito',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'WebPage',
        '@id': industryUrl,
        url: industryUrl,
        name: `${industry.title} | Novamind Global`,
        description: industry.subtitle,
        inLanguage: 'es-CR',
        breadcrumb: { '@id': `${industryUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${siteConfig.url}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Industrias',
            item: `${siteConfig.url}/industrias`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: industry.title,
            item: industryUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MarketPageLayout page={industry} />
    </>
  )
}
