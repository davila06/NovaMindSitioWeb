import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { industries } from '@/lib/market'
import { createPageMetadata, siteConfig } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Industrias | Novamind Global',
  description: 'Soluciones de IA y SaaS por industria para acelerar operaciones críticas.',
  path: '/industrias',
})

export default function IndustriesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteConfig.url}/industrias`,
        url: `${siteConfig.url}/industrias`,
        name: 'Industrias | Novamind Global',
        description: 'Soluciones de IA y SaaS por industria para acelerar operaciones críticas.',
        inLanguage: 'es-CR',
        about: { '@id': `${siteConfig.url}/#organization` },
      },
      {
        '@type': 'ItemList',
        itemListElement: industries.map((industry, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: industry.title,
          description: industry.subtitle,
          url: `${siteConfig.url}/industrias/${industry.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteConfig.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Industrias', item: `${siteConfig.url}/industrias` },
        ],
      },
    ],
  }

  return (
    <SectionWrapper className="pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Container>
        <h1 className="bg-gradient-to-r from-brand-violet via-brand-lavender to-brand-gold bg-clip-text font-display text-4xl font-bold text-transparent">Industrias</h1>
        <p className="mt-3 text-text-muted">Rutas específicas para sectores con procesos complejos y necesidad de trazabilidad.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {industries.map((industry) => (
            <Link key={industry.slug} href={`/industrias/${industry.slug}`} className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-lavender/36 hover:shadow-medium">
              <h2 className="font-display text-2xl font-semibold text-[#f0f8ff]">{industry.title}</h2>
              <p className="mt-3 text-sm text-text-muted">{industry.subtitle}</p>
            </Link>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
