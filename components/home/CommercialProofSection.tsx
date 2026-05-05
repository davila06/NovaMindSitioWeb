import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card } from '@/components/shared/ui/Card'
import { clientLogoWall, miniCaseStudies, quantifiedOutcomes } from '@/data/site'

export function CommercialProofSection() {
  return (
    <SectionWrapper>
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">Evidencia de valor</p>
          <h2 className="mt-3 bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent sm:text-4xl">
            Resultados medibles, no promesas de marketing
          </h2>
          <p className="mt-4 text-slate-300">
            Esta capa de prueba comercial acelera decisiones enterprise: impacto cuantificado, casos resumidos y señales de confianza para stakeholders ejecutivos.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quantifiedOutcomes.map((item) => (
            <Card key={item.label} className="border-brand-interactive/20 bg-slate-900/72">
              <p className="font-display text-4xl text-brand-surface">{item.metric}</p>
              <p className="mt-2 text-sm font-semibold text-slate-200">{item.label}</p>
              <p className="mt-2 text-xs text-slate-400">{item.context}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="font-display text-2xl text-slate-100">Mini casos de referencia</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {miniCaseStudies.map((item) => (
              <Card key={item.segment} className="border-brand-interactive/20 bg-slate-900/72">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">{item.segment}</p>
                <p className="mt-3 text-sm text-slate-300">
                  <span className="font-semibold text-slate-100">Reto:</span> {item.challenge}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="font-semibold text-slate-100">Solución:</span> {item.solution}
                </p>
                <p className="mt-3 rounded-xl border border-brand-interactive/18 bg-slate-950/72 px-3 py-2 text-sm font-medium text-brand-surface">
                  Resultado: {item.result}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-accent">Confianza de compradores</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {clientLogoWall.map((logo) => (
              <div
                key={logo}
                className="rounded-xl border border-brand-interactive/16 bg-slate-950/72 px-4 py-3 text-center text-sm font-medium text-slate-200"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
