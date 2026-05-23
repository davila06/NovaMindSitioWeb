# Mejoras recomendadas para Novamind Global

## Resumen ejecutivo
Este documento lista mejoras priorizadas para elevar posicionamiento SEO, conversiones comerciales, accesibilidad, rendimiento y mantenibilidad del sitio.

Prioridad sugerida:
1. Quick wins de alto impacto (1-2 semanas)
2. Optimizaciones de conversion y contenido (2-4 semanas)
3. Madurez tecnica y operativa (4-8 semanas)

## 1) SEO tecnico y descubrimiento

### Estado de implementacion (completado)
- Ejecutado en fecha: 2026-05-04
- Resultado: todas las tareas de la seccion 1 implementadas en codigo y listas para produccion.
- Archivos clave actualizados:
  - app/layout.tsx
  - lib/seo.ts
  - app/sitemap.ts
  - components/products/ProductPageContent.tsx
  - app/roles/[slug]/page.tsx
  - app/industrias/[slug]/page.tsx
  - app/blog/[slug]/page.tsx
  - app/opengraph-image.tsx
  - app/twitter-image.tsx
  - app/icon.tsx
  - app/apple-icon.tsx
  - public/favicon.svg

### 1.1 Definir metadataBase global y enriquecer metadata
- Estado actual:
  - Implementado.
- Mejora:
  - metadataBase configurado globalmente en el layout raiz.
  - Canonical, Open Graph y Twitter Cards unificados en helper SEO reutilizable.
  - Imagenes OG/Twitter centralizadas mediante rutas dinamicas de imagen social.
- Impacto: Alto (compartibilidad, indexacion, CTR social)
- Esfuerzo: Bajo

### 1.2 Agregar iconografia SEO base (favicon + app icons)
- Estado actual:
  - Implementado.
- Mejora:
  - favicon SVG agregado en public.
  - app icon y apple icon dinamicos agregados en App Router.
  - metadata de iconos declarada en el layout para navegadores modernos.
- Impacto: Medio
- Esfuerzo: Bajo

### 1.3 Sitemap con fechas reales por contenido
- Estado actual:
  - Implementado.
- Mejora:
  - Fechas de blog tomadas de su fecha real de publicacion.
  - Sitemap segmentado por tipo de pagina con priority/changeFrequency diferenciados.
  - Fechas de paginas estaticas definidas de forma deterministica.
- Impacto: Medio
- Esfuerzo: Bajo

### 1.4 Structured data mas rica
- Estado actual:
  - Implementado.
- Mejora:
  - Organization + WebSite agregados globalmente en layout.
  - BreadcrumbList agregado en blog/[slug], roles/[slug], industrias/[slug] y productos.
  - SoftwareApplication schema agregado a todas las paginas de producto.
- Impacto: Alto
- Esfuerzo: Medio

## 2) Conversion y experiencia comercial

### Estado de implementacion (completado)
- Ejecutado en fecha: 2026-05-04
- Resultado: todas las tareas de la seccion 2 implementadas con validacion de lint/build en verde.
- Archivos clave actualizados:
  - lib/analytics-client.ts
  - components/shared/ui/Button.tsx
  - components/layout/Navbar.tsx
  - components/home/HeroSection.tsx
  - components/home/ProductGrid.tsx
  - components/home/SolutionFinderSection.tsx
  - components/layout/CTASection.tsx
  - components/shared/MarketPageLayout.tsx
  - components/products/ProductCTA.tsx
  - components/products/PwaInstallActions.tsx
  - components/layout/Footer.tsx
  - data/site.ts
  - components/home/CommercialProofSection.tsx
  - app/page.tsx
  - components/shared/ui/ContactForm.tsx
  - app/api/contact/route.ts

### 2.1 Fortalecer CTAs con trazabilidad por embudo
- Estado actual:
  - Implementado.
- Mejora:
  - Contrato de tracking estandar para CTA implementado (page, section, cta_label, destination, product, intent).
  - Instrumentacion aplicada en navbar, hero, grid de productos, solution finder, market pages, CTA final, footer y CTAs de producto.
  - Integracion para CTAs de descarga/instalacion en Mi Mascotica.
- Impacto: Alto
- Esfuerzo: Medio

### 2.2 Mejorar la propuesta de valor por segmento
- Estado actual:
  - Implementado.
- Mejora:
  - Nueva seccion comercial agregada en home con resultados cuantificados, mini casos y logo wall de compradores.
  - Flujo de homepage actualizado para mostrar evidencia antes del grid de productos.
  - Comparativa estrategica mantenida y reforzada como soporte de diferenciacion directa.
- Impacto: Alto
- Esfuerzo: Medio

### 2.3 Optimizar formulario de contacto para tasa de envio
- Estado actual:
  - Implementado.
