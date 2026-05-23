import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { ContactForm } from '@/components/shared/ui/ContactForm'
import { createPageMetadata, siteConfig } from '@/lib/seo'
import { CheckCircle2, Clock, Users, Zap } from 'lucide-react'

export const metadata: Metadata = createPageMetadata({
  title: 'Contacto | Novamind Global',
  description: 'Agenda una demo y descubre como automatizar procesos clave con IA aplicada.',
  path: '/contacto',
})

const benefits = [
  { icon: Clock,         text: 'Respuesta en menos de 24 horas hábiles' },
  { icon: Users,         text: 'Reunión inicial sin costo ni compromiso' },
  { icon: Zap,           text: 'Diagnóstico operativo incluido' },
  { icon: CheckCircle2,  text: 'Propuesta con roadmap y prioridades' },
]

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${siteConfig.url}/contacto`,
        url: `${siteConfig.url}/contacto`,
        name: 'Contacto | Novamind Global',
        description: 'Agenda una demo y descubre como automatizar procesos clave con IA aplicada.',
        inLanguage: 'es-CR',
        about: { '@id': `${siteConfig.url}/#organization` },
        potentialAction: {
          '@type': 'CommunicateAction',
          target: `${siteConfig.url}/contacto`,
          name: 'Solicitar demo o diagnóstico operativo',
          actionStatus: 'PotentialActionStatus',
          agent: { '@id': `${siteConfig.url}/#organization` },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteConfig.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${siteConfig.url}/contacto` },
        ],
      },
    ],
  }
  return (
    <SectionWrapper className="pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Columna izquierda — info */}
          <div className="lg:pt-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Hablemos</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-[#f0f8ff] sm:text-5xl">
              Tu siguiente salto digital empieza aquí
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              Comparte tus retos y armamos una propuesta inicial con roadmap y prioridades. Sin promesas de humo — solo claridad operativa.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((b) => {
                const Icon = b.icon
                return (
                  <li key={b.text} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-violet/20 text-brand-lavender">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-text-muted">{b.text}</span>
                  </li>
                )
              })}
            </ul>
            {/* Decorativo */}
            <div aria-hidden="true" className="mt-12 hidden lg:block">
              <div className="h-px w-full bg-gradient-to-r from-brand-violet/40 via-brand-lavender/20 to-transparent" />
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-text-subtle">Costa Rica · Empresa tecnológica IA-native</p>
            </div>

            {/* Prueba social */}
            <div className="mt-10 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">Lo que dicen nuestros clientes</p>
              {[
                {
                  quote: 'En menos de 3 meses redujimos el tiempo de gestión de nómina a la mitad. El soporte fue excepcional desde el primer día.',
                  author: 'Gerente de RRHH',
                  company: 'Empresa de manufactura, 200+ colaboradores',
                },
                {
                  quote: 'El voicebot resuelve el 70% de las consultas sin intervención humana. Nuestro equipo ahora se enfoca en casos complejos.',
                  author: 'Director de Operaciones',
                  company: 'Contact center, Costa Rica',
                },
              ].map((t) => (
                <figure key={t.author} className="rounded-xl border border-brand-lavender/12 bg-brand-elevated/40 p-4">
                  <blockquote className="text-sm leading-6 text-text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-2 text-xs text-text-subtle">
                    <span className="font-medium text-brand-lavender">{t.author}</span>
                    {' · '}{t.company}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          {/* Columna derecha — formulario */}
          <div className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-elevated backdrop-blur sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
