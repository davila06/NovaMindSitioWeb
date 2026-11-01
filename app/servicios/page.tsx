import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { ServiceCard } from '@/components/products/ServiceCard'
import { Button } from '@/components/shared/ui/Button'
import { Badge } from '@/components/shared/ui/Badge'
import { createPageMetadata, siteConfig } from '@/lib/seo'
import { commercialEvidenceEnabled } from '@/data/site'
import {
  Code2,
  Users,
  Cloud,
  Layers,
  GitBranch,
  FlaskConical,
  ShieldCheck,
  Network,
  Award,
  CheckCircle2,
  Zap,
  Home,
  Building2,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = createPageMetadata({
  title: 'Servicios Nova Assist | Novamind Global',
  description: 'Consultoría y desarrollo de software en Costa Rica: aplicaciones empresariales, infraestructura cloud, ciberseguridad, QA y soporte TI.',
  path: '/servicios',
  extraKeywords: [
    'consultoría de software Costa Rica',
    'desarrollo de apps empresariales',
    'outsourcing técnico Costa Rica',
    'arquitectura cloud Azure',
    'DevOps Costa Rica',
    'ciberseguridad empresas',
    'soporte técnico empresarial Costa Rica',
  ],
})

const services = [
  {
    icon: <Code2 className="h-5 w-5" aria-hidden="true" />,
    title: 'Desarrollo de apps',
    description: 'Diseño y desarrollo de aplicaciones empresariales. La arquitectura, las integraciones y el entorno de despliegue se definen según los requisitos del proyecto.',
    features: [
      'Diseño de arquitectura según requisitos',
      'Integraciones sujetas a compatibilidad y alcance',
      'APIs y documentación según entregables acordados',
      'Automatización de build y despliegue según entorno',
    ],
    accent: 'violet' as const,
  },
  {
    icon: <Users className="h-5 w-5" aria-hidden="true" />,
    title: 'Servicios de desarrollador',
    description: 'Acompañamiento de desarrollo para complementar equipos o abordar iniciativas específicas, sujeto a perfil y disponibilidad.',
    features: [
      'Perfiles técnicos según necesidad y disponibilidad',
      'Experiencia full-stack, backend o cloud por confirmar',
      'Fecha de incorporación definida en la propuesta',
      'Responsabilidades y entregables acordados',
    ],
    accent: 'sky' as const,
  },
  {
    icon: <Cloud className="h-5 w-5" aria-hidden="true" />,
    title: 'Consultoría en infraestructura',
    description: 'Evaluación y diseño de infraestructura cloud o híbrida; las recomendaciones y el plan de migración dependen del entorno actual.',
    features: [
      'Revisión del entorno y sus dependencias',
      'Alternativas de arquitectura y costos',
      'Plan de migración con riesgos y ventanas de cambio',
      'Requisitos de continuidad y recuperación',
    ],
    accent: 'sky' as const,
  },
  {
    icon: <Layers className="h-5 w-5" aria-hidden="true" />,
    title: 'Consultoría en desarrollo de software',
    description: 'Revisión y acompañamiento técnico para definir una arquitectura de software, límites de dominio e integraciones acordes al contexto del proyecto.',
    features: [
      'Revisión de arquitectura y deuda técnica',
      'DDD, CQRS y patrones de dominio',
      'Integración de servicios externos y APIs',
      'Documentación y transferencia de conocimiento',
    ],
    accent: 'violet' as const,
  },
  {
    icon: <GitBranch className="h-5 w-5" aria-hidden="true" />,
    title: 'Metodologías ágiles',
    description: 'Facilitación de planificación, seguimiento y mejora de equipos. La cadencia y los indicadores se acuerdan según la forma de trabajo del cliente.',
    features: [
      'Facilitación de sprints y retrospectivas',
      'Pipelines CI/CD con GitHub Actions / Azure DevOps',
      'Objetivos e indicadores acordados con el equipo',
      'Coaching de equipos técnicos y liderazgo',
    ],
    accent: 'violet' as const,
  },
  {
    icon: <FlaskConical className="h-5 w-5" aria-hidden="true" />,
    title: 'QA y validación',
    description: 'Diseño y ejecución de actividades de aseguramiento de calidad. La estrategia de pruebas se define con base en los riesgos y criterios de aceptación.',
    features: [
      'Pruebas unitarias, integración y E2E',
      'Automatización con Playwright y Vitest',
      'Performance budgets y Lighthouse CI',
      'Resultados y cobertura reportados según el alcance',
    ],
    accent: 'sky' as const,
  },
  {
    icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
    title: 'Ciberseguridad',
    description: 'Revisión de riesgos y controles de seguridad con límites documentados. No sustituye una certificación ni una evaluación especializada fuera del alcance acordado.',
    features: [
      'Revisión de riesgos de aplicaciones con criterios acordados',
      'Gestión de identidades y accesos (IAM)',
      'Revisión de controles de acceso y protección de datos',
      'Requisitos regulatorios y marcos de referencia por validar',
    ],
    accent: 'orange' as const,
  },
  {
    icon: <Network className="h-5 w-5" aria-hidden="true" />,
    title: 'Redes',
    description: 'Evaluación y diseño de redes LAN/WAN según topología, dispositivos, necesidades de conectividad y cobertura acordada.',
    features: [
      'Levantamiento y propuesta de diseño de red',
      'Segmentación VLANs, IoT y redes invitado',
      'QoS priorizado para aplicaciones de negocio',
      'Opciones de monitoreo y alertas según alcance',
    ],
    accent: 'sky' as const,
  },
]

const credentials = [
  { label: 'Años de experiencia combinada', value: '20+' },
  { label: 'Proyectos enterprise entregados', value: '50+' },
  { label: 'Industrias atendidas', value: '8' },
  { label: 'Tiempo promedio de respuesta', value: '< 24 h' },
]

const expertiseAreas = [
  'Microsoft Azure & cloud nativo',
  'Arquitectura SaaS multi-tenant',
  'Inteligencia Artificial aplicada',
  'Seguridad y cumplimiento normativo',
  'DevOps y entrega continua',
  'Domain-Driven Design',
  'Testing y calidad de software',
  'Redes empresariales',
]

export default function ServiciosPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteConfig.url}/servicios`,
        url: `${siteConfig.url}/servicios`,
        name: 'Servicios Nova Assist | Novamind Global',
        description: 'Consultoría y desarrollo de software en Costa Rica, sujeto al alcance de cada proyecto.',
        inLanguage: 'es-CR',
        about: { '@id': `${siteConfig.url}/#organization` },
      },
      {
        '@type': 'ItemList',
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.title,
          description: s.description,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteConfig.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${siteConfig.url}/servicios` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <SectionWrapper className="pb-8 pt-14">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge>Nova Assist · Consultoría · Desarrollo · Soporte</Badge>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-[#f0f8ff] sm:text-5xl lg:text-6xl">
              Servicios de Nova Assist con{' '}
              <span className="bg-gradient-to-r from-brand-violet via-brand-iris to-brand-lavender bg-clip-text text-transparent">
                alcance claro
              </span>{' '}
              para cada organización
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-text-muted">
              Reunimos capacidades de desarrollo de software, infraestructura cloud,
              ciberseguridad y redes para ayudar a las organizaciones a definir y ejecutar sus prioridades tecnológicas.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                href="/contacto"
                trackingContext={{ page: 'servicios', section: 'hero', ctaLabel: 'solicitar_consultoria', destination: '/contacto', intent: 'demo' }}
                className="btn-cta-pulse"
              >
                Solicita tu consultoría
              </Button>
              <Button
                href="/contacto"
                variant="ghost"
                trackingContext={{ page: 'servicios', section: 'hero', ctaLabel: 'agenda_diagnostico', destination: '/contacto', intent: 'contact' }}
              >
                Consultar servicios
              </Button>
            </div>
          </div>

          {/* Credential stats */}
          {commercialEvidenceEnabled && (
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {credentials.map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-brand-lavender/15 bg-brand-card/60 px-4 py-5 text-center">
                  <div className="font-display text-3xl font-bold text-[#f0f8ff]">{value}</div>
                  <div className="mt-1 text-xs text-text-muted">{label}</div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </SectionWrapper>

      {/* ── Expertise areas pill cloud ────────────────────────────────── */}
      <SectionWrapper className="py-6" aria-label="Áreas de expertise">
        <Container>
          <div className="flex flex-wrap justify-center gap-2">
            {expertiseAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-lavender/25 bg-brand-card/60 px-4 py-1.5 text-sm font-medium text-text-muted"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-lavender" aria-hidden="true" />
                {area}
              </span>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Why our team ─────────────────────────────────────────────── */}
      <SectionWrapper className="py-10" aria-labelledby="equipo-heading">
        <Container>
          <div className="rounded-2xl border border-brand-lavender/20 bg-brand-card/60 p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-sm font-semibold text-brand-gold">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  Nuestro equipo
                </div>
                <h2 id="equipo-heading" className="mt-4 font-display text-2xl font-bold text-[#f0f8ff] sm:text-3xl">
                  Colaboración técnica según el alcance
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Acordamos objetivos, roles, dependencias y criterios de aceptación antes de iniciar cada proyecto.
                  Los perfiles, certificaciones y disponibilidad se confirman según la necesidad y la propuesta.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  El seguimiento, la documentación y el acompañamiento posterior se definen junto con el cliente.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: <Zap className="h-4 w-4 text-brand-gold" aria-hidden="true" />, title: 'Entregas por etapas', desc: 'Fases y criterios de aceptación definidos en la propuesta.' },
                  { icon: <ShieldCheck className="h-4 w-4 text-brand-lavender" aria-hidden="true" />, title: 'Seguridad en contexto', desc: 'Requisitos y controles considerados según el sistema y los datos.' },
                  { icon: <Users className="h-4 w-4 text-sky-400" aria-hidden="true" />, title: 'Equipo y disponibilidad', desc: 'Roles y disponibilidad confirmados antes de contratar.' },
                  { icon: <Award className="h-4 w-4 text-brand-gold" aria-hidden="true" />, title: 'Alcance documentado', desc: 'Responsabilidades, dependencias y entregables acordados.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="rounded-xl border border-brand-lavender/15 bg-brand-surface/40 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      {icon}
                      <span className="text-sm font-semibold text-[#f0f8ff]">{title}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-text-muted">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Services grid ─────────────────────────────────────────────── */}
      <SectionWrapper id="servicios-grid" aria-labelledby="servicios-heading">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Lo que hacemos</p>
            <h2 id="servicios-heading" className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              Servicios de consultoría y desarrollo
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-muted">
              Las capacidades, los perfiles disponibles, las dependencias y los entregables se confirman para cada proyecto.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Novamind CTA mid-page ─────────────────────────────────────── */}
      <SectionWrapper className="py-10">
        <Container>
          <div className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 px-8 py-10 text-center shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">¿Listo para avanzar?</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              Solicita tu consultoría Novamind
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-muted">
              Comparte el contexto de tu iniciativa. Revisaremos el alcance y las opciones de colaboración disponibles.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                href="/contacto"
                trackingContext={{ page: 'servicios', section: 'mid-cta', ctaLabel: 'solicitar_consultoria_mid', destination: '/contacto', intent: 'demo' }}
              >
                Solicitar consultoría
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ══════════════════════════════════════════════════════════════════
          NOVACLICK — Presencia digital
      ══════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-orange-500/15 bg-gradient-to-b from-orange-950/10 to-transparent">
        <SectionWrapper aria-labelledby="novaclick-heading">
          <Container>
            {/* Sub-brand header */}
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/35 bg-orange-500/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-orange-300">
                <Zap className="h-4 w-4" aria-hidden="true" />
                Presencia digital · Comercio electrónico
              </div>
              <h2 id="novaclick-heading" className="mt-5 font-display text-4xl font-bold text-[#f0f8ff] sm:text-5xl">
                <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                  NovaClick
                </span>
              </h2>
              <p className="mt-1 text-base font-semibold text-orange-300/80">
                Una línea de servicios de Novamind
              </p>
              <p className="mt-4 text-lg text-text-muted">
                NovaClick ayuda a profesionales y PYMES a crear una presencia digital útil:
                sitios web, captación de clientes y comercio electrónico con alcances acordados.
              </p>
            </div>

            {/* Dual service cards */}
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {/* NovaClick */}
              <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-brand-card/80 p-8 shadow-[0_0_40px_rgba(249,115,22,0.06)]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15">
                    <Home className="h-5 w-5 text-orange-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-[#f0f8ff]">NovaClick</div>
                    <div className="text-xs font-medium text-orange-300">Web y comercio digital</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">
                  Diseño y desarrollo de sitios web para profesionales, comercios y pequeñas empresas.
                </p>
                <ul className="mt-5 space-y-2">
                  {['Landing pages y sitios informativos', 'Captación de clientes y contacto directo', 'Tiendas en línea según alcance', 'SEO y analítica inicial', 'Revisiones y entregables definidos'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-text-muted">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/productos/novaclick"
                  className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-400"
                >
                  Explorar NovaClick
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              {/* ITOn-Demand */}
              <div className="relative overflow-hidden rounded-2xl border border-brand-lavender/30 bg-brand-card/80 p-8 shadow-[0_0_40px_rgba(139,92,246,0.06)]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-violet/15">
                    <Building2 className="h-5 w-5 text-brand-lavender" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-[#f0f8ff]">ITOn-Demand</div>
                    <div className="text-xs font-medium text-brand-lavender">Servicio empresarial</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">
                  Acompañamiento para PYMES que necesitan soporte y administración tecnológica sin
                  construir un departamento interno de TI.
                </p>
                <ul className="mt-5 space-y-2">
                  {['Soporte remoto y presencial según alcance', 'Microsoft 365 y administración de usuarios', 'Evaluación y mejoras de seguridad', 'Cloud, continuidad e integraciones', 'Alcance y condiciones acordados por propuesta'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-text-muted">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-lavender" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/empresas#servicios"
                  className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-brand-violet px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-iris"
                >
                  Explorar servicios empresariales
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* NovaClick CTA */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                href="/productos/novaclick"
                trackingContext={{ page: 'servicios', section: 'novaclick', ctaLabel: 'ver_novaclick_completo', destination: '/productos/novaclick', intent: 'explore' }}
              >
                Conocer NovaClick completo
              </Button>
              <Button
                href="/contacto?plan=novaclick-web"
                variant="ghost"
                trackingContext={{ page: 'servicios', section: 'novaclick', ctaLabel: 'contacto_novaclick', destination: '/contacto', intent: 'demo' }}
              >
                Solicitar una propuesta NovaClick
              </Button>
            </div>
          </Container>
        </SectionWrapper>
      </div>
    </>
  )
}
