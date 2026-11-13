export type NovaAssistService = {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  audience: string;
  duration: string;
  limits: string[];
  includes: string[];
  excludes: string[];
  whenToChooseAnother: string;
  cardFeatures: string[];
  icon: "wrench" | "sparkles" | "gamepad" | "heart" | "home" | "users" | "house" | "briefcase";
  category: string;
};

export const novaAssistServices: NovaAssistService[] = [
  {
    slug: "visita-express",
    name: "Visita Express",
    tagline: "Resuelve un problema puntual.",
    problem: "¿Tienes un problema concreto con tu computadora o conexión?",
    audience: "Personas que necesitan diagnosticar o resolver un incidente principal.",
    duration: "1 visita · hasta 60 minutos · 1 incidente principal",
    limits: ["Una visita", "Un incidente principal", "Máximo 60 minutos"],
    includes: [
      "Diagnóstico básico de hardware, software, RAM, disco y temperaturas cuando sea posible.",
      "Revisión de procesos, programas de inicio, almacenamiento y consumo anormal de recursos.",
      "Actualizaciones básicas y revisión de drivers relacionados con el problema.",
      "Revisión básica de antivirus y escaneo rápido cuando corresponda.",
      "Revisión de Wi-Fi, señal, navegación y DNS o gateway cuando sea necesario.",
      "Diagnóstico, solución básica cuando sea posible y recomendación del siguiente paso.",
    ],
    excludes: [
      "Recuperación avanzada de datos, repuestos o reparaciones electrónicas.",
      "Migraciones completas o reinstalación completa del sistema.",
      "Limpieza física profunda o eliminación avanzada de malware.",
      "Cableado de red, múltiples incidentes independientes o soporte ilimitado.",
    ],
    whenToChooseAnother:
      "Si necesitas respaldo, limpieza o varias tareas de mantenimiento, revisa Visita Premium.",
    cardFeatures: ["1 incidente", "Diagnóstico", "Hasta 60 min", "Revisión básica"],
    icon: "wrench",
    category: "Resolver un problema",
  },
  {
    slug: "visita-premium",
    name: "Visita Premium",
    tagline: "Mantenimiento e intervención más completa.",
    problem: "¿Necesitas respaldo, optimización o varias tareas en un mismo equipo?",
    audience: "Personas que buscan una intervención más amplia que un diagnóstico puntual.",
    duration: "1 visita · hasta 120 minutos",
    limits: ["Una visita", "Máximo 120 minutos", "Tareas acordadas antes de iniciar"],
    includes: [
      "Incluye el diagnóstico básico descrito en Visita Express.",
      "Respaldo básico de carpetas previamente acordadas y configuración sencilla de OneDrive, Google Drive u otro almacenamiento compatible.",
      "Validación básica del respaldo; la cuenta y el espacio de almacenamiento corresponden al cliente.",
      "Instalación, actualización y configuración básica de software legítimo.",
      "Limpieza y mantenimiento físico básico cuando sea técnicamente apropiado.",
      "Optimización de inicio, almacenamiento, actualizaciones, drivers relevantes y aplicaciones innecesarias.",
    ],
    excludes: [
      "Licencias, repuestos, RAM o unidades SSD.",
      "Recuperación profesional de datos o reparaciones electrónicas.",
      "Migraciones complejas ni garantía absoluta de recuperación de información.",
    ],
    whenToChooseAnother:
      "Si tu necesidad es un incidente puntual, Visita Express puede ser suficiente. Si buscas soporte recurrente, compara Plan Familia y Total Home.",
    cardFeatures: ["Diagnóstico completo", "Respaldo básico", "Mantenimiento", "Hasta 120 min"],
    icon: "sparkles",
    category: "Mantenimiento completo",
  },
  {
    slug: "gamer",
    name: "Gamer",
    tagline: "Mejora los factores locales que afectan tu experiencia.",
    problem: "¿Quieres revisar tu equipo, configuración o red para jugar mejor?",
    audience: "Personas que juegan en PC y quieren revisar su configuración local.",
    duration: "Alcance y duración se confirman según el equipo y las tareas.",
    limits: ["Sin garantía de FPS, ping ni rendimiento de servicios externos"],
    includes: [
      "Revisión de CPU, GPU, RAM, almacenamiento y temperaturas.",
      "Revisión de drivers de GPU, resolución, frecuencia de monitor y perfil energético.",
      "Configuración compatible de gráficos, VSync, límite de FPS y tecnologías DLSS, FSR o XeSS cuando aplique.",
      "Revisión de Wi-Fi o Ethernet, conectividad y configuración básica de QoS si el router lo permite.",
    ],
    excludes: [
      "Garantías de FPS, ping o rendimiento del proveedor de Internet.",
      "Control sobre servidores de videojuegos o infraestructura de terceros.",
      "Repuestos, upgrades de hardware y reparaciones electrónicas.",
    ],
    whenToChooseAnother:
      "Si el problema ocurre en una sola aplicación o equipo fuera del gaming, Visita Express puede ser una mejor opción.",
    cardFeatures: ["Equipo y temperaturas", "GPU y gráficos", "Red local", "Sin promesas irreales"],
    icon: "gamepad",
    category: "Mejorar gaming",
  },
  {
    slug: "senior",
    name: "Senior",
    tagline: "Ayuda tecnológica clara, paciente y segura.",
    problem: "¿Quieres que una persona mayor use su tecnología con más confianza?",
    audience: "Adultos mayores y familiares que quieren acompañamiento tecnológico accesible.",
    duration: "Alcance y duración se confirman antes de coordinar.",
    limits: ["El cliente conserva el control de sus cuentas y credenciales"],
    includes: [
      "Ajustes de tamaño de texto, escala, contraste, lupa, volumen y accesos directos.",
      "Configuración y explicación de WhatsApp, correo, Zoom, Teams y videollamadas.",
      "Orientación sobre contraseñas seguras, phishing, enlaces sospechosos, falsos técnicos y señales de fraude.",
      "Soporte remoto solo con autorización, mediante una herramienta aprobada y limitado al incidente autorizado.",
      "MFA cuando corresponda; el cliente ingresa sus propios códigos privados.",
    ],
    excludes: [
      "Solicitar contraseñas bancarias, PIN, códigos privados o realizar pagos o transferencias.",
      "Guardar credenciales bancarias o asumir la identidad digital del cliente.",
      "Acceso remoto permanente sin autorización.",
    ],
    whenToChooseAnother:
      "Para un problema técnico puntual sin necesidad de acompañamiento, considera Visita Express.",
    cardFeatures: ["Ajustes accesibles", "Comunicación", "Prevención de fraude", "Tú controlas tus cuentas"],
    icon: "heart",
    category: "Ayuda para una persona mayor",
  },
  {
    slug: "smart-home",
    name: "Smart Home",
    tagline: "Configura un ecosistema doméstico conectado.",
    problem: "¿Necesitas conectar dispositivos inteligentes en tu hogar?",
    audience: "Personas que desean configurar dispositivos IoT compatibles en casa.",
    duration: "Hasta 3 dispositivos por servicio.",
    limits: ["Hasta 3 dispositivos", "Solo configuración tecnológica"],
    includes: [
      "Configuración de la aplicación, vinculación y Wi-Fi.",
      "Actualización de firmware cuando sea apropiado.",
      "Configuración de alertas, nombres, habitaciones e integración compatible con Alexa o Google Home.",
      "Revisión de contraseñas y MFA cuando exista, prueba funcional y explicación básica.",
    ],
    excludes: [
      "Más de 3 dispositivos, dispositivos físicos o suscripciones.",
      "Cableado estructurado, trabajo eléctrico, construcción o perforaciones importantes.",
      "Infraestructura CCTV compleja, NVR o DVR complejo.",
    ],
    whenToChooseAnother:
      "Para más de 3 dispositivos o trabajo eléctrico/de construcción, consulta el alcance antes de solicitar el servicio.",
    cardFeatures: ["Hasta 3 dispositivos", "Wi-Fi y aplicaciones", "Prueba funcional", "Sin trabajo eléctrico"],
    icon: "home",
    category: "Configurar hogar inteligente",
  },
  {
    slug: "plan-familia",
    name: "Plan Familia",
    tagline: "Soporte tecnológico continuo para tu familia.",
    problem: "¿Quieres tener ayuda disponible para los problemas tecnológicos cotidianos?",
    audience: "Hogares que quieren soporte recurrente para sus dispositivos familiares.",
    duration: "Suscripción residencial por período mensual.",
    limits: [
      "Hasta 5 dispositivos registrados y 5 usuarios residentes.",
      "4 horas de soporte remoto al mes; sesiones de hasta 60 minutos.",
      "1 visita al mes, de hasta 90 minutos.",
      "Objetivo de primera respuesta: hasta 8 horas laborales. No significa resolución en ese plazo.",
    ],
    includes: [
      "Soporte remoto y diagnóstico para Windows, macOS y aplicaciones comunes.",
      "Ayuda con Microsoft 365, OneDrive, Google Drive, iCloud, impresoras domésticas, navegadores y videollamadas.",
      "Actualizaciones, antivirus y seguridad básica.",
      "Configuración y verificación básica de respaldos; el almacenamiento cloud y suscripciones corresponden al cliente.",
      "Mantenimiento preventivo básico, controles parentales e historial de incidencias.",
      "Microsoft Family Safety, Apple Screen Time o Google Family Link cuando corresponda.",
    ],
    excludes: [
      "Horas o visitas no utilizadas de períodos anteriores.",
      "Hardware, repuestos, licencias, almacenamiento cloud y suscripciones.",
      "Empresa, servidores, infraestructura empresarial, desarrollo o soporte corporativo.",
      "Reparación electrónica, trabajo eléctrico y especialidades descritas en las exclusiones de planes.",
    ],
    whenToChooseAnother:
      "Si prefieres que Nova Assist dé seguimiento preventivo al entorno tecnológico del hogar, compara Total Home.",
    cardFeatures: ["Hasta 5 dispositivos", "4 h remotas/mes", "1 visita/mes", "Seguridad y respaldos"],
    icon: "users",
    category: "Soporte recurrente",
  },
  {
    slug: "total-home",
    name: "Total Home",
    tagline: "Administración preventiva de la tecnología de tu hogar.",
    problem: "¿Quieres seguimiento preventivo, no solo ayuda cuando surge un problema?",
    audience: "Hogares que quieren una visión y un seguimiento más amplio de su tecnología.",
    duration: "Suscripción residencial por período mensual.",
    limits: [
      "Hasta 8 dispositivos registrados y 8 usuarios residentes.",
      "8 horas de soporte remoto al mes; sesiones de hasta 90 minutos.",
      "2 visitas al mes, de hasta 120 minutos cada una.",
      "Atención prioritaria y objetivo de primera respuesta: hasta 4 horas laborales; no es una garantía de resolución.",
      "Técnico principal sujeto a disponibilidad.",
    ],
    includes: [
      "Todo el alcance de Plan Familia.",
      "Inventario tecnológico del hogar, historial de incidencias y seguimiento.",
      "Mantenimiento preventivo ampliado y revisión de red doméstica.",
      "Seguimiento de respaldos y ciclo de vida de dispositivos.",
      "Recomendaciones y un Home Technology Profile conceptual: dispositivos, red, respaldos, seguridad, salud, historial y recomendaciones.",
      "Clasificación orientativa de dispositivos: saludable, atención recomendada o upgrade/reemplazo recomendado.",
    ],
    excludes: [
      "Horas o visitas no utilizadas de períodos anteriores.",
      "Hardware, repuestos, licencias, almacenamiento cloud y suscripciones.",
      "Empresa, servidores, infraestructura empresarial, desarrollo o soporte corporativo.",
      "Reparación electrónica, trabajo eléctrico y especialidades descritas en las exclusiones de planes.",
    ],
    whenToChooseAnother:
      "Si solo buscas ayuda cuando aparece un problema, Plan Familia ofrece soporte recurrente sin administración preventiva ampliada.",
    cardFeatures: ["Hasta 8 dispositivos", "8 h remotas/mes", "2 visitas/mes", "Seguimiento preventivo"],
    icon: "house",
    category: "Administrar tecnología del hogar",
  },
  {
    slug: "it-ondemand",
    name: "IT OnDemand",
    tagline: "Soporte para empresas y necesidades corporativas.",
    problem: "¿Necesitas soporte para una empresa, servidores o infraestructura?",
    audience: "Organizaciones con múltiples usuarios, servidores o infraestructura empresarial.",
    duration: "Alcance, tiempos y condiciones se definen en una propuesta.",
    limits: ["Servicio empresarial; no está cubierto por Plan Familia ni Total Home"],
    includes: [
      "Evaluación del contexto empresarial y de la necesidad técnica.",
      "Definición de alcance, responsabilidades y condiciones antes de iniciar.",
      "Propuesta acorde a usuarios, sistemas e infraestructura involucrados.",
    ],
    excludes: [
      "Condiciones, precios, horarios o SLA no confirmados en una propuesta.",
      "Uso residencial del Plan Familia o Total Home para cubrir una empresa.",
    ],
    whenToChooseAnother:
      "Para necesidades tecnológicas residenciales, revisa Plan Familia o Total Home.",
    cardFeatures: ["Para empresas", "Usuarios y servidores", "Alcance acordado", "Consultar necesidad"],
    icon: "briefcase",
    category: "Empresa y necesidades corporativas",
  },
];

