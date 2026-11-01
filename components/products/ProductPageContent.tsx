import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { AudienceGrid } from '@/components/products/AudienceGrid'
import { DifferentiatorGrid } from '@/components/products/DifferentiatorGrid'
import { FeatureGrid } from '@/components/products/FeatureGrid'
import { FAQAccordion } from '@/components/products/FAQAccordion'
import { IntegrationsCloud } from '@/components/products/IntegrationsCloud'
import { ProductCTA } from '@/components/products/ProductCTA'
import { ProductHero } from '@/components/products/ProductHero'
import { ProductVideoSection } from '@/components/products/ProductVideoSection'
import { ScreenshotShowcase } from '@/components/products/ScreenshotShowcase'
import { RelatedProducts } from '@/components/products/RelatedProducts'
import { ProductDemoBar } from '@/components/products/ProductDemoBar'
import { Breadcrumb } from '@/components/shared/ui/Breadcrumb'
import { Product } from '@/lib/types'
import { siteConfig } from '@/lib/seo'
import { commercialEvidenceEnabled } from '@/data/site'

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
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[
            { label: 'Inicio', href: '/' },
            { label: 'Productos', href: '/#productos' },
            { label: product.name },
          ]} />
        </div>
      </div>
      <ProductHero product={product} />
      <SectionWrapper>
        <Container className="space-y-16">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-soft">
              <h2 className="font-display text-2xl font-bold text-[#f0f8ff]">Problema</h2>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                {product.problem.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-violet/30 bg-brand-violet/10 p-6 shadow-soft">
              <h2 className="font-display text-2xl font-bold text-[#f0f8ff]">Solución</h2>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                {product.solution.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <AudienceGrid items={product.audiences} />
          {commercialEvidenceEnabled && (
            <FeatureGrid title="Beneficios" items={product.benefits} />
          )}
          {product.demoVideoId && (
            <ProductVideoSection
              videoId={product.demoVideoId}
              title={`Demo: ${product.name}`}
              description="Ve el producto en acción — sin registro requerido."
            />
          )}
          <FeatureGrid title="Features principales" items={product.features} />
          <DifferentiatorGrid items={product.differentiators} />
          <IntegrationsCloud items={product.integrations} />
          <ScreenshotShowcase product={product} />
          <FAQAccordion items={product.faq} />
          <ProductCTA name={product.name} />
        </Container>
      </SectionWrapper>
      <RelatedProducts currentSlug={product.slug} />
      {product.slug !== 'pawtrack' && <ProductDemoBar productName={product.name} />}
    </>
  )
}
