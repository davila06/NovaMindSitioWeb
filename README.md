# Novamind Global Web Platform

Sitio corporativo construido con Next.js App Router, TypeScript estricto y Tailwind CSS, orientado a conversión comercial, SEO técnico, rendimiento y operación enterprise.

## Stack principal

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 3
- Zod para validación de payloads y contenido
- MDX local para contenido editorial del blog
- Cloudflare Email Service para entrega de leads en Workers; Resend y SMTP como alternativas

## Arquitectura del proyecto

- `app/`: rutas, layout global, metadata, API routes.
- `components/`: UI y secciones reutilizables.
- `data/`: catálogos de productos y contenido comercial estructurado.
- `data/nova-assist.ts`: fuente central de servicios, límites residenciales, exclusiones, preguntas frecuentes, políticas y zonas configuradas de Nova Assist.
- `content/blog/`: contenido editorial en MDX.
- `lib/`: utilidades de SEO, seguridad, contenido, analytics y monitoreo.
- `styles/`: estilos globales y sistema visual.
- `tests/unit/`: pruebas unitarias y de componentes con Vitest.
- `tests/e2e/`: flujos críticos E2E con Playwright.

## Nova Assist

La sección comercial vive en `/nova-assist`, con catálogo, páginas de servicio, selector interactivo, comparador de planes, guía del proceso, preguntas frecuentes, términos, privacidad y solicitud de ayuda. `/hogares` redirige permanentemente a la nueva experiencia para conservar enlaces existentes sin mantener dos catálogos.

Las páginas residenciales consumen `data/nova-assist.ts`. `data/service-plans.ts` conserva únicamente alias de contacto antiguos y cobertura todavía no confirmada; no debe usarse como fuente de alcance residencial ni comercial. La solicitud de Nova Assist reutiliza `/api/contact`, validación Zod, rate limiting, Turnstile, consentimiento de privacidad y la configuración de entrega existente. No solicita contraseñas, PIN, códigos MFA ni datos de tarjeta.

La validación operativa previa a un release está en [el runbook de staging](Docs/staging-release.md).

Nova Assist Business está en `/nova-assist/empresas`. Su catálogo, selector, comparador y páginas consumen `data/nova-assist-business.ts`; el enlace anterior `/nova-assist/it-ondemand` redirige a la ficha empresarial. Las solicitudes y el IT Health Check reutilizan el formulario protegido y `/api/contact`: el contexto opcional del Health Check se presenta para revisión antes del envío y no se envía a analytics. Precios, licencias, horarios, límites y condiciones empresariales se acuerdan en cada propuesta y no se presumen incluidos.

#### Clasificación interna de solicitudes

`lib/nova-assist-intent.ts` define `NovaAssistIntent` con `schemaVersion: "1.0.0"`. El endpoint existente `/api/contact` deriva la clasificación en el servidor a partir de planes y catálogos conocidos, y la incluye en la notificación de correo interna; no acepta una clasificación confiada al navegador ni agrega persistencia.

- Solicitudes del catálogo residencial → `home` / `residential_service`.
- `IT OnDemand`, `Business` y `Business Pro` → `business` / `business_support`.
- `IT Health Check` → `assessment`; `Technology Projects` → `consulting_project`; otros servicios empresariales y productos conocidos → `business_opportunity`.
- Intereses generales sin servicio conocido → `general_inquiry` con un `serviceId` de fallback estable.
- `source` solo toma categorías internas (`nova_assist_home`, `nova_assist_business`, `product_inquiry`, `contact_form`); no conserva UTM ni texto arbitrario.

