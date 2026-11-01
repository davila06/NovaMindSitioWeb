import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Button } from '@/components/shared/ui/Button'
import { MarketPage } from '@/lib/market'

export function MarketPageLayout({ page }: { page: MarketPage }) {
  return (
    <>
      <SectionWrapper className="pt-12">
        <Container>
          <div className="rounded-2xl border border-brand-interactive/22 bg-slate-900/78 p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">Solucion por segmento</p>
            <h1 className="mt-3 bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-4xl text-transparent sm:text-5xl">{page.title}</h1>
            <p className="mt-4 max-w-3xl text-slate-300">{page.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href="/contacto"
                trackingContext={{
                  page: `market/${page.slug}`,
                  section: 'market_hero',
                  ctaLabel: 'consultar_disponibilidad',
                  destination: '/contacto',
                  intent: 'contact',
                }}
              >
                Consultar disponibilidad
              </Button>
              <Button
                href="/"
                variant="ghost"
                trackingContext={{
                  page: `market/${page.slug}`,
                  section: 'market_hero',
                  ctaLabel: 'volver_inicio',
                  destination: '/',
                  intent: 'navigation',
                }}
              >
                Volver al inicio
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-6 shadow-soft">
            <h2 className="font-display text-2xl text-slate-100">Retos frecuentes</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {page.problemPoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-interactive/24 bg-brand-interactive/10 p-6 shadow-soft">
            <h2 className="font-display text-2xl text-slate-100">Resultados esperados</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {page.valuePoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container>
          <div className="rounded-2xl border border-brand-interactive/22 bg-slate-900/78 p-6 shadow-soft">
            <h2 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">Productos recomendados</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {page.recommendedProducts.map((product) => (
                <Link key={product.href} href={product.href} className="rounded-2xl border border-brand-interactive/20 bg-slate-950/68 p-5 transition hover:-translate-y-1 hover:border-brand-interactive/36 hover:shadow-medium">
                  <p className="font-display text-xl text-slate-100">{product.name}</p>
                  <p className="mt-2 text-sm text-slate-300">Ver como esta solucion se adapta a este contexto operativo.</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  )
}
