import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowUpRight, Home, ShieldCheck, Wifi, Wrench } from "lucide-react";
import { homeSupportPlans } from "@/data/service-plans";
import { commercialEvidenceEnabled } from "@/data/site";
import { Button } from "@/components/shared/ui/Button";
import { CoverageChecker } from "@/components/products/CoverageChecker";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Soporte tecnológico para hogares | Novamind",
  description:
    "Soporte tecnológico residencial en Costa Rica para computadoras, redes, seguridad digital, gaming y hogares conectados.",
  path: "/hogares",
  extraKeywords: [
    "soporte técnico a domicilio Costa Rica",
    "soporte de computadoras para hogares",
    "asistencia tecnológica residencial",
  ],
});

const homeServices = [
  {
    icon: Wrench,
    title: "Equipos y asistencia",
    description:
      "Diagnóstico, optimización y acompañamiento para que tus dispositivos vuelvan a funcionar.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad digital",
    description:
      "Buenas prácticas, protección del equipo y ayuda para reconocer riesgos comunes.",
  },
  {
    icon: Wifi,
    title: "Conectividad y hogar inteligente",
    description:
      "Configuración de Wi-Fi, dispositivos conectados y soluciones SmartHome.",
  },
];

export default function HomesPage() {
  return (
    <>
      <SectionWrapper className="pb-8 pt-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                Novamind · Para hogares
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#f0f8ff] sm:text-5xl lg:text-6xl">
                Tu tecnología en casa, sin complicaciones.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-7 text-text-muted">
                Atención tecnológica para personas y familias en Costa Rica:
                diagnóstico, soporte a domicilio y ayuda para proteger y
                conectar tus dispositivos.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#planes">Ver opciones de soporte</Button>
                <Button href="/contacto" variant="ghost">
                  Consultar disponibilidad
                </Button>
              </div>
              <p className="mt-4 text-xs text-text-subtle">
                Cobertura, agenda y componentes se confirman antes de cada
                servicio.
              </p>
            </div>
            <div className="relative rounded-3xl border border-orange-300/15 bg-[radial-gradient(circle_at_75%_25%,rgba(251,146,60,0.18),transparent_40%),linear-gradient(145deg,rgba(30,25,25,0.8),rgba(11,13,24,0.95))] p-7 sm:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-300/10 text-orange-200">
                <Home className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-8 font-display text-2xl font-semibold text-[#f0f8ff]">
                Ayuda clara y cercana.
              </p>
              <p className="mt-3 text-sm leading-6 text-text-muted">
                Conoce el alcance y las condiciones antes de reservar. Sin
                sorpresas por zonas, equipos o trabajos adicionales.
              </p>
              <Link
                href="#planes"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-200"
              >
                Explorar servicios
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper className="py-8">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {homeServices.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/8 bg-brand-card/55 p-5"
              >
                <Icon className="h-5 w-5 text-orange-300" aria-hidden="true" />
                <h2 className="mt-4 font-display text-lg font-semibold text-[#f0f8ff]">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper id="planes">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
              Opciones residenciales
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              Elige el nivel de ayuda que necesitas.
            </h2>
            <p className="mt-3 text-sm leading-6 text-text-muted">
              {commercialEvidenceEnabled
                ? "Precios en colones e IVA incluido. Revisa el alcance y confirma cobertura y agenda antes de reservar."
                : "Las opciones describen posibles alcances. Precio, cobertura, agenda y condiciones se confirman antes de reservar."}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {homeSupportPlans.map((plan) => (
              <article
                key={plan.slug}
                className={`flex flex-col rounded-2xl border bg-brand-card/65 p-6 ${
                  plan.highlight
                    ? "border-orange-300/40 shadow-[0_12px_42px_-24px_rgba(251,146,60,0.6)]"
                    : "border-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#f0f8ff]">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted">
                      {plan.tagline}
                    </p>
                  </div>
                  {plan.highlight && (
                    <span className="rounded-full border border-orange-300/20 bg-orange-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-orange-200">
                      Recomendado
                    </span>
                  )}
                </div>
                {commercialEvidenceEnabled ? (
                  <>
                    <p className="mt-6 font-display text-2xl font-bold text-[#f0f8ff]">
                      {plan.priceLabel}
                      {plan.paymentType === "monthly" && (
                        <span className="ml-1 text-sm font-medium text-text-muted">
                          /mes
                        </span>
                      )}
                    </p>
                    <ul className="mt-5 flex-1 space-y-3">
                      {plan.features.slice(0, 4).map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-2 text-sm leading-5 text-text-muted"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-orange-300"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 border-t border-white/8 pt-4 text-xs leading-5 text-text-subtle">
                      {plan.minDuration} · Garantía: {plan.guarantee}
                    </p>
                    <details className="mt-3 border-t border-white/8 pt-3">
                      <summary className="cursor-pointer text-xs font-medium text-text-muted">
                        Alcance y exclusiones
                      </summary>
                      <ul className="mt-2 space-y-1.5 text-xs leading-5 text-text-subtle">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation}>{limitation}</li>
                        ))}
                      </ul>
                    </details>
                  </>
                ) : (
                  <p className="mt-6 flex-1 border-t border-white/8 pt-4 text-sm leading-6 text-text-muted">
                    Consulta el alcance, el precio y las condiciones vigentes
                    para este servicio antes de agendar.
                  </p>
                )}
                <Button
                  href={plan.ctaHref}
                  className="mt-5 w-full"
                  trackingContext={{
                    page: "hogares",
                    section: "plans",
                    ctaLabel: "reservar_soporte_hogar",
                    destination: plan.ctaHref,
                    product: plan.slug,
                    intent: "consultation",
                  }}
                >
                  {plan.cta}
                </Button>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <div className="mb-5 text-center">
              <h3 className="font-display text-2xl font-bold text-[#f0f8ff]">
                Confirma la zona de atención
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                La disponibilidad y cualquier recargo se confirman con la
                dirección exacta antes de reservar.
              </p>
            </div>
            <CoverageChecker />
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