- Mejora:
  - Campos de calificacion agregados: volumen estimado, urgencia y horizonte de implementacion.
  - Validacion inline accesible por campo con aria-invalid/aria-describedby, required y autocomplete.
  - Telemetria de progreso y abandono incorporada por foco, blur, intento de envio, error y exito.
  - API de contacto extendida para recibir datos de calificacion y sanitizar HTML antes del envio.
- Impacto: Alto
- Esfuerzo: Medio

## 3) Accesibilidad (A11y)

### Estado de implementacion (completado)
- Ejecutado en fecha: 2026-05-04
- Resultado: todas las tareas de la seccion 3 implementadas con validacion de lint/build en verde.
- Archivos clave actualizados:
  - components/layout/AppShell.tsx
  - components/layout/Navbar.tsx
  - styles/globals.css
  - components/shared/ui/Accordion.tsx
  - components/shared/ui/Tabs.tsx
  - components/shared/ui/Toast.tsx
  - components/shared/ui/ContactForm.tsx

### 3.1 Navegacion por teclado y atributos ARIA
- Estado actual:
  - Implementado.
- Mejora:
  - aria-expanded y aria-controls aplicados al boton de menu movil.
  - Soporte de cierre por tecla Escape para navegacion movil.
  - Skip link agregado para saltar al contenido principal.
  - main con id de landmark y foco programatico.
  - Estilos globales de focus-visible aplicados a elementos interactivos.
- Impacto: Alto
- Esfuerzo: Bajo

### 3.2 Componentes interactivos con semantica completa
- Estado actual:
  - Implementado.
- Mejora:
  - Accordion actualizado con ids, aria-expanded, aria-controls y regions etiquetadas.
  - Navegacion por teclado en Accordion: ArrowUp/ArrowDown/Home/End.
  - Tabs actualizados con tablist/tab/tabpanel, aria-selected y tabIndex roving.
  - Navegacion por teclado en Tabs: ArrowLeft/ArrowRight/Home/End.
- Impacto: Alto
- Esfuerzo: Medio

### 3.3 Mensajes y estados accesibles en formularios
- Estado actual:
  - Implementado.
- Mejora:
  - Toast con variantes semanticas (error/success/info), role y aria-live segun severidad.
  - Formulario con resumen de error accesible en region assertive.
  - Errores inline relacionados por aria-describedby y aria-invalid.
  - required/autocomplete/noValidate aplicados de forma consistente.
  - Estado de progreso del formulario anunciado con aria-live polite.
- Impacto: Alto
- Esfuerzo: Bajo

## 4) Rendimiento y estabilidad

### Estado de implementacion (completado)
- Ejecutado en fecha: 2026-05-04
- Resultado: todas las tareas de la seccion 4 implementadas con validacion de lint/build en verde.
- Mejora observable:
  - Home reducida de ~41.8 kB a ~3.23 kB de JS de ruta en build output.
- Archivos clave actualizados:
  - components/home/HeroSection.tsx
  - components/home/MetricsCounters.tsx
  - styles/globals.css
  - package.json
  - scripts/generate-image-variants.mjs
  - components/layout/Navbar.tsx
  - lighthouserc.json
  - performance-budget.json

### 4.1 Reducir JavaScript cliente en homepage
- Estado actual:
  - Implementado.
- Mejora:
  - HeroSection migrada a server component y animaciones trasladadas a CSS (sin JS de runtime).
  - MetricsCounters migrada a server component con render estatico.
  - Home mantiene en cliente solo secciones con interaccion real (SolutionFinder).
  - Dependencia framer-motion removida del proyecto.
- Impacto: Alto
- Esfuerzo: Medio

### 4.2 Optimizar assets de imagen y naming
- Estado actual:
  - Implementado.
- Mejora:
  - Script reproducible para generacion de variantes creado (`npm run perf:assets`).
  - Variantes optimizadas generadas: `novamind-brand.jpg`, `novamind-brand.webp`, `novamind-brand.avif`.
  - Navbar migrado a asset semantico optimizado (`/img/novamind-brand.webp`).
- Impacto: Medio
- Esfuerzo: Medio

### 4.3 Presupuesto de performance
- Estado actual:
  - Implementado.
- Mejora:
  - Objetivos CWV definidos en Lighthouse CI (LCP, CLS, TBT/Interactive y score de performance).
  - Medicion automatizada por template: `/`, `/productos/mindflow-ai-sales-engine`, `/blog`, `/contacto`.
  - Budget de recursos/timings definido en configuracion (`lighthouserc.json` + `performance-budget.json`).
  - Scripts de control de performance agregados:
    - `npm run perf:lhci:collect`
    - `npm run perf:lhci:assert`
    - `npm run perf:lhci`
  - Checklist de release recomendado:
    - Ejecutar `npm run build`
    - Ejecutar `npm run perf:lhci:collect`
    - Ejecutar `npm run perf:lhci:assert`
    - Bloquear release si falla cualquier assertion de presupuesto/CWV.
