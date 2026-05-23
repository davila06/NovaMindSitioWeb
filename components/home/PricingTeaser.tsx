'use client'
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";
import { Check } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const TIERS = [
  {
    name: "Starter",
    price: "Desde $299",
    period: "/mes",
    description: "Para equipos que comienzan a automatizar procesos clave.",
    features: [
      "1 producto Novamind",
      "Hasta 50 usuarios activos",
      "Soporte técnico por correo",
      "API básica incluida",
    ],
    cta: "Comenzar gratis",
    href: "/contacto",
    highlight: false,
  },
  {
    name: "Business",
    price: "Desde $799",
    period: "/mes",
    description:
      "Para operaciones en crecimiento con múltiples flujos críticos.",
    features: [
      "Hasta 3 productos Novamind",
      "Usuarios ilimitados",
      "Soporte prioritario 24/7",
      "API avanzada + webhooks",
      "Integraciones ERP y CRM",
    ],
    cta: "Agendar demo",
    href: "/contacto",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "A la medida",
    period: "",
    description:
      "Para organizaciones con escala, gobierno y seguridad de nivel corporativo.",
    features: [
      "Suite completa Novamind",
      "Instancia dedicada en Azure",
      "SLA personalizado con penalidades",
      "Acompañamiento estratégico",
      "Contratos Marco y NDA",
    ],
    cta: "Hablar con ventas",
    href: "/contacto",
    highlight: false,
  },
];

export function PricingTeaser() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  return (
    <SectionWrapper id="precios">
      <Container>
        <div ref={headingRef} className="mb-10 max-w-2xl reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Planes
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Inversión que escala con tu operación
          </h2>
          <p className="mt-3 text-text-muted">
            Precios referenciales. Cada implementación se dimensiona según
            alcance y módulos activos.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition hover:-translate-y-1 ${
                tier.highlight
                  ? "border-brand-violet/60 bg-brand-violet/10 shadow-violet"
                  : "border-brand-lavender/18 bg-brand-card/80"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand-violet px-4 py-1 text-xs font-bold text-white shadow-violet">
                    Más popular
                  </span>
                </div>
              )}

              <p className="font-display text-lg font-bold text-[#f0f8ff]">
                {tier.name}
              </p>
              <div className="mt-3 flex items-end gap-1">
                <span className="font-display text-3xl font-bold text-[#f0f8ff]">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="mb-1 text-sm text-text-muted">
                    {tier.period}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-5 text-text-muted">
                {tier.description}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-lavender"
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href={tier.href}
                  variant={tier.highlight ? "solid" : "ghost"}
                  className="w-full justify-center"
                >
                  {tier.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-text-subtle">
          * Precios en USD, IVA no incluido. Facturación mensual o anual con
          descuento del 20%.
        </p>
      </Container>
    </SectionWrapper>
  );
}