La urgencia existente se normaliza sin score ni SLA: baja → `standard`, media → `soon`, alta/crítica → `urgent`. La preferencia `visit` se normaliza a `onsite`; remoto e indefinida se conservan como `remote` y `unsure`. `technologyAreas` usa etiquetas controladas por servicio. El formulario no recopila tamaño de empresa ni estado de IT interno como campos estructurados: `companySizeRange` y `hasInternalIT` quedan omitidos. `leadVolume` es volumen operativo, no cantidad de empleados. No se infieren estos campos ni áreas desde mensajes libres o respuestas del Health Check. La versión de consentimiento proviene de la versión de política ya usada por el endpoint (`2026-01`).

No hay zonas de servicio publicadas en la configuración central (`serviceAreas` está vacío); la interfaz indica que se consulta disponibilidad en la zona. Completa ese modelo solo cuando las áreas estén confirmadas. Precios, métodos de pago, disponibilidad, duración de suscripción, renovación y cancelación siguen pendientes de confirmación comercial.

#### Base de integración CRM

El endpoint valida consentimiento, Turnstile y rate limit, deriva `NovaAssistIntent` y crea el comando versionado `SubmitLeadCommand` (`1.0.0`). `LeadSubmissionService` depende de `LeadDestination`; la implementación registrada actualmente es `EmailLeadDestination`, que conserva la entrega existente. Los formularios no llaman directamente a correo, Dataverse ni a otra tecnología.

El comando solo contiene campos validados de contacto, clasificación, atribución limitada a los campos que ya se usan en el correo y auditoría del consentimiento. No contiene el objeto `Request`, IP, honeypot ni token de Turnstile. Los errores del destino se propagan al endpoint y mantienen la respuesta de entrega fallida; no se añadieron reintentos, cola ni almacenamiento.

**Dataverse no está conectado ni activado.** No se añadieron credenciales, URL de entorno, tenant/client IDs, tablas ni llamadas de red a Microsoft. Para implementar su adaptador hacen falta configuración aprobada, definición del mapeo contra el esquema real del entorno y una política acordada de idempotencia y fallos entre correo y CRM. Hasta entonces, el correo sigue siendo el único destino operativo.

#### Operaciones digitales de servicio

`lib/service-operations.ts` define contratos preliminares para solicitud, orden, cliente, ubicación, dispositivo, modalidad, plantilla y ejecución de checklist, hallazgos, acciones, recomendaciones, resultado, reporte, consentimiento, adjunto y técnico. La modalidad utiliza el mismo segmento e identificador de servicio de `NovaAssistIntent`; las ejecuciones referencian una versión de plantilla. Son tipos, no registros persistidos, validación de entrada ni una API operativa.

El envío de contacto sigue siendo solo una solicitud por correo: no crea una orden ni un reporte automáticamente. No existen checklists operativos aprobados por modalidad; no se deben convertir los alcances comerciales en tareas obligatorias sin validación operativa. Antes de usar estos contratos con datos reales se deben definir y aprobar autenticación y autorización por cliente/técnico y orden, almacenamiento cifrado, retención y eliminación, auditoría de acceso, control de concurrencia, gestión segura de adjuntos y distribución privada de reportes. Los identificadores no autorizan acceso y no se proporcionan enlaces públicos. No registrar credenciales ni datos sensibles innecesarios en notas, reportes o adjuntos.

## Scripts

- `npm run dev`: levanta entorno local.
- `npm run lint`: análisis estático con ESLint.
- `npm run typecheck`: regenera tipos de rutas de Next y ejecuta TypeScript; evita mezclar validadores de Next con tipos generados previamente por vinext.
- `npm run build`: build de producción.
- `npm run start`: ejecuta build en modo producción.
- `npm run test:unit`: ejecuta pruebas unitarias con cobertura.
- `npm run test:unit:watch`: modo watch para unit tests.
- `npm run test:e2e`: ejecuta pruebas E2E con Playwright.
- `npm run perf:assets`: genera variantes optimizadas de imágenes.
- `npm run perf:lhci:collect` y `npm run perf:lhci:assert`: recopilan y verifican Lighthouse CI localmente, sin subir informes.
- `npm run perf:lhci`: recopila, verifica y sube los informes al almacenamiento temporal público de LHCI.

