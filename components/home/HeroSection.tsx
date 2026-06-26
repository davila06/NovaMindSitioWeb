"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Badge } from "@/components/shared/ui/Badge";
import { Button } from "@/components/shared/ui/Button";
import { useEffect, useRef, useState } from "react";

const ROTATING_INDUSTRIES = [
  "seguros",
  "contact centers",
  "nómina CR",
  "ERP multiempresa",
  "municipalidades",
];

export function HeroSection() {
  const [industryIndex, setIndustryIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [processCount, setProcessCount] = useState(0);
  const [slaCount, setSlaCount] = useState(0);

  // Rotador de industrias — respects prefers-reduced-motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndustryIndex((i) => (i + 1) % ROTATING_INDUSTRIES.length);
        setVisible(true);
      }, 300);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  // Contadores animados del dashboard — respects prefers-reduced-motion
  useEffect(() => {
    // Skip animation when user prefers reduced motion — show final values immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProcessCount(1280);
      setSlaCount(99.7);
      return;
    }
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    // El delay de 200ms asegura que el ciclo doble de Strict Mode
    // ya terminó, y la animación solo corre en el montaje real
    const timeoutId = setTimeout(() => {
      if (cancelled) return;
      const startTime = Date.now();
      intervalId = setInterval(() => {
        if (cancelled) {
          if (intervalId) clearInterval(intervalId);
          return;
        }
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 1600, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setProcessCount(Math.floor(ease * 1280));
        setSlaCount(Math.round(ease * 997) / 10);
        if (progress >= 1 && intervalId) clearInterval(intervalId);
      }, 16);
    }, 200);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <SectionWrapper className="relative overflow-hidden pb-8 pt-10 sm:pt-14">
      {/* Z-depth particle field */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Layer 1 — far back (smallest, slowest) */}
        <span className="absolute left-[8%] top-[15%] h-1 w-1 rounded-full bg-brand-violet/30 animate-float-slow [animation-delay:0s]" />
        <span className="absolute left-[22%] top-[70%] h-1 w-1 rounded-full bg-brand-lavender/25 animate-float-slow [animation-delay:1.2s]" />
        <span className="absolute left-[75%] top-[20%] h-1 w-1 rounded-full bg-brand-gold/20 animate-float-slow [animation-delay:2.4s]" />
        <span className="absolute left-[85%] top-[65%] h-1 w-1 rounded-full bg-brand-iris/25 animate-float-slow [animation-delay:0.8s]" />
        {/* Layer 2 — mid distance */}
        <span className="absolute left-[5%] top-[45%] h-1.5 w-1.5 rounded-full bg-brand-violet/40 animate-float [animation-delay:0.4s]" />
        <span className="absolute left-[35%] top-[10%] h-1.5 w-1.5 rounded-full bg-brand-lavender/35 animate-float [animation-delay:1.8s]" />
        <span className="absolute left-[65%] top-[80%] h-1.5 w-1.5 rounded-full bg-brand-gold/30 animate-float [animation-delay:3s]" />
        <span className="absolute left-[90%] top-[35%] h-1.5 w-1.5 rounded-full bg-brand-iris/30 animate-float [animation-delay:0.6s]" />
        {/* Layer 3 — closest (largest, fastest) */}
        <span className="absolute left-[15%] top-[30%] h-2 w-2 rounded-full bg-brand-violet/20 animate-float [animation-delay:2s]" />
        <span className="absolute left-[50%] top-[85%] h-2 w-2 rounded-full bg-brand-lavender/20 animate-float [animation-delay:0.2s]" />
        <span className="absolute left-[80%] top-[50%] h-2 w-2 rounded-full bg-brand-gold/15 animate-float [animation-delay:1.5s]" />
        {/* Gradient haze */}
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-brand-violet/6 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-[300px] w-[300px] rounded-full bg-brand-iris/6 blur-3xl" />
      </div>
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ── Copy ──────────────────────────────────────── */}
          <div className="enter-fade-up">
            <Badge>Apps empresariales IA-native · Soporte ágil</Badge>

            <h1 className="mt-5 font-display text-[2.8rem] font-bold leading-[1.04] tracking-[-0.04em] text-[#f0f8ff] sm:text-[3.8rem] lg:text-[4.5rem]">
              Automatizamos tu operación con{" "}
              <span className="bg-gradient-to-r from-brand-violet via-brand-iris to-brand-lavender bg-clip-text text-transparent">
                IA aplicada y soporte ágil
              </span>
            </h1>

            {/* Typewriter de industrias */}
            <p className="mt-5 max-w-xl text-lg text-text-muted">
              Software, consultoría y soporte TI para{" "}
              <span
                className={`inline-block font-semibold text-brand-gold transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
              >
                {ROTATING_INDUSTRIES[industryIndex]}
              </span>{" "}
              — valor medible desde la primera fase.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href="/contacto"
                trackingContext={{
                  page: "home",
                  section: "hero",
                  ctaLabel: "solicitar_demo",
                  destination: "/contacto",
                  intent: "demo",
                }}
                className="btn-cta-pulse"
              >
                Solicitar demo
              </Button>
              <Button
                href="/servicios"
                variant="ghost"
                trackingContext={{
                  page: "home",
                  section: "hero",
                  ctaLabel: "explorar_servicios",
                  destination: "/servicios",
                  intent: "explore",
                }}
              >
                Explorar servicios →
              </Button>
            </div>

            {/* Feature pills — staggered Z-depth, each on its own plane */}
            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3 [perspective:800px]">
              {[
                "Time-to-value acelerado",
                "Procesos trazables y auditables",
                "Arquitectura enterprise sobre Azure",
              ].map((item, i) => {
                const tilt3d = [
                  "[transform:rotateX(-3deg)_rotateY(4deg)_translateZ(3px)] hover:[transform:rotateX(-1deg)_rotateY(2deg)_translateZ(12px)]",
                  "[transform:rotateX(-4deg)_translateZ(8px)] hover:[transform:rotateX(-1deg)_translateZ(18px)]",
                  "[transform:rotateX(-3deg)_rotateY(-4deg)_translateZ(3px)] hover:[transform:rotateX(-1deg)_rotateY(-2deg)_translateZ(12px)]",
                ][i];
                return (
                  <div
                    key={item}
                    className={`relative rounded-xl border border-brand-lavender/18 bg-brand-card/70 px-4 py-3 text-text-muted [transform-style:preserve-3d] transition-all duration-300 reveal-slide-up delay-${(i + 1) * 100} ${tilt3d}`}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-brand-lavender/28 to-transparent"
                      aria-hidden="true"
                    />
                    {item}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Dashboard isométrico 3D ────────────────────── */}
          <IsoDashboard processCount={processCount} slaCount={slaCount} />
        </div>
      </Container>
    </SectionWrapper>
  );
}

// ── Isometric 3D Dashboard ──────────────────────────────────────────────────
function IsoDashboard({
  processCount,
  slaCount,
}: {
  processCount: number;
  slaCount: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Mouse-parallax tilt — set via DOM ref to avoid inline style JSX
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const outer = outerRef.current;
    const tilt = tiltRef.current;
    if (!outer || !tilt) return;

    function onMove(e: MouseEvent) {
      const rect = outer!.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      tilt!.style.transform = `rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg)`;
    }
    function onLeave() {
      tilt!.style.transform = "rotateX(0deg) rotateY(0deg)";
    }

    window.addEventListener("mousemove", onMove);
    outer.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      outer.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Animate progress bar width via DOM ref — avoids inline style JSX
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${Math.round((processCount / 1280) * 100)}%`;
    }
  }, [processCount]);

  return (
    <div ref={outerRef} className="enter-scale-in relative [perspective:900px]">
      {/* Outer tilt wrapper — transform set via DOM ref, not JSX style */}
      <div
        ref={tiltRef}
        className="relative transition-transform duration-200 ease-out [transform-style:preserve-3d]"
      >
        {/* Base glow */}
        <div
          className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-violet/20 via-transparent to-brand-iris/10 blur-2xl"
          aria-hidden="true"
        />

        {/* Dashboard frame */}
        <div className="relative rounded-2xl border border-brand-lavender/25 bg-brand-surface/90 p-5 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.6)] backdrop-blur-sm [transform-style:preserve-3d]">
          {/* Title bar */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {/* macOS-like dots */}
              <span
                className="h-2.5 w-2.5 rounded-full bg-red-400/70"
                aria-hidden="true"
              />
              <span
                className="h-2.5 w-2.5 rounded-full bg-amber-400/70"
                aria-hidden="true"
              />
              <span
                className="h-2.5 w-2.5 rounded-full bg-emerald-400/70"
                aria-hidden="true"
              />
              <span className="ml-2 text-xs text-text-muted">
                Control room operativo
              </span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-brand-lavender/12 px-3 py-1 text-xs font-semibold text-brand-lavender">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lavender opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lavender" />
              </span>
              IA activa
            </span>
          </div>

          {/* Layer 1 — metrics (translateZ lifts above base) */}
          <div className="grid gap-3 sm:grid-cols-2 [transform-style:preserve-3d]">
            {/* Card: processes — raised */}
            <div className="rounded-xl border border-brand-lavender/15 bg-brand-card/90 p-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:[transform:translateZ(12px)]">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                Procesos automatizados
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-[#f0f8ff]">
                +{processCount.toLocaleString()}
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
                <div
                  ref={progressRef}
                  className="h-1 rounded-full bg-gradient-to-r from-brand-violet to-brand-iris transition-all duration-[1400ms] ease-out"
                />
              </div>
            </div>

            {/* Card: SLA — raised */}
            <div className="rounded-xl border border-brand-lavender/15 bg-brand-card/90 p-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:[transform:translateZ(12px)]">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                SLA cumplido
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-[#f0f8ff]">
                {slaCount.toFixed(1)}%
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
                <div className="h-1 w-[97%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-[1400ms]" />
              </div>
            </div>

            {/* Card: activity — spans full, highest layer */}
            <div className="rounded-xl border border-brand-lavender/12 bg-brand-card/60 p-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)] sm:col-span-2 transition-transform duration-300 hover:[transform:translateZ(8px)]">
              <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
                <span>Alertas operativas resueltas</span>
                <span className="text-brand-lavender">96%</span>
              </div>
              <div className="space-y-1.5">
                {[
                  {
                    label: "Nómina validada",
                    status: "Completado",
                    color: "text-emerald-400",
                  },
                  {
                    label: "Escalado de caso prioritario",
                    status: "En curso",
                    color: "text-amber-300",
                  },
                  {
                    label: "Reporte ejecutivo generado",
                    status: "Listo",
                    color: "text-brand-lavender",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-lg bg-brand-elevated/50 px-3 py-1.5 text-xs"
                  >
                    <span className="text-text-muted">{row.label}</span>
                    <span className={row.color}>{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating "notification" badge — highest Z layer */}
          <div className="pointer-events-none absolute -right-3 -top-3 rounded-xl border border-brand-gold/30 bg-brand-card/95 px-3 py-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] [transform:translateZ(24px)] backdrop-blur-sm">
            <p className="text-[10px] font-bold text-brand-gold">
              +12% ROI · Q2
            </p>
          </div>

          {/* Floating alert badge */}
          <div className="pointer-events-none absolute -bottom-3 -left-3 rounded-xl border border-emerald-500/25 bg-brand-card/95 px-3 py-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] [transform:translateZ(18px)] backdrop-blur-sm">
            <p className="text-[10px] font-bold text-emerald-400">
              Azure · 99.9% uptime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
