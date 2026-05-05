import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Novamind Global',
  url: 'https://novamindglobal.com',
  defaultOgImage: '/opengraph-image',
  defaultTwitterImage: '/twitter-image',
  locale: 'es_CR',
}

export const keywords = [
  'IA para empresas Costa Rica',
  'SaaS Costa Rica',
  'ERP con IA',
  'Software de planillas',
  'Contact center IA',
]

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = `${siteConfig.url}${path}`
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} | IA aplicada a los negocios`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.defaultTwitterImage],
    },
    alternates: {
      canonical: path,
    },
  }
}
