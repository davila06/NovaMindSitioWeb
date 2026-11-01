"use client";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";
import { Check } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { commercialEvidenceEnabled } from "@/data/site";
import { draftSaasPlans } from "@/data/pricing";

const TIERS = draftSaasPlans;

export function PricingTeaser() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  return (
    <SectionWrapper id="precios">
      <Container>
        <div ref={headingRef} className="mb-10 max-w-2xl reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            {commercialEvidenceEnabled ? "Planes" : "Inversión"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Inversión que escala con tu operación
          </h2>
          <p className="mt-3 text-text-muted">
            {commercialEvidenceEnabled
              ? "Precios referenciales. Cada implementación se dimensiona según alcance y módulos activos."
              : "La propuesta se prepara según el alcance, los módulos y las condiciones acordadas para cada operación."}
          </p>
        </div>

        {commercialEvidenceEnabled ? (
          <>
            {/* Podium 3D grid — Business tier rises highest in Z */}
            <div className="grid gap-5 md:grid-cols-3 md:[perspective:1200px]">
              {TIERS.map((tier, idx) => {
                // Podium positions: left=0 (side), center=1 (highlight/highest), right=2 (side)
                const podiumClass = tier.highlight
                  ? "animate-podium-up [transform-style:preserve-3d] md:[transform:translateZ(28px)_scale(1.04)] hover:md:[transform:translateZ(36px)_translateY(-4px)_scale(1.04)]"
                  : idx === 0
                    ? "animate-podium-up [transform-style:preserve-3d] md:[transform:translateZ(0px)_rotateY(2deg)] hover:md:[transform:translateZ(8px)_translateY(-3px)_rotateY(1deg)]"
                    : "animate-podium-up [transform-style:preserve-3d] md:[transform:translateZ(0px)_rotateY(-2deg)] hover:md:[transform:translateZ(8px)_translateY(-3px)_rotateY(-1deg)]";

                return (
                  <div
                    key={tier.name}
                    className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ${podiumClass} ${
                      tier.highlight
                        ? "border-brand-violet/60 bg-brand-violet/10 shadow-[0_24px_64px_-12px_rgba(139,92,246,0.45)]"
                        : "border-brand-lavender/18 bg-brand-card/80"
                    }`}
                  >
                    {/* Podium base shadow — adds physical depth below card */}
                    {tier.highlight && (
                      <div
                        className="pointer-events-none absolute -bottom-3 left-6 right-6 h-5 rounded-full bg-brand-violet/30 blur-lg [transform:translateZ(-10px)]"
                        aria-hidden="true"
                      />
                    )}
                    {/* Shimmer top edge for highlight tier */}
                    {tier.highlight && (
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-lavender/60 to-transparent"
                        aria-hidden="true"
                      />
                    )}
                    {/* Más popular badge */}
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
                );
              })}
            </div>

            <p className="mt-6 text-center text-xs text-text-subtle">
              * Precios en USD, IVA no incluido. Facturación mensual o anual con
              descuento del 20%.
            </p>
          </>
        ) : (
          <div className="rounded-2xl border border-brand-lavender/18 bg-brand-card/70 p-7 text-center">
            <p className="mx-auto max-w-2xl text-sm leading-6 text-text-muted">
              La inversión, el alcance, el soporte y las condiciones se definen
              en una propuesta para cada operación. No publicamos precios ni
              niveles de servicio hasta que estén confirmados.
            </p>
            <Button href="/contacto" className="mt-5">
              Consultar una propuesta
            </Button>
          </div>
        )}
      </Container>
    </SectionWrapper>
  );
}
