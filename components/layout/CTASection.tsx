import { Button } from '@/components/shared/ui/Button'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'

export function CTASection() {
  return (
    <SectionWrapper>
      <Container>
        <div className="rounded-2xl bg-brand-deep p-8 text-white shadow-elevated sm:p-12">
          <h2 className="font-display text-3xl">Listo para acelerar con IA aplicada?</h2>
          <p className="mt-3 max-w-2xl text-slate-200">
            Diseñamos una ruta de implementacion pragmatica para que conviertas procesos criticos en ventajas competitivas.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              href="/contacto"
              className="bg-brand-cta"
              trackingContext={{
                page: 'home',
                section: 'final_cta',
                ctaLabel: 'quiero_demo',
                destination: '/contacto',
                intent: 'demo',
              }}
            >
              Quiero una demo
            </Button>
            <Button
              href="/contacto"
              variant="ghost"
              className="border-white/30 bg-white/10 text-white"
              trackingContext={{
                page: 'home',
                section: 'final_cta',
                ctaLabel: 'hablar_experto',
                destination: '/contacto',
                intent: 'consultation',
              }}
            >
              Hablar con experto
            </Button>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
