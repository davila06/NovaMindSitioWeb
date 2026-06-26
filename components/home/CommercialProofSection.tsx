"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Card } from "@/components/shared/ui/Card";
import {
  clientLogoWall,
  miniCaseStudies,
  quantifiedOutcomes,
} from "@/data/site";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function CommercialProofSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  return (
    <SectionWrapper>
      <Container>
        <div ref={headingRef} className="max-w-3xl reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Evidencia de valor
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Resultados medibles, no promesas de marketing
          </h2>
          <p className="mt-4 text-text-muted">
            Esta capa de prueba comercial acelera decisiones enterprise: impacto
            cuantificado, casos resumidos y señales de confianza para
            stakeholders ejecutivos.
          </p>
        </div>

        <div
          className="mt-8 grid gap-4 md:grid-cols-3"
          role="list"
          aria-label="Resultados medibles"
        >
          {quantifiedOutcomes.map((item, i) => (
            <div key={item.label} role="listitem">
              <Card
                variant="metric"
                className={`reveal-slide-up delay-${i * 100}`}
              >
                <p
                  className="font-display text-4xl font-bold text-[#f0f8ff]"
                  aria-label={`${item.metric} — ${item.label}`}
                >
                  {item.metric}
                </p>
                <p className="mt-2 text-sm font-semibold text-text-primary">
                  {item.label}
                </p>
                <p className="mt-2 text-xs text-text-muted">{item.context}</p>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="font-display text-2xl font-bold text-[#f0f8ff]">
            Mini casos de referencia
          </h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {miniCaseStudies.map((item, i) => {
              // Each case study card is slightly offset in Z to form a stacked-document effect
              const zClass =
                i === 0
                  ? "[transform:translateZ(10px)]"
                  : i === 1
                    ? "[transform:translateZ(5px)]"
                    : "[transform:translateZ(0px)]";
              return (
                <div
                  key={item.segment}
                  className={`group relative rounded-2xl border border-brand-lavender/18 bg-brand-card/80 p-5 [transform-style:preserve-3d] ${zClass} transition-all duration-300 hover:[transform:translateZ(18px)_translateY(-4px)] hover:shadow-[0_16px_40px_-10px_rgba(139,92,246,0.35)]`}
                >
                  {/* Stacked document layers behind card */}
                  <div
                    className="pointer-events-none absolute inset-x-2 -bottom-1.5 h-full rounded-2xl border border-brand-lavender/10 bg-brand-card/50 [transform:translateZ(-8px)]"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-4 -bottom-3 h-full rounded-2xl border border-brand-lavender/6 bg-brand-card/30 [transform:translateZ(-16px)]"
                    aria-hidden="true"
                  />
                  {/* Card content */}
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                    {item.segment}
                  </p>
                  <p className="mt-3 text-sm text-text-muted">
                    <span className="font-semibold text-[#f0f8ff]">Reto: </span>
                    {item.challenge}
                  </p>
                  <p className="mt-2 text-sm text-text-muted">
                    <span className="font-semibold text-[#f0f8ff]">
                      Solución:{" "}
                    </span>
                    {item.solution}
                  </p>
                  <p className="mt-3 rounded-xl border border-brand-lavender/18 bg-brand-void/60 px-3 py-2 text-sm font-medium text-[#f0f8ff]">
                    Resultado: {item.result}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-lavender/15 bg-brand-card/80 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
            Confianza de compradores
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {clientLogoWall.map((logo) => (
              <div
                key={logo}
                className="rounded-xl border border-brand-lavender/12 bg-brand-void/60 px-4 py-3 text-center text-sm font-medium text-text-muted"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
