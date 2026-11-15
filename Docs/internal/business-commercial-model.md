# Modelo comercial interno: Business y Business Pro

## Propósito y límites

Este calculador compara costos y estructuras de precio para uso interno. No establece tarifas, costos, salarios, márgenes aprobados ni condiciones contractuales; tampoco publica precios, selecciona automáticamente un modelo ganador o modifica el contenido de Nova Assist. El módulo vive en `lib/business-commercial/model.ts` y no está conectado a una página, formulario, API o proceso de despliegue.

Todos los campos económicos y de carga son de entrada. Un valor cero debe ser una decisión explícita, no el sustituto de un dato desconocido. Si falta un dato requerido, el resultado queda `incomplete`, lista los campos faltantes y no presenta una estimación de costo como si fuera válida. Valores negativos, porcentajes fuera de rango o moneda mal formada producen `invalid`.

## Capacidades por tier

Las capacidades son etiquetas de alcance para segmentar análisis; no definen cantidades, cobertura, SLA ni contrato.

- **Business:** soporte recurrente, mantenimiento, incidencias, Microsoft 365 básico, seguridad básica, revisión de backup e historial.
- **Business Pro:** incluye las capacidades analíticas de Business más gestión preventiva, inventario, ciclo de vida, estandarización, roadmap tecnológico, identidad, cloud acordado, continuidad y revisión periódica.

## Variables de configuración requeridas

La configuración se valida con `businessCommercialModelSchema`, un schema Zod versionado (`1.0.0`).

| Grupo | Datos requeridos | Cómo recolectarlos |
|---|---|---|
| Contexto | tier (`business` o `business_pro`), código de moneda ISO 4217 | Aprobación de Producto/Finanzas; no deducir moneda por ubicación |
| Volumen | usuarios, endpoints, sedes | Inventario validado y límites de alcance aprobados por cliente |
| Horas al mes | remoto, onsite, desplazamiento, Microsoft 365, administración de endpoints, seguridad, backup, cloud, especialistas, service desk, fuera de horario y proyectos | Tickets y hojas de tiempo categorizados; separar proyectos y soporte fuera de alcance |
| Capacidad | horas disponibles al mes para el equipo asignable | Capacidad neta aprobada por Operaciones, excluyendo ausencias y trabajo no asignable |
| Costos horarios | costo cargado por hora para cada categoría operativa anterior, excepto fuera de horario y proyectos | Finanzas y Operaciones; incluir componentes salariales/carga que se aprueben y evitar doble conteo |
| Costos por unidad | costo mensual incremental por usuario, endpoint y sede, excluyendo horas, herramientas y licencias contabilizadas aparte | Facturas, contratos y telemetría de costos; usar cero únicamente si se verificó que no hay costo incremental |
| Costos mensuales | gasto de desplazamiento no laboral, herramientas, licencias internas | Facturas y asignación financiera; evitar duplicar gastos ya incluidos en costos unitarios |
| Política financiera | overhead, contingencia y margen bruto objetivo como fracciones entre cero y uno exclusivo | Definición y aprobación de Finanzas; no hay valores predeterminados |
| Políticas operativas | share onsite máximo, utilización máxima y horas mensuales máximas | Aprobación de Service Delivery; si se omiten, se informa que el umbral correspondiente no puede validarse |
| Opciones de precio | componentes para las modalidades que se desea comparar | Tarifas y bandas ingresadas por el responsable autorizado; no aceptar propuestas del navegador como configuración |
| Sensibilidad | cambios incrementales de carga por un usuario, endpoint, hora onsite y hora especialista | Estimar con históricos y revisar contra órdenes/tickets comparables |

## Fórmulas y definiciones

