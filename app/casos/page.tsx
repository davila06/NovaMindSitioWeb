import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Button } from '@/components/shared/ui/Button'
import { createPageMetadata } from '@/lib/seo'
import { commercialEvidenceEnabled } from '@/data/site'
import { TrendingUp, ArrowRight } from 'lucide-react'

export const metadata: Metadata = createPageMetadata({
  title: 'Casos de uso | Novamind Global',
  description: 'Explora cómo las plataformas de Novamind pueden abordar retos operativos empresariales.',
  path: '/casos',
})

const cases = [
  {
    company: 'Contact Center Regional',
    industry: 'Servicio al Cliente',
    industryColor: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/25',
    product: 'VoiceBot Multi-Tenant',
    challenge: 'Más de 800 llamadas diarias con tiempo de espera promedio de 4 minutos. Alta rotación de agentes y costos operativos crecientes.',
    solution: 'Implementación de VoiceBot para clasificación y resolución automática de los casos de nivel 1. Escalamiento inteligente a agentes humanos solo cuando es necesario.',
    results: [
      { metric: '62%', label: 'reducción en tiempo de espera' },
      { metric: '40%', label: 'de llamadas resueltas sin agente' },
      { metric: '6 sem', label: 'tiempo de implementación' },
    ],
    quote: 'Pasamos de colas de 4 minutos a resolución inmediata en la mayoría de consultas. El equipo humano ahora atiende casos que realmente necesitan su criterio.',
    author: 'Gerente de Operaciones',
  },
  {
    company: 'Empresa manufacturera',
    industry: 'Manufactura & RRHH',
    industryColor: 'text-brand-violet bg-brand-violet/10 border-brand-violet/25',
    product: 'PlanillasCR',
    challenge: 'Nómina manual de 340 empleados con cálculo de CCSS y deducciones tomando 3 días de trabajo al mes. Errores frecuentes y ajustes costosos.',
    solution: 'Automatización completa del ciclo de nómina: carga de marcas, cálculo legal, reportes para Hacienda y CCSS, y trazabilidad de cada cambio.',
    results: [
      { metric: '94%', label: 'reducción en tiempo de nómina' },
      { metric: '0', label: 'errores en 8 meses' },
      { metric: '3h', label: 'vs. 3 días anteriores' },
    ],
    quote: 'Lo que antes tomaba 3 días de un equipo de contabilidad, hoy se hace en menos de 3 horas con total exactitud.',
    author: 'Directora Administrativa',
  },
  {
    company: 'Grupo empresarial multiempresa',
    industry: 'ERP & Finanzas',
    industryColor: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/25',
    product: 'CCERP',
    challenge: 'Cuatro empresas del grupo manejando inventario, facturación y reportes en hojas de cálculo separadas. Sin visibilidad consolidada ni control de cobranza.',
    solution: 'CCERP multi-tenant para las cuatro empresas: inventario centralizado, facturación electrónica, cobranza automatizada y dashboard ejecutivo en tiempo real.',
    results: [
      { metric: '4', label: 'empresas en una plataforma' },
      { metric: '35%', label: 'mejora en recuperación de cartera' },
      { metric: '1 mes', label: 'para operación completa' },
    ],
    quote: 'Por primera vez tenemos visibilidad real de todo el grupo desde un solo panel. La cobranza automatizada cambió completamente el flujo de caja.',
    author: 'CFO del Grupo',
  },
  {
    company: 'Empresa de seguros LATAM',
    industry: 'Seguros & IA',
    industryColor: 'text-brand-gold bg-brand-gold/10 border-brand-gold/25',
    product: 'MindFlow AI Sales Engine',
    challenge: 'Ciclo de ventas de seguros de 21 días en promedio. Pipeline desorganizado, seguimiento manual y baja tasa de conversión por falta de personalización.',
    solution: 'MindFlow AI Sales Engine para calificación automática de leads, propuestas generadas con IA y seguimiento automatizado con mensajes personalizados por etapa.',
    results: [
      { metric: '45%', label: 'más conversiones' },
      { metric: '21→9', label: 'días de ciclo de venta' },
      { metric: '3×', label: 'más propuestas por agente' },
    ],
    quote: 'Nuestros agentes ahora se enfocan en cerrar, no en administrar. La IA se encarga del seguimiento y la personalización a escala.',
    author: 'Director Comercial',
  },
]

export default function CasosPage() {
  const publishedCases = commercialEvidenceEnabled ? cases : [];

  return (
    <>
      <SectionWrapper className="pt-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">Aplicaciones empresariales</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-[-0.03em] text-[#f0f8ff] sm:text-5xl">
              Casos de uso y resultados
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              Publicamos resultados de clientes únicamente cuando el alcance,
              las métricas y la autorización para compartirlos están confirmados.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container>
          <div className="space-y-8">
            {publishedCases.map((c, i) => (
              <article
                key={c.company}
                className="rounded-2xl border border-brand-lavender/18 bg-brand-card/80 p-6 shadow-soft lg:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${c.industryColor}`}>
                      {c.industry}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-bold text-[#f0f8ff]">{c.company}</h2>
                    <p className="mt-1 text-sm text-brand-lavender">Producto: {c.product}</p>
                  </div>
                  <span className="shrink-0 font-display text-6xl font-bold text-brand-lavender opacity-[0.07]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-violet">El reto</p>
                    <p className="text-sm leading-7 text-text-muted">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-lavender">La solución</p>
                    <p className="text-sm leading-7 text-text-muted">{c.solution}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {c.results.map((r) => (
                    <div key={r.label} className="rounded-xl border border-brand-gold/20 bg-brand-gold/8 p-4 text-center">
                      <p className="font-display text-2xl font-bold text-brand-gold">{r.metric}</p>
                      <p className="mt-1 text-xs text-text-muted">{r.label}</p>
                    </div>
                  ))}
                </div>

                <blockquote className="mt-6 border-l-2 border-brand-lavender/30 pl-4">
                  <p className="font-serif text-sm italic leading-7 text-[#f0f8ff]">
                    &ldquo;{c.quote}&rdquo;
                  </p>
                  <footer className="mt-2 text-xs text-text-muted">— {c.author}</footer>
                </blockquote>
              </article>
            ))}
          </div>

          {!commercialEvidenceEnabled && (
            <div className="mt-8 rounded-2xl border border-brand-lavender/18 bg-brand-card/70 p-7 text-center">
              <p className="mx-auto max-w-2xl text-sm leading-6 text-text-muted">
                Estamos preparando casos verificables y autorizados para
                publicación. Mientras tanto, puedes consultar las plataformas
                y conversar sobre su posible encaje con tu operación.
              </p>
              <Button href="/productos/saas" className="mt-5">
                Explorar plataformas
              </Button>
            </div>
          )}

          <div className="mt-12 rounded-2xl border border-brand-violet/30 bg-brand-violet/10 p-8 text-center">
            <TrendingUp className="mx-auto h-10 w-10 text-brand-lavender" />
            <h2 className="mt-4 font-display text-2xl font-bold text-[#f0f8ff]">
              ¿Quieres conversar sobre un reto operativo?
            </h2>
            <p className="mt-3 text-text-muted">
              Comparte el contexto y revisaremos contigo los posibles siguientes pasos.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button href="/contacto">
                Contactar al equipo <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button href="/demos" variant="ghost">Ver demos →</Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  )
}
