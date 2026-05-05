import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { AudienceGrid } from '@/components/products/AudienceGrid'
import { DifferentiatorGrid } from '@/components/products/DifferentiatorGrid'
import { FeatureGrid } from '@/components/products/FeatureGrid'
import { FAQAccordion } from '@/components/products/FAQAccordion'
import { IntegrationsCloud } from '@/components/products/IntegrationsCloud'
import { ProductCTA } from '@/components/products/ProductCTA'
import { ProductHero } from '@/components/products/ProductHero'
import { ScreenshotShowcase } from '@/components/products/ScreenshotShowcase'
import { Product } from '@/lib/types'
import { siteConfig } from '@/lib/seo'

export function ProductPageContent({ product }: { product: Product }) {
  const productUrl = `${siteConfig.url}/productos/${product.slug}`
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
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
            name: 'Productos',
            item: `${siteConfig.url}/#productos`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: product.name,
        description: product.shortDescription,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: productUrl,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
        featureList: product.features,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ProductHero product={product} />
      <SectionWrapper>
        <Container className="space-y-16">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-6 shadow-soft">
              <h2 className="font-display text-2xl text-slate-100">Problema</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {product.problem.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-interactive/24 bg-brand-interactive/10 p-6 shadow-soft">
              <h2 className="font-display text-2xl text-slate-100">Solucion</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {product.solution.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <AudienceGrid items={product.audiences} />
          <FeatureGrid title="Beneficios" items={product.benefits} />
          <FeatureGrid title="Features principales" items={product.features} />
          <DifferentiatorGrid items={product.differentiators} />
          <IntegrationsCloud items={product.integrations} />
          <ScreenshotShowcase product={product} />
          <FAQAccordion items={product.faq} />
          <ProductCTA name={product.name} />
        </Container>
      </SectionWrapper>
    </>
  )
}
