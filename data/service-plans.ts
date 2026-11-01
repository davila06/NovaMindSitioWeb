// ─────────────────────────────────────────────────────────────────────────────
// Catálogo de soporte residencial y servicios de TI administrados.
// Todos los precios incluyen IVA (13 %)
// ─────────────────────────────────────────────────────────────────────────────

export type PaymentType = "single" | "monthly";

export type ServicePlan = {
  slug: string;
  name: string;
  /** Precio en colones costarricenses, IVA incluido */
  price: number;
  /** Etiqueta de precio legible (e.g. "₡19,500") */
  priceLabel: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
  cta: string;
  ctaHref: string;
  /** Tipo de pago: único por visita o suscripción mensual */
  paymentType: PaymentType;
  /** Duración mínima del servicio (e.g. "1 visita", "1 mes", "6 meses") */
  minDuration: string;
  /** Período de garantía sobre la intervención */
  guarantee: string;
  /** Limitaciones específicas del plan */
  limitations: string[];
  /** SLA de respuesta (solo planes con suscripción) */
  sla?: string;
  /** Política de cancelación (solo contratos de plazo fijo) */
  cancellationPolicy?: string;
};

// ─── Zonas de cobertura y recargos ───────────────────────────────────────────

export type CoverageZone = {
  name: string;
  surcharge: number; // 0 = incluido, 5000 = recargo menor, 10000 = recargo mayor
  label: string;
  examples: string[];
};

export const coverageZones: CoverageZone[] = [
  {
    name: "base",
    surcharge: 0,
    label: "Zona base incluida (≤ 10 km)",
    examples: [
      "San José centro",
      "Tibás",
      "Goicoechea",
      "Montes de Oca",
      "Desamparados",
      "Escazú",
      "Moravia",
      "Curridabat",
      "Alajuelita",
      "Aserrí",
      "Heredia centro",
      "San Pablo de Heredia",
      "San Isidro de Heredia",
      "Coronado",
      "La Unión",
      "Barva",
    ],
  },
  {
    name: "nearby",
    surcharge: 5000,
    label: "Recargo ₡5,000 (10–18 km)",
    examples: ["Santa Ana", "Alajuela centro", "Ciudad Colón"],
  },
  {
    name: "far",
    surcharge: 10000,
    label: "Recargo ₡10,000 (> 18 km)",
    examples: [
      "Cartago",
      "Puriscal",
      "Grecia",
      "Acosta",
      "Naranjo",
      "San Ramón",
      "Turrialba",
    ],
  },
];

// ─── ClickFix — Servicio residencial ─────────────────────────────────────────