- Impacto: Alto
- Esfuerzo: Medio

## 5) Seguridad y robustez

### Estado de implementacion (completado)
- Ejecutado en fecha: 2026-05-04
- Resultado: todas las tareas de la seccion 5 implementadas con validacion de lint/build en verde.
- Archivos clave actualizados:
  - lib/security.ts
  - next.config.ts
  - app/api/contact/route.ts
  - components/shared/ui/ContactForm.tsx
  - .env.example

### 5.1 Endurecer endpoint de contacto
- Estado actual:
  - Implementado.
- Mejora:
  - Rate limiting por IP agregado con ventana configurable por entorno.
  - Honeypot silencioso agregado en frontend + filtrado en backend para absorber spam automatizado.
  - Sanitizacion HTML mantenida y reforzada junto con limites estrictos de longitud en payload.
  - Respuesta 429 con `Retry-After` para clients que excedan cuota temporal.
  - Variables de entorno documentadas para control de rate limit.
- Impacto: Alto
- Esfuerzo: Medio

### 5.2 Cabeceras de seguridad
- Estado actual:
  - Implementado.
- Mejora:
  - CSP global implementada y compatible con Google Analytics y Microsoft Clarity.
  - Headers agregados: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy` y `Strict-Transport-Security`.
  - `poweredByHeader` deshabilitado en Next.js para reducir exposicion innecesaria.
- Impacto: Alto
- Esfuerzo: Medio

## 6) Arquitectura de contenido

### 6.1 Migrar contenido editable a fuente escalable
- Estado actual:
  - Productos, blog y segmentos estan hardcodeados en archivos TS.
- Mejora:
  - Pasar blog a MDX o CMS liviano.
  - Mantener tipado con schema (zod) para contenido editorial.
- Impacto: Alto
- Esfuerzo: Medio/Alto

### 6.2 Normalizar copy y consistencia linguistica
- Estado actual:
  - Hay mezcla de tildes/acentos y variantes de estilo.
- Mejora:
  - Crear guia de estilo editorial.
  - Revisar ortografia, tono y consistencia de naming en todo el sitio.
- Impacto: Medio
- Esfuerzo: Bajo/Medio

## 7) Calidad, observabilidad y operacion

### 7.1 Actualizar README y documentacion tecnica
- Estado anterior:
  - README describia React + Vite y no reflejaba la arquitectura real del proyecto.
- Implementado.
- Entregables realizados:
  - README reescrito para Next.js App Router con arquitectura, scripts, variables, monitoreo, pruebas y troubleshooting operativo.
  - Flujo recomendado de validacion previa a deploy documentado.
- Impacto: Medio
- Esfuerzo: Bajo

### 7.2 Pruebas automatizadas
- Estado anterior:
  - No existia suite automatizada de pruebas.
- Implementado.
- Entregables realizados:
  - Stack de testing enterprise integrado: Vitest + Testing Library + Playwright.
  - Scripts agregados en `package.json`: `test:unit`, `test:unit:watch`, `test:e2e`, `test:e2e:ui`.
  - Pruebas unitarias para seguridad, validacion de contenido y formulario critico.
  - Pruebas E2E para rutas clave y contrato visual/funcional del formulario de contacto.
- Impacto: Alto
- Esfuerzo: Medio

### 7.3 Monitoreo de errores frontend/backend
- Implementado.

---

## 8) Diseño premium — Análisis out-of-the-box

> Análisis de profundidad realizado el 2026-05-22.
> Objetivo: elevar el sitio de "SaaS funcional" a "marca de tecnología enterprise de primer nivel".
> Las 20 mejoras están ordenadas por impacto visual/percepción de marca, comenzando por paleta de colores.

---

### 8.1 Paleta de colores — De "AI startup genérica" a "Deep Space Premium"

**Problema actual:**
El esquema azul-marino (`#0f172a`) + azul cielo (`#38bdf8`) + gradiente energía (amarillo→naranja→rojo) es idéntico al de cientos de SaaS de IA en 2022-2023. No diferencia. El gradiente de energía en los botones CTA contrasta agresivamente con la paleta fría del fondo. El resultado se siente inconsistente y genérico.

