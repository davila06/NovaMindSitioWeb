import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useCases } from '@/data/site'
import { Card } from '@/components/shared/ui/Card'

export function UseCasesSection() {
  return (
    <SectionWrapper>
      <Container>
        <h2 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">Casos de uso por segmento</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => (
            <Card key={item.title}>
              <h3 className="font-semibold text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
