import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { NovaClickPlanGrid } from "@/components/products/NovaClickPlanGrid";
import { CoverageChecker } from "@/components/products/CoverageChecker";
import { CostSimulator } from "@/components/products/CostSimulator";
import { Button } from "@/components/shared/ui/Button";
import { Badge } from "@/components/shared/ui/Badge";
import { createPageMetadata, siteConfig } from "@/lib/seo";
import {
  clickFixPlans,
  itonDemandPlans,
  clickFixGeneralConditions,
} from "@/data/novaclick";
import {
  Clock,
  ShieldCheck,
  Cloud,
  Wrench,
  Home,
  Building2,
  CreditCard,
  RefreshCcw,
  FileText,
  Banknote,
  Smartphone,
  ArrowRightLeft,
  Zap,
  AlertCircle,
  Lock,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "NovaClick — Soporte técnico inmediato | Novamind Global",
  description:
    "Soporte técnico a domicilio y TI gestionado para hogares y empresas. ClickFix residencial e ITOn-Demand empresarial. Costa Rica.",
  path: "/productos/novaclick",
  extraKeywords: [
    "soporte técnico Costa Rica",
    "soporte informático a domicilio",
    "servicio IT empresas Costa Rica",
    "mantenimiento computadoras Costa Rica",
    "ClickFix",
    "ITOn-Demand",
  ],
});

const benefitsResidential = [
  {
    icon: <Clock className="h-5 w-5 text-orange-400" aria-hidden="true" />,
    title: "Diagnóstico rápido",
    desc: "Técnico en tu hogar en menos de 24 horas hábiles.",
  },
  {
    icon: <Cloud className="h-5 w-5 text-orange-400" aria-hidden="true" />,
    title: "Respaldo en nube",
    desc: "Tus datos seguros con respaldo automático incluido en planes Premium y superiores.",
  },
  {
    icon: <Wrench className="h-5 w-5 text-orange-400" aria-hidden="true" />,
    title: "Configuración IoT",
    desc: "Integramos tu hogar inteligente con red segura y asistentes de voz.",
  },
  {
    icon: (
      <ShieldCheck className="h-5 w-5 text-orange-400" aria-hidden="true" />
    ),
    title: "Seguridad digital",
    desc: "Protección ante virus, phishing y accesos no autorizados.",
  },
];

const benefitsEnterprise = [
  {
    icon: (
      <Building2 className="h-5 w-5 text-brand-lavender" aria-hidden="true" />
    ),
    title: "TI gestionado",
    desc: "Soporte proactivo para toda la empresa sin necesidad de área de TI interna.",
  },
  {
    icon: <Cloud className="h-5 w-5 text-brand-lavender" aria-hidden="true" />,
    title: "Migración cloud",
    desc: "Migramos servidores y servicios a Azure con roadmap y acompañamiento.",
  },
  {
    icon: (
      <ShieldCheck className="h-5 w-5 text-brand-lavender" aria-hidden="true" />
    ),
    title: "Ciberseguridad avanzada",
    desc: "Firewall, IAM, cifrado y cumplimiento normativo continuo.",
  },
  {
    icon: <Wrench className="h-5 w-5 text-brand-lavender" aria-hidden="true" />,
    title: "ERP/CRM integrados",
    desc: "Conectamos tu stack TI con las apps SaaS de Novamind Global.",
  },
];