**Propuesta — "Obsidian Violet":**
```css
/* globals.css — sistema de tokens nuevo */
:root {
  /* Bases */
  --bg-void:      #06091a;   /* negro cósmico, más profundo que slate */
  --bg-surface:   #0c1130;   /* superficie primaria */
  --bg-card:      #111b3a;   /* cards y paneles */
  --bg-elevated:  #1a2650;   /* componentes elevados */

  /* Marca */
  --brand-violet: #6d28d9;   /* violeta profundo — diferenciador */
  --brand-iris:   #8b5cf6;   /* violeta medio — hover/glows */
  --brand-lavender: #a78bfa; /* lavanda — texto highlight, accent */

  /* Oro premium (reemplaza amarillo energético) */
  --gold-warm:    #c9a84c;   /* dorado cálido — acento noble */
  --gold-light:   #e8c96d;   /* dorado claro — hover/shimmer */

  /* Texto */
  --text-primary:  #f0f4ff;  /* blanco frío, más elegante que #f8fafc */
  --text-muted:    #8892b0;  /* azul-gris — mucho más premium que slate-300 */
  --text-subtle:   #4a5580;  /* hints, placeholders */

  /* CTAs */
  --cta-primary:  #7c3aed;   /* violeta sólido — no gradiente */
  --cta-hover:    #6d28d9;
  --cta-ring:     rgba(139, 92, 246, 0.35);
}
```

**Tailwind config actualizado:**
```ts
colors: {
  brand: {
    void:     '#06091a',
    surface:  '#0c1130',
    card:     '#111b3a',
    elevated: '#1a2650',
    violet:   '#6d28d9',
    iris:     '#8b5cf6',
    lavender: '#a78bfa',
    gold:     '#c9a84c',
    goldLight:'#e8c96d',
  },
  text: {
    primary: '#f0f4ff',
    muted:   '#8892b0',
    subtle:  '#4a5580',
  }
}
```

**Archivos a modificar:** `styles/globals.css`, `tailwind.config.ts`, todos los componentes con clases hard-coded de color.
- Impacto: Transformacional — cambia la percepción de marca al instante
- Esfuerzo: Alto (refactor de tokens en ~30 archivos)

---

### 8.2 Tipografía — Escala dramática y jerarquía editorial

**Problema actual:**
Todos los headings usan el mismo gradiente `from-brand-accent via-brand-interactive to-brand-surface`. Repetirlo 8 veces en la home lo convierte en ruido visual. El hero title es `text-5xl` (48px) — discreto para un sitio premium. No hay variación tipográfica entre secciones.

**Propuesta:**
- Hero H1: `text-[4.5rem] sm:text-[6rem] lg:text-[7.5rem]` con `tracking-[-0.05em]` — titulares de impacto al estilo Linear/Vercel
- Reservar el gradiente de texto SOLO para el H1 del hero y 1-2 secciones clave
- Resto de headings: texto blanco puro con peso `font-bold` + subrayado con línea dorada de 2px
- Agregar un tercer tipo de fuente solo para citas/testimonios: `Playfair Display` de Google Fonts
- Usar `font-feature-settings: "ss01" 1, "cv02" 1` en Sora para sus alternates estilísticos

```tsx
// layout.tsx — agregar Playfair Display
import { Inter, Sora, Playfair_Display } from 'next/font/google'
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', style: ['italic'] })
```

- Impacto: Alto — diferencia inmediata en percepción de marca
- Esfuerzo: Medio

---

### 8.3 Fondo — Aurora + textura noise (adiós al dot grid genérico)

**Problema actual:**
El patrón de puntos (`radial-gradient` de 18x18px con máscara) es el fondo más usado en SaaS de 2022. Junto con los radial-gradients fijos de azul y naranja, el fondo se ve como una plantilla de Tailwind UI sin personalizar.

**Propuesta — Aurora orgánica:**
```css
/* Reemplazar body background en globals.css */
body {
  background-color: #06091a;
  background-image:
    /* Aurora 1 — violeta superior izquierdo */
    radial-gradient(ellipse 80% 50% at 10% 0%, rgba(109,40,217, 0.28), transparent 60%),
    /* Aurora 2 — índigo superior derecho */
    radial-gradient(ellipse 60% 40% at 90% 5%, rgba(67,56,202, 0.22), transparent 50%),
    /* Aurora 3 — dorado inferior derecho (sutil) */
    radial-gradient(ellipse 50% 30% at 85% 90%, rgba(201,168,76, 0.12), transparent 45%);
}

/* Textura noise SVG inline — premium y ligero */
body::before {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 180px;
  /* Eliminar el dot grid */
}
```

- Impacto: Alto — el primer elemento que se percibe al cargar la página
- Esfuerzo: Bajo

---

### 8.4 Botón CTA principal — Violeta sólido con halo de luz

**Problema actual:**
El gradiente energía (amarillo→naranja→rojo) en el botón primario crea una discordancia visual severa contra el fondo azul/negro. Es el patrón de botón más genérico de 2021. Además `hover:brightness-105` no es una interacción memorable.

**Propuesta:**
```tsx
// Button.tsx — variante solid rediseñada
const solidStyle = `
  relative bg-brand-violet text-white font-semibold
  shadow-[0_0_24px_rgba(109,40,217,0.45)]
  hover:bg-brand-iris hover:shadow-[0_0_36px_rgba(139,92,246,0.55)]
  active:scale-[0.97]
  transition-all duration-200
  before:absolute before:inset-0 before:rounded-2xl
  before:bg-gradient-to-b before:from-white/10 before:to-transparent
  before:pointer-events-none
