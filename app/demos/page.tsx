import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Button } from '@/components/shared/ui/Button'
import { createPageMetadata } from '@/lib/seo'
import { Play, ExternalLink, Calendar } from 'lucide-react'

export const metadata: Metadata = createPageMetadata({
  title: 'Demos de Productos | Novamind Global',
  description: 'Explora demos en vivo y videos de nuestros productos: VoiceBot, PlanillasCR, CCERP, MindFlow y más.',
  path: '/demos',
})

const demos = [
  {
    slug: 'voicebot',
    name: 'VoiceBot Multi-Tenant',
    category: 'IA Conversacional',
    categoryColor: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/25',
    description: 'Ve cómo el VoiceBot enruta llamadas, responde consultas en lenguaje natural y escala automáticamente a agentes humanos.',
    duration: '4 min',
    highlight: 'Automatización de 60% de llamadas entrantes',
    href: '/productos/voicebot',
  },
  {
    slug: 'planillascr',
    name: 'PlanillasCR',
    category: 'Nómina & RRHH',
    categoryColor: 'text-brand-violet bg-brand-violet/10 border-brand-violet/25',
    description: 'Demo completa del módulo de nómina: cálculo de CCSS, aguinaldo, vacaciones y reportes listos para Hacienda.',
    duration: '6 min',
    highlight: 'Nómina de 200 empleados en menos de 5 min',
    href: '/productos/planillascr',
  },
  {
    slug: 'ccerp',
    name: 'CCERP',
    category: 'ERP Multiempresa',
    categoryColor: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/25',
    description: 'Recorrido por módulos de inventario, facturación, cobranza y reportes ejecutivos en tiempo real.',
    duration: '8 min',
    highlight: 'Un ERP que conecta todas las áreas del negocio',
    href: '/productos/ccerp',
  },
  {
    slug: 'mindflow',
    name: 'MindFlow',
    category: 'Ventas Automatizadas',
    categoryColor: 'text-brand-gold bg-brand-gold/10 border-brand-gold/25',
    description: 'Ve cómo MindFlow automatiza el seguimiento de leads, genera propuestas con IA y cierra ciclos de venta más rápido.',
    duration: '5 min',
    highlight: 'Pipeline de ventas con IA integrada',
    href: '/productos/mindflow',
  },
  {
    slug: 'iads',
    name: 'IADS',
    category: 'Servicios Digitales',
    categoryColor: 'text-brand-lavender bg-brand-lavender/10 border-brand-lavender/25',
    description: 'Demo del módulo de gestión de servicios digitales: ticketing, SLA, base de conocimiento y escalamiento inteligente.',
    duration: '5 min',
    highlight: 'Resolución de tickets en tiempo récord con IA',
    href: '/productos/iads',
  },
  {
    slug: 'mindflowcc',
    name: 'MindFlow CC',
    category: 'Contact Center',
    categoryColor: 'text-brand-violet bg-brand-violet/10 border-brand-violet/25',
    description: 'Descubre cómo integrar un contact center con IA que analiza sentimiento, prioriza casos y genera reportes automáticos.',
    duration: '6 min',
    highlight: 'Reducción de 35% en tiempo de atención',
    href: '/productos/mindflowcc',
  },
]

export default function DemosPage() {
  return (
    <>
      <SectionWrapper className="pt-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">Demos & Walkthroughs</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-[-0.03em] text-[#f0f8ff] sm:text-5xl">
              Ve nuestros productos en acción
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              Demos cortas y directas. Sin registro, sin compromiso. Solo el producto haciendo su trabajo.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {demos.map((demo) => (
              <div
                key={demo.slug}
                className="group flex flex-col rounded-2xl border border-brand-lavender/18 bg-brand-card/80 p-6 transition hover:-translate-y-1 hover:shadow-violet"
              >
                {/* Thumbnail placeholder */}
                <div className="relative mb-5 flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-brand-lavender/15 bg-brand-void/80">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-lavender/25 bg-brand-violet/20 transition group-hover:scale-110">
                    <Play className="h-6 w-6 fill-brand-lavender text-brand-lavender" />
                  </div>
                  <span className="absolute right-3 top-3 rounded-full bg-brand-void/80 px-2 py-0.5 text-[10px] font-medium text-text-muted">
                    {demo.duration}
                  </span>
                </div>

                <span className={`mb-3 inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium ${demo.categoryColor}`}>
                  {demo.category}
                </span>

                <h2 className="font-display text-xl font-bold text-[#f0f8ff]">{demo.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-text-muted">{demo.description}</p>

                <div className="mt-4 rounded-xl border border-brand-gold/20 bg-brand-gold/8 px-3 py-2">
                  <p className="text-xs font-semibold text-brand-gold">✓ {demo.highlight}</p>
                </div>

                <div className="mt-5 flex gap-2">
                  <Button href={demo.href} className="flex-1 text-center">
                    Ver demo
                  </Button>
                  <a
                    href="/contacto"
                    className="flex items-center justify-center rounded-2xl border border-brand-lavender/30 px-3 py-3 text-brand-lavender transition hover:bg-brand-lavender/8"
                    aria-label="Agendar demo personalizado"
                  >
                    <Calendar className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA final */}
          <div className="mt-12 rounded-2xl border border-brand-violet/30 bg-brand-violet/10 p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-[#f0f8ff]">
              ¿Quieres una demo personalizada para tu empresa?
            </h2>
            <p className="mt-3 text-text-muted">
              Te mostramos exactamente cómo el producto resuelve tu caso de uso específico, en 30 minutos.
            </p>
            <Button href="/contacto" className="mt-6">
              Agendar demo con especialista <ExternalLink className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    </>
  )
}