export default function NovaClickPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${siteConfig.url}/productos/novaclick`,
        url: `${siteConfig.url}/productos/novaclick`,
        name: "NovaClick",
        description:
          "Soporte técnico inmediato para hogares y empresas. ClickFix residencial e ITOn-Demand empresarial.",
        brand: { "@type": "Brand", name: "Novamind Global" },
        offers: [
          {
            "@type": "AggregateOffer",
            priceCurrency: "CRC",
            lowPrice: 19500,
            highPrice: 770000,
            offerCount: 14,
          },
        ],
        inLanguage: "es-CR",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: `${siteConfig.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Productos",
            item: `${siteConfig.url}/#productos`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "NovaClick",
            item: `${siteConfig.url}/productos/novaclick`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <SectionWrapper className="pb-8 pt-14">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge>Soporte técnico inmediato</Badge>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-[#f0f8ff] sm:text-5xl">
              NovaClick —{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                soporte inmediato
              </span>{" "}
              para hogares y empresas
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              Dos líneas de servicio bajo una misma plataforma:{" "}
              <strong className="font-semibold text-orange-300">
                ClickFix
              </strong>{" "}
              para hogares y{" "}
              <strong className="font-semibold text-brand-lavender">
                ITOn-Demand
              </strong>{" "}
              para empresas.
            </p>

            {/* Hero stat row */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "14", label: "planes disponibles" },
                { value: "24 h", label: "tiempo de respuesta" },
                { value: "100%", label: "factura electrónica" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-brand-lavender/15 bg-brand-card/60 px-3 py-4 text-center"
                >
                  <div className="font-display text-2xl font-bold text-[#f0f8ff]">
                    {value}
                  </div>
                  <div className="mt-1 text-xs text-text-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Beneficios duales ────────────────────────────────────────── */}
      <SectionWrapper className="py-10" aria-label="Beneficios de NovaClick">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* ClickFix */}
            <div className="rounded-2xl border border-orange-500/25 bg-brand-card/70 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-orange-400" aria-hidden="true" />
                <h2 className="font-display text-xl font-semibold text-[#f0f8ff]">
                  ClickFix — Residencial
                </h2>
              </div>
              <p className="mb-5 text-sm text-text-muted">
                Servicio a domicilio para familias, estudiantes y usuarios
                individuales que necesitan su tecnología funcionando.
              </p>
              <ul className="space-y-4">
                {benefitsResidential.map(({ icon, title, desc }) => (
                  <li key={title} className="flex gap-3">
                    <div className="mt-0.5 shrink-0">{icon}</div>
                    <div>
                      <span className="block text-sm font-semibold text-[#f0f8ff]">
                        {title}
                      </span>
                      <span className="text-sm text-text-muted">{desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* ITOn-Demand */}
            <div className="rounded-2xl border border-brand-lavender/25 bg-brand-card/70 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Building2
                  className="h-5 w-5 text-brand-lavender"
                  aria-hidden="true"
                />
                <h2 className="font-display text-xl font-semibold text-[#f0f8ff]">
                  ITOn-Demand — Empresarial
                </h2>
              </div>
              <p className="mb-5 text-sm text-text-muted">
                TI gestionado para PyMEs y empresas que quieren operar con nivel
                enterprise sin montar un área de TI propia.
              </p>
              <ul className="space-y-4">
                {benefitsEnterprise.map(({ icon, title, desc }) => (
                  <li key={title} className="flex gap-3">
                    <div className="mt-0.5 shrink-0">{icon}</div>
                    <div>
                      <span className="block text-sm font-semibold text-[#f0f8ff]">
                        {title}
                      </span>
                      <span className="text-sm text-text-muted">{desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Plan grid ────────────────────────────────────────────────── */}
      <SectionWrapper id="planes" aria-labelledby="planes-heading">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Planes y precios
            </p>
            <h2
              id="planes-heading"
              className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl"
            >
              Elige el plan que se ajusta a tu necesidad
            </h2>
          </div>
          <NovaClickPlanGrid />
        </Container>
      </SectionWrapper>

      {/* ── Cobertura geográfica ──────────────────────────────────── */}
      <SectionWrapper className="py-14" aria-labelledby="cobertura-heading">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
              Cobertura ClickFix
            </p>
            <h2
              id="cobertura-heading"
              className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl"
            >
              ¿Llegamos a tu zona?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-muted">
              El servicio técnico a domicilio tiene base en San José. Zonas
              fuera del radio base aplican un recargo de desplazamiento.
            </p>
          </div>
          <CoverageChecker />
        </Container>
      </SectionWrapper>

      {/* ── Términos por plan ────────────────────────────────────────── */}
      <SectionWrapper className="py-14" aria-labelledby="terminos-heading">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Transparencia total
            </p>
            <h2
              id="terminos-heading"
              className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl"
            >
              Términos por plan
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-muted">
              Conoce exactamente qué incluye cada plan, su modalidad de pago,
              garantía y limitaciones antes de contratar.
            </p>
          </div>

          <div className="space-y-3">
            {/* ClickFix */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Home className="h-4 w-4 text-orange-400" aria-hidden="true" />
                <span className="text-sm font-bold uppercase tracking-widest text-orange-400">
                  ClickFix — Residencial
                </span>
              </div>
              {clickFixPlans.map((plan) => (
                <details
                  key={plan.slug}
                  className="group mb-2 rounded-xl border border-white/8 bg-brand-card/60 backdrop-blur-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-bold text-[#f0f8ff]">
                        {plan.name}
                      </span>
                      <span className="hidden text-xs text-text-muted sm:inline">
                        {plan.priceLabel}
                      </span>
                      {plan.paymentType === "monthly" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-violet/15 px-2 py-0.5 text-[10px] font-bold text-brand-lavender">
                          <RefreshCcw
                            className="h-2.5 w-2.5"
                            aria-hidden="true"
                          />
                          Suscripción
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-bold text-text-muted">
                          <CreditCard
                            className="h-2.5 w-2.5"
                            aria-hidden="true"
                          />
                          Pago único
                        </span>
                      )}
                    </div>
                    <svg
                      className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="border-t border-white/8 px-5 py-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                          <Clock
                            className="mt-0.5 h-4 w-4 shrink-0 text-orange-400"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-semibold text-[#f0f8ff]">
                              Duración mínima:
                            </span>{" "}
                            <span className="text-text-muted">
                              {plan.minDuration}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <ShieldCheck
                            className="mt-0.5 h-4 w-4 shrink-0 text-orange-400"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-semibold text-[#f0f8ff]">
                              Garantía:
                            </span>{" "}
                            <span className="text-text-muted">
                              {plan.guarantee}
                            </span>
                          </div>
                        </div>
                        {plan.sla && (
                          <div className="flex items-start gap-2 text-sm">
                            <Zap
                              className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                              aria-hidden="true"
                            />
                            <div>
                              <span className="font-semibold text-[#f0f8ff]">
                                SLA:
                              </span>{" "}
                              <span className="text-text-muted">
                                {plan.sla}
                              </span>
                            </div>
                          </div>
                        )}
                        {plan.cancellationPolicy && (
                          <div className="flex items-start gap-2 text-sm">
                            <FileText
                              className="mt-0.5 h-4 w-4 shrink-0 text-text-muted"
                              aria-hidden="true"
                            />
                            <div>
                              <span className="font-semibold text-[#f0f8ff]">
                                Cancelación:
                              </span>{" "}
                              <span className="text-text-muted">
                                {plan.cancellationPolicy}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      {plan.limitations.length > 0 && (
                        <div>
                          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                            <AlertCircle
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            Limitaciones
                          </div>
                          <ul className="space-y-1">
                            {plan.limitations.map((lim) => (
                              <li
                                key={lim}
                                className="flex items-start gap-1.5 text-xs text-text-muted/70"
                              >
                                <span
                                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400/40"
                                  aria-hidden="true"
                                />
                                {lim}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </div>

            {/* ITOn-Demand */}
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2">
                <Building2
                  className="h-4 w-4 text-brand-lavender"
                  aria-hidden="true"
                />
                <span className="text-sm font-bold uppercase tracking-widest text-brand-lavender">
                  ITOn-Demand — Empresarial
                </span>
              </div>
              {itonDemandPlans.map((plan) => (
                <details
                  key={plan.slug}
                  className="group mb-2 rounded-xl border border-white/8 bg-brand-card/60 backdrop-blur-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-bold text-[#f0f8ff]">
                        {plan.name}
                      </span>
                      <span className="hidden text-xs text-text-muted sm:inline">
                        {plan.priceLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-violet/15 px-2 py-0.5 text-[10px] font-bold text-brand-lavender">
                        <RefreshCcw
                          className="h-2.5 w-2.5"
                          aria-hidden="true"
                        />
                        Suscripción
                      </span>
                    </div>
                    <svg
                      className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="border-t border-white/8 px-5 py-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                          <Clock
                            className="mt-0.5 h-4 w-4 shrink-0 text-brand-lavender"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-semibold text-[#f0f8ff]">
                              Duración mínima:
                            </span>{" "}
                            <span className="text-text-muted">
                              {plan.minDuration}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <ShieldCheck
                            className="mt-0.5 h-4 w-4 shrink-0 text-brand-lavender"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-semibold text-[#f0f8ff]">
                              Garantía:
                            </span>{" "}
                            <span className="text-text-muted">
                              {plan.guarantee}
                            </span>
                          </div>
                        </div>
                        {plan.sla && (
                          <div className="flex items-start gap-2 text-sm">
                            <Zap
                              className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                              aria-hidden="true"
                            />
                            <div>
                              <span className="font-semibold text-[#f0f8ff]">
                                SLA:
                              </span>{" "}
                              <span className="text-text-muted">
                                {plan.sla}
                              </span>
                            </div>
                          </div>
                        )}
                        {plan.cancellationPolicy && (
                          <div className="flex items-start gap-2 text-sm">
                            <FileText
                              className="mt-0.5 h-4 w-4 shrink-0 text-text-muted"
                              aria-hidden="true"
                            />
                            <div>
                              <span className="font-semibold text-[#f0f8ff]">
                                Cancelación:
                              </span>{" "}
                              <span className="text-text-muted">
                                {plan.cancellationPolicy}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      {plan.limitations.length > 0 && (
                        <div>
                          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                            <AlertCircle
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            Limitaciones
                          </div>
                          <ul className="space-y-1">
                            {plan.limitations.map((lim) => (
                              <li
                                key={lim}
                                className="flex items-start gap-1.5 text-xs text-text-muted/70"
                              >
                                <span
                                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-lavender/40"
                                  aria-hidden="true"
                                />
                                {lim}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Condiciones generales ────────────────────────────────────── */}
      <SectionWrapper className="py-14" aria-labelledby="condiciones-heading">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Condiciones generales
            </p>
            <h2
              id="condiciones-heading"
              className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl"
            >
              Todo lo que necesitas saber
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Payment methods */}
            <div className="rounded-2xl border border-white/8 bg-brand-card/60 p-5">
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center">
                <div
                  className="absolute inset-0 translate-y-0.5 scale-90 rounded-xl bg-brand-violet/40 blur-md"
                  aria-hidden="true"
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-brand-iris to-brand-violet shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <Banknote className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
              <h3 className="font-display text-sm font-bold text-[#f0f8ff]">
                Métodos de pago
              </h3>
              <ul className="mt-3 space-y-2">
                {clickFixGeneralConditions.paymentMethods.map((method) => (
                  <li
                    key={method}
                    className="flex items-center gap-2 text-sm text-text-muted"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-lavender/60"
                      aria-hidden="true"
                    />
                    {method}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mora */}
            <div className="rounded-2xl border border-white/8 bg-brand-card/60 p-5">
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center">
                <div
                  className="absolute inset-0 translate-y-0.5 scale-90 rounded-xl bg-amber-500/40 blur-md"
                  aria-hidden="true"
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <AlertCircle
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h3 className="font-display text-sm font-bold text-[#f0f8ff]">
                Penalidad por mora
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {clickFixGeneralConditions.latePaymentPenalty}
              </p>
            </div>

            {/* SLA credit */}
            <div className="rounded-2xl border border-white/8 bg-brand-card/60 p-5">
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center">
                <div
                  className="absolute inset-0 translate-y-0.5 scale-90 rounded-xl bg-sky-500/40 blur-md"
                  aria-hidden="true"
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-sky-400 to-sky-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
              <h3 className="font-display text-sm font-bold text-[#f0f8ff]">
                Crédito por incumplimiento SLA
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {clickFixGeneralConditions.slaCredit}
              </p>
            </div>

            {/* SINPE / digital wallet */}
            <div className="rounded-2xl border border-white/8 bg-brand-card/60 p-5">
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center">
                <div
                  className="absolute inset-0 translate-y-0.5 scale-90 rounded-xl bg-orange-500/40 blur-md"
                  aria-hidden="true"
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-orange-400 to-orange-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <Smartphone
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h3 className="font-display text-sm font-bold text-[#f0f8ff]">
                SINPE Móvil
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Aceptamos pagos por SINPE Móvil para mayor comodidad. El número
                se confirma al agendar el servicio.
              </p>
            </div>

            {/* Factura electrónica */}
            <div className="rounded-2xl border border-white/8 bg-brand-card/60 p-5">
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center">
                <div
                  className="absolute inset-0 translate-y-0.5 scale-90 rounded-xl bg-emerald-500/40 blur-md"
                  aria-hidden="true"
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <ArrowRightLeft
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h3 className="font-display text-sm font-bold text-[#f0f8ff]">
                Factura electrónica
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Emitimos factura electrónica para todos los planes ITOn-Demand y
                a solicitud en planes ClickFix.
              </p>
            </div>

            {/* Privacidad */}
            <div className="rounded-2xl border border-white/8 bg-brand-card/60 p-5">
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center">
                <div
                  className="absolute inset-0 translate-y-0.5 scale-90 rounded-xl bg-brand-lavender/40 blur-md"
                  aria-hidden="true"
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-brand-lavender to-brand-violet shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <Lock className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
              <h3 className="font-display text-sm font-bold text-[#f0f8ff]">
                Privacidad de datos
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {clickFixGeneralConditions.privacy}
              </p>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Simulador de costos ──────────────────────────────────────── */}
      <SectionWrapper className="py-14" aria-labelledby="simulator-heading">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
              Sin sorpresas
            </p>
            <h2
              id="simulator-heading"
              className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl"
            >
              Simula tu costo exacto
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-muted">
              Selecciona un plan y tu zona geográfica para calcular el precio
              final con IVA incluido y recargo de desplazamiento si aplica. Los
              planes de suscripción pueden prepagarse anualmente con un{" "}
              <strong className="text-brand-gold">15% de descuento</strong>.
            </p>
          </div>
          <CostSimulator />
        </Container>
      </SectionWrapper>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <SectionWrapper className="py-14">
        <Container>
          <div className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 px-8 py-10 text-center shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              ¿Tienes dudas?
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff]">
              Hablemos antes de elegir un plan
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-text-muted">
              Nuestro equipo te ayuda a identificar el servicio correcto.
              Respuesta en menos de 24 horas hábiles.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                href="/contacto"
                trackingContext={{
                  page: "novaclick",
                  section: "bottom-cta",
                  ctaLabel: "contacto_novaclick",
                  destination: "/contacto",
                  intent: "demo",
                }}
              >
                Contactar ahora
              </Button>
              <Button
                href="/productos/saas"
                variant="ghost"
                trackingContext={{
                  page: "novaclick",
                  section: "bottom-cta",
                  ctaLabel: "ver_saas",
                  destination: "/productos/saas",
                  intent: "explore",
                }}
              >
                Ver apps SaaS
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