export const homeSupportPlans: ServicePlan[] = [
  {
    slug: "express",
    name: "Visita Express",
    price: 19500,
    priceLabel: "₡19,500",
    tagline: "Diagnóstico rápido y solución en sitio.",
    paymentType: "single",
    minDuration: "1 visita",
    guarantee: "7 días",
    features: [
      "Visita técnica única (hasta 60 min)",
      "Diagnóstico de hardware y software",
      "Limpieza de virus y malware",
      "Informe básico de estado del equipo",
    ],
    limitations: [
      "No incluye soporte remoto post-visita",
      "No incluye visitas adicionales",
    ],
    cta: "Agendar Visita Express",
    ctaHref: "/contacto?plan=clickfix-express",
  },
  {
    slug: "premium",
    name: "Premium",
    price: 32000,
    priceLabel: "₡32,000",
    tagline: "Soporte completo con respaldo en nube.",
    paymentType: "single",
    minDuration: "1 visita",
    guarantee: "15 días",
    features: [
      "Todo lo incluido en Visita Express",
      "Respaldo de datos en nube (30 días)",
      "Optimización de sistema operativo",
      "Instalación de software esencial",
      "Limpieza física del equipo",
    ],
    limitations: [
      "No incluye visitas recurrentes",
      "Soporte remoto post-visita solo 7 días",
    ],
    highlight: true,
    cta: "Agendar Plan Premium",
    ctaHref: "/contacto?plan=clickfix-premium",
  },
  {
    slug: "familiar",
    name: "Familiar",
    price: 52000,
    priceLabel: "₡52,000",
    tagline: "Hasta 3 dispositivos, soporte mensual continuo.",
    paymentType: "monthly",
    minDuration: "1 mes",
    guarantee: "Suscripción activa",
    features: [
      "2 visitas mensuales incluidas",
      "Soporte remoto ilimitado",
      "Hasta 3 dispositivos del hogar",
      "Controles parentales configurados",
      "Respaldo en nube de todos los equipos",
    ],
    limitations: [
      "Visitas adicionales (fuera de las 2 mensuales) tienen costo extra",
    ],
    cta: "Agendar Plan Familiar",
    ctaHref: "/contacto?plan=clickfix-familiar",
  },
  {
    slug: "gamer",
    name: "Gamer",
    price: 45000,
    priceLabel: "₡45,000",
    tagline: "Rendimiento máximo para tu setup gamer.",
    paymentType: "single",
    minDuration: "1 visita",
    guarantee: "15 días",
    features: [
      "Optimización de drivers y GPU",
      "Limpieza y cambio de pasta térmica",
      "Configuración de red con QoS para gaming",
      "Ajuste de consolas y periféricos",
      "Reporte de temperatura y benchmark",
    ],
    limitations: ["Upgrades de hardware no incluidos en el precio"],
    cta: "Agendar Plan Gamer",
    ctaHref: "/contacto?plan=clickfix-gamer",
  },
  {
    slug: "senior",
    name: "Senior",
    price: 26000,
    priceLabel: "₡26,000",
    tagline: "Tecnología simple y segura para adultos mayores.",
    paymentType: "single",
    minDuration: "1 visita",
    guarantee: "15 días",
    features: [
      "Configuración accesible del equipo",
      "Instalación de apps de comunicación",
      "Protección anti-fraude y phishing",
      "Capacitación básica de uso (30 min)",
      "Soporte telefónico de seguimiento (15 días)",
    ],
    limitations: ["No incluye soporte remoto continuo"],
    cta: "Agendar Plan Senior",
    ctaHref: "/contacto?plan=clickfix-senior",
  },
  {
    slug: "smarthome",
    name: "SmartHome",
    price: 39000,
    priceLabel: "₡39,000",
    tagline: "Integración y configuración de dispositivos IoT.",
    paymentType: "single",
    minDuration: "1 visita",
    guarantee: "30 días",
    features: [
      "Configuración de Alexa, Google Home y similares",
      "Integración de hasta 5 dispositivos IoT",
      "Red Wi-Fi extendida y segmentada",
      "Configuración de cámaras de seguridad",
      "Guía de uso y control remoto",
    ],
    limitations: [
      "No incluye soporte remoto continuo",
      "No incluye visitas adicionales",
    ],
    cta: "Agendar Plan SmartHome",
    ctaHref: "/contacto?plan=clickfix-smarthome",
  },
  {
    slug: "total",
    name: "Total",
    price: 65000,
    priceLabel: "₡65,000",
    tagline: "Cobertura ilimitada con técnico asignado.",
    paymentType: "monthly",
    minDuration: "6 meses",
    guarantee: "Suscripción activa",
    sla: "Atención en menos de 4 horas en emergencias",
    cancellationPolicy:
      "Aviso con 30 días de anticipación · Penalización de 1 mes de servicio por cancelación anticipada",
    features: [
      "Visitas ilimitadas incluidas",
      "Soporte remoto 24/7",
      "Técnico asignado al cliente",
      "Backups automáticos mensuales en nube",
      "Revisión preventiva trimestral",
      "SLA < 4 h en emergencias",
    ],
    limitations: [
      "No incluye hardware nuevo (discos, memorias, etc.)",
      "Contrato mínimo de 6 meses, renovable automáticamente",
    ],
    highlight: true,
    cta: "Agendar Plan Total",
    ctaHref: "/contacto?plan=clickfix-total",
  },
];

