"use client";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Tabs } from "@/components/shared/ui/Tabs";
import { trustCenterItems } from "@/data/site";
import { useScrollReveal } from "@/lib/useScrollReveal";

const tabs = [
  {
    label: "Arquitectura",
    content:
      "Diseñamos soluciones que conviven con tu stack actual, integran procesos críticos y escalan por unidad, empresa o línea de negocio.",
  },
  {
    label: "Gobierno",
    content:
      "Priorizamos control operativo con permisos, auditoría de eventos y estructuras que soportan trazabilidad y supervisión.",
  },
  {
    label: "Escalabilidad",
    content:
      "El enfoque multi-tenant y la modularidad permiten crecer sin duplicar complejidad operativa ni deuda innecesaria.",
  },
];

export function TrustCenterSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  return (
    <SectionWrapper>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div ref={headingRef} className="reveal">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Arquitectura y confianza
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              Base sólida para vender y operar como software enterprise
            </h2>
            <div className="mt-6 grid gap-3 [perspective:900px]">
              {trustCenterItems.map((item, i) => (
                <div
                  key={item}
                  className={`group relative rounded-xl border border-brand-lavender/18 bg-brand-card/80 px-5 py-4 [transform-style:preserve-3d] transition-all duration-300 hover:[transform:translateZ(8px)] hover:border-brand-lavender/32 hover:shadow-[0_8px_24px_-8px_rgba(139,92,246,0.28)] ${i % 2 === 0 ? "[transform:rotateX(-2deg)_rotateY(2deg)]" : "[transform:rotateX(-2deg)_rotateY(-2deg)]"}`}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-brand-lavender/25 to-transparent"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-text-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="self-start">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
