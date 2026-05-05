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
        <div className="rounded-2xl border border-brand-interactive/20 bg-gradient-futurist p-6 shadow-elevated sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">Comparativa estratégica</p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.02em] text-brand-surface sm:text-4xl">Novamind vs operación manual y sistemas fragmentados</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Una vista clara para compradores enterprise: no vendemos solo software, vendemos mejor ejecución operativa.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-sm">
              <thead>
                <tr>
                  <th className="rounded-l-xl bg-slate-800 px-4 py-3 text-left font-semibold text-slate-200">Criterio</th>
                  <th className="bg-slate-800 px-4 py-3 text-left font-semibold text-slate-200">Manual</th>
                  <th className="bg-slate-800 px-4 py-3 text-left font-semibold text-slate-200">Fragmentado</th>
                  <th className="rounded-r-xl bg-gradient-brand px-4 py-3 text-left font-semibold text-white">Novamind</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.criteria}>
                    <td className="rounded-l-xl border border-slate-700 bg-slate-900/70 px-4 py-3 font-medium text-slate-200">{row.criteria}</td>
                    <td className="border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-300">{row.manual}</td>
                    <td className="border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-300">{row.fragmented}</td>
                    <td className="rounded-r-xl border border-brand-interactive/40 bg-brand-interactive/14 px-4 py-3 font-semibold text-brand-surface">{row.novamind}</td>
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
