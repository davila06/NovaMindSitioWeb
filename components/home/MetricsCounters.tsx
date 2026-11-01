"use client";

import { useRef, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { metrics } from "@/data/site";
import { useCountUp } from "@/hooks/useCountUp";

function AnimatedMetric({
  value,
  suffix,
  label,
  index,
}: {
  value: string;
  suffix?: string;
  label: string;
  index: number;
}) {
  const numericValue = parseInt(value, 10);
  const isNumeric = !isNaN(numericValue);
  const { count, ref } = useCountUp(isNumeric ? numericValue : 0, 1800);
  const pedestalRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Sync pedestal elevation with count progress — via DOM refs to avoid JSX inline styles
  useEffect(() => {
    if (!isNumeric || !pedestalRef.current || !glowRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pct = numericValue > 0 ? count / numericValue : 0;
    const z = Math.round(pct * 22);
    const scaleY = 0.94 + pct * 0.06;
    pedestalRef.current.style.transform = `translateZ(${z}px) scaleY(${scaleY})`;
    glowRef.current.style.opacity = String(0.3 + pct * 0.7);
    glowRef.current.style.transform = `scaleX(${0.6 + pct * 0.4})`;
  }, [count, numericValue, isNumeric]);

  return (
    <li className="[perspective:500px] list-none">
      {/* 3D pedestal wrapper */}
      <div
        ref={pedestalRef}
        className="relative rounded-2xl border border-brand-lavender/18 bg-brand-card/85 p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] transition-shadow duration-300 [transform-style:preserve-3d] hover:shadow-[0_16px_48px_-12px_rgba(139,92,246,0.35)]"
      >
        {/* Inner top-face shimmer */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-lavender/40 to-transparent"
          aria-hidden="true"
        />
        {/* Floating badge depth layer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl [transform:translateZ(-10px)] bg-brand-violet/4"
          aria-hidden="true"
        />

        <div ref={ref}>
          <span
            aria-live="polite"
            aria-atomic="true"
            className="bg-gradient-to-r from-brand-violet via-brand-iris to-brand-lavender bg-clip-text font-display text-5xl font-bold text-transparent"
          >
            {isNumeric ? count : value}
            {suffix}
          </span>
        </div>
        <p className="mt-3 text-sm text-text-muted">{label}</p>
      </div>

      {/* Ground glow — grows with pedestal */}
      <div
        ref={glowRef}
        className="pointer-events-none mx-auto mt-1 h-2 w-3/4 rounded-full bg-brand-violet/20 blur-md transition-all duration-75"
        aria-hidden="true"
      />
    </li>
  );
}

export function MetricsCounters() {
  return (
    <SectionWrapper>
      <Container>
        <ul
          className="grid list-none gap-6 md:grid-cols-3 pl-0"
          aria-label="Métricas de impacto de Novamind Global"
        >
          {metrics.map((metric, i) => (
            <AnimatedMetric
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              index={i}
            />
          ))}
        </ul>
      </Container>
    </SectionWrapper>
  );
}
