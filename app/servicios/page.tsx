import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { ServiceCard } from '@/components/products/ServiceCard'
import { Button } from '@/components/shared/ui/Button'
import { Badge } from '@/components/shared/ui/Badge'
import { createPageMetadata, siteConfig } from '@/lib/seo'
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
  title: 'Servicios | Novamind Global',
  description: 'Consultoría y desarrollo de software en Costa Rica. Profesionales con amplia experiencia en apps empresariales, infraestructura cloud, ciberseguridad, QA y soporte TI.',
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
    description: 'Arquitectos de software con más de 20 años de experiencia construyendo aplicaciones empresariales IA-native, multi-tenant y cloud-first sobre Azure — desde el diagnóstico hasta producción.',
    features: [
      'Arquitectura SaaS multi-tenant enterprise',
      'Integración con ERP y CRM existentes',
      'APIs REST documentadas y seguras',
      'CI/CD y despliegue en Azure App Service',
    ],
    accent: 'violet' as const,
  },
  {
    icon: <Users className="h-5 w-5" aria-hidden="true" />,
    title: 'Servicios de desarrollador',
    description: 'Talento técnico senior certificado para complementar equipos o liderar proyectos críticos. Desarrolladores con historial comprobado en sistemas de alta disponibilidad y operación continua.',
    features: [
      'Ingenieros senior y semi-senior certificados',
      'Perfiles full-stack, backend y cloud',
      'Incorporación en menos de 1 semana',
      'Supervisión técnica y entregables claros',
    ],
    accent: 'sky' as const,
  },
  {
    icon: <Cloud className="h-5 w-5" aria-hidden="true" />,
    title: 'Consultoría en infraestructura',
    description: 'Especialistas Microsoft Azure con experiencia real en migraciones de cargas críticas, diseño de alta disponibilidad y optimización de costos cloud en entornos productivos.',
    features: [
      'Diagnóstico y auditoría de infraestructura',
      'Diseño de arquitectura cloud resiliente',
      'Migración on-premise → Azure sin downtime',
      'Alta disponibilidad, DR y failover',
    ],
    accent: 'sky' as const,
  },
  {
    icon: <Layers className="h-5 w-5" aria-hidden="true" />,
    title: 'Consultoría en desarrollo de software',
    description: 'Consultores con experiencia en proyectos enterprise que guían a equipos en clean architecture, Domain-Driven Design y patrones de integración SaaS de nivel industria.',
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
    description: 'Scrum Masters y Agile Coaches con experiencia en transformación digital de empresas medianas y grandes, reduciendo tiempos de entrega y aumentando la predictibilidad de cada sprint.',
    features: [
      'Facilitación de sprints y retrospectivas',
      'Pipelines CI/CD con GitHub Actions / Azure DevOps',
      'OKRs y métricas de entrega cuantificables',
      'Coaching de equipos técnicos y liderazgo',
    ],
    accent: 'violet' as const,
  },
  {
    icon: <FlaskConical className="h-5 w-5" aria-hidden="true" />,
    title: 'QA y validación',
    description: 'Ingenieros de calidad especializados en automatización de pruebas, performance testing y estrategias de testing shift-left que garantizan cero regresiones en producción.',
    features: [
      'Pruebas unitarias, integración y E2E',
      'Automatización con Playwright y Vitest',
      'Performance budgets y Lighthouse CI',
      'Reportes de cobertura para dirección técnica',
    ],
    accent: 'sky' as const,
  },
  {
    icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
    title: 'Ciberseguridad',
    description: 'Especialistas en seguridad ofensiva y defensiva con experiencia en sectores regulados: banca, seguros y gobierno. Implementamos Zero Trust y cumplimiento normativo de extremo a extremo.',
    features: [
      'Auditoría de vulnerabilidades OWASP Top 10',
      'Gestión de identidades y accesos (IAM)',
      'Cifrado en reposo y en tránsito',
      'Cumplimiento ISO 27001 y normativa CR',
    ],
    accent: 'orange' as const,
  },
  {
    icon: <Network className="h-5 w-5" aria-hidden="true" />,
    title: 'Redes',
    description: 'Ingenieros de redes certificados con vasta experiencia en diseño LAN/WAN para operaciones críticas, segmentación avanzada y optimización de tráfico en entornos multisite.',
    features: [
      'Diagnóstico y diseño de red de alto rendimiento',
      'Segmentación VLANs, IoT y redes invitado',
      'QoS priorizado para aplicaciones de negocio',
      'Monitoreo proactivo y alertas de red',
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
        name: 'Servicios | Novamind Global',
        description: 'Consultoría y desarrollo de software en Costa Rica con profesionales de amplia experiencia.',
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
            <Badge>Consultoría · Desarrollo · Soporte</Badge>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-[#f0f8ff] sm:text-5xl lg:text-6xl">
              Profesionales con{' '}
              <span className="bg-gradient-to-r from-brand-violet via-brand-iris to-brand-lavender bg-clip-text text-transparent">
                vasta experiencia
              </span>{' '}
              en cada rama
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-text-muted">
              Nuestro equipo combina más de dos décadas de experiencia en desarrollo de software, infraestructura cloud,
              ciberseguridad y redes — con enfoque en resultados medibles para organizaciones que no pueden permitirse errores.
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
                Agenda un diagnóstico
              </Button>
            </div>
          </div>

          {/* Credential stats */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {credentials.map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-brand-lavender/15 bg-brand-card/60 px-4 py-5 text-center">
                <div className="font-display text-3xl font-bold text-[#f0f8ff]">{value}</div>
                <div className="mt-1 text-xs text-text-muted">{label}</div>
              </div>
            ))}
          </div>
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
                  Más de dos décadas resolviendo problemas reales
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  No somos una agencia genérica. Cada profesional de Novamind Global cuenta con experiencia comprobada
                  en proyectos de alta exigencia — sistemas de nómina para grupos empresariales, plataformas de seguros,
                  contact centers omnicanal y migraciones cloud críticas.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Trabajamos con metodologías ágiles, entregamos con documentación clara y nos mantenemos como
                  referencia técnica durante y después de cada proyecto.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: <Zap className="h-4 w-4 text-brand-gold" aria-hidden="true" />, title: 'Time-to-value real', desc: 'Primera versión productiva en semanas, no meses.' },
                  { icon: <ShieldCheck className="h-4 w-4 text-brand-lavender" aria-hidden="true" />, title: 'Calidad certificada', desc: 'Prácticas OWASP, ISO-alineadas y trazables desde el inicio.' },
                  { icon: <Users className="h-4 w-4 text-sky-400" aria-hidden="true" />, title: 'Equipo dedicado', desc: 'Profesionales asignados al proyecto, no rotación constante.' },
                  { icon: <Award className="h-4 w-4 text-brand-gold" aria-hidden="true" />, title: 'Experiencia probada', desc: 'Historial en banca, seguros, retail, gobierno y SaaS.' },
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
              Ocho líneas de servicio respaldadas por profesionales especializados. Cada área cuenta con equipo propio, metodología y entregables definidos.
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
              Diagnóstico sin costo, respuesta en menos de 24 horas hábiles y propuesta con roadmap priorizado por impacto.
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
          NOVACLICK — Servicio especializado (sub-marca)
      ══════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-orange-500/15 bg-gradient-to-b from-orange-950/10 to-transparent">
        <SectionWrapper aria-labelledby="novaclick-heading">
          <Container>
            {/* Sub-brand header */}
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/35 bg-orange-500/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-orange-300">
                <Zap className="h-4 w-4" aria-hidden="true" />
                Servicio especializado
              </div>
              <h2 id="novaclick-heading" className="mt-5 font-display text-4xl font-bold text-[#f0f8ff] sm:text-5xl">
                <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                  NovaClick
                </span>
              </h2>
              <p className="mt-1 text-base font-semibold text-orange-300/80">
                Una unidad especializada dentro de Novamind Global
              </p>
              <p className="mt-4 text-lg text-text-muted">
                NovaClick es nuestra división de soporte técnico inmediato — con identidad, equipo y procesos propios.
                Diseñada para resolver con rapidez lo que ninguna consultoría generalista atiende con la misma eficiencia.
              </p>
            </div>

            {/* Dual service cards */}
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {/* ClickFix */}
              <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-brand-card/80 p-8 shadow-[0_0_40px_rgba(249,115,22,0.06)]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15">
                    <Home className="h-5 w-5 text-orange-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-[#f0f8ff]">ClickFix</div>
                    <div className="text-xs font-medium text-orange-300">Servicio residencial</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">
                  Soporte técnico a domicilio para hogares, estudiantes y usuarios individuales.
                  Técnicos especializados que resuelven desde virus hasta configuración de SmartHome e IoT.
                </p>
                <ul className="mt-5 space-y-2">
                  {['Diagnóstico rápido en sitio', 'Respaldo en nube incluido', 'Seguridad digital del hogar', 'Configuración IoT y SmartHome', '7 planes desde ₡19,500'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-text-muted">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/productos/novaclick#planes"
                  className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-400"
                >
                  Ver planes ClickFix
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
                  TI gestionado para PyMEs y empresas que quieren operar con nivel enterprise sin montar
                  un área de TI interna. Desde soporte básico hasta CTO as a Service.
                </p>
                <ul className="mt-5 space-y-2">
                  {['Soporte remoto y presencial', 'Ciberseguridad avanzada', 'Migración cloud a Azure', 'ERP/CRM integrados', '7 planes desde ₡130,000'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-text-muted">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-lavender" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/productos/novaclick#planes"
                  className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-brand-violet px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-iris"
                >
                  Ver planes ITOn-Demand
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
                href="/contacto?plan=novaclick"
                variant="ghost"
                trackingContext={{ page: 'servicios', section: 'novaclick', ctaLabel: 'contacto_novaclick', destination: '/contacto', intent: 'demo' }}
              >
                Hablar con un especialista NovaClick
              </Button>
            </div>
          </Container>
        </SectionWrapper>
      </div>
    </>
  )
}
