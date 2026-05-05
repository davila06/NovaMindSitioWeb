import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card } from '@/components/shared/ui/Card'
import { Tabs } from '@/components/shared/ui/Tabs'
import { trustCenterItems } from '@/data/site'

const tabs = [
  {
    label: 'Arquitectura',
    content: 'Diseñamos soluciones que conviven con tu stack actual, integran procesos críticos y escalan por unidad, empresa o línea de negocio.',
  },
  {
    label: 'Gobierno',
    content: 'Priorizamos control operativo con permisos, auditoría de eventos y estructuras que soportan trazabilidad y supervisión.',
  },
  {
    label: 'Escalabilidad',
    content: 'El enfoque multi-tenant y la modularidad permiten crecer sin duplicar complejidad operativa ni deuda innecesaria.',
  },
]

export function TrustCenterSection() {
  return (
    <SectionWrapper>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">Arquitectura y confianza</p>
            <h2 className="mt-3 bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent sm:text-4xl">Base sólida para vender y operar como software enterprise</h2>
            <div className="mt-6 grid gap-3">
              {trustCenterItems.map((item) => (
                <Card key={item} className="py-4">
                  <p className="text-sm text-slate-300">{item}</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="self-start">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
