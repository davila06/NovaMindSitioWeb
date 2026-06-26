# 🌐 Documento de referencia — Modificación Web Novamind Global

## 🏢 Identidad corporativa

**Empresa:** Novamind Global  
**Sede:** Costa Rica  
**Fundación:** 2022  
**Propuesta de valor:** Apps empresariales IA-native y servicios de soporte ágil, integrados en una arquitectura SaaS multi-tenant sobre Azure.

---

## 🔑 Secciones principales del sitio

### 1. Hero Section (Inicio `/`)

- Tagline: “Automatizamos tu operación con IA aplicada y soporte ágil.”
- CTA: “Explora nuestros servicios”
- Fondo: ilustración tecnológica con circuitos y nube.

---

### 2. Servicios NovaMind Global (`/servicios`)

**Título:** “Servicios de consultoría y desarrollo”  
**Subtítulo:** “Expertise técnico para transformar tu operación.”

**Servicios ofrecidos (cards con íconos):**

- **Desarrollo de apps** → apps empresariales IA-native, multi-tenant, sobre Azure.
- **Servicios de desarrollador** → outsourcing de talento técnico certificado.
- **Consultoría en infraestructura de aplicaciones** → arquitectura cloud, escalabilidad, seguridad.
- **Consultoría en desarrollo de software** → clean architecture, modular monolith, integración SaaS.
- **Metodologías ágiles** → Scrum, Kanban, DevOps pipelines.
- **QA y validación** → pruebas unitarias, E2E, automatización de calidad.
- **Ciberseguridad** → auditorías, Zero Trust, cumplimiento normativo.
- **Redes** → optimización LAN/WAN, segmentación, QoS.

**CTA final:** “Solicita tu consultoría NovaMind.”

---

### 3. NovaClick (`/productos/novaclick`)

**Título:** “NovaClick — soporte técnico inmediato para hogares y empresas”  
**Subtítulo:** “ClickFix y ITOn-Demand, dos líneas de servicio bajo una misma plataforma.”

#### 🏠 ClickFix (Residencial)

Planes con precios ajustados (IVA incluido):

- Visita Express → ₡19,500
- Premium → ₡32,000
- Familiar → ₡52,000
- Gamer → ₡45,000
- Senior → ₡26,000
- SmartHome → ₡39,000
- Total → ₡65,000

**Beneficios:** diagnóstico rápido, respaldo en nube, configuración IoT, seguridad digital.  
**CTA:** “Agenda tu servicio ClickFix.”

#### 🏢 ITOn-Demand (Empresarial)

Planes con precios ajustados (IVA incluido):

- Básico → ₡130,000
- Avanzado → ₡320,000
- Total → ₡640,000
- Startup → ₡190,000
- Compliance → ₡380,000
- CloudFirst → ₡255,000
- Enterprise → ₡770,000

**Beneficios:** respaldo automático, ciberseguridad avanzada, migración cloud, ERP/CRM integrados.  
**CTA:** “Solicita tu plan ITOn-Demand.”

---

### 4. Suscripción a Apps SaaS (`/productos/saas`)

**Título:** “Suscríbete a nuestras soluciones SaaS”  
**Subtítulo:** “Apps empresariales listas para usar, con facturación electrónica y soporte continuo.”

**Apps disponibles (cards con íconos):**

- **VoiceBot Multi-Tenant** → atención omnicanal con IA.
- **PlanillasCR** → nómina y RRHH con cumplimiento legal.
- **CCERP** → ERP multiempresa con inteligencia integrada.
- **MindFlow** → motor de ventas automatizadas.
- **MindFlow AI Sales Engine** → ciclo comercial end-to-end con IA.
- **IADS** → gestión integral de seguros y cobranzas.
- **Mi Mascotica (PawTrack)** → app gratuita de reunificación de mascotas.

**CTA final:** “Suscríbete ahora y transforma tu operación.”

---

## 🎨 Diseño visual

- **Colores:** paleta corporativa (azul #0078D7, cian #00B5E2, gris #5A5A5A, blanco #FFFFFF) + naranja #F47932 para NovaClick.
- **Tipografía:** Montserrat (títulos) + Lato (texto).
- **Hero sections:** carrusel con slides para NovaMind, NovaClick y SaaS.
- **Trust badges:** “Multi-tenant · Azure-native · Facturación electrónica · SLA garantizado.”

---

## ⚙️ Integración técnica

- **Rutas en `app/`:**
  - `/servicios` → consultoría y desarrollo.
  - `/productos/novaclick` → ClickFix + ITOn-Demand.
  - `/productos/saas` → suscripción a apps SaaS.
- **Data en `data/novafix.ts`:** catálogo de planes con nombre, precio, features, KPIs, CTA.
- **Componentes en `components/`:**
  - `ServiceCard.tsx` → card con nombre, precio, features, CTA.
  - `Carousel.tsx` → carrusel de servicios.
  - `TrustBadges.tsx` → badges de seguridad y SLA.
  - `CTAButton.tsx` → botón con estilos Tailwind.
- **Formulario `/contacto`:** selector de interés (Consultoría, NovaClick, SaaS). Validación con Zod. Entrega vía Resend/SMTP con trazabilidad (`X-Request-Id`).

---

## 📊 SEO y marketing

- Metadatos optimizados por sección:
  - Servicios → “Consultoría y desarrollo de software en Costa Rica.”
  - NovaClick → “Soporte técnico inmediato para hogares y empresas.”
  - SaaS → “Suscripción a apps empresariales IA-native.”
- OpenGraph: imágenes de cada logo.
- Blog MDX: artículos educativos sobre optimización de PC, transformación digital y casos de éxito.

---

## 🚀 Out-of-the-box ideas

- **Dashboard unificado:** historial de servicios NovaClick + suscripciones SaaS en un mismo panel.
- **Cross-selling:** banners en productos SaaS → “¿Necesitas soporte inmediato? Descubre NovaClick.”
- **Gamificación:** puntos acumulables por uso de servicios, visibles en perfil web.
- **Modo dual:** web como hub para empresas SaaS IA-native y clientes residenciales/empresariales.

---

# 🎯 Conclusión

Este documento define la **estructura, contenido y componentes técnicos** necesarios para modificar la web de Novamind Global e integrar:

1. **Servicios de consultoría y desarrollo.**
2. **Servicios NovaClick (ClickFix + ITOn-Demand).**
3. **Suscripciones a apps SaaS ya desarrolladas.**

Está listo para implementarse en el repo con GitHub Copilot y VS Code.
