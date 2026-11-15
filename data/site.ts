import { Metric } from '@/lib/types'

export const contactInterests = [
  "Servicios Nova Assist: consultoría y automatización",
  "Soporte tecnológico para hogares",
  "Soporte TI para empresas",
  "Productos SaaS / consultar disponibilidad",
  "Sitio web o comercio electrónico",
  "Cloud & Security",
  "Nova Assist / implementación de SaaS",
]

export const contactDetails = { email: 'info@novamindglobalcr.com', recipient: 'novamindglobalcr@gmail.com', phone: '+506 8766 9318', phoneHref: 'tel:+50687669318', whatsapp: '50687669318', privacyEmail: 'privacidad@novamindglobalcr.com', legalEmail: 'legal@novamindglobalcr.com' }

// Keep quantified claims, pricing, service levels, testimonials, and cases unpublished until reviewed.
export const commercialEvidenceEnabled = false

export type NavigationLink = {
  href: string
  label: string
  description?: string
}

export type PrimaryNavigationItem = NavigationLink & {
  children: readonly NavigationLink[]
}

export const primaryNavigation: readonly PrimaryNavigationItem[] = [
  {
    href: '/soluciones',
    label: 'Soluciones',
    description: 'Explora opciones según el reto de tu organización.',
    children: [
      { href: '/soluciones', label: 'Todas las soluciones', description: 'Áreas y rutas disponibles.' },
      { href: '/empresas', label: 'Para empresas', description: 'Productos y servicios empresariales.' },
      { href: '/nova-assist', label: 'Para hogares', description: 'Soporte tecnológico residencial.' },
    ],
  },
  {
    href: '/servicios',
    label: 'Servicios',
    description: 'Consultoría, implementación y soporte.',
    children: [
      { href: '/servicios', label: 'Servicios profesionales', description: 'Capacidades y alcances disponibles.' },
      { href: '/nova-assist/empresas/health-check', label: 'IT Health Check', description: 'Orientación inicial para empresas.' },
      { href: '/nova-assist/empresas/it-ondemand', label: 'IT OnDemand', description: 'Soporte empresarial bajo alcance acordado.' },
    ],
  },
  {
    href: '/productos',
    label: 'Productos',
    description: 'Conoce las plataformas y productos existentes.',
    children: [
      { href: '/productos', label: 'Todos los productos', description: 'Catálogo de productos Novamind.' },
      { href: '/productos/saas', label: 'Plataformas empresariales', description: 'Información y condiciones por producto.' },
      { href: '/productos/novaclick', label: 'NovaClick', description: 'Presencia digital y comercio.' },
    ],
  },
  {
    href: '/casos',
    label: 'Casos',
    description: 'Revisa la información publicada sobre casos de uso.',
    children: [],
  },
  {
    href: '/blog',
    label: 'Recursos',
    description: 'Artículos y recursos disponibles.',
    children: [
      { href: '/blog', label: 'Insights', description: 'Artículos publicados en el blog.' },
      { href: '/blog/feed.xml', label: 'RSS', description: 'Suscríbete al feed de publicaciones.' },
    ],
  },
  {
    href: '/sobre-nosotros',
    label: 'Empresa',
    description: 'Conoce Novamind Global y sus iniciativas.',
    children: [
      { href: '/sobre-nosotros', label: 'Nosotros', description: 'Información sobre Novamind Global.' },
      { href: '/#como-trabajamos', label: 'Cómo trabajamos', description: 'Etapas y forma de colaboración.' },
      { href: '/productos/pawtrack', label: 'PawTrack CR', description: 'Iniciativa tecnológica comunitaria.' },
    ],
  },
]

export const navLinks = primaryNavigation.map(({ href, label }) => ({ href, label }))

export type SolutionArea = {
  title: string
  description: string
  href: string
  action: string
  icon: 'automation' | 'cloud' | 'applications' | 'data' | 'engineering' | 'experience'
}

export const solutionAreas: readonly SolutionArea[] = [
  {
    title: 'IA y automatización',
    description: 'Evalúa dónde la automatización puede apoyar procesos y conversaciones.',
    href: '/productos/voicebot',
    action: 'Explorar VoiceBot',
    icon: 'automation',
  },
  {
    title: 'Cloud y modernización',
    description: 'Revisa opciones de infraestructura y modernización según el entorno.',
    href: '/servicios',
    action: 'Ver servicios',
    icon: 'cloud',
  },
  {
    title: 'Aplicaciones empresariales',
    description: 'Conoce plataformas de nómina, ERP y procesos comerciales.',
    href: '/productos',
    action: 'Explorar productos',
    icon: 'applications',
  },
  {
    title: 'Datos e integración',
    description: 'Define integraciones según los sistemas y requisitos de cada proyecto.',
    href: '/servicios',
    action: 'Conversar sobre integración',
    icon: 'data',
  },
  {
    title: 'Ingeniería de software',
    description: 'Consulta capacidades de diseño y desarrollo de aplicaciones.',
    href: '/servicios',
    action: 'Ver capacidades',
    icon: 'engineering',
  },
  {
    title: 'Experiencia digital',
    description: 'Explora soluciones de sitios web, presencia digital y comercio.',
    href: '/productos/novaclick',
    action: 'Conocer NovaClick',
    icon: 'experience',
  },
]

