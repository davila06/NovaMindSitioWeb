import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { metrics } from '@/data/site'
import { Card } from '@/components/shared/ui/Card'

export function MetricsCounters() {
  return (
    <SectionWrapper>
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.label} className="text-center">
              <span className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-4xl text-transparent">
                {metric.value}
                {metric.suffix}
              </span>
              <p className="mt-2 text-sm text-slate-300">{metric.label}</p>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