`
// Botón ghost: borde lavanda + texto lavanda, sin fondo
const ghostStyle = `
  border border-brand-lavender/40 text-brand-lavender
  hover:bg-brand-lavender/8 hover:border-brand-lavender/70
  transition-all duration-200
`
```

- Impacto: Alto — el CTA es la acción más importante del sitio
- Esfuerzo: Bajo

---

### 8.5 Navbar — Compacta, refinada, con indicador activo animado

**Problema actual:**
El logo ocupa 56×56px + dos líneas de texto (nombre + tagline). Esto consume demasiado espacio vertical en el navbar flotante. No hay indicador visual de qué página está activa.

**Propuesta:**
- Reducir logo a `40×40px` con `rounded-xl`
- Mover tagline solo a hover tooltip o eliminarlo del navbar
- Agregar indicador de ruta activa: punto violeta bajo el link o pill de fondo `bg-brand-violet/15`
- Usar `usePathname()` de Next.js para comparar la ruta actual
- Ajustar blur a `backdrop-blur-2xl` y el fondo a `bg-[#06091a]/85`

```tsx
// En Navbar.tsx — indicador activo
import { usePathname } from 'next/navigation'
const pathname = usePathname()
// En cada Link:
const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
className={`... ${isActive ? 'text-brand-lavender bg-brand-violet/15' : 'text-text-muted hover:text-text-primary'}`}
```

- Impacto: Medio-Alto — UX + credibilidad
- Esfuerzo: Bajo

---

### 8.6 Cards — Sistema de jerarquía visual (3 niveles)

**Problema actual:**
Absolutamente todas las cards del sitio son idénticas: `rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-6 shadow-soft backdrop-blur`. Sin jerarquía, sin personalidad. El usuario no puede distinguir visualmente entre una card de producto, una de testimonio o una de métrica.

**Propuesta — 3 variantes:**
```tsx
// Card.tsx actualizado
type CardVariant = 'default' | 'featured' | 'metric'

// default: fondo sutil, borde lavanda tenue
'rounded-2xl border border-brand-lavender/15 bg-brand-card/80 p-6 backdrop-blur'

// featured: borde violeta + inner glow sutil
'rounded-2xl border border-brand-violet/40 bg-gradient-to-b from-brand-elevated/90 to-brand-card/90 p-6 shadow-[inset_0_1px_0_rgba(167,139,250,0.12)] backdrop-blur'

// metric: fondo casi transparent + número grande destacado
'rounded-2xl border border-brand-gold/25 bg-brand-elevated/40 p-8 text-center backdrop-blur'
```

Adicionalmente, las cards de producto deben tener un número ordinal `01, 02...` en la esquina superior derecha con `text-[5rem] font-bold opacity-[0.06]` — efecto de profundidad muy premium.

- Impacto: Alto
- Esfuerzo: Medio

---

### 8.7 Hero — Dashboard animado con datos reales del producto

**Problema actual:**
El widget "Control room operativo" muestra datos inventados y estáticos (`+1,280 procesos`, `98.4% SLA`). Ningún comprador enterprise toma en serio un dashboard con datos placeholder. El widget no anima, no respira, no demuestra el producto.

**Propuesta:**
- Reemplazar el widget genérico con una mini-demo específica del producto más vendido (ej: PlanillasCR o VoiceBot)
- Agregar un `counter` con `useEffect` que cuenta de 0 al valor final cuando el componente monta
- Agregar un indicador de "pulso" (círculo verde con `animate-ping`) junto a "IA activa"
- Agregar una barra de progreso que se llena de forma animada con CSS `transition-width`
- Mostrar un "ticker" de actividad: últimas 3 acciones del sistema con `opacity-0 → opacity-100` escalonado

```tsx
// Pulsing status indicator
<span className="relative flex h-2.5 w-2.5">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
</span>
```

- Impacto: Alto — es el primer elemento interactivo que ve el visitante
- Esfuerzo: Medio

---

### 8.8 Métricas — Contadores animados con IntersectionObserver

**Problema actual:**
Los números `80%`, `40%`, `24h` son estáticos. En un sitio premium, los números "cuentan" cuando el usuario hace scroll hasta ellos.

**Propuesta:**
```tsx
// hooks/useCountUp.ts
'use client'
import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let start = 0
      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        setCount(Math.floor(progress * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}
```

- Impacto: Medio-Alto — detalle de clase que refuerza confianza
- Esfuerzo: Bajo

---

### 8.9 Testimonios — Cards editoriales con cita destacada

**Problema actual:**
Cards de cita son solo texto + nombre. Sin foto, sin cargo, sin empresa, sin rating. No hay jerarquía visual. Una sola línea de nombre no construye credibilidad enterprise.