## Variables de entorno

Usa `.env.example` como base.

### Contacto y entrega de leads

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

### Seguridad y hardening del formulario

- `CONTACT_RATE_LIMIT_MAX_REQUESTS`
- `CONTACT_RATE_LIMIT_WINDOW_MS`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: clave publica del widget. En Workers se utiliza la clave publica del sitio; el despliegue falla si no esta configurada. Una cadena vacia solo desactiva la UI en pruebas locales.
- `TURNSTILE_ENABLED`: `true` en los bindings de Workers; `false` para desarrollo local sin verificacion externa.
- `TURNSTILE_SECRET_KEY`: secreto de servidor, nunca en el repositorio ni en variables `NEXT_PUBLIC_*`. Se carga mediante `cf deploy --secrets-file` o GitHub Secrets.
- `TURNSTILE_TEST_BYPASS`: activa el bypass exclusivamente cuando `NODE_ENV=test`; no permite omitir la verificacion en produccion.

Contacto y ambos formularios de newsletter usan Turnstile. En produccion, la verificacion esta habilitada y falla de forma cerrada si falta configuracion; el servidor valida token, hostname y accion. Una falla temporal de Siteverify devuelve un error seguro y no envia correo. CI utiliza exclusivamente claves ficticias publicadas por Cloudflare; las pruebas automatizadas no sustituyen una prueba real en staging.

### Analytics

- `NEXT_PUBLIC_GA_ID`: GA4 de NovaMind Global Web, `G-NYG6JCK4S2`, flujo de `https://novamindglobalcr.com`. Este ID es el valor predeterminado del sitio si la variable no existe; una cadena vacia desactiva GA4 para pruebas y staging. Se configura al compilar, no como secreto ni binding del Worker.
- `NEXT_PUBLIC_GA_ENABLED`: debe ser `true` para cargar GA4 después del consentimiento. Por defecto está desactivado; habilitar solo después de comprobar en GA4 que la medición mejorada y los page views de navegación no reenvían URLs completas, y verificar las solicitudes de red.
- `NEXT_PUBLIC_CLARITY_ID`
- `NEXT_PUBLIC_CLARITY_ENABLED`: debe ser `true` para cargar Clarity después del consentimiento. Por defecto está desactivado; habilitar solo tras verificar configuración de masking y grabación de sesión con datos ficticios.

La cuenta NovaMind Global y su propiedad son independientes de PawTrack CR. Las etiquetas se cargan solo al aceptar cookies de analitica y si su bandera de privacidad está habilitada; los eventos personalizados se bloquean tras revocar el consentimiento. La configuración GA4 del sitio desactiva page views automáticos, Google Signals y personalización publicitaria, y usa una ubicación de página sin query/referrer por defecto. Los eventos Nova Assist actualizan la ubicación GA a una ruta cerrada y sin query. No instalar una segunda etiqueta manual ni usar el ID de PawTrack. Tras publicar y aprobar la configuración externa, aceptar cookies en el sitio y comprobar la actividad en el informe En tiempo real de esta propiedad; los informes habituales pueden tardar hasta 48 horas.

#### Funnel de Nova Assist

Los eventos propios de Nova Assist son analítica opcional y pasan por una allowlist de nombres, propiedades y valores; no se registran sin consentimiento. La solicitud y su consentimiento de privacidad son funciones necesarias independientes de las cookies analíticas. No se envían eventos de marketing de este funnel. Las acciones anteriores al consentimiento no se almacenan ni reproducen. La vista actual se registra después del consentimiento cuando el proveedor está disponible; otras acciones ocurridas antes de que cargue pueden perderse.

