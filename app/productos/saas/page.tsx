import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Button } from '@/components/shared/ui/Button'
import { Badge } from '@/components/shared/ui/Badge'
import { createPageMetadata, siteConfig } from '@/lib/seo'
import { businessProducts } from '@/data/products'
import { commercialEvidenceEnabled } from '@/data/site'
import { Check, Zap } from 'lucide-react'

export const metadata: Metadata = createPageMetadata({
  title: 'Plataformas empresariales | Novamind Global',
  description: 'Explora plataformas de Novamind para automatización empresarial, ventas, nómina, ERP y atención con IA.',
  path: '/productos/saas',
  extraKeywords: [
    'SaaS empresarial Costa Rica',
    'software nómina Costa Rica',
    'ERP SaaS Costa Rica',
    'contact center IA',
    'software empresarial Costa Rica',
  ],
})

// ─── Evaluation criteria to confirm for each product ────────────────────────
const evaluationCriteria = [
  'Alcance funcional según las necesidades de la operación',
  'Licencias e implementación cotizadas por separado',
  'Canales de soporte y niveles de servicio acordados por contrato',
  'Disponibilidad, integraciones y requisitos técnicos por confirmar',
  'Plan de adopción definido durante el diagnóstico',
  'Condiciones comerciales documentadas en la propuesta',
]

export default function SaasPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteConfig.url}/productos/saas`,
        url: `${siteConfig.url}/productos/saas`,
        name: 'Plataformas empresariales | Novamind Global',
        description: 'Plataformas SaaS empresariales y sus casos de uso.',
        inLanguage: 'es-CR',
        about: { '@id': `${siteConfig.url}/#organization` },
      },
      {
        '@type': 'ItemList',
        itemListElement: businessProducts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.name,
          description: p.shortDescription,
          url: `${siteConfig.url}/productos/${p.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteConfig.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Productos', item: `${siteConfig.url}/#productos` },
          { '@type': 'ListItem', position: 3, name: 'SaaS', item: `${siteConfig.url}/productos/saas` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <SectionWrapper className="pb-8 pt-14">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge>Apps SaaS IA-native</Badge>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-[#f0f8ff] sm:text-5xl">
              Encuentra la plataforma adecuada para tu operación
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              Plataformas empresariales con condiciones, disponibilidad y
              acompañamiento definidos según el producto y el alcance acordado.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                href="/contacto"
                trackingContext={{ page: 'saas', section: 'hero', ctaLabel: 'consultar_producto', destination: '/contacto', intent: 'demo' }}
                className="btn-cta-pulse"
              >
                Consultar un producto
              </Button>
              <Button
                href="/contacto"
                variant="ghost"
                trackingContext={{ page: 'saas', section: 'hero', ctaLabel: 'consultar_disponibilidad_demo_saas', destination: '/contacto', intent: 'contact' }}
              >
                Consultar disponibilidad de demo
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Evaluation criteria ──────────────────────────────────────── */}
      <SectionWrapper className="py-8" aria-label="Aspectos por definir para cada plataforma">
        <Container>
          <div className="rounded-2xl border border-brand-lavender/20 bg-brand-card/60 px-6 py-7">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-brand-gold" aria-hidden="true" />
              <span className="text-sm font-semibold text-brand-gold uppercase tracking-[0.14em]">Qué definimos para cada plataforma</span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {evaluationCriteria.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                  <Check className="h-4 w-4 shrink-0 text-brand-lavender" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Product cards ─────────────────────────────────────────────── */}
      <SectionWrapper id="apps" aria-labelledby="apps-heading">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Catálogo SaaS</p>
            <h2 id="apps-heading" className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              Elige la app que tu negocio necesita
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-muted">
              Consulta el alcance, disponibilidad, estado y condiciones de cada producto. Las licencias y los servicios de implementación se cotizan por separado.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {businessProducts.map((product) => (
              <div
                key={product.slug}
                className="group flex flex-col rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand-lavender/40 hover:shadow-medium"
              >
                <h3 className="font-display text-lg font-semibold text-[#f0f8ff]">{product.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{product.shortDescription}</p>

                {/* Key stats */}
                {commercialEvidenceEnabled && product.heroStats.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.heroStats.slice(0, 2).map(({ label, value }) => (
                      <span
                        key={label}
                        className="inline-flex items-baseline gap-1 rounded-full bg-brand-violet/15 px-3 py-1 text-xs"
                      >
                        <span className="font-bold text-brand-lavender">{value}</span>
                        <span className="text-text-muted">{label}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Benefits preview */}
                <ul className="mt-4 space-y-1.5">
                  {product.benefits.slice(0, 3).map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-lavender" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex gap-2">
                  <Link
                    href={`/contacto?plan=saas-${product.slug}`}
                    className="flex-1 rounded-2xl bg-brand-violet px-4 py-2.5 text-center text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-iris"
                  >
                    Consultar
                  </Link>
                  <Link
                    href={`/productos/${product.slug}`}
                    className="rounded-2xl border border-brand-lavender/40 px-4 py-2.5 text-sm font-semibold text-brand-lavender transition-all duration-200 hover:bg-brand-lavender/8"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <SectionWrapper className="py-14">
        <Container>
          <div className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 px-8 py-10 text-center shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">¿No sabes por dónde empezar?</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff]">
              Coordina una conversación inicial
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-muted">
              Revisamos tu contexto operativo y te orientamos sobre el alcance, la disponibilidad y las condiciones de la plataforma adecuada.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                href="/contacto"
                trackingContext={{ page: 'saas', section: 'bottom-cta', ctaLabel: 'diagnostico_saas', destination: '/contacto', intent: 'demo' }}
              >
                Solicitar diagnóstico
              </Button>
              <Button
                href="/empresas"
                variant="ghost"
                trackingContext={{ page: 'saas', section: 'bottom-cta', ctaLabel: 'ver_servicios_empresariales', destination: '/empresas', intent: 'explore' }}
              >
                ¿Necesitas servicios TI? → Empresas
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  )
}
