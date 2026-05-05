import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { implementationSteps } from '@/data/site'

export function ImplementationSection() {
  return (
    <SectionWrapper>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">Como implementamos</p>
            <h2 className="mt-3 bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent sm:text-4xl">
              De la oportunidad operativa a una ventaja competitiva real
            </h2>
            <p className="mt-4 text-slate-300">
              Nuestro proceso prioriza claridad, adopción y resultados. No se trata de vender humo con IA: se trata de integrarla donde realmente mejora la operación.
            </p>
          </div>
          <div className="grid gap-4">
            {implementationSteps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-5 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent via-brand-interactive to-brand-teal text-sm font-semibold text-slate-950">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-slate-100">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
