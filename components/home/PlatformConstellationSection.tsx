'use client'
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useScrollReveal } from "@/lib/useScrollReveal";

const nodes = [
  {
    number: "01",
    title: "Orquestación IA",
    detail: "Reglas, automatización y agentes orientados a procesos críticos.",
    color: "border-brand-violet/40 bg-brand-violet/12",
  },
  {
    number: "02",
    title: "Capa SaaS",
    detail:
      "Aplicaciones modulares por vertical: nómina, seguros, ERP y experiencia.",
    color: "border-brand-gold/30 bg-brand-gold/8",
  },
  {
    number: "03",
    title: "Data Intelligence",
    detail:
      "Eventos, trazabilidad y visibilidad ejecutiva para decisiones rápidas.",
    color: "border-brand-lavender/30 bg-brand-lavender/8",
  },
];

export function PlatformConstellationSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  return (
    <SectionWrapper className="section-alt">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div ref={headingRef} className="reveal">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Plataforma Novamind
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              Una constelación de soluciones conectadas por una misma
              arquitectura IA-native
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">
              Esta visión evita herramientas aisladas y permite que cada
              producto aporte a un sistema empresarial integrado, trazable y
              escalable.
            </p>
            {/* Connector SVG decorativo */}
            <svg
              aria-hidden="true"
              className="mt-8 hidden w-full max-w-xs opacity-40 lg:block"
              viewBox="0 0 200 80"
              fill="none"
            >
              <circle cx="20" cy="40" r="8" fill="#6d28d9" />
              <circle cx="100" cy="20" r="8" fill="#c9a84c" />
              <circle cx="180" cy="40" r="8" fill="#10b981" />
              <line
                x1="28"
                y1="40"
                x2="92"
                y2="22"
                stroke="#a78bfa"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <line
                x1="108"
                y1="22"
                x2="172"
                y2="38"
                stroke="#a78bfa"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <line
                x1="28"
                y1="42"
                x2="172"
                y2="42"
                stroke="#a78bfa"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.4"
              />
            </svg>
          </div>
          <div className="grid gap-4">
            {nodes.map((node, i) => (
              <div
                key={node.title}
                className={`reveal-slide-up delay-${i * 100} rounded-2xl border ${node.color} p-5 backdrop-blur`}
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 font-display text-3xl font-bold text-brand-lavender opacity-30">
                    {node.number}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#f0f8ff]">
                      {node.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      {node.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