export const novaAssistServiceBySlug = Object.fromEntries(
  novaAssistServices.map((service) => [service.slug, service]),
) as Record<string, NovaAssistService>;

export const serviceAreas: string[] = [];

export const planPolicies = {
  family: {
    maxDevices: 5,
    maxUsers: 5,
    remoteHours: 4,
    remoteSessionMinutes: 60,
    visitsPerMonth: 1,
    visitMinutes: 90,
    responseTargetBusinessHours: 8,
  },
  totalHome: {
    maxDevices: 8,
    maxUsers: 8,
    remoteHours: 8,
    remoteSessionMinutes: 90,
    visitsPerMonth: 2,
    visitMinutes: 120,
    responseTargetBusinessHours: 4,
  },
  express: { maxIncidents: 1, durationMinutes: 60 },
  premium: { durationMinutes: 120 },
  smartHome: { maxDevices: 3 },
  policies: {
    hoursAndVisitsAccumulate: false,
    transferable: false,
    refundableOrCashEquivalent: false,
    residentialUseOnly: true,
    cancellationNoticeHours: 12,
    lateCancellationMayConsumeVisit: true,
    clientWaitMinutes: 15,
    deviceSubstitutionsPerMonth: 2,
    additionalBillableWorkRequiresAuthorization: true,
  },
};

