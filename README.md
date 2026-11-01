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
- `content/blog/`: contenido editorial en MDX.
- `lib/`: utilidades de SEO, seguridad, contenido, analytics y monitoreo.
- `styles/`: estilos globales y sistema visual.
- `tests/unit/`: pruebas unitarias y de componentes con Vitest.
- `tests/e2e/`: flujos críticos E2E con Playwright.

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
- `npm run perf:lhci`: auditoría Lighthouse CI.

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
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: clave publica del widget. En Workers se utiliza la clave publica del sitio; una cadena vacia desactiva la UI para E2E locales.
- `TURNSTILE_ENABLED`: `true` en los bindings de Workers; `false` para desarrollo local sin verificacion externa.
- `TURNSTILE_SECRET_KEY`: secreto de servidor, nunca en el repositorio ni en variables `NEXT_PUBLIC_*`. Se carga mediante `cf deploy --secrets-file` o GitHub Secrets.

Contacto y ambos formularios de newsletter usan Turnstile. El servidor valida token, hostname y accion; rechaza solicitudes sin verificacion y no envia correo si el proveedor de verificacion falla. Las pruebas automatizadas locales sin widget no sustituyen una prueba real en staging.

### Analytics

- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_CLARITY_ID`

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
