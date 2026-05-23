'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { ChevronDown } from 'lucide-react'

const FAQ_ITEMS = [
  {
    q: '¿Para qué tipo de empresas están diseñadas las soluciones de Novamind?',
    a: 'Nos especializamos en empresas medianas y grandes de América Latina en sectores como seguros, nómina, contact centers, municipalidades y ERP multiempresa. Nuestras plataformas están construidas para operaciones críticas con alto volumen de procesos y requerimientos de trazabilidad.',
  },
  {
    q: '¿Cuánto tiempo tarda una implementación típica?',
    a: 'Dependiendo del producto y el alcance, las primeras fases de valor se logran en 4–8 semanas. Trabajamos con implementación incremental para no interrumpir tu operación actual, activando módulos por etapas y validando resultados antes de escalar.',
  },
  {
    q: '¿Cómo se integra con mi sistema ERP o CRM actual?',
    a: 'Nuestras plataformas están diseñadas para convivir con el stack existente. Ofrecemos conectores para los ERP más comunes en LATAM, APIs REST documentadas y webhooks para flujos personalizados. No es necesario migrar toda la infraestructura.',
  },
  {
    q: '¿Los datos de mi empresa están seguros en la nube?',
    a: 'Sí. Operamos sobre Microsoft Azure con cifrado en tránsito y en reposo, controles de acceso por rol, trazabilidad de eventos críticos y cumplimiento con estándares de seguridad empresarial. Ofrecemos instancias dedicadas para clientes con requerimientos de aislamiento.',
  },
  {
    q: '¿Qué soporte ofrecen después de la implementación?',
    a: 'Contamos con soporte técnico continuo, actualizaciones de plataforma incluidas y acompañamiento operativo. Nuestros planes incluyen SLA definidos según criticidad del proceso y acceso a canal directo con el equipo de producto de Novamind.',
  },
  {
    q: '¿Puedo hacer una prueba antes de comprometer presupuesto?',
    a: 'Sí. Ofrecemos demos personalizadas de 30 minutos mostrando el producto con escenarios reales de tu industria. También podemos preparar un piloto acotado según tu caso de uso específico, sin costo inicial.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <SectionWrapper id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Todo lo que necesitas saber
          </h2>
          <p className="mt-3 text-text-muted">
            Respuestas directas a las dudas más comunes antes de evaluar nuestras plataformas.
          </p>
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-brand-lavender/12">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="pr-6 font-display text-base font-semibold leading-snug text-[#f0f8ff] sm:text-lg">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-brand-lavender transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${openIndex === i ? 'max-h-48 pb-5' : 'max-h-0'}`}
              >
                <p className="text-sm leading-7 text-text-muted">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