**Propuesta:**
- Layout asimétrico: 1 card grande (col-span-2) + 2 cards medianas
- Cada card incluye: avatar con iniciales (con bg violeta), nombre, cargo y empresa
- Símbolo de comillas gigante (`"`) en el fondo con `opacity-5 text-[8rem]` como decoración
- Rating de 5 estrellas con SVG dorado
- Separación sutil entre cita y autor con borde violeta de 1px

- Impacto: Alto — social proof es el mayor convertidor B2B
- Esfuerzo: Medio

---

### 8.10 TrustBar — Logos + iconografía + marquee animado

**Problema actual:**
4 badges de texto plano en una grid. Sin íconos, sin logos, sin movimiento. Se percibe como relleno de sección.

**Propuesta:**
- Convertir en una barra horizontal con marquee/scroll infinito (CSS animation)
- Cada badge: ícono SVG relevante + texto
- Agregar logos de tecnología real: Microsoft Azure, Next.js, TypeScript
- Añadir un badge de "Empresa Costarricense" y "Producto verificado"

```css
@keyframes marquee {
  from { transform: translateX(0) }
  to   { transform: translateX(-50%) }
}
.animate-marquee { animation: marquee 28s linear infinite; }
```

- Impacto: Medio — refuerzo de confianza pasivo y visual
- Esfuerzo: Bajo

---

### 8.11 ProblemSolutionSplit — Comparación visual con iconos y colores semánticos

**Problema actual:**
Dos cards con bullet points `•`. Es la forma más básica de comunicar una transformación. No hay peso visual, no hay emoción, no hay contraste suficiente.

**Propuesta:**
- Columna "Antes": fondo rojo oscuro `bg-rose-950/40`, border `border-rose-500/25`, íconos `XCircle` en rojo por cada ítem
- Columna "Después": fondo violeta `bg-brand-violet/10`, border `border-brand-iris/30`, íconos `CheckCircle2` en verde esmeralda
- Título grande entre las dos columnas: `→` o flecha SVG animada
- Agregar 2-3 ítems más a cada columna con datos concretos

- Impacto: Alto — sección de conversión clave
- Esfuerzo: Bajo

---

### 8.12 ProductGrid — Cards con número ordinal + color único por producto

**Problema actual:**
Todas las product cards son visualmente idénticas. El ícono Lucide genérico no comunica la especialidad del producto. No hay diferenciación cromática.

**Propuesta:**
- Asignar un color de acento único a cada producto:
  - VoiceBot: `#06b6d4` (cyan) — comunicación
  - PlanillasCR: `#10b981` (esmeralda) — nómina
  - CCERP: `#8b5cf6` (violeta) — ERP
  - MindFlow: `#f59e0b` (ámbar) — ventas
  - IADS: `#3b82f6` (azul) — servicios digitales
  - PawTrack: `#ec4899` (rosa) — comunidad
- Número ordinal `01`–`06` en esquina superior derecha con `opacity-5`
- El borde del card cambia al color del producto en hover
- Badge de categoría: "IA Conversacional", "Nómina", "ERP", etc.

- Impacto: Alto — hace el portafolio memorable y diferenciado
- Esfuerzo: Medio

---

### 8.13 Microanimaciones — Sistema coherente con stagger

**Problema actual:**
Solo hay dos animaciones en `globals.css`: `enter-fade-up` y `enter-scale-in`, aplicadas manualmente en el hero. El resto de la página carga instantáneamente sin ritmo visual.

**Propuesta — CSS puro (sin dependencias):**
```css
/* globals.css — agregar */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.animate-slide-up { animation: slide-up 500ms ease-out both; }
.animate-fade-in  { animation: fade-in 400ms ease-out both; }

/* Stagger delays */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
```

Combinado con `IntersectionObserver` en un hook `useReveal` para activar la clase cuando el elemento entra en viewport.

- Impacto: Medio-Alto — da sensación de sitio "vivo" y moderno
- Esfuerzo: Medio

---

### 8.14 Footer — Rediseño editorial con degradado de cierre

**Problema actual:**
El footer es funcionalmente correcto pero visualmente abandonado. Sin redes sociales, sin newsletter, sin certificaciones, sin separador visual del contenido.

**Propuesta:**
- Agregar una franja de gradiente violeta al inicio del footer (`h-px bg-gradient-to-r from-transparent via-brand-iris to-transparent`) — efecto "línea de luz"
- Agregar íconos de redes sociales: LinkedIn, GitHub (componentes SVG inline)
- Añadir sección de newsletter: campo de email + botón `Suscribirse`
- Badges de tecnología: "Powered by Azure", "Built with Next.js"
- Aumentar el padding del footer y dar más espacio entre columnas
- Texto del copyright con año dinámico ya está — mantener

- Impacto: Medio — el footer refuerza la profesionalidad percibida
- Esfuerzo: Bajo