// ─── ITOn-Demand — Servicio empresarial ──────────────────────────────────────

export const itManagedPlans: ServicePlan[] = [
  {
    slug: "basico",
    name: "Básico",
    price: 130000,
    priceLabel: "₡130,000",
    tagline: "Soporte técnico esencial para microempresas.",
    paymentType: "monthly",
    minDuration: "1 mes",
    guarantee: "Suscripción activa",
    sla: "Resolución en 48 h",
    features: [
      "Hasta 5 estaciones de trabajo",
      "Soporte remoto (Lunes–Viernes, 8–17 h)",
      "Mantenimiento preventivo mensual",
      "Gestión de incidentes con SLA 48 h",
      "Informe mensual de estado del parque tecnológico",
    ],
    limitations: [
      "No incluye soporte fuera de horario hábil",
      "No incluye soporte presencial ilimitado",
    ],
    cta: "Solicitar Plan Básico",
    ctaHref: "/contacto?plan=iton-basico",
  },
  {
    slug: "avanzado",
    name: "Avanzado",
    price: 320000,
    priceLabel: "₡320,000",
    tagline: "Soporte ampliado con ciberseguridad incluida.",
    paymentType: "monthly",
    minDuration: "1 mes",
    guarantee: "Suscripción activa",
    sla: "Resolución en 24 h",
    features: [
      "Hasta 20 estaciones de trabajo",
      "Soporte remoto y presencial (SLA 24 h)",
      "Ciberseguridad: antivirus, firewall y monitoreo",
      "Respaldo automático en nube (Microsoft Azure)",
      "Gestión de licencias y actualizaciones",
      "Informe quincenal de incidentes",
    ],
    limitations: ["Soporte presencial limitado a incidentes críticos"],
    highlight: true,
    cta: "Solicitar Plan Avanzado",
    ctaHref: "/contacto?plan=iton-avanzado",
  },
  {
    slug: "total-empresarial",
    name: "Total",
    price: 640000,
    priceLabel: "₡640,000",
    tagline: "Cobertura total de TI para operaciones críticas.",
    paymentType: "monthly",
    minDuration: "1 mes",
    guarantee: "Suscripción activa",
    sla: "Incidentes críticos en 4 h",
    features: [
      "Estaciones ilimitadas",
      "Soporte 24/7 con técnico asignado",
      "NOC básico: monitoreo proactivo de red",
      "Respaldo y recuperación ante desastres",
      "Auditoría de seguridad semestral",
      "SLA 4 h para incidentes críticos",
    ],
    limitations: ["Hardware de reemplazo no incluido"],
    cta: "Solicitar Plan Total",
    ctaHref: "/contacto?plan=iton-total",
  },
  {
    slug: "startup",
    name: "Startup",
    price: 190000,
    priceLabel: "₡190,000",
    tagline: "Stack tecnológico listo para operar desde el día 1.",
    paymentType: "monthly",
    minDuration: "1 mes",
    guarantee: "Suscripción activa",
    features: [
      "Hasta 10 usuarios",
      "Configuración de correo, dominio y nube",
      "Microsoft 365 Business Basic (hasta 5 licencias)",
      "Onboarding tecnológico guiado",
      "Soporte remoto durante 90 días",
    ],
    limitations: [
      "Licencias adicionales tienen costo extra",
      "Soporte presencial no incluido",
    ],
    cta: "Solicitar Plan Startup",
    ctaHref: "/contacto?plan=iton-startup",
  },
  {
    slug: "compliance",
    name: "Compliance",
    price: 380000,
    priceLabel: "₡380,000",
    tagline: "Cumplimiento normativo TI para sectores regulados.",
    paymentType: "monthly",
    minDuration: "1 mes",
    guarantee: "Suscripción activa",
    sla: "Resolución en 12 h",
    features: [
      "Auditoría de cumplimiento (ISO 27001 / GDPR-CR)",
      "Gestión de accesos e identidades (IAM)",
      "Cifrado de datos en reposo y en tránsito",
      "Políticas de retención y eliminación segura",
      "Reporte ejecutivo de brecha regulatoria",
    ],
    limitations: ["Implementaciones de código fuera del alcance"],
    cta: "Solicitar Plan Compliance",
    ctaHref: "/contacto?plan=iton-compliance",
  },
  {
    slug: "cloudfirst",
    name: "CloudFirst",
    price: 255000,
    priceLabel: "₡255,000",
    tagline: "Migración y operación cloud sin fricciones.",
    paymentType: "monthly",
    minDuration: "1 mes",
    guarantee: "Suscripción activa",
    features: [
      "Diagnóstico de infraestructura on-premise",
      "Plan de migración a Azure con roadmap",
      "Migración de hasta 3 servidores o servicios",
      "VPN y acceso remoto seguro configurado",
      "Monitoreo de recursos cloud con dashboards",
      "Capacitación al equipo interno (4 h)",
    ],
    limitations: [
      "Servidores adicionales a los 3 incluidos tienen costo extra",
    ],
    highlight: true,
    cta: "Solicitar Plan CloudFirst",
    ctaHref: "/contacto?plan=iton-cloudfirst",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    price: 770000,
    priceLabel: "₡770,000",
    tagline: "TI gestionada de nivel enterprise con gobierno incluido.",
    paymentType: "monthly",
    minDuration: "6 meses",
    guarantee: "Suscripción activa",
    sla: "Incidentes críticos en 2 h",
    cancellationPolicy:
      "Aviso con 30 días de anticipación · Penalización de 1 mes por cancelación anticipada",
    features: [
      "CTO as a Service (8 h/mes)",
      "Arquitectura cloud diseñada a medida",
      "Integración con ERP/CRM existentes",
      "NOC completo: monitoreo 24/7",
      "DR, alta disponibilidad y failover",
      "Compliance continuo y reportería ejecutiva",
      "SLA 2 h para incidentes críticos",
    ],
    limitations: [
      "Horas de CTO adicionales a las 8 mensuales tienen tarifa extra",
    ],
    cta: "Solicitar Plan Enterprise",
    ctaHref: "/contacto?plan=iton-enterprise",
  },
];

