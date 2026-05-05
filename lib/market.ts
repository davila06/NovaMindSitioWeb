import { validateMarketPagesContent } from '@/lib/content-schema'

export type MarketPage = {
  slug: string
  title: string
  subtitle: string
  problemPoints: string[]
  valuePoints: string[]
  recommendedProducts: Array<{ name: string; href: string }>
}

export const industries: MarketPage[] = validateMarketPagesContent([
  {
    slug: 'rrhh-y-planillas',
    title: 'IA para RRHH y Planillas',
    subtitle: 'Automatiza cálculos, reduce riesgo legal y mejora trazabilidad operativa en nómina.',
    problemPoints: ['Errores recurrentes en planilla', 'Procesos manuales intensivos', 'Riesgo de incumplimiento normativo'],
    valuePoints: ['Cumplimiento continuo', 'Cierre de planillas más rápido', 'Auditoría clara por colaborador'],
    recommendedProducts: [
      { name: 'PlanillasCR', href: '/productos/planillascr' },
      { name: 'CCERP', href: '/productos/ccerp' },
    ],
  },
  {
    slug: 'contact-center-y-experiencia',
    title: 'IA para Contact Center y Experiencia',
    subtitle: 'Mejora SLA, consistencia de respuesta y eficiencia en operaciones omnicanal.',
    problemPoints: ['Alto tiempo de espera', 'Baja consistencia en atención', 'Falta de trazabilidad por canal'],
    valuePoints: ['Operación 24/7', 'Escalamiento inteligente', 'Control de calidad continuo'],
    recommendedProducts: [
      { name: 'VoiceBot Multi-Tenant', href: '/productos/voicebot' },
      { name: 'MindFlow AI Sales Engine', href: '/productos/mindflow-ai-sales-engine' },
    ],
  },
  {
    slug: 'seguros-y-cobranzas',
    title: 'IA para Seguros y Cobranzas',
    subtitle: 'Centraliza pólizas y cobros con trazabilidad integral para mejor recuperación de cartera.',
    problemPoints: ['Cobros tardíos', 'Seguimiento disperso', 'Baja visibilidad del ciclo de póliza'],
    valuePoints: ['Cobranza automatizada', 'Mejor trazabilidad', 'Renovaciones más proactivas'],
    recommendedProducts: [
      { name: 'IAsistente Digital de Servicios - IADS', href: '/productos/iads' },
      { name: 'CCERP', href: '/productos/ccerp' },
    ],
  },
  {
    slug: 'sector-publico-y-comunidades',
    title: 'IA para Sector Público y Comunidades',
    subtitle: 'Digitaliza servicios y acelera respuesta ciudadana con plataformas orientadas a impacto.',
    problemPoints: ['Procesos lentos para usuarios', 'Baja coordinación entre áreas', 'Difícil seguimiento de casos'],
    valuePoints: ['Atención más ágil', 'Mayor trazabilidad', 'Servicios más confiables para la ciudadanía'],
    recommendedProducts: [
      { name: 'Mi Mascotica', href: '/productos/pawtrack' },
      { name: 'VoiceBot Multi-Tenant', href: '/productos/voicebot' },
    ],
  },
])

export const roles: MarketPage[] = validateMarketPagesContent([
  {
    slug: 'ceo',
    title: 'Soluciones para CEOs',
    subtitle: 'Visibilidad ejecutiva y escalabilidad con foco en crecimiento y control.',
    problemPoints: ['Datos fragmentados', 'Poca visibilidad de operaciones', 'Decisiones lentas por falta de contexto'],
    valuePoints: ['KPIs ejecutivos claros', 'Mejor control estratégico', 'Priorización por impacto'],
    recommendedProducts: [
      { name: 'MindFlow AI Sales Engine', href: '/productos/mindflow-ai-sales-engine' },
      { name: 'MindFlow', href: '/productos/mindflow' },
    ],
  },
  {
    slug: 'coo',
    title: 'Soluciones para COO',
    subtitle: 'Automatiza procesos críticos y mejora eficiencia transversal de la operación.',
    problemPoints: ['Flujos manuales', 'Cuellos de botella recurrentes', 'Escalabilidad limitada'],
    valuePoints: ['Procesos más fluidos', 'Menos fricción operativa', 'Escalado sostenible'],
    recommendedProducts: [
      { name: 'MindFlow AI Sales Engine', href: '/productos/mindflow-ai-sales-engine' },
      { name: 'CCERP', href: '/productos/ccerp' },
    ],
  },
  {
    slug: 'rrhh',
    title: 'Soluciones para RRHH',
    subtitle: 'Reduce carga administrativa y fortalece cumplimiento con trazabilidad real.',
    problemPoints: ['Alto tiempo en tareas repetitivas', 'Errores en cálculos', 'Procesos sin auditoría clara'],
    valuePoints: ['Automatización de nómina', 'Cumplimiento normativo', 'Mejor experiencia del colaborador'],
    recommendedProducts: [{ name: 'PlanillasCR', href: '/productos/planillascr' }],
  },
  {
    slug: 'servicio-al-cliente',
    title: 'Soluciones para Líderes de Servicio al Cliente',
    subtitle: 'Atención más rápida, consistente y escalable en todos los canales.',
    problemPoints: ['SLA inestable', 'Sobrecarga de agentes', 'Experiencia inconsistente'],
    valuePoints: ['Atención omnicanal', 'Escalamiento automático', 'Control de calidad'],
    recommendedProducts: [{ name: 'VoiceBot Multi-Tenant', href: '/productos/voicebot' }],
  },
])

export const industryBySlug = Object.fromEntries(industries.map((item) => [item.slug, item]))
export const roleBySlug = Object.fromEntries(roles.map((item) => [item.slug, item]))