---

### 8.15 Acentos tipográficos — Corrección de tildes y ortografía

**Problema actual:**
A lo largo del sitio hay palabras sin tildes: "nomina" (nómina), "Diagnostico" (Diagnóstico), "Diseño de solucion" (solución), "Implementacion" (Implementación), "atencion" (atención), "escalado y optimizacion" (optimización), "Links rapidos" (rápidos), "criticas" (críticas). Para una empresa B2B costarricense, esto daña la credibilidad profesional.

**Archivos a corregir:** `data/site.ts`, `components/home/*.tsx`, `components/layout/Footer.tsx`

- Impacto: Alto en percepción de marca y credibilidad local
- Esfuerzo: Bajo — búsqueda y reemplazo

---

### 8.16 Sección Hero — Sub-headline con typewriter effect

**Problema actual:**
El subtítulo del hero es texto estático. Las empresas de IA de primer nivel usan el hero para demostrar capacidad con movimiento controlado.

**Propuesta — Typewriter CSS puro:**
```tsx
// Reemplazar el párrafo estático del hero por un rotador de 3 frases:
const phrases = [
  'automatizamos nómina con IA',
  'transformamos contact centers',
  'digitalizamos operaciones críticas',
]
// CSS animation que cicla entre frases cada 3s con fade in/out
```

O más simple: un indicador de industria que rota: "Para **seguros** / **retail** / **municipalidades** / **ERP**"

- Impacto: Medio — diferenciador visual sin over-engineering
- Esfuerzo: Bajo

---

### 8.17 Páginas de producto — Screenshot showcase con marco de dispositivo

**Problema actual:**
Las páginas de producto (`ProductHero`) muestran solo métricas en texto. No hay ninguna imagen o screenshot real del producto. Un comprador enterprise quiere VER la interfaz antes de agendar una demo.

**Propuesta:**
- Agregar un campo `screenshotUrl` al tipo `Product` en `lib/types.ts`
- En `ProductHero`, mostrar el screenshot dentro de un marco de browser/laptop renderizado con CSS:

```tsx
// Marco de browser con CSS
<div className="rounded-t-xl border border-brand-lavender/20 bg-brand-elevated/80">
  {/* barra de tabs del browser */}
  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-brand-lavender/10">
    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
  </div>
  <Image src={product.screenshotUrl} ... className="rounded-b-xl" />
</div>
```

- Impacto: Muy Alto — aumenta drasticamente la conversión
- Esfuerzo: Medio (requiere screenshots o mockups de los productos)

---

### 8.18 Paleta de secciones — Variación de fondos entre secciones

**Problema actual:**
Todas las secciones del home usan el mismo fondo oscuro. No hay variación de "peso visual" entre secciones. El visitante no puede distinguir dónde empieza y termina cada bloque de contenido.

**Propuesta:**
- Alternar entre 2 fondos sutilmente distintos:
  - Secciones A (impares): `bg-brand-void` — negro cósmico base
  - Secciones B (pares): `bg-brand-surface/50` — superficie levemente más clara
- Agregar un divisor SVG de ola o diagonal entre secciones clave:

```tsx
// WaveDivider.tsx
export function WaveDivider({ flip = false }) {
  return (
    <div className={`overflow-hidden ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 1440 48" fill="none">
        <path d="M0 48C360 0 1080 0 1440 48H0Z" fill="currentColor" className="text-brand-surface/30" />
      </svg>
    </div>
  )
}
```

- Impacto: Medio — mejora el ritmo de lectura y la escaneabilidad
- Esfuerzo: Bajo

---

### 8.19 Mobile UX — Barra de navegación inferior fija

**Problema actual:**
En mobile, el menú hamburguesa requiere 2 taps para navegar. El patrón de "bottom navigation bar" es el estándar en apps móviles premium y sitios SaaS modernos.

**Propuesta:**
```tsx
// components/layout/BottomNav.tsx — solo visible en md:hidden
<nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-brand-lavender/15 bg-brand-surface/90 backdrop-blur-xl px-2 pb-safe">
  <div className="flex justify-around py-2">
    {[
      { href: '/', icon: Home, label: 'Inicio' },
      { href: '/#productos', icon: Grid, label: 'Productos' },
      { href: '/blog', icon: BookOpen, label: 'Blog' },
      { href: '/contacto', icon: Mail, label: 'Contacto' },
    ].map(item => (
      <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 py-1 px-3 text-text-muted">
        <item.icon className="h-5 w-5" />
        <span className="text-[10px]">{item.label}</span>
      </Link>
    ))}
  </div>
