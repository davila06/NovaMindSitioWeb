import { businessProducts } from '@/data/products'
import { siteConfig } from '@/lib/seo'

/**
 * Injects an `ItemList` + `SoftwareApplication` JSON-LD schema
 * for the full product catalog — enables Google to surface
 * individual products in rich search results.
 */
export function ProductCatalogSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Productos Novamind Global',
    description: 'Plataformas SaaS de inteligencia artificial para empresas en LATAM',
    url: `${siteConfig.url}/#productos`,
    numberOfItems: businessProducts.length,
    itemListElement: businessProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        '@id': `${siteConfig.url}/productos/${product.slug}`,
        name: product.name,
        description: product.shortDescription,
        url: `${siteConfig.url}/productos/${product.slug}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