export const additionalPlanExclusions = {
  hardware: ["SSD", "HDD", "RAM", "baterías", "pantallas", "cables", "cargadores", "adaptadores", "repuestos"],
  licenses: ["Windows", "Microsoft 365", "antivirus", "juegos", "aplicaciones", "suscripciones", "almacenamiento cloud"],
  specialistWork: [
    "Microsoldadura",
    "Reparación de motherboard",
    "Recuperación forense o física de datos",
    "Reparación electrónica",
    "Trabajos eléctricos",
    "Cableado estructurado",
    "Infraestructura empresarial",
  ],
};

export const novaAssistFaq = [
  { question: "¿Qué servicio necesito?", answer: "Usa el selector de servicios. Para un problema puntual, empieza por Visita Express; para respaldo o mantenimiento más amplio, revisa Visita Premium. Para soporte recurrente residencial compara Plan Familia y Total Home." },
  { question: "¿Cuál es la diferencia entre Express y Premium?", answer: "Express cubre un incidente principal en una visita de hasta 60 minutos. Premium permite una intervención de hasta 120 minutos e incluye respaldo básico, software y mantenimiento cuando sea técnicamente apropiado." },
  { question: "¿Qué sucede si en 60 minutos no se resuelve mi problema?", answer: "Te explicaremos el diagnóstico y las opciones disponibles. No continuaremos con un trabajo adicional facturable sin informarte y recibir tu autorización." },
  { question: "¿Me garantizan FPS o ping en Gamer?", answer: "No. Se revisan factores locales del equipo y la red, pero el resultado depende también del hardware, proveedor de Internet, juego y servidores externos." },
  { question: "¿Smart Home incluye trabajo eléctrico?", answer: "No. Smart Home cubre configuración tecnológica de dispositivos compatibles, no trabajos eléctricos, construcción ni cableado estructurado." },
  { question: "¿Qué incluye el Home Technology Profile?", answer: "Es un beneficio conceptual de Total Home para organizar información del entorno del hogar: dispositivos, red, respaldos, seguridad, salud, historial y recomendaciones. No muestra datos reales hasta que exista una solución privada y autenticada adecuada." },
  { question: "¿Nova Assist pide mis códigos bancarios o MFA?", answer: "No. Nova Assist nunca solicita contraseñas bancarias, PIN ni códigos privados. Tú mantienes el control de tus credenciales." },
  { question: "¿Los repuestos están incluidos?", answer: "No. Repuestos, componentes y otros materiales no están incluidos. Te explicaremos las opciones y cualquier costo antes de realizar trabajo adicional." },
  { question: "¿Las licencias están incluidas?", answer: "No. El costo de licencias, aplicaciones, antivirus, juegos y suscripciones corresponde al cliente, salvo que una propuesta indique expresamente otra cosa." },
  { question: "¿Cuántos dispositivos cubre Plan Familia?", answer: `Hasta ${planPolicies.family.maxDevices} dispositivos registrados y ${planPolicies.family.maxUsers} usuarios residentes.` },
  { question: "¿Cuántos dispositivos cubre Total Home?", answer: `Hasta ${planPolicies.totalHome.maxDevices} dispositivos registrados y ${planPolicies.totalHome.maxUsers} usuarios residentes.` },
  { question: "¿Las horas se acumulan?", answer: "No. Las horas y sesiones no utilizadas no se acumulan, transfieren ni convierten en crédito o dinero." },
  { question: "¿Las visitas se acumulan?", answer: "No. Las visitas incluidas aplican al período correspondiente y no se acumulan entre períodos." },
  { question: "¿Qué pasa si necesito más horas?", answer: "Cuéntanos qué necesitas. Te explicaremos el alcance disponible y cualquier costo adicional para que puedas autorizarlo antes de iniciar." },
  { question: "¿Qué significa primera respuesta?", answer: "Es el objetivo para recibir, clasificar e iniciar la coordinación del caso. No significa que el problema vaya a quedar resuelto dentro de ese plazo." },
  { question: "¿El servicio es 24/7?", answer: "No se ofrece atención 24/7 mediante estos planes. Los objetivos de primera respuesta indicados son en horas laborales." },
  { question: "¿Cómo funciona el soporte remoto?", answer: "Requiere tu autorización, utiliza una herramienta aprobada y se limita al incidente acordado. No implica acceso permanente." },
  { question: "¿Nova Assist guarda mis contraseñas?", answer: "No debes compartir contraseñas, PIN, códigos MFA ni datos bancarios. El técnico no los solicita ni debe almacenarlos." },
  { question: "¿Mis datos están seguros?", answer: "El acceso debe limitarse a la información necesaria para el servicio autorizado. No copies archivos ni compartas información sin autorización; consulta la política de privacidad para conocer el tratamiento de tus datos." },
  { question: "¿Pueden ayudarme con respaldos?", answer: "Visita Premium puede ayudar con carpetas acordadas y validar el respaldo de forma básica. Plan Familia y Total Home incluyen configuración y verificación básica; las cuentas y el almacenamiento cloud corresponden al cliente." },
  { question: "¿El backup garantiza recuperar toda mi información?", answer: "No. La verificación básica no garantiza la recuperación completa de toda la información. No se ofrece una garantía absoluta de recuperación." },
  { question: "¿Puedo cambiar un dispositivo de mi plan?", answer: `Plan Familia y Total Home permiten solicitar hasta ${planPolicies.policies.deviceSubstitutionsPerMonth} sustituciones mensuales, coordinadas y dentro de los límites operativos del plan. No se permite rotar dispositivos para ampliar artificialmente la cobertura.` },
  { question: "¿Puedo utilizar Plan Familia para mi empresa?", answer: "No. Los planes son residenciales y familiares; no incluyen empresas, servidores ni infraestructura corporativa. Para esas necesidades consulta IT OnDemand." },
  { question: "¿Qué sucede si necesito una reparación electrónica?", answer: "La reparación electrónica, microsoldadura y reparación de motherboard no están incluidas. Te explicaremos alternativas y cualquier costo antes de trabajo adicional." },
  { question: "¿Pueden instalar dispositivos Smart Home?", answer: `Sí, para configuración tecnológica de hasta ${planPolicies.smartHome.maxDevices} dispositivos compatibles. No incluye trabajo eléctrico, construcción ni cableado estructurado.` },
  { question: "¿Qué sucede si tengo más de 3 dispositivos Smart Home?", answer: "El servicio base cubre hasta tres dispositivos. Consulta disponibilidad y alcance antes de solicitar una configuración mayor." },
  { question: "¿Cómo cancelo una visita?", answer: `Con ${planPolicies.policies.cancellationNoticeHours} horas o más de anticipación, la visita no consume una visita incluida. Con menos anticipación puede considerarse utilizada. Si el cliente no está disponible, la espera máxima es de ${planPolicies.policies.clientWaitMinutes} minutos. Se pueden considerar circunstancias excepcionales.` },
  { question: "¿Cómo solicito soporte?", answer: "Completa el formulario de solicitud y comparte solo la información necesaria para describir el problema. No incluyas contraseñas, PIN, códigos MFA ni datos de tarjeta." },
  { question: "¿Cómo sé si tienen cobertura en mi zona?", answer: "La cobertura y disponibilidad se confirman antes de coordinar. Consulta disponibilidad indicando tu zona; no se presume cobertura nacional." },
];

