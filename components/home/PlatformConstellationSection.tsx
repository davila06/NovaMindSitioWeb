import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'

const nodes = [
  { title: 'Orquestacion IA', detail: 'Reglas, automatizacion y agentes orientados a procesos criticos.' },
  { title: 'Capa SaaS', detail: 'Aplicaciones modulares por vertical: nomina, seguros, ERP y experiencia.' },
  { title: 'Data Intelligence', detail: 'Eventos, trazabilidad y visibilidad ejecutiva para decisiones rapidas.' },
]

export function PlatformConstellationSection() {
  return (
    <SectionWrapper className="section-dark">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Plataforma Novamind</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Una constelacion de soluciones conectadas por una misma arquitectura IA-native</h2>
            <p className="mt-4 max-w-2xl text-slate-200">
              Esta visión evita herramientas aisladas y permite que cada producto aporte a un sistema empresarial integrado, trazable y escalable.
            </p>
          </div>
          <div className="grid gap-4">
            {nodes.map((node) => (
              <div key={node.title} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <h3 className="font-display text-2xl text-white">{node.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">{node.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