export const trustBadges = commercialEvidenceEnabled
  ? ['Arquitectura multi-tenant', 'Integrable con ERP y CRM', 'Escalable sobre Azure', 'Trazabilidad operativa', 'Facturación electrónica']
  : ['Alcance definido por proyecto', 'Condiciones documentadas en propuesta', 'Soluciones para organizaciones', 'Atención en Costa Rica']

export const differentiationPillars = [
  {
    title: 'IA aplicada al proceso',
    description: 'Evaluamos dónde la inteligencia artificial puede apoyar tareas y decisiones dentro de un flujo operativo.',
  },
  {
    title: 'Diseño según el contexto',
    description: 'Revisamos procesos, reglas y necesidades de cada organización antes de definir una solución.',
  },
  {
    title: 'Implementación por etapas',
    description: 'Acordamos entregables y prioridades para validar cada fase antes de ampliar el alcance.',
  },
  {
    title: 'Condiciones explícitas',
    description: 'Definimos responsabilidades, integraciones y condiciones del servicio en la propuesta correspondiente.',
  },
]

export const implementationSteps = [
  {
    title: 'Discover · Descubrir',
    description: 'Revisamos procesos, sistemas y necesidades para identificar el contexto del proyecto.',
  },
  {
    title: 'Design · Diseñar',
    description: 'Definimos una propuesta técnica, prioridades y entregables acordes al alcance solicitado.',
  },
  {
    title: 'Build · Construir',
    description: 'Desarrollamos y configuramos los componentes acordados por etapas.',
  },
  {
    title: 'Operate · Operar',
    description: 'Revisamos el trabajo entregado y las responsabilidades definidas para el servicio.',
  },
  {
    title: 'Optimize · Optimizar',
    description: 'Acordamos ajustes o ampliaciones posteriores según las necesidades del proyecto.',
  },
]

export const trustCenterItems = [
  'Permisos por rol y visibilidad segmentada',
  'Trazabilidad de procesos y eventos críticos',
  'Integración con herramientas existentes',
  'Diseño preparado para entornos multiempresa y multiunidad',
]

export const metrics: Metric[] = [
  { value: '80', suffix: '%', label: 'menos errores de nómina' },
  { value: '40', suffix: '%', label: 'mejora en respuesta al cliente' },
  { value: '24', suffix: 'h', label: 'reunificación de mascotas' },
]

export const useCases = [
  {
    title: 'Empresas grandes',
    description: 'Escala operativa con control multiunidad y cumplimiento normativo continuo.',
  },
  {
    title: 'PyMEs',
    description: 'Automatización asequible para crecer sin incrementar costos fijos de forma lineal.',
  },
  {
    title: 'Municipalidades',
    description: 'Servicios digitales para mejorar atención ciudadana y trazabilidad de procesos.',
  },
  {
    title: 'Comunidades',
    description: 'Plataformas colaborativas para seguridad, comunicación y valor colectivo.',
  },
]

export const testimonials = [
  {
    quote: 'Reducimos el tiempo operativo del backoffice y mejoramos nuestra experiencia de cliente en semanas.',
    author: 'Gerencia de Operaciones, Grupo Regional',
  },
  {
    quote: 'La visibilidad ejecutiva cambio nuestra forma de tomar decisiones y priorizar inversiones.',
    author: 'Dirección General, Empresa Multiempresa',
  },
]

export const quantifiedOutcomes = [
  {
    metric: '-42%',
    label: 'tiempo promedio de cierre operativo',
    context: 'Automatización de reglas y aprobaciones en procesos internos.',
  },
  {
    metric: '+31%',
    label: 'conversión comercial en embudos priorizados',
    context: 'Orquestación de intake, scoring y seguimiento automático.',
  },
  {
    metric: '-55%',
    label: 'errores administrativos recurrentes',
    context: 'Estandarización de datos, validaciones y trazabilidad.',
  },
]

export const miniCaseStudies = [
  {
    segment: 'Servicios Financieros',
    challenge: 'Procesos de cobro y seguimiento con alta dispersión operativa.',
    solution: 'Flujos automatizados de priorización, recordatorio y control de cartera.',
    result: 'Reducción del ciclo de cobro en 28 días a 15 días promedio.',
  },
  {
    segment: 'B2B Multiunidad',
    challenge: 'Fuga comercial entre generación de lead y cierre.',
    solution: 'Motor de reglas en revenue operations con asignación inteligente.',
    result: 'Incremento de 31% en conversiones de oportunidades calificadas.',
  },
  {
    segment: 'Operación de RRHH',
    challenge: 'Altos errores y baja visibilidad en planillas.',
    solution: 'Validaciones automáticas con auditoría por evento y rol.',
    result: 'Disminución de 55% en incidencias administrativas mensuales.',
  },
]

export const clientLogoWall = [
  'Grupo Regional LATAM',
  'Holding Operativo CR',
  'Red de Servicios Empresariales',
  'Consorcio Multiunidad',
  'Operadora de Seguros Local',
  'Unidad Municipal Digital',
]
