import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MarketPageLayout } from '@/components/shared/MarketPageLayout'
import { roleBySlug, roles } from '@/lib/market'
import { createPageMetadata, siteConfig } from '@/lib/seo'

type RolePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }))
}

export async function generateMetadata({ params }: RolePageProps): Promise<Metadata> {
  const { slug } = await params
  const role = roleBySlug[slug]

  if (!role) {
    return createPageMetadata({
      title: 'Roles | Novamind Global',
      description: 'Soluciones IA por rol de liderazgo para organizaciones enterprise.',
      path: '/roles',
    })
  }

  return createPageMetadata({
    title: `${role.title} | Novamind Global`,
    description: role.subtitle,
    path: `/roles/${role.slug}`,
  })
}

export default async function RoleDetailPage({ params }: RolePageProps) {
  const { slug } = await params
  const role = roleBySlug[slug]

  if (!role) {
    notFound()
  }

  const roleUrl = `${siteConfig.url}/roles/${role.slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: role.title,
        description: role.subtitle,
        url: roleUrl,
        about: 'AI enterprise software',
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
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
            name: 'Roles',
            item: `${siteConfig.url}/roles`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: role.title,
            item: roleUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MarketPageLayout page={role} />
    </>
  )
}