- Navegación: `nova_assist_landing_view`, `nova_assist_segment_selected`, `service_detail_viewed`, `plan_comparison_viewed`, `service_cta_clicked`.
- Selector: `service_selector_started`, `service_selector_answered`, `service_recommended`.
- Solicitud: `service_request_started`, `service_request_validation_failed`, `service_request_submitted`, `service_request_succeeded`, `service_request_failed`. El inicio es la primera edición; envío es un intento real; éxito requiere respuesta positiva no protegida. Una respuesta protegida no confirma entrega.
- Health Check: `health_check_started`, `health_check_step_completed`, `health_check_reviewed`, `health_check_submitted`, `health_check_succeeded`, `health_check_failed`. Los pasos son acciones de selección, no respuestas ni un avance obligatorio; las preguntas son opcionales.

Propiedades permitidas, cuando aplican: `segment`, `service_id` del catálogo, `selector_version`, `route` de una lista cerrada sin parámetros, `cta_position`, `step_number`, `step_name`, `outcome`, `error_category`, `viewport_category` y `referrer_category`. Los valores también están restringidos; no se usan identificadores de correlación. Se descartan nombres, correos, empresa, direcciones, mensajes, respuestas, tokens, credenciales y cualquier propiedad no autorizada. El formulario puede transmitir datos necesarios a la API de contacto, pero no a estos eventos.

Para analizar Home y Business, filtrar por `segment` y comparar: selección de segmento / vistas de landing; inicios de selector / vistas; recomendaciones / inicios; vistas de detalle / recomendaciones; inicios de solicitud / vistas de detalle; éxitos / intentos de envío. Health Check: revisiones / inicios y éxitos / envíos. Error rate: fallos / envíos; interés: recomendaciones agrupadas por `service_id`; distribución Home/Business: selecciones agrupadas por `segment`. Estos cocientes de eventos no representan conversiones individuales ni embudos deduplicados por usuario: un visitante puede interactuar varias veces, saltarse pasos o llegar por enlaces directos. Sin identificador de sesión aprobado, no se puede reconstruir un funnel individual; no hay metas aprobadas ni datos reales hasta recoger tráfico válido.

Ejemplos de informes agregados: recomendaciones por segmento y servicio durante un período; intentos, éxitos y fallos por segmento y categoría de error; inicios, revisiones y envíos de Health Check. Interpretar siempre los conteos con las limitaciones anteriores y sin incluir textos de formularios.

**Bloqueo de privacidad previo a activar medición en producción:** las banderas están desactivadas por defecto porque la configuración externa no se puede certificar desde el repositorio. Antes de activarlas, revisar GA4 para deshabilitar page views por historial y eventos de medición mejorada que puedan capturar URLs o contenido, y confirmar que las rutas/query parameters no aparecen en solicitudes. Revisar masking, captura de página y grabaciones de Clarity. Verificar solicitudes de red y revocación de consentimiento en staging con datos ficticios. Si no puede garantizarse la exclusión de datos personales, mantener desactivadas las banderas del proveedor afectado.

### Monitoreo

- `MONITORING_WEBHOOK_URL` (opcional): webhook para alertas de errores capturados en frontend y backend.
- `MONITORING_WEBHOOK_FORMAT`: `generic`, `slack` o `teams`.
- `MONITORING_ALERT_MIN_SEVERITY`: umbral mínimo para alertar (`info`, `warning`, `error`, `critical`).
- `MONITORING_ALERT_SERVICE`: nombre del servicio que aparece en las alertas.

## Monitoreo y observabilidad

- Captura de errores de frontend con listeners globales y error boundaries (`app/error.tsx`, `app/global-error.tsx`).
- Alertas de Certificate Transparency activas solo para la zona Novamind, al emitirse certificados para sus dominios. No son alertas de expiracion ni de disponibilidad.
- Monitor dedicado `novamind-availability`, en `operations/availability/`: cron cada 15 minutos, comprueba HTTP del sitio y readiness de correo/rate limiting en `/api/health?check=ready`, reintenta fallos transitorios, envia alertas de caida y recuperacion por Cloudflare Email Service y conserva el estado en KV para evitar avisos repetidos. No expone endpoints publicos de ejecucion.
- El monitor independiente y el sitio comparten Cloudflare: no detecta una caida total del proveedor si tambien falla la ejecucion del cron. GitHub puede servir de comprobacion externa cuando su cuenta permita ejecutar Actions. Ninguno constituye un SLA.
- Endpoint interno de ingestión: `POST /api/monitoring/error`.
- Trazabilidad en `POST /api/contact` mediante `requestId` y header `X-Request-Id`.
- Registro estructurado en servidor y forwarding opcional por webhook.
- Alertas operativas con severidad y formato configurable para Slack/Teams.

