import { validateProductsContent } from "@/lib/content-schema";
import { Product } from "@/lib/types";

export const products: Product[] = validateProductsContent([
  {
    slug: "voicebot",
    name: "VoiceBot Multi-Tenant",
    shortDescription:
      "Plataforma enterprise de atencion omnicanal con IA para contact centers modernos.",
    heroTitle:
      "VoiceBot Multi-Tenant para una operacion omnicanal enterprise sin friccion",
    heroSubtitle:
      "Automatiza conversaciones en voz y mensajeria con IA entrenada para responder, escalar y registrar cada interaccion con control multi-tenant y enfoque LATAM.",
    heroStats: [
      { label: "SLA objetivo", value: "98.4%" },
      { label: "Disponibilidad", value: "24/7" },
      { label: "Canales conectables", value: "5+" },
    ],
    problem: [
      "Altos tiempos de espera",
      "Baja consistencia en respuestas",
      "Costos operativos crecientes",
    ],
    solution: [
      "Enrutamiento inteligente",
      "Asistentes entrenables por negocio",
      "Monitoreo en tiempo real",
    ],
    benefits: [
      "Disponibilidad 24/7",
      "Mejor experiencia de cliente",
      "Escalado por unidad de negocio",
    ],
    features: [
      "Motor conversacional IA",
      "Panel de supervision",
      "Integracion con CRM y ticketing",
    ],
    audiences: [
      "Contact centers",
      "Equipos de servicio al cliente",
      "Operaciones omnicanal",
    ],
    integrations: [
      "Telefonia IP",
      "WhatsApp",
      "CRM",
      "Mesa de ayuda",
      "Power BI",
    ],
    differentiators: [
      "Modelos entrenables por linea de negocio",
      "Escalado inteligente con contexto",
      "Trazabilidad de conversaciones y SLA",
    ],
    showcase: [
      {
        title: "Enrutamiento inteligente",
        detail:
          "Clasifica interacciones y redirige segun prioridad, tipo de cliente y canal.",
        accent: "bg-orange-400",
      },
      {
        title: "Vista de supervisión",
        detail:
          "Monitorea volumen, tiempos de respuesta y resolucion por agente o bot.",
        accent: "bg-sky-400",
      },
      {
        title: "Panel de calidad",
        detail:
          "Detecta desvíos de experiencia y conversa con datos, no con intuición.",
        accent: "bg-blue-400",
      },
    ],
    faq: [
      {
        question: "Se integra con canales existentes?",
        answer:
          "Si, VoiceBot puede conectarse con telefonia IP, WhatsApp, webchat y otros canales empresariales.",
      },
      {
        question: "Cuanto tarda la implementacion?",
        answer:
          "En promedio, una version inicial operativa puede estar lista entre 2 y 4 semanas.",
      },
    ],
  },
  {
    slug: "planillascr",
    name: "PlanillasCR",
    shortDescription: "Nomina y RRHH con cumplimiento legal para Costa Rica.",
    heroTitle: "PlanillasCR: cumplimiento legal y eficiencia en nomina",
    heroSubtitle:
      "Centraliza calculos de planilla, reportes y controles de RRHH con reglas actualizadas para el marco normativo costarricense.",
    heroStats: [
      { label: "Errores reducidos", value: "80%" },
      { label: "Tareas automatizadas", value: "12+" },
      { label: "Trazabilidad", value: "Full" },
    ],
    problem: [
      "Errores manuales en planilla",
      "Riesgo de incumplimiento legal",
      "Procesos lentos para RRHH",
    ],
    solution: [
      "Motor de reglas laborales",
      "Calculos automaticos",
      "Reportes auditables",
    ],
    benefits: [
      "80% menos errores",
      "Menos riesgo legal",
      "Mas tiempo para estrategia de talento",
    ],
    features: [
      "Planillas automatizadas",
      "Gestor de expedientes",
      "Alertas de cumplimiento",
    ],
    audiences: ["RRHH", "Finanzas", "Grupos empresariales"],
    integrations: ["ERP financiero", "Contabilidad", "Bancos", "BI ejecutivo"],
    differentiators: [
      "Actualización normativa orientada a Costa Rica",
      "Auditoría de cambios y cálculos",
      "Visibilidad operativa para RRHH y dirección",
    ],
    showcase: [
      {
        title: "Motor de reglas",
        detail:
          "Aplica cálculos laborales, validaciones y alertas sobre excepciones antes del cierre.",
        accent: "bg-orange-400",
      },
      {
        title: "Panel de cumplimiento",
        detail:
          "Resume incidencias, estados de aprobación y tareas críticas por periodo.",
        accent: "bg-sky-400",
      },
      {
        title: "Expediente digital",
        detail:
          "Centraliza documentos y trazabilidad de acciones para cada colaborador.",
        accent: "bg-blue-400",
      },
    ],
    faq: [
      {
        question: "Incluye actualizaciones legales?",
        answer:
          "Si, el sistema se actualiza para mantener reglas y calculos alineados a normativa vigente.",
      },
      {
        question: "Puede usarse en grupos empresariales?",
        answer:
          "Si, maneja multiples empresas con estructura multiempresa y permisos por rol.",
      },
    ],
  },
  {
    slug: "ccerp",
    name: "CCERP",
    shortDescription:
      "ERP multiempresa con inteligencia integrada para decisiones ejecutivas.",
    heroTitle: "CCERP: operacion centralizada con IA para escalar con control",
    heroSubtitle:
      "Gestiona finanzas, ventas, inventario y operaciones en una sola plataforma con visibilidad en tiempo real.",
    heroStats: [
      { label: "Visibilidad", value: "360°" },
      { label: "Empresas soportadas", value: "Multi" },
      { label: "Paneles clave", value: "10+" },
    ],
    problem: [
      "Datos fragmentados",
      "Poca trazabilidad",
      "Informes tardios para la gerencia",
    ],
    solution: [
      "Base de datos unificada",
      "Paneles ejecutivos",
      "Automatizacion de flujos",
    ],
    benefits: [
      "Decisiones mas rapidas",
      "Operacion conectada",
      "Escalabilidad multiempresa",
    ],
    features: [
      "Modulos financieros",
      "Control de inventario",
      "Asistente conversacional integrado",
      "Reporteria inteligente",
    ],
    audiences: ["Gerencia general", "Finanzas", "Operaciones"],
    integrations: ["Facturación", "Bancos", "CRM", "Inventario", "Power BI"],
    differentiators: [
      "Modelo multiempresa nativo",
      "Visibilidad ejecutiva en tiempo real",
      "Procesos integrados con IA conversacional sin sistemas aislados",
    ],
    showcase: [
      {
        title: "Centro financiero",
        detail:
          "Consolida flujo de caja, cuentas por pagar y rentabilidad por unidad en una sola vista.",
        accent: "bg-orange-400",
      },
      {
        title: "Cadena operativa",
        detail:
          "Conecta ventas, inventario y ejecución con alertas sobre desviaciones clave.",
        accent: "bg-sky-400",
      },
      {
        title: "Analítica ejecutiva",
        detail:
          "Muestra indicadores estratégicos con contexto y no solo reportes estáticos.",
        accent: "bg-blue-400",
      },
    ],
    faq: [
      {
        question: "CCERP reemplaza herramientas actuales?",
        answer:
          "Puede coexistir por fases y luego consolidar modulos para una transicion segura.",
      },
      {
        question: "Permite personalizaciones?",
        answer:
          "Si, se adapta a procesos y reglas internas con componentes configurables.",
      },
    ],
  },
  {
    slug: "mindflow",
    name: "MindFlow",
    shortDescription:
      "Motor de ventas automatizadas para convertir leads en ingresos con disciplina y escala.",
    heroTitle:
      "MindFlow: ventas automatizadas para acelerar conversion y reducir fuga comercial",
    heroSubtitle:
      "Captura leads, los valida, los prioriza, los asigna y empuja el pipeline con reglas, seguimiento automatico, propuestas y onboarding sin depender de recordatorios manuales.",
    heroStats: [
      { label: "Pipeline", value: "Automated-first" },
      { label: "Seguimiento", value: "24/7" },
      { label: "Trazabilidad", value: "End-to-end" },
    ],
    problem: [
      "Leads entrando desde multiples canales sin orden",
      "Seguimiento manual e inconsistente",
      "Propuestas y cierres sin trazabilidad clara",
    ],
    solution: [
      "Intake validado por API",
      "Scoring y asignacion automatica",
      "Pipeline, reglas y onboarding conectados",
    ],
    benefits: [
      "Menos fuga de oportunidades",
      "Mas velocidad comercial",
      "Proceso de ingresos mas predecible",
    ],
    features: [
      "Captura de leads multi-canal",
      "Rules engine trigger-condition-action",
      "Pipeline Kanban con historial",
      "Automatizacion de correos, propuestas y onboarding",
    ],
    audiences: [
      "Direcciones comerciales",
      "Revenue operations",
      "Equipos de ventas B2B y multiunidad",
    ],
    integrations: [
      "Formularios web",
      "Campañas",
      "CRM",
      "Correo SMTP",
      "Power BI",
    ],
    differentiators: [
      "No actua como CRM pasivo: ejecuta la operacion comercial",
      "Politicas comerciales configurables sin recodificar",
      "Conecta preventa, cierre y onboarding en una sola cadena operativa",
    ],
    showcase: [
      {
        title: "Lead intake disciplinado",
        detail:
          "Normaliza, deduplica y protege la entrada para que ventas trabaje con contexto limpio desde el primer segundo.",
        accent: "bg-orange-400",
      },
      {
        title: "Rules engine comercial",
        detail:
          "Traduce eventos de negocio en acciones: scoring, prioridad, follow-ups, movimientos de pipeline y alertas.",
        accent: "bg-sky-400",
      },
      {
        title: "Cierre a onboarding sin friccion",
        detail:
          "Convierte oportunidades ganadas en clientes con tareas, secuencias y trazabilidad posterior a la venta.",
        accent: "bg-blue-400",
      },
    ],
    faq: [
      {
        question: "MindFlow reemplaza un CRM tradicional?",
        answer:
          "Puede complementar o reemplazar parte del CRM cuando el problema principal es ejecutar el proceso comercial con automatizacion y trazabilidad real.",
      },
      {
        question:
          "Se adapta a reglas comerciales distintas por unidad o marca?",
        answer:
          "Si, esta pensado para operar con reglas, asignaciones y automatizaciones configurables por tenant, equipo o criterio comercial.",
      },
    ],
  },
  {
    slug: "mindflow-ai-sales-engine",
    name: "MindFlow AI Sales Engine",
    shortDescription:
      "AI Sales Engine orientado a ingresos para ejecutar el ciclo comercial end-to-end con minima intervencion manual.",
    heroTitle:
      "MindFlow AI Sales Engine: revenue execution automatizada con control operativo y gobierno SaaS",
    heroSubtitle:
      "Orquesta intake, scoring, asignacion, pipeline, reglas, propuestas y onboarding en una arquitectura event-driven multi-tenant lista para escalar.",
    heroStats: [
      { label: "Operacion", value: "Automated-first" },
      { label: "Arquitectura", value: "Event-driven" },
      { label: "Tenancy", value: "SaaS-ready" },
    ],
    problem: [
      "CRM pasivo con alta carga manual",
      "Tiempos muertos entre etapas comerciales",
      "Baja trazabilidad en decisiones y automatizaciones",
    ],
    solution: [
      "Intake API-first con deduplicacion",
      "Rules engine trigger-condition-action",
      "Pipeline operativo con observabilidad y gobierno",
    ],
    benefits: [
      "Mayor conversion comercial",
      "Menos tareas repetitivas",
      "Operacion medible con KPIs de funnel, revenue, velocity y SLA",
    ],
    features: [
      "Lead intake canonico por API",
      "Scoring y asignacion inteligente",
      "Automatizacion de email/follow-ups por politicas",
      "Propuestas, cierre y onboarding post-venta",
    ],
    audiences: [
      "Direcciones comerciales enterprise",
      "Revenue operations",
      "Equipos SaaS multi-sede y multi-tenant",
    ],
    integrations: [
      "API externas de leads",
      "SMTP o webhook",
      "PostgreSQL",
      "Azure App Service",
      "Key Vault",
    ],
    differentiators: [
      "Modular monolith con clean architecture",
      "Gobierno tecnico con observabilidad y runbooks",
      "Ejecucion comercial end-to-end con minima intervencion manual",
    ],
    showcase: [
      {
        title: "Intake y orquestacion",
        detail:
          "Valida, normaliza, deduplica y enruta leads con reglas de negocio y prioridad comercial.",
        accent: "bg-orange-400",
      },
      {
        title: "Pipeline y automatizacion",
        detail:
          "Coordina cambios de etapa, follow-ups, propuestas y acciones por eventos de dominio auditables.",
        accent: "bg-sky-400",
      },
      {
        title: "Operacion y gobierno",
        detail:
          "Expone health, analytics avanzados y control operativo para escalar sin perder calidad.",
        accent: "bg-blue-400",
      },
    ],
    faq: [
      {
        question: "MindFlow AI Sales Engine reemplaza al CRM?",
        answer:
          "Puede coexistir o evolucionar desde un CRM tradicional cuando el objetivo es ejecutar revenue operations con mayor automatizacion y control.",
      },
      {
        question: "Esta listo para operacion multi-tenant?",
        answer:
          "Si, esta diseñado como SaaS multi-tenant con aislamiento por tenant, control por rol y politicas configurables.",
      },
    ],
  },
  {
    slug: "iads",
    name: "IAsistente Digital de Servicios - IADS",
    shortDescription:
      "Gestion integral de seguros con cobros, reclamos y trazabilidad automatizada.",
    heroTitle:
      "IAsistente Digital de Servicios - IADS: seguros, polizas y cobros en una plataforma inteligente",
    heroSubtitle:
      "Orquesta el ciclo completo de seguros desde emision hasta cobro y renovacion con visibilidad completa.",
    heroStats: [
      { label: "Cobranza asistida", value: "Auto" },
      { label: "Trazabilidad", value: "End-to-end" },
      { label: "Renovaciones", value: "Proactivas" },
    ],
    problem: [
      "Procesos dispersos",
      "Cobros tardios",
      "Baja trazabilidad operativa",
    ],
    solution: [
      "Flujos centralizados",
      "Automatizacion de cobros",
      "Seguimiento completo por poliza",
    ],
    benefits: [
      "Mejor recuperacion de cartera",
      "Mas control de riesgos",
      "Experiencia fluida para clientes",
    ],
    features: [
      "Gestion de polizas",
      "Motor de cobranzas",
      "Gestion de reclamos",
      "Chatbot operativo con IA",
      "Trazabilidad de eventos",
    ],
    audiences: ["Aseguradoras", "Corredores", "Operaciones de cobranza"],
    integrations: [
      "Pasarelas de pago",
      "Core de seguros",
      "CRM",
      "Notificaciones",
      "BI",
    ],
    differentiators: [
      "Ciclo completo de póliza y cobro",
      "Seguimiento fino por evento y cuenta",
      "Automatización de renovaciones y alertas",
    ],
    showcase: [
      {
        title: "Lifecycle de póliza",
        detail:
          "Controla emisión, renovaciones, endosos y estados operativos desde un mismo flujo.",
        accent: "bg-orange-400",
      },
      {
        title: "Cobro automatizado",
        detail:
          "Activa recordatorios, recaudo y seguimiento con reglas comerciales configurables.",
        accent: "bg-sky-400",
      },
      {
        title: "Torre de trazabilidad",
        detail:
          "Visualiza cada interacción y evento para mejorar control, auditoría y servicio.",
        accent: "bg-blue-400",
      },
    ],
    faq: [
      {
        question: "Puede adaptarse a corredores y aseguradoras?",
        answer:
          "Si, se configura para distintos modelos operativos y estructuras comerciales.",
      },
      {
        question: "Incluye recordatorios de renovacion?",
        answer:
          "Si, habilita notificaciones y automatizaciones para evitar perdida de cartera.",
      },
    ],
  },
  {
    slug: "pawtrack",
    name: "PawTrack CR / NALA",
    shortDescription:
      "Identidad digital y herramientas de recuperacion y cuidado para mascotas. Inspirado por NALA.",
    heroTitle: "PawTrack CR / NALA: identidad, recuperacion y cuidado",
    heroSubtitle:
      "Inspirado por NALA. Una plataforma de NovaMind Global para identificar mascotas por QR y coordinar su recuperacion. Consulta las funciones, planes y limites en PawTrack CR.",
    heroStats: [],
    problem: [
      "Reportes dispersos en redes sociales",
      "Falta de trazabilidad en busquedas",
      "Retrasos al coordinar hallazgos",
    ],
    solution: [
      "Descarga gratuita y registro inmediato",
      "Perfil unico por mascota",
      "Matching visual con IA, alertas y mapas de actividad",
    ],
    benefits: [
      "Acceso gratuito para la comunidad",
      "Reunificacion mas rapida",
      "Coordinacion colaborativa con mejor trazabilidad",
    ],
    features: [
      "QR inteligente",
      "Panel de reportes",
      "Matching por imagen",
      "Coordinacion operativa en campo",
      "Entrega segura con codigo de verificacion",
    ],
    audiences: [
      "Comunidades",
      "Municipalidades",
      "Organizaciones de bienestar animal",
    ],
    integrations: [
      "QR físico",
      "Mapas",
      "Notificaciones",
      "Cámara móvil",
      "Panel web",
    ],
    differentiators: [
      "Descarga gratuita y adopcion sin barreras",
      "Combinación de QR con matching visual",
      "Diseño para colaboración comunitaria",
    ],
    showcase: [
      {
        title: "Alta inmediata y gratuita",
        detail:
          "Cualquier persona puede descargar la app y registrar mascotas o reportes sin costo.",
        accent: "bg-orange-400",
      },
      {
        title: "Matching visual",
        detail:
          "Asiste el proceso de identificación con similitud por imagen y contexto del hallazgo.",
        accent: "bg-sky-400",
      },
      {
        title: "Coordinacion y entrega segura",
        detail:
          "Ordena reportes de campo y valida la reunificacion con un codigo de verificacion para reducir errores.",
        accent: "bg-blue-400",
      },
    ],
    faq: [
      {
        question: "PawTrack CR / NALA tiene costo?",
        answer:
          "PawTrack CR ofrece un alcance gratuito con limites definidos. Consulta los planes y las condiciones vigentes en pawtrackcr.com.",
      },
      {
        question: "Se pueden registrar multiples mascotas?",
        answer:
          "La cantidad de mascotas y las funciones disponibles dependen del plan. Consulta los limites vigentes en pawtrackcr.com.",
      },
    ],
  },
]);

export const productBySlug = Object.fromEntries(
  products.map((product) => [product.slug, product]),
);
