import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card } from '@/components/shared/ui/Card'
import { differentiationPillars } from '@/data/site'

export function WhyNovamindSection() {
  return (
    <SectionWrapper>
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">Por que Novamind</p>
          <h2 className="mt-3 bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent sm:text-4xl">
            Construimos software empresarial IA-native para operaciones criticas
          </h2>
          <p className="mt-4 text-slate-300">
            La diferencia no está en sumar features. Está en convertir procesos complejos en plataformas claras, escalables y listas para generar valor medible.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {differentiationPillars.map((pillar) => (
            <Card key={pillar.title} className="transition hover:-translate-y-1 hover:shadow-medium">
              <h3 className="font-display text-xl text-slate-100">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