// ─── Condiciones generales de soporte residencial ────────────────────────────

export const homeSupportConditions = {
  coverageRadius:
    "10 km desde San José centro (Parque Central como referencia)",
  surchargeNearby:
    "₡5,000 — Santa Ana, Alajuela centro, Ciudad Colón (10–18 km)",
  surchargeFar:
    "₡10,000 — Cartago, Puriscal, Grecia y zonas fuera de GAM (> 18 km)",
  paymentMethods: [
    "SINPE Móvil",
    "Tarjeta de crédito/débito",
    "Transferencia bancaria",
  ],
  annualDiscount:
    "15% de descuento al prepagar 12 meses en planes de suscripción",
  payAsYouGo:
    "Para zonas fuera de GAM: tarifa base del plan + ₡5,000 por cada 5 km adicionales",
  latePaymentPenalty: "5% mensual sobre saldo pendiente",
  slaCredit:
    "20% de crédito en factura mensual si no se cumple el SLA (planes suscripción)",
  privacy: "Protección de datos conforme a Ley 8968 (Costa Rica) y GDPR",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const homeSupportBySlug = Object.fromEntries(
  homeSupportPlans.map((p) => [p.slug, p]),
);
export const itManagedBySlug = Object.fromEntries(
  itManagedPlans.map((p) => [p.slug, p]),
);
