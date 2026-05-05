import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card } from '@/components/shared/ui/Card'

const benefits = [
  'Automatizacion inteligente para empresas y comunidades.',
  'IA aplicada a negocio y experiencia del cliente.',
  'Arquitectura SaaS multi-tenant sobre Azure.',
]

export function BenefitCards() {
  return (
    <SectionWrapper>
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map((item) => (
            <Card key={item} className="transition hover:-translate-y-1 hover:shadow-medium">
              <p className="text-sm text-slate-300">{item}</p>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
