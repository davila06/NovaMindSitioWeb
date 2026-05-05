# Novamind Global Web Platform

Sitio corporativo construido con Next.js App Router, TypeScript estricto y Tailwind CSS, orientado a conversión comercial, SEO técnico, rendimiento y operación enterprise.

## Stack principal

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 3
- Zod para validación de payloads y contenido
- MDX local para contenido editorial del blog
- Resend + SMTP fallback para entrega de leads

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

- Opción A: Resend (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`)
- Opción B: SMTP (`SMTP_*`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`)

## Despliegue

Compatible con despliegue estándar de Next.js en servicios gestionados o contenedores. Para despliegue productivo, asegurar:

- Variables de entorno completas.
- HTTPS habilitado.
- Revisión de headers de seguridad (`next.config.ts`).
- Ejecución de test suite y build en CI.