- **Costo directo laboral:** suma de horas por categoría multiplicadas por su costo horario.
- **Costo directo total:** costo laboral + costo mensual unitario por usuarios/endpoints/sedes + gastos de desplazamiento + herramientas + licencias internas.
- **Overhead:** costo directo total × tasa de overhead configurada.
- **Contingencia:** (costo directo total + overhead) × tasa de contingencia.
- **Costo mensual estimado:** costo directo + overhead + contingencia.
- **Capacidad consumida:** horas de soporte, administración, especialidad y desplazamiento. Horas fuera de horario y de proyecto se detectan como alcance separado y no se suman al costo de soporte estimado.
- **Utilización:** capacidad consumida / capacidad disponible. Si la capacidad disponible es cero, la utilización queda indefinida (`null`).
- **Costo por cliente:** costo mensual del escenario de un cliente, no un promedio de una cartera.
- **Break-even:** ingreso mensual mínimo para cubrir el costo estimado de ese cliente (`breakEvenMonthlyRevenue = monthlyCost`). No calcula cantidad de clientes necesaria para cubrir costos fijos compartidos; el modelo no recibe esa estructura.
- **Precio objetivo matemático:** costo mensual / (1 - margen bruto objetivo). Es una referencia calculada, no un precio aprobado.
- **Margen bruto comparado:** (precio mensual - costo mensual) / precio mensual. Un precio cero no permite calcular un porcentaje de margen.
- **Sensibilidad:** diferencia entre el costo del escenario base y el escenario recalculado al sumar cada delta explícito. No infiere una carga por usuario o endpoint que no haya sido configurada.

El costo de horas se suma por categorías de servicio. Los costos unitarios deben excluir costos ya reflejados en horas, herramientas, licencias y desplazamiento para evitar duplicidades.

## Modelos de precio comparables

El schema permite comparar base mensual, por usuario, por endpoint, base más usuario, base más endpoint, base más usuario y endpoint, retainer, bandas por usuarios o endpoints y propuesta personalizada. Se calculan solo las opciones configuradas; el resultado no contiene una recomendación automática. Para bandas se requiere un rango explícito que coincida con el volumen analizado. El componente de especialista, si corresponde, se configura como cargo mensual explícito en cada opción.

## Guardrails

- Margen bruto negativo: precio inferior al costo mensual estimado.
- Onsite, utilización y consumo: se comparan solo cuando el responsable configura los umbrales aprobados; no hay umbrales implícitos.
- Especialidad no cobrada por separado: hay horas de especialista y ninguna opción incorpora un cargo mensual explícito de especialista.
- Herramientas/licencias no cubiertas: el precio no cubre herramientas, licencias y costos mensuales de unidad/desplazamiento conocidos. No sustituye el análisis de margen total.
- Usuarios/endpoints que crecen sin ajuste: un escenario incremental aumenta el volumen, pero el precio de esa opción no cambia.
- Fuera de horario y proyecto: se reportan como alcance separado; no se contabilizan silenciosamente como soporte recurrente.
- Scope creep: el límite de horas mensual solo puede comprobarse si se configura. Si no está configurado y hay horas de soporte, el resultado advierte que el guardrail no es evaluable.

Las reglas son alertas para revisión humana, no decisiones de cotización ni modificaciones contractuales.

## Política de revisión propuesta

Recolectar datos reales de tickets, horas, inventario, facturas, licencias y capacidad asignable; excluir PII y descripciones libres del conjunto de análisis siempre que no sean necesarias. Finance y Service Delivery deben validar clasificación, asignación de costos y ausencia de doble conteo. Recalcular escenarios con datos representativos, contrastarlos con costos reales por cliente y documentar excepciones. Revisar además ante cambios de alcance, herramientas/licencias, mezcla de usuarios/endpoints/sedes, capacidad o costos de terceros. La cadencia recurrente debe ser acordada por Finanzas y Operaciones antes de adoptarla.

## Decisión pendiente y criterios de publicación

La dirección comercial debe aprobar costos de referencia, moneda, método de overhead/contingencia, márgenes objetivo, capacidades y límites de cada tier, tratamiento de proyectos/especialistas, cadencia de revisión y quién puede aprobar excepciones. No hay valores empresariales aprobados en este modelo.

Publicar **“desde”** solo después de disponer de datos históricos representativos, unidad de precio y banda de elegibilidad inequívocas, límites y exclusiones validados, costos completos, margen aprobado, procedimiento de revisión y aprobación legal/comercial. Publicar **“cotización”** mientras haya variables relevantes del entorno por levantar, trabajo especializado o de proyecto, onsite/desplazamiento no estimable, dependencias de licencias/terceros, o ausencia de umbrales y datos suficientes. No publicar ninguna cifra de este calculador sin aprobación independiente.

## Datos sintéticos de prueba

Los únicos valores numéricos de demostración están en `tests/unit/business-commercial-model.test.ts`, son explícitamente sintéticos y solo prueban fórmulas, validación y alertas. No son salarios, costos, precios, márgenes ni escenarios reales y no deben copiarse a configuración de producción o a contenido público.
