"use client";

import { useRef, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { implementationSteps } from "@/data/site";
import { siteConfig } from "@/lib/seo";

// Staircase depth offsets — each step climbs higher in Z + lower in Y
const STAIR_Z = [0, 5, 10, 15];
const STAIR_Y = [0, -3, -6, -9];

export function ImplementationSection() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Apply staircase depth offsets via DOM refs to avoid JSX inline styles
  useEffect(() => {
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const z = STAIR_Z[i] ?? 0;
      const y = STAIR_Y[i] ?? 0;
      el.style.transform = `translateZ(${z}px) translateY(${y}px)`;
    });
  }, []);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo implementamos soluciones IA en su empresa",
    description:
      "Proceso de implementación de plataformas IA-native de Novamind Global: desde el diagnóstico hasta el escalado.",
    totalTime: "P6W",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Acceso a sistemas actuales del cliente",
      },
    ],
    tool: [{ "@type": "HowToTool", name: "Plataforma Novamind Global" }],
    step: implementationSteps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
      url: `${siteConfig.url}/#implementacion`,
    })),
  };

  return (
    <SectionWrapper id="implementacion">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Como implementamos
            </p>
            <h2 className="mt-3 bg-gradient-to-r from-brand-gold via-brand-lavender to-brand-cobalt bg-clip-text font-display text-3xl text-transparent sm:text-4xl">
              De la oportunidad operativa a una ventaja competitiva real
            </h2>
            <p className="mt-4 text-slate-300">
              Nuestro proceso prioriza claridad, adopción y resultados. No se
              trata de vender humo con IA: se trata de integrarla donde
              realmente mejora la operación.
            </p>
          </div>

          {/* Staircase 3D grid — each step rises in Z */}
          <div className="grid gap-4 [perspective:900px]">
            {implementationSteps.map((step, index) => (
              <div
                key={step.title}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`animate-stair-rise rounded-2xl border border-brand-lavender/15 bg-brand-card/80 p-5 shadow-soft transition-all duration-300 [transform-style:preserve-3d] hover:shadow-[0_12px_40px_-10px_rgba(139,92,246,0.3)]`}
              >
                <div className="flex items-start gap-4">
                  {/* Badge floats higher in Z than card surface */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet to-brand-iris text-sm font-bold text-white [transform:translateZ(8px)] shadow-[0_4px_16px_-4px_rgba(139,92,246,0.6)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[#f0f8ff]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
                {/* Connector line to next step — fades out on last step */}
                {index < implementationSteps.length - 1 && (
                  <div
                    className="pointer-events-none absolute -bottom-2 left-9 h-2 w-px bg-gradient-to-b from-brand-lavender/30 to-transparent"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
