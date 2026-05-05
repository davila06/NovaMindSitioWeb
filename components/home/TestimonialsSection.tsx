import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { testimonials } from '@/data/site'
import { Card } from '@/components/shared/ui/Card'

export function TestimonialsSection() {
  return (
    <SectionWrapper>
      <Container>
        <h2 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">Casos de impacto</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <Card key={item.author}>
              <p className="text-slate-200">“{item.quote}”</p>
              <p className="mt-4 text-sm font-medium text-brand-accent">{item.author}</p>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