export const serviceFaqQuestions: Record<string, string[]> = {
  "visita-express": [
    "¿Qué servicio necesito?",
    "¿Qué sucede si en 60 minutos no se resuelve mi problema?",
    "¿Los repuestos están incluidos?",
    "¿Cómo solicito soporte?",
  ],
  "visita-premium": [
    "¿Cuál es la diferencia entre Express y Premium?",
    "¿Pueden ayudarme con respaldos?",
    "¿El backup garantiza recuperar toda mi información?",
    "¿Las licencias están incluidas?",
  ],
  gamer: [
    "¿Me garantizan FPS o ping en Gamer?",
    "¿Qué sucede si necesito más horas?",
    "¿Los repuestos están incluidos?",
    "¿Cómo solicito soporte?",
  ],
  senior: [
    "¿Nova Assist pide mis códigos bancarios o MFA?",
    "¿Nova Assist guarda mis contraseñas?",
    "¿Cómo funciona el soporte remoto?",
    "¿Mis datos están seguros?",
  ],
  "smart-home": [
    "¿Pueden instalar dispositivos Smart Home?",
    "¿Qué sucede si tengo más de 3 dispositivos Smart Home?",
    "¿Smart Home incluye trabajo eléctrico?",
    "¿Cómo sé si tienen cobertura en mi zona?",
  ],
  "plan-familia": [
    "¿Cuántos dispositivos cubre Plan Familia?",
    "¿Las horas se acumulan?",
    "¿Las visitas se acumulan?",
    "¿Qué significa primera respuesta?",
    "¿Puedo utilizar Plan Familia para mi empresa?",
  ],
  "total-home": [
    "¿Cuántos dispositivos cubre Total Home?",
    "¿Qué incluye el Home Technology Profile?",
    "¿Qué significa primera respuesta?",
    "¿Las horas se acumulan?",
    "¿Puedo cambiar un dispositivo de mi plan?",
  ],
  "it-ondemand": [
    "¿Puedo utilizar Plan Familia para mi empresa?",
    "¿Qué servicio necesito?",
    "¿Cómo solicito soporte?",
  ],
};

export const additionalWorkSteps = [
  "Detectar",
  "Explicar",
  "Cotizar",
  "El cliente autoriza",
  "Ejecutar",
];
