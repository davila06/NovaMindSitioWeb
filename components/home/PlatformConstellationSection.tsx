"use client";
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
      "Aplicaciones modulares para nómina, ERP, ventas y experiencia de cliente.",
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
  const headingRef = useScrollReveal<HTMLDivElement>();
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
            {/* 3D Orbital Constellation diagram */}
            <div className="mt-8 hidden lg:flex lg:items-center lg:justify-center">
              <OrbitalDiagram />
            </div>
          </div>
          <div className="grid gap-4">
            {nodes.map((node, i) => (
              <div
                key={node.title}
                className={`reveal-slide-up delay-${i * 100} rounded-2xl border ${node.color} p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:[transform:translateZ(8px)] [transform-style:preserve-3d]`}
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

// ── 3D Orbital Constellation ──────────────────────────────────────────────
function OrbitalDiagram() {
  return (
    <div
      className="relative h-[200px] w-[240px] [perspective:500px]"
      aria-hidden="true"
    >
      {/* Orbit ring — tilted isometric, animates rotation */}
      <div className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 animate-orbit [transform-style:preserve-3d]">
        {/* Ring border */}
        <div className="absolute inset-0 rounded-full border border-brand-lavender/25" />

        {/* Satellite 1 — Orquestación IA (violet) at 0° */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 animate-orbit-counter">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-violet/50 bg-brand-violet/20 text-[10px] font-bold text-brand-lavender shadow-[0_0_12px_rgba(139,92,246,0.4)]">
            IA
          </div>
        </div>

        {/* Satellite 2 — SaaS (gold) at 120° → bottom-right */}
        <div className="absolute bottom-[12%] right-0 translate-x-1/2 translate-y-1/2 animate-orbit-counter">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-gold/15 text-[10px] font-bold text-brand-gold shadow-[0_0_12px_rgba(201,168,76,0.35)]">
            SaaS
          </div>
        </div>

        {/* Satellite 3 — Data (emerald) at 240° → bottom-left */}
        <div className="absolute bottom-[12%] left-0 -translate-x-1/2 translate-y-1/2 animate-orbit-counter">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/12 text-[9px] font-bold text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
            Data
          </div>
        </div>
      </div>

      {/* Central hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-violet/40 bg-gradient-to-b from-brand-violet/30 to-brand-iris/20 text-[10px] font-bold text-brand-lavender shadow-[0_0_24px_6px_rgba(139,92,246,0.25),inset_0_1px_0_rgba(255,255,255,0.12)]">
          NM
        </div>
      </div>

      {/* Outer glow */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-brand-violet/5 blur-2xl" />
    </div>
  );
}