## Calidad y pruebas

- Unit tests para utilidades de seguridad y validación de contenido.
- Component tests para flujo principal del formulario de contacto.
- E2E para rutas y conversión crítica (`/` → `/contacto` + envío de formulario).

## Flujo recomendado de validación antes de publicar

1. `npm ci`
2. `npm run lint`
3. `npm run test:unit`
4. `npm run build`
5. `npm run test:e2e`

## Troubleshooting

### Error `EPERM: .next\trace` en Windows

Si hay un `next dev` ejecutándose, detén ese proceso antes de correr `npm run build`.

### Lighthouse `NO_NAVSTART` al iniciar el preview

El recolector inicia Vite con `node scripts/lhci-retry.mjs serve` y espera
`Lighthouse preview HTTP ready`: esta señal se emite solo después de recibir
HTTP 200 y consumir la respuesta completa de la portada. El mensaje `Local`
de Vite indica que escucha el puerto, no que la primera página ya se haya
renderizado. La carga HTTP previa no elimina por completo `NO_NAVSTART`:
volvió a reproducirse en Windows aun con el servidor y las rutas preparados.
No se ha demostrado una causa raíz ni una solución determinista entre navegadores.

Esta comprobación prepara el renderizado local; no sustituye
`/api/health?check=ready` en staging o producción ni verifica entrega de correo.
Los reintentos de `NO_NAVSTART` siguen acotados y las aserciones conservan sus
umbrales. Si vuelve a ocurrir, usa `npm run perf:lhci:collect -- --settings.saveAssets=true`
para guardar trazas y logs de navegación. No cambies umbrales para ocultarlo.
La colección puede conservar una medición exitosa de un intento parcial al
reintentar la misma URL; identifica las corridas al interpretar el informe.

### Error de frontmatter MDX en build

Valida que los campos `title`, `summary`, `category` y `date` del frontmatter estén correctamente definidos y preferiblemente entre comillas cuando incluyen `:`.

### API de contacto devolviendo `503`

Configura al menos un proveedor de correo:

- Cloudflare Workers: binding `EMAIL`, remitente habilitado y destino Gmail verificado; `MAIL_PROVIDER=cloudflare`.
- Opción A: Resend (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`)
- Opción B: SMTP (`SMTP_*`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`)

Los errores de entrega devuelven `503`; no se usa stdout como suscripcion recibida. La aceptación del proveedor no demuestra llegada a la bandeja de entrada.

## Despliegue

### Plataforma acordada

