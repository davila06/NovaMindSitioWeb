"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";
import { Card } from "@/components/shared/ui/Card";
import { productBySlug } from "@/data/products";
import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics-client";
import { useScrollReveal } from "@/lib/useScrollReveal";

const options = [
  {
    key: "service",
    label: "Quiero automatizar atención al cliente y canales",
    recommendation: {
      productSlug: "voicebot",
      reason:
        "Es la mejor entrada cuando el dolor principal está en SLA, consistencia de respuesta y omnicanalidad.",
    },
  },
  {
    key: "payroll",
    label: "Necesito reducir errores y riesgo en nómina",
    recommendation: {
      productSlug: "planillascr",
      reason:
        "Encaja cuando la prioridad es cumplimiento legal, trazabilidad y eficiencia de RRHH.",
    },
  },
  {
    key: "erp",
    label: "Busco unificar operación y datos ejecutivos",
    recommendation: {
      productSlug: "ccerp",
      reason:
        "Aporta más valor cuando la organización ya sufre por sistemas aislados y visibilidad fragmentada.",
    },
  },
  {
    key: "sales",
    label: "Necesito ordenar leads, seguimiento y conversión comercial",
    recommendation: {
      productSlug: "mindflow",
      reason:
        "Encaja cuando el problema es fuga de oportunidades, seguimiento manual y poca disciplina comercial entre captación, propuesta y onboarding.",
    },
  },
  {
    key: "revenue-engine",
    label: "Busco una máquina de revenue con automatización y gobierno SaaS",
    recommendation: {
      productSlug: "mindflow-ai-sales-engine",
      reason:
        "Ideal para equipos enterprise que necesitan ejecución comercial end-to-end con arquitectura event-driven, observabilidad y control multi-tenant.",
    },
  },
  {
    key: "insurance",
    label: "Quiero controlar pólizas, cobros y renovaciones",
    recommendation: {
      productSlug: "iads",
      reason:
        "Está diseñado para operaciones de seguros donde cobranza y trazabilidad son críticas.",
    },
  },
  {
    key: "community",
    label: "Necesito una solución comunitaria con alto impacto social",
    recommendation: {
      productSlug: "pawtrack",
      reason:
        "Es ideal para comunidades que necesitan una app gratuita para reportar, coordinar y reunificar mascotas con trazabilidad.",
    },
  },
];

export function SolutionFinderSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const [selected, setSelected] = useState(options[0].key);

  const result = useMemo(
    () => options.find((option) => option.key === selected) ?? options[0],
    [selected],
  );
  const recommendedProduct = productBySlug[result.recommendation.productSlug];
  const productHref = `/productos/${recommendedProduct.slug}`;

  function handleSelect(key: string) {
    setSelected(key);
    const option = options.find((o) => o.key === key);
    if (option) {
      trackEvent("solution_finder_selected", {
        option_key: key,
        recommended_product: option.recommendation.productSlug,
      });
    }
  }

  return (
    <SectionWrapper>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div ref={headingRef} className="reveal">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">
              Solution Finder
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              Encuentra la solución Novamind que mejor encaja con tu reto
              operativo
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">
              Una forma rápida de orientar la conversación comercial y reducir
              fricción para el visitante correcto.
            </p>
            {/* Option buttons — selected one rises in Z */}
            <div className="mt-6 grid gap-3 [perspective:700px]">
              {options.map((option) => {
                const isActive = selected === option.key;
                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelect(option.key)}
                    data-active={isActive}
                    className={`relative rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 [transform-style:preserve-3d] ${
                      isActive
                        ? "border-brand-violet/50 bg-brand-violet/15 text-[#f0f8ff] shadow-[0_8px_28px_-8px_rgba(139,92,246,0.45)] [transform:translateZ(10px)_translateY(-2px)]"
                        : "border-brand-lavender/15 bg-brand-card/80 text-text-muted hover:border-brand-lavender/35 hover:text-[#f0f8ff] hover:[transform:translateZ(4px)]"
                    }`}
                  >
                    {/* Active left accent bar */}
                    {isActive && (
                      <span
                        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-brand-lavender"
                        aria-hidden="true"
                      />
                    )}
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Recommendation card — floats as a 3D portal emerging from the page */}
          <div className="self-start [perspective:800px]">
            <div
              key={selected}
              className="relative rounded-2xl border border-brand-violet/25 bg-brand-card/80 p-6 [transform-style:preserve-3d] [transform:rotateY(-3deg)_translateZ(10px)] transition-all duration-300 hover:[transform:rotateY(-1deg)_translateZ(18px)] shadow-[0_16px_48px_-14px_rgba(139,92,246,0.35)]"
            >
              {/* Top shimmer */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-lavender/55 to-transparent"
                aria-hidden="true"
              />
              {/* Back depth layer */}
              <div
                className="pointer-events-none absolute inset-x-4 -bottom-3 h-full rounded-2xl border border-brand-lavender/8 bg-brand-card/40 [transform:translateZ(-14px)]"
                aria-hidden="true"
              />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">
                Recomendación
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff]">
                {recommendedProduct.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-text-muted">
                {result.recommendation.reason}
              </p>
              <div className="mt-6 rounded-2xl border border-brand-lavender/15 bg-brand-void/60 p-4 text-sm text-text-muted">
                {recommendedProduct.slug === "pawtrack"
                  ? "Siguiente paso sugerido: conocer PawTrack CR / NALA y consultar sus funciones, planes y condiciones antes de acceder a la aplicación."
                  : "Siguiente paso sugerido: revisar la página del producto y luego solicitar una demo con contexto ya definido."}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href={productHref}
                  trackingContext={{
                    page: "home",
                    section: "solution_finder",
                    ctaLabel: "ver_solucion",
                    destination: productHref,
                    product: recommendedProduct.name,
                    intent: "explore",
                  }}
                >
                  Ver solución
                </Button>
                <Button
                  href="/contacto"
                  variant="ghost"
                  trackingContext={{
                    page: "home",
                    section: "solution_finder",
                    ctaLabel: "hablar_con_experto",
                    destination: "/contacto",
                    product: recommendedProduct.name,
                    intent: "consultation",
                  }}
                >
                  Hablar con experto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
