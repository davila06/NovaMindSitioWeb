"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { differentiationPillars } from "@/data/site";
import { useScrollReveal } from "@/lib/useScrollReveal";

const CYCLING_WORDS = [
  "escalable",
  "inteligente",
  "medible",
  "enterprise-ready",
  "conectado",
];

export function WhyNovamindSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 250);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper>
      <Container>
        <div ref={headingRef} className="max-w-3xl reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Por qué Novamind
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Software empresarial{" "}
            <span
              className={`text-gradient-animated inline-block transition-opacity duration-200 ${wordVisible ? "opacity-100" : "opacity-0"}`}
            >
              {CYCLING_WORDS[wordIndex]}
            </span>{" "}
            para operaciones críticas
          </h2>
          <p className="mt-4 text-text-muted">
            La diferencia no está en sumar features. Está en convertir procesos
            complejos en plataformas claras, con alcance y prioridades definidos
            según cada organización.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 [perspective:1000px]">
          {differentiationPillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="group relative rounded-2xl border border-brand-lavender/18 bg-brand-card/80 p-6 shadow-soft [transform-style:preserve-3d] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_-12px_rgba(139,92,246,0.3)] hover:[transform:rotateX(-3deg)_rotateY(5deg)_translateZ(10px)]"
            >
              {/* Ordinal number */}
              <div
                className="pointer-events-none absolute right-4 top-4 font-display text-4xl font-bold text-brand-lavender/10 [transform:translateZ(-6px)] select-none"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              {/* Crystalline inner shimmer face */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-lavender/35 to-transparent"
                aria-hidden="true"
              />
              {/* Hex icon wrapper — spins on hover via CSS animation */}
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet/40 to-brand-iris/30 [transform-style:preserve-3d] [transform:translateZ(6px)] group-hover:animate-hex-spin shadow-[0_4px_16px_-4px_rgba(139,92,246,0.5)]"
                aria-hidden="true"
              >
                <span className="text-lg font-bold text-brand-lavender select-none">
                  {String(i + 1)}
                </span>
              </div>
              <h3 className="font-display text-xl text-[#f0f8ff] [transform:translateZ(4px)]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-muted">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
