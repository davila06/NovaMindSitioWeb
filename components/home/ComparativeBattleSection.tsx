"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { X, Minus, CheckCircle2 } from "lucide-react";

const comparisonRows = [
  {
    criteria: "Tiempo de respuesta operativa",
    manual: "Lento y reactivo",
    fragmented: "Inconsistente por sistema",
    novamind: "Automatizado y trazable",
  },
  {
    criteria: "Visibilidad ejecutiva",
    manual: "Reportes tardíos",
    fragmented: "Datos dispersos",
    novamind: "KPIs centralizados en tiempo real",
  },
  {
    criteria: "Escalabilidad",
    manual: "Depende de más personal",
    fragmented: "Escala con complejidad",
    novamind: "Escala con arquitectura multi-tenant",
  },
  {
    criteria: "Riesgo de cumplimiento",
    manual: "Alto",
    fragmented: "Variable",
    novamind: "Controlado con trazabilidad",
  },
];

export function ComparativeBattleSection() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <SectionWrapper>
      <Container>
        <div className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-elevated backdrop-blur sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Comparativa estratégica
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-[#f0f8ff] sm:text-4xl">
            Novamind vs operación manual y sistemas fragmentados
          </h2>
          <p className="mt-4 max-w-3xl text-text-muted">
            Una vista clara para compradores enterprise: no vendemos solo
            software, vendemos mejor ejecución operativa.
          </p>

          {/* Arena 3D — CSS grid fraccional, sin overflow */}
          <div className="relative mt-8 [perspective:700px]">
            {/* Scan beam */}
            <div
              ref={revealRef}
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 animate-scan-beam bg-gradient-to-r from-transparent via-brand-lavender/55 to-transparent"
              aria-hidden="true"
            />

            <div
              className="[transform:rotateX(-2deg)] [transform-style:preserve-3d]"
              role="table"
              aria-label="Comparativa: Novamind vs operación manual vs sistemas fragmentados"
            >
              {/* Header row */}
              <div
                role="row"
                className="grid grid-cols-[2fr_1.5fr_1.5fr_2fr] rounded-xl bg-brand-elevated [transform-style:preserve-3d]"
              >
                <div
                  role="columnheader"
                  className="rounded-l-xl px-5 py-3.5 text-sm font-semibold text-[#f0f8ff]"
                >
                  Criterio
                </div>
                <div
                  role="columnheader"
                  className="px-4 py-3.5 text-sm font-semibold text-text-muted/65"
                >
                  Manual
                </div>
                <div
                  role="columnheader"
                  className="px-4 py-3.5 text-sm font-semibold text-text-muted/65"
                >
                  Fragmentado
                </div>
                <div
                  role="columnheader"
                  className="relative rounded-r-xl px-5 py-3.5 text-sm font-semibold text-brand-lavender [transform:translateZ(14px)]"
                >
                  <div
                    className="absolute inset-0 rounded-r-xl bg-brand-violet/30"
                    aria-hidden="true"
                  />
                  <span className="relative">Novamind ✓</span>
                </div>
              </div>

              {/* Data rows */}
              <div role="rowgroup" className="mt-2.5 space-y-2">
                {comparisonRows.map((row) => (
                  <div
                    key={row.criteria}
                    role="row"
                    className="group grid grid-cols-[2fr_1.5fr_1.5fr_2fr] rounded-xl border border-brand-lavender/12 bg-brand-void/60 transition-colors hover:border-brand-lavender/28 [transform-style:preserve-3d]"
                  >
                    <div
                      role="cell"
                      className="rounded-l-xl px-5 py-4 text-sm font-semibold text-[#f0f8ff]"
                    >
                      {row.criteria}
                    </div>
                    <div
                      role="cell"
                      className="flex items-start gap-2 border-l border-brand-lavender/10 px-4 py-4 text-sm text-text-muted/60"
                    >
                      <X
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400/55"
                        aria-hidden="true"
                      />
                      {row.manual}
                    </div>
                    <div
                      role="cell"
                      className="flex items-start gap-2 border-l border-brand-lavender/10 px-4 py-4 text-sm text-text-muted/60"
                    >
                      <Minus
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/55"
                        aria-hidden="true"
                      />
                      {row.fragmented}
                    </div>
                    <div
                      role="cell"
                      className="relative flex items-start gap-2 rounded-r-xl px-5 py-4 text-sm font-semibold text-brand-lavender [transform:translateZ(14px)]"
                    >
                      <div
                        className="absolute inset-0 rounded-r-xl border-l border-brand-violet/30 bg-brand-violet/12"
                        aria-hidden="true"
                      />
                      <CheckCircle2
                        className="relative mt-0.5 h-4 w-4 shrink-0 text-brand-lavender"
                        aria-hidden="true"
                      />
                      <span className="relative">{row.novamind}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
