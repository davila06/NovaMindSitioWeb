export type BusinessService = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  audience: string;
  need: string;
  why: string;
  capabilities: string[];
  included: string[];
  excluded: string[];
  useCases: string[];
  relatedServices: string[];
  cta: string;
  faq: { question: string; answer: string }[];
  keywords: string[];
  process?: string[];
};

const commonExclusions = [
  "Licencias, servicios de terceros y hardware no se consideran incluidos salvo indicación expresa en la propuesta.",
  "El alcance, disponibilidad y condiciones se confirman antes de iniciar; no se presume soporte ilimitado.",
];
const faq = [{
  question: "¿Cómo se define el alcance?",
  answer: "Revisamos la necesidad y acordamos el alcance y las condiciones en una propuesta antes de avanzar.",
}];

export const businessServices: BusinessService[] = [
  {
    slug: "it-ondemand", name: "IT OnDemand",
    tagline: "Especialistas IT cuando tu empresa los necesita.",
    description: "Apoyo puntual para incidentes y necesidades técnicas, tanto para empresas sin soporte permanente como para equipos IT.",
    audience: "Empresas y equipos de tecnología que requieren apoyo especializado puntual.",
    need: "Tenemos un problema puntual", why: "Permite revisar un incidente o necesidad concreta sin asumir un servicio continuo.",
    capabilities: ["Diagnóstico de incidentes y endpoints", "Windows, Microsoft 365, Teams y correo", "Impresoras, Wi-Fi, redes y VPN", "Identidad, respaldo, Azure y aplicaciones"],
    included: ["Evaluación del contexto y diagnóstico de la necesidad acordada.", "Configuración o apoyo técnico según la propuesta."],
    excluded: ["Administración continua o soporte ilimitado no se presumen incluidos.", ...commonExclusions],
    useCases: ["Resolver una incidencia", "Apoyar al equipo IT"], relatedServices: ["business", "microsoft-365", "business-networks"],
    cta: "Solicitar soporte IT", faq, keywords: ["soporte IT empresas Costa Rica", "soporte técnico empresarial"],
  },
  {
    slug: "business", name: "Business",
    tagline: "Soporte tecnológico recurrente para empresas que necesitan un equipo IT confiable.",
    description: "Acompañamiento recurrente de usuarios, equipos y herramientas empresariales según el alcance contratado.",
    audience: "Empresas que necesitan soporte tecnológico recurrente.",
    need: "Necesitamos soporte recurrente", why: "Está orientado al seguimiento de incidencias y necesidades cotidianas de la empresa.",
    capabilities: ["Soporte y configuración de usuarios", "Mantenimiento, actualizaciones e inventario básico de endpoints", "Outlook, Teams, OneDrive, SharePoint y MFA", "Protección, configuración de respaldos y recomendaciones", "Historial de solicitudes y seguimiento"],
    included: ["Soporte recurrente, incidencias y seguimiento según el servicio contratado.", "Revisión de equipos y herramientas acordadas."],
    excluded: ["Proyectos especializados y servicios fuera del alcance contratado.", ...commonExclusions],
    useCases: ["Atender incidencias", "Mantener equipos y usuarios"], relatedServices: ["business-pro", "it-ondemand", "microsoft-365"],
    cta: "Consultar Business", faq, keywords: ["IT outsourcing Costa Rica", "soporte técnico empresarial"],
  },
  {
    slug: "business-pro", name: "Business Pro",
    tagline: "Gestión tecnológica preventiva para empresas que necesitan más que soporte reactivo.",
    description: "Una evolución de Business con énfasis en seguimiento, gobierno y mejora del entorno tecnológico acordado.",
    audience: "Empresas que quieren administrar preventivamente su entorno tecnológico.",
    need: "Necesitamos gestionar la tecnología preventivamente", why: "Combina soporte acordado con inventario, estandarización y seguimiento preventivo.",
    capabilities: ["Inventario ampliado, ciclo de vida y estandarización", "Recomendaciones y roadmap tecnológico", "Administración de Microsoft 365 e identidad", "Gestión de endpoints y seguridad", "Soporte cloud, continuidad y seguimiento", "Responsable técnico de referencia cuando el servicio contratado lo contemple"],
    included: ["Capacidades de Business y gestión preventiva según el alcance contratado."],
    excluded: ["Las licencias de Intune, Defender y otras herramientas no se presumen incluidas.", ...commonExclusions],
    useCases: ["Organizar el entorno", "Planificar mejoras"], relatedServices: ["business", "microsoft-365", "azure-cloud", "cybersecurity", "power-platform", "ai-copilot"],
    cta: "Hablar sobre Business Pro", faq, keywords: ["gestión tecnológica empresarial", "IT outsourcing Costa Rica"],
  },
  {
    slug: "microsoft-365", name: "Microsoft 365 Services",
    tagline: "Colaboración y administración de Microsoft 365 con alcance claro.",
    description: "Configuración, migración, seguridad y adopción de herramientas Microsoft 365 para empresas.",
    audience: "Empresas que buscan organizar sus usuarios y herramientas de colaboración.",
    need: "Necesitamos ayuda con Microsoft 365", why: "Aborda usuarios, colaboración, identidad y configuración del entorno Microsoft 365.",
    capabilities: ["Exchange Online, Outlook y Teams", "OneDrive y SharePoint Online", "Usuarios, grupos y MFA", "Migración, seguridad, gobierno y adopción"],
    included: ["Evaluación y tareas de configuración o migración acordadas."],
    excluded: ["Las licencias necesarias no se consideran incluidas salvo que la propuesta comercial indique expresamente lo contrario.", ...commonExclusions],
    useCases: ["Migrar correo", "Implementar Teams", "Ordenar SharePoint", "Implementar MFA", "Administrar usuarios"],
    relatedServices: ["cybersecurity", "power-platform", "ai-copilot"], cta: "Hablar con un especialista",
    faq, keywords: ["Microsoft 365 Costa Rica", "soporte Microsoft 365 empresas"],
  },
  {
    slug: "azure-cloud", name: "Azure & Cloud",
    tagline: "Diseña y mejora tu entorno en la nube.",
    description: "Arquitectura, implementación y acompañamiento para entornos Azure y cloud.",
    audience: "Empresas que necesitan revisar o construir soluciones cloud.",
    need: "Necesitamos ayuda con Azure o cloud", why: "Ayuda a evaluar arquitectura, infraestructura y operaciones en la nube.",
    capabilities: ["Arquitectura, infraestructura y networking", "Identidad, almacenamiento y máquinas virtuales", "Aplicaciones e integración", "Seguridad, monitoreo, backup y recuperación", "Migración y optimización de recursos"],
    included: ["Evaluación y trabajo cloud acordado en la propuesta."], excluded: commonExclusions,
    useCases: ["Migrar a la nube", "Revisar arquitectura", "Resolver un problema", "Optimizar recursos", "Construir una solución"],
    relatedServices: ["cybersecurity", "backup-continuity", "technology-projects"], cta: "Hablar sobre mi proyecto",
    faq, keywords: ["Azure Costa Rica", "consultoría cloud Costa Rica"],
  },
  {
    slug: "cybersecurity", name: "Cybersecurity",
    tagline: "Reduce riesgos y fortalece la postura de seguridad de tu empresa.",
    description: "Evaluación y planificación de mejoras de seguridad adecuadas al contexto de la organización.",
    audience: "Empresas que quieren revisar y fortalecer sus controles.",
    need: "Queremos mejorar la seguridad", why: "Ayuda a identificar riesgos y priorizar mejoras sin prometer protección absoluta.",
    capabilities: ["Evaluación de identidad y MFA", "Endpoints y hardening", "Seguridad Microsoft 365 y Azure", "Revisión de exposición y concientización", "Recomendaciones y planificación de remediación"],
    included: ["Evaluación y recomendaciones según el alcance acordado."],
    excluded: ["No garantiza prevenir todos los ataques ni implica una certificación o prueba de penetración.", ...commonExclusions],
    useCases: ["Revisar controles", "Priorizar mejoras"], process: ["Evaluar", "Identificar", "Priorizar", "Remediar", "Mejorar"],
    relatedServices: ["microsoft-365", "azure-cloud", "backup-continuity"], cta: "Solicitar evaluación",
    faq, keywords: ["ciberseguridad empresas Costa Rica"],
  },
  {
    slug: "backup-continuity", name: "Backup & Business Continuity",
    tagline: "Prepárate para recuperar información y continuar operando ante una interrupción.",
    description: "Estrategia de respaldo y continuidad adaptada a las necesidades acordadas.",
    audience: "Empresas que necesitan revisar protección y recuperación de información.",
    need: "Necesitamos respaldos y recuperación", why: "Ayuda a definir qué proteger y cómo revisar la recuperación.",
    capabilities: ["Evaluación y estrategia", "Respaldos, retención y revisión", "Recuperación y pruebas", "Documentación, continuidad y disaster recovery cuando corresponda"],
    included: ["Revisión y configuración de respaldo o recuperación según la propuesta."],
    excluded: ["No se garantiza recuperación absoluta ni se incluye almacenamiento sin acuerdo.", ...commonExclusions],
    useCases: ["Revisar respaldos", "Preparar recuperación"],
    process: ["Qué respaldar", "Dónde", "Frecuencia", "Retención", "Recuperación", "Prueba"],
    relatedServices: ["azure-cloud", "cybersecurity", "business-pro"], cta: "Evaluar continuidad",
    faq, keywords: ["respaldo empresarial Costa Rica", "continuidad de negocio"],
  },
  {
    slug: "business-networks", name: "Business Networks",
    tagline: "Conectividad empresarial con una configuración comprensible.",
    description: "Diagnóstico y mejoras de redes empresariales según las necesidades del entorno.",
    audience: "Empresas que necesitan revisar o configurar su conectividad.",
    need: "Necesitamos mejorar la red", why: "Orienta el diagnóstico y la configuración de redes y acceso.",
    capabilities: ["LAN, Wi-Fi y VLAN", "Switching, routing y firewall", "VPN y segmentación", "Diagnóstico, optimización y documentación"],
    included: ["Evaluación y configuración de red acordadas."],
    excluded: ["Hardware, licencias, ISP, cableado y obra civil no se presumen incluidos.", ...commonExclusions],
    useCases: ["Revisar Wi-Fi", "Configurar acceso remoto"], relatedServices: ["it-ondemand", "cybersecurity", "technology-projects"],
    cta: "Consultar red empresarial", faq, keywords: ["redes empresariales Costa Rica"],
  },
  {
    slug: "power-platform", name: "Power Platform",
    tagline: "Convierte procesos manuales en soluciones digitales.",
    description: "Aplicaciones, automatización, análisis e integración para procesos empresariales.",
    audience: "Equipos que quieren simplificar procesos y conectar información.",
    need: "Queremos automatizar procesos", why: "Permite explorar aplicaciones, aprobaciones e integración para un proceso concreto.",
    capabilities: ["Power Apps, Power Automate y Power BI", "Dataverse, formularios y aprobaciones", "Dashboards, integración y gobierno"],
    included: ["Análisis y desarrollo del proceso acordado."],
    excluded: ["Las licencias premium y servicios externos no se presumen incluidos.", ...commonExclusions],
    useCases: ["Este proceso vive en Excel", "Las aprobaciones llegan por correo", "Necesitamos una aplicación interna", "Queremos conectar nuestros sistemas"],
    relatedServices: ["microsoft-365", "ai-copilot", "technology-projects"], cta: "Quiero automatizar un proceso",
    faq, keywords: ["Power Platform Costa Rica", "automatización empresas Costa Rica"],
  },
  {
    slug: "ai-copilot", name: "AI & Copilot",
    tagline: "Aplicamos inteligencia artificial a problemas reales de tu empresa.",
    description: "Exploración e implementación responsable de casos de uso de IA y asistentes.",
    audience: "Empresas que buscan evaluar un caso de uso de inteligencia artificial.",
    need: "Queremos explorar inteligencia artificial", why: "Ayuda a evaluar un caso de uso y su preparación antes de implementar.",
    capabilities: ["Microsoft Copilot, Copilot Studio y Azure AI", "Agentes, asistentes y búsqueda de conocimiento", "Integración y automatización asistida por IA", "Arquitectura, seguridad, gobierno y adopción"],
    included: ["Evaluación o implementación del caso de uso acordado."],
    excluded: ["No se garantiza un retorno o mejora específica, ni se presumen licencias incluidas.", ...commonExclusions],
    useCases: ["Explorar un asistente", "Conectar conocimiento empresarial"],
    process: ["Descubrir", "Caso de uso", "Preparación", "Prototipo", "Validar", "Implementar", "Gobernar", "Escalar"],
    relatedServices: ["microsoft-365", "power-platform", "technology-projects"], cta: "Explorar un caso de uso",
    faq, keywords: ["inteligencia artificial empresas Costa Rica", "Copilot empresas Costa Rica"],
  },
  {
    slug: "technology-projects", name: "Technology Projects",
    tagline: "Proyectos tecnológicos definidos alrededor de tu necesidad.",
    description: "Acompañamiento en diseño e implementación de iniciativas tecnológicas empresariales.",
    audience: "Empresas con una iniciativa de cambio o implementación tecnológica.",
    need: "Tenemos un proyecto tecnológico", why: "Ayuda a definir una propuesta y entregables antes de ejecutar.",
    capabilities: ["Discovery y arquitectura", "Microsoft 365, Azure y Power Platform", "Automatización, integración, DevOps e IA", "Modernización, migración e implementación", "Documentación y entrega"],
    included: ["Discovery, diseño y entregables según la propuesta aceptada."], excluded: commonExclusions,
    useCases: ["Planificar una migración", "Construir una solución"],
    process: ["Descubrir", "Definir alcance", "Propuesta", "Diseñar", "Implementar", "Validar", "Entregar"],
    relatedServices: ["azure-cloud", "power-platform", "ai-copilot"], cta: "Hablar sobre mi proyecto",
    faq, keywords: ["proyectos tecnológicos Costa Rica"],
  },
  {
    slug: "it-health-check", name: "IT Health Check",
    tagline: "Una conversación inicial para orientar tu necesidad tecnológica.",
    description: "Comparte un contexto general de tu empresa sin revelar credenciales ni detalles sensibles.",
    audience: "Empresas que no saben por dónde empezar.",
    need: "No sabemos por dónde empezar", why: "Recoge contexto general para orientar una conversación inicial, sin generar una calificación de seguridad.",
    capabilities: ["Contexto de empresa y modalidades de trabajo", "Equipos, Microsoft 365 y cloud", "Uso general de MFA, protección y respaldos", "Modelo de soporte y necesidad principal"],
    included: ["Orientación inicial basada en la información compartida."],
    excluded: ["No es una auditoría, certificación ni un diagnóstico de seguridad exhaustivo.", ...commonExclusions],
    useCases: ["Orientar una conversación inicial"], relatedServices: ["business", "business-pro", "cybersecurity"],
    cta: "Evaluar mi entorno", faq, keywords: ["evaluación tecnológica empresas Costa Rica"],
  },
];

export const businessServiceBySlug: Record<string, BusinessService> = Object.fromEntries(
  businessServices.map((service) => [service.slug, service]),
);
