"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const before = [
  "Procesos manuales propensos a error",
  "Sistemas dispersos sin integración",
  "Riesgos legales y de cumplimiento",
  "Mala experiencia del cliente",
  "Decisiones a ciegas sin datos",
];

const after = [
  "IA integrada en flujos reales",
  "SaaS centralizado y conectado",
  "Cumplimiento automatizado",
  "Dashboards ejecutivos en tiempo real",
  "Escalabilidad enterprise sobre Azure",
];

export function ProblemSolutionSplit() {
  const headingRef = useScrollReveal<HTMLDivElement>();

  return (
    <SectionWrapper id="soluciones">
      <Container>
        <div ref={headingRef} className="mb-8 text-center reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-lavender">
            La transformación
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Del caos operativo a la ventaja competitiva
          </h2>
        </div>

        {/* Tectonic-plates 3D: Antes recessed, Después elevated, flecha flota entre ellos */}
        <div className="grid items-start gap-4 lg:grid-cols-[1fr_auto_1fr] [perspective:1100px]">
          {/* ── Columna Antes — recessed into the page ── */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-6 backdrop-blur [transform-style:preserve-3d] [transform:rotateY(5deg)_translateZ(-16px)] transition-all duration-500 hover:[transform:rotateY(2deg)_translateZ(-6px)] hover:shadow-[0_8px_32px_-8px_rgba(244,63,94,0.25)]">
            {/* Inset top shadow to reinforce depth */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-8 rounded-t-2xl bg-gradient-to-b from-rose-950/40 to-transparent"
              aria-hidden="true"
            />
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-rose-400">
              Antes
            </p>
            <ul
              className="space-y-3"
              aria-label="Situación actual sin Novamind"
            >
              {before.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-text-muted"
                >
                  <XCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-rose-400"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Flecha central — floats above both planes ── */}
          <div className="flex justify-center lg:items-center lg:pt-16 [perspective:400px]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-violet/30 shadow-violet [transform:translateZ(24px)] animate-float">
              <ArrowRight
                className="h-5 w-5 text-brand-lavender"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* ── Columna Después — elevated toward the viewer ── */}
          <div className="relative rounded-2xl border border-brand-violet/30 bg-brand-violet/10 p-6 backdrop-blur [transform-style:preserve-3d] [transform:rotateY(-5deg)_translateZ(16px)] transition-all duration-500 hover:[transform:rotateY(-2deg)_translateZ(28px)] hover:shadow-[0_20px_60px_-16px_rgba(139,92,246,0.45)]">
            {/* Top shimmer */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-lavender/50 to-transparent"
              aria-hidden="true"
            />
            {/* Ground glow */}
            <div
              className="pointer-events-none absolute -bottom-3 left-6 right-6 h-5 rounded-full bg-brand-violet/20 blur-lg [transform:translateZ(-12px)]"
              aria-hidden="true"
            />
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-brand-lavender">
              Después
            </p>
            <ul className="space-y-3" aria-label="Resultado con Novamind">
              {after.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#f0f8ff]"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-lavender"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