- Dominio web: `novamindglobalcr.com`; registro, DNS, TLS, seguridad y despliegues en Cloudflare. No se usara Vercel.
- Hosting publicado: Cloudflare Workers con vinext, configuracion tipada `cloudflare.config.ts` y CLI `cf`, en https://novamindglobalcr.com. Staging: https://staging.novamindglobalcr.com.
- `www` redirige al dominio principal con 301 conservando ruta y query; HTTP redirige a HTTPS.
- Marca de producto: PawTrack CR / NALA, inspirado por NALA, dentro del portafolio de NovaMind Global.
- Portal de producto: [PawTrack CR](https://pawtrackcr.com); acceso a la aplicacion: [Login](https://app.pawtrackcr.com/login).
- Dominios controlados confirmados: `novamindglobalcr.com` y `pawtrackcr.com`. No se controla `novamindglobal.com`.
- Contacto principal: `info@novamindglobalcr.com`. Email Routing activo para `info`, `privacidad`, `legal`, `denis` y `dmarc`, sin catch-all.
- Destino verificado de Email Routing: `novamindglobalcr@gmail.com`. MX, SPF y DKIM configurados por Cloudflare. Email Routing no proporciona un buzon corporativo ni SMTP para responder como el dominio.
- Formularios publicados con `CONTACT_TO_EMAIL=novamindglobalcr@gmail.com`, `CONTACT_FROM_EMAIL=info@novamindglobalcr.com` y transporte nativo de Cloudflare. Una prueba autorizada fue aceptada con identificador de entrega; la recepcion en Gmail requiere confirmacion del destinatario.
- DMARC en monitoreo: `v=DMARC1; p=none; rua=mailto:dmarc@novamindglobalcr.com`. No rechaza suplantaciones; evaluar informes y todos los remitentes antes de endurecer la politica.
- El backend incluye transporte nativo Cloudflare Email Service y alternativas Resend/SMTP. Workers selecciona el binding nativo. Email Routing solo recibe/reenvia; los envios reales requieren verificar dominio remitente, destinatario y disponibilidad del servicio en la cuenta.
- Buzon/proveedor corporativo saliente pospuesto por decision del propietario; se conservan los reenvios a Gmail.

### Despliegues y disponibilidad en GitHub

Los tres workflows estan publicados y habilitados en GitHub. Su ejecucion efectiva y la entrega de alertas deben verificarse por separado:

- `.github/workflows/deploy.yml`: despliegue manual de `staging` o `production`, con lint, tipos, pruebas, audit, build y smoke test de salud.
- `.github/workflows/availability.yml`: comprobacion cada 15 minutos del sitio y `/api/health`; abre un incidente GitHub sin duplicados y lo cierra al recuperarse. La programacion requiere estar en la rama por defecto; GitHub puede retrasar ejecuciones y esto no constituye un SLA.
- Crear entornos GitHub `staging` y `production`; exigir aprobacion de produccion cuando el plan del repositorio lo permita.
- Agregar `CLOUDFLARE_API_TOKEN` con permisos minimos de despliegue y `TURNSTILE_SECRET_KEY` como secretos de cada entorno, desde la interfaz segura de GitHub, no por chat. El token debe permitir los bindings y dominios utilizados por este proyecto.
- Publicar los workflows y ejecutar primero staging, luego produccion. Activar las notificaciones de Actions e issues para recibir fallos e incidentes.
- Estado observado: Actions no inicia jobs por un bloqueo de facturacion de la cuenta. El propietario debe resolverlo en GitHub Settings > Billing; estar habilitado no significa que el workflow este ejecutandose.

Para actualizar el monitor dedicado, ejecutar `npm run build:availability` y `npm run deploy:availability` desde la raiz tras `npm ci`. Es un proyecto independiente con su propia configuracion de Vite/Cloudflare; resuelve las mismas dependencias instaladas y bloqueadas en la raiz. No se declara la raiz como workspace porque la deteccion de aplicaciones de `cf` no permite compilar alli un workspace root. Su KV guarda solo estado operativo, no leads; si se migra de cuenta, crear una nueva namespace y actualizar el binding antes del despliegue. No simular incidentes modificando el estado remoto de produccion.

El monitor usa la misma fecha de compatibilidad validada que el sitio (`2026-10-30`): el runtime local instalado no admite todavia `2026-11-01`. Actualizar runtime y fecha juntos tras validar el handler programado.

Compatible con despliegue estándar de Next.js en servicios gestionados o contenedores. Para despliegue productivo, asegurar:

- Variables de entorno completas.
- HTTPS habilitado.
- Revisión de headers de seguridad (`next.config.ts`).
- Ejecución de test suite y build en CI.

### Validacion local

```text
npm run content:index
npm run types:cloudflare
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run build:cloudflare
npm run test:e2e
npm audit --omit=dev
```

`npm run preview:cloudflare` sirve el build de Workers en `http://127.0.0.1:3000`. Los E2E gestionan su propio preview; detenga el preview manual antes de ejecutarlos. Next se conserva para desarrollo/comparacion. Los handlers Node en produccion rechazan solicitudes si no existe una proteccion de rate limiting de plataforma; el destino productivo configurado es Workers.

### Estado de las 12 recomendaciones

| N   | Recomendacion             | Implementacion                                                                                                       |
| --- | ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1   | Opcionales del formulario | Normalizacion en API y pruebas con campos vacios.                                                                    |
| 2   | Entrega verificada        | Transporte compartido, identificador de aceptacion, timeout HTTP, errores 503 y fallback configurado.                |
| 3   | Consentimiento            | Banner unico, formato versionado, scripts opt-in, rechazo/revocacion y preferencias al pie.                          |
| 4   | Proteccion de APIs        | Origen, tamano y JSON validado; bindings de rate limiting por API e IP confiable en Workers.                         |
| 5   | HTML de newsletter        | Escape de valores y version de texto plano compartidos.                                                              |
| 6   | Runtime Cloudflare        | Build de Workers, bindings nativos, assets y blog indexado en build sin filesystem de produccion.                    |
| 7   | Conversion                | Abandono por salida real, lead confirmado por API y deduplicacion por requestId; gracias no dispara conversion.      |
| 8   | Contexto comercial        | Plan reconocido desde URL y enviado con la solicitud; intereses y catalogos compartidos.                             |
| 9   | Evidencia publica         | Sin precios cero/ratings sinteticos en schema ni avisos ficticios; claims y precios no aprobados permanecen ocultos. |
| 10  | Accesibilidad             | Contraste de texto secundario, estado/foco de menu, etiquetas estables, foco de errores y links deshabilitados.      |
| 11  | Precarga y mobile         | Retirada la precarga Pages Router y varios overlays globales; logo pequeno servido directamente como asset.          |
| 12  | SEO y calidad             | Sitemap unico con entradas comerciales, exclusion noindex y fechas honestas; CI, tests y E2E desktop/mobile.         |

Validacion al 2026-11-01: 51 pruebas unitarias con cobertura y 10 E2E en Workers preview aprobados. Typecheck y lint sin errores; builds Next y Workers completados. Auditoria de dependencias de produccion: cero vulnerabilidades conocidas. Las capturas y trazas se generan en `test-results/`. La configuracion CI existe en `.github/workflows/quality.yml`; no se ha ejecutado en GitHub durante esta sesion.

La fecha de compatibilidad `2026-10-30` es la mas reciente admitida por el binario workerd instalado. vinext y el CLI/configurador Cloudflare son beta: el build conserva advertencias de clasificacion de rutas, optimizacion de imports y sourcemaps. El build Next advierte sobre deteccion del plugin ESLint, aunque el lint directo pasa. La comparacion automatizada del upgrade de Vitest tuvo un fallo de contexto de suites; los comandos locales con cobertura y los E2E finales si pasaron. No se afirma conformidad WCAG completa ni se han ejecutado Lighthouse o mediciones de trafico productivo.

### Gates pendientes de publicacion

- Autorizar cuenta Cloudflare y conectar el repositorio GitHub a Workers Builds.
- Crear/verificar aliases Email Routing y Gmail de destino; habilitar y verificar Email Sending para el remitente corporativo.
- Desplegar a staging y probar entrega real, headers, HTTPS, limites bajo trafico y rollback antes de promover a produccion.
- Mantener `commercialEvidenceEnabled=false` hasta aprobar precios, claims y evidencia comercial. Los formularios de novedades reciben solicitudes; no son un sistema de distribucion de campanas.
- No se publicaron recursos ni se modificaron DNS, certificados o correo real en esta implementacion.
