import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { roles } from '@/lib/market'
import { createPageMetadata, siteConfig } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Roles | Novamind Global',
  description: 'Soluciones IA por rol de liderazgo para maximizar impacto operativo y de negocio.',
  path: '/roles',
})

export default function RolesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteConfig.url}/roles`,
        url: `${siteConfig.url}/roles`,
        name: 'Soluciones por rol | Novamind Global',
        description: 'Soluciones IA por rol de liderazgo para maximizar impacto operativo y de negocio.',
        inLanguage: 'es-CR',
        about: { '@id': `${siteConfig.url}/#organization` },
      },
      {
        '@type': 'ItemList',
        itemListElement: roles.map((role, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: role.title,
          description: role.subtitle,
          url: `${siteConfig.url}/roles/${role.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteConfig.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Roles', item: `${siteConfig.url}/roles` },
        ],
      },
    ],
  }

  return (
    <SectionWrapper className="pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Container>
        <h1 className="bg-gradient-to-r from-brand-violet via-brand-lavender to-brand-gold bg-clip-text font-display text-4xl font-bold text-transparent">Soluciones por rol</h1>
        <p className="mt-3 text-text-muted">Recomendaciones enfocadas en prioridades de CEOs, COOs y líderes operativos.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {roles.map((role) => (
            <Link key={role.slug} href={`/roles/${role.slug}`} className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-lavender/36 hover:shadow-medium">
              <h2 className="font-display text-2xl font-semibold text-[#f0f8ff]">{role.title}</h2>
              <p className="mt-3 text-sm text-text-muted">{role.subtitle}</p>
            </Link>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
