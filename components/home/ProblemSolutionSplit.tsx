import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card } from '@/components/shared/ui/Card'

const before = ['Procesos manuales', 'Sistemas dispersos', 'Riesgos legales', 'Mala experiencia cliente']
const after = ['IA integrada', 'SaaS centralizado', 'Cumplimiento automatico', 'Dashboards ejecutivos', 'Escalabilidad']

export function ProblemSolutionSplit() {
  return (
    <SectionWrapper id="soluciones">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">Antes</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {before.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
          <Card className="border-brand-interactive/24 bg-brand-interactive/10">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">Despues</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              {after.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </SectionWrapper>
  )
}
