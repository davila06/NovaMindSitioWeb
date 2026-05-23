import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'

const comparisonRows = [
  {
    criteria: 'Tiempo de respuesta operativa',
    manual: 'Lento y reactivo',
    fragmented: 'Inconsistente por sistema',
    novamind: 'Automatizado y trazable',
  },
  {
    criteria: 'Visibilidad ejecutiva',
    manual: 'Reportes tardíos',
    fragmented: 'Datos dispersos',
    novamind: 'KPIs centralizados en tiempo real',
  },
  {
    criteria: 'Escalabilidad',
    manual: 'Depende de más personal',
    fragmented: 'Escala con complejidad',
    novamind: 'Escala con arquitectura multi-tenant',
  },
  {
    criteria: 'Riesgo de cumplimiento',
    manual: 'Alto',
    fragmented: 'Variable',
    novamind: 'Controlado con trazabilidad',
  },
]

export function ComparativeBattleSection() {
  return (
    <SectionWrapper>
      <Container>
        <div className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-elevated backdrop-blur sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Comparativa estratégica</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-[#f0f8ff] sm:text-4xl">
            Novamind vs operación manual y sistemas fragmentados
          </h2>
          <p className="mt-4 max-w-3xl text-text-muted">
            Una vista clara para compradores enterprise: no vendemos solo software, vendemos mejor ejecución operativa.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-sm" aria-label="Comparativa: Novamind vs operación manual vs sistemas fragmentados">
              <caption className="sr-only">Comparativa de criterios operativos entre enfoque manual, sistemas fragmentados y Novamind Global</caption>
              <thead>
                <tr>
                  <th scope="col" className="rounded-l-xl bg-brand-elevated px-4 py-3 text-left font-semibold text-[#f0f8ff]">Criterio</th>
                  <th scope="col" className="bg-brand-elevated px-4 py-3 text-left font-semibold text-text-muted">Manual</th>
                  <th scope="col" className="bg-brand-elevated px-4 py-3 text-left font-semibold text-text-muted">Fragmentado</th>
                  <th scope="col" className="rounded-r-xl bg-brand-violet/30 px-4 py-3 text-left font-semibold text-brand-lavender">Novamind ✓</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.criteria}>
                    <td className="rounded-l-xl border border-brand-lavender/12 bg-brand-void/60 px-4 py-3 font-medium text-[#f0f8ff]">{row.criteria}</td>
                    <td className="border border-brand-lavender/12 bg-brand-void/40 px-4 py-3 text-text-muted">{row.manual}</td>
                    <td className="border border-brand-lavender/12 bg-brand-void/40 px-4 py-3 text-text-muted">{row.fragmented}</td>
                    <td className="rounded-r-xl border border-brand-violet/35 bg-brand-violet/12 px-4 py-3 font-semibold text-brand-lavender">{row.novamind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