</nav>
```

- Impacto: Alto en mobile — mejora UX de forma dramática
- Esfuerzo: Bajo

---

### 8.20 Sección de cierre — "Manifiesto de marca" con tipografía de impacto

**Problema actual:**
La sección `FinalCTA` (`CTASection`) es un bloque de texto + botón. Es el cierre del home y debe ser memorable. Actualmente no lo es.

**Propuesta — Statement de cierre cinético:**
En vez de una CTA genérica, terminar el home con una frase de posicionamiento de marca en tipografía masiva:

```tsx
// Una sola línea de alto impacto, tipografía 96px, semitransparente
<section className="py-32 overflow-hidden">
  <p className="font-display text-[5rem] sm:text-[8rem] lg:text-[10rem] font-bold leading-none
                text-transparent bg-clip-text
                bg-gradient-to-r from-brand-violet via-brand-lavender to-brand-gold
                text-center tracking-[-0.04em] px-4">
    Operaciones que escalan.
  </p>
  <p className="text-center mt-8 text-text-muted text-lg">
    El software que su equipo necesita para operar al siguiente nivel.
  </p>
  <div className="flex justify-center mt-10">
    <Button href="/contacto" size="lg">Agendar conversación →</Button>
  </div>
</section>
```

Este patrón lo usan Linear, Vercel, Raycast y los SaaS más premium del mercado.

- Impacto: Alto — el cierre define cómo el visitante recuerda la marca
- Esfuerzo: Bajo

---

## Resumen de las 20 mejoras premium

| # | Mejora | Impacto | Esfuerzo | Prioridad |
|---|--------|---------|----------|-----------|
| 8.1 | Paleta Obsidian Violet | Transformacional | Alto | 1 |
| 8.2 | Tipografía dramática con escala | Alto | Medio | 2 |
| 8.3 | Fondo Aurora + noise texture | Alto | Bajo | 3 |
| 8.4 | Botón CTA violeta con halo | Alto | Bajo | 4 |
| 8.5 | Navbar compacta con ruta activa | Medio-Alto | Bajo | 5 |
| 8.6 | Sistema de cards con jerarquía | Alto | Medio | 6 |
| 8.7 | Hero dashboard animado real | Alto | Medio | 7 |
| 8.8 | Contadores animados scroll | Medio-Alto | Bajo | 8 |
| 8.9 | Testimonios editoriales | Alto | Medio | 9 |
| 8.10 | TrustBar con marquee y logos | Medio | Bajo | 10 |
| 8.11 | ProblemSolution con íconos | Alto | Bajo | 11 |
| 8.12 | ProductGrid con colores únicos | Alto | Medio | 12 |
| 8.13 | Microanimaciones con stagger | Medio-Alto | Medio | 13 |
| 8.14 | Footer editorial con gradiente | Medio | Bajo | 14 |
| 8.15 | Corrección de tildes/ortografía | Alto percepción | Bajo | 15 |
| 8.16 | Hero typewriter de industrias | Medio | Bajo | 16 |
| 8.17 | Screenshots con marco browser | Muy Alto | Medio | 17 |
| 8.18 | Variación de fondos por sección | Medio | Bajo | 18 |
| 8.19 | Bottom nav mobile | Alto mobile | Bajo | 19 |
| 8.20 | Cierre con tipografía de impacto | Alto | Bajo | 20 |
- Entregables realizados:
  - Integracion de monitoreo equivalente a Sentry con endpoint interno `POST /api/monitoring/error`.
  - Captura de errores frontend via listeners globales y error boundaries de App Router.
  - Registro estructurado backend con forwarding opcional via `MONITORING_WEBHOOK_URL`.
  - Trazabilidad en `POST /api/contact` con `requestId` en payload y header `X-Request-Id`.
- Impacto: Alto
- Esfuerzo: Medio

- Validacion final de la seccion 7:
  - `npm run test:unit` OK
  - `npm run test:e2e` OK
  - `npm run lint` OK
  - `npm run build` OK

## Backlog sugerido por fases

### Fase 1 (Quick wins: 1-2 semanas)
- MetadataBase + OG/Twitter metadata
- Favicon e iconos
- Mejoras A11y basicas (focus-visible, aria-expanded, aria-live)
- README actualizado
- Hardening inicial del formulario (escape de HTML + honeypot)

### Fase 2 (2-4 semanas)
- Rate limit y cabeceras de seguridad
- Structured data ampliada (Organization, Breadcrumbs, Product)
- Estandarizacion de analytics de conversion
- Optimizar homepage para menor JS cliente

### Fase 3 (4-8 semanas)
- Suite de testing (unit + E2E)
- Performance budget y monitoreo continuo
- Migracion de contenido de blog a MDX/CMS
- Programa continuo de CRO con experimentacion

## KPIs recomendados para validar mejoras
- SEO: impresiones, CTR orgánico, posiciones top-10 por página objetivo
- Conversion: tasa de envio de formulario, CTR de CTAs, tasa de rebote por landing
- UX/Performance: LCP, INP, CLS por plantilla
- Calidad tecnica: errores en producción, cobertura de tests, tiempo de resolución de incidentes
