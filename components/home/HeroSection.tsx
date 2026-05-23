"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Badge } from "@/components/shared/ui/Badge";
import { Button } from "@/components/shared/ui/Button";
import { useEffect, useState } from "react";

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
    <SectionWrapper className="pb-8 pt-10 sm:pt-14">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ── Copy ──────────────────────────────────────── */}
          <div className="enter-fade-up">
            <Badge>Apps empresariales IA-native</Badge>

            <h1 className="mt-5 font-display text-[2.8rem] font-bold leading-[1.04] tracking-[-0.04em] text-[#f0f8ff] sm:text-[3.8rem] lg:text-[4.5rem]">
              Transformamos operaciones críticas en{" "}
              <span className="bg-gradient-to-r from-brand-violet via-brand-iris to-brand-lavender bg-clip-text text-transparent">
                plataformas inteligentes
              </span>
            </h1>

            {/* Typewriter de industrias */}
            <p className="mt-5 max-w-xl text-lg text-text-muted">
              IA aplicada a{" "}
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
                href="/#productos"
                variant="ghost"
                trackingContext={{
                  page: "home",
                  section: "hero",
                  ctaLabel: "ver_productos",
                  destination: "/#productos",
                  intent: "explore",
                }}
              >
                Ver productos →
              </Button>
            </div>

            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
              {[
                "Time-to-value acelerado",
                "Procesos trazables y auditables",
                "Arquitectura enterprise sobre Azure",
              ].map((item, i) => (
                <div
                  key={item}
                  className={`rounded-xl border border-brand-lavender/18 bg-brand-card/70 px-4 py-3 text-text-muted reveal-slide-up delay-${(i + 1) * 100}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ── Dashboard animado ──────────────────────────── */}
          <div className="enter-scale-in rounded-2xl border border-brand-lavender/20 bg-brand-surface/80 p-6 shadow-elevated backdrop-blur">
            {/* Header del dashboard */}
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-text-muted">Control room operativo</p>
              <span className="flex items-center gap-1.5 rounded-full bg-brand-lavender/12 px-3 py-1 text-xs font-semibold text-brand-lavender">
                {/* Pulsing indicator */}
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lavender opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lavender" />
                </span>
                IA activa
              </span>
            </div>

            {/* Métricas animadas */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-lavender/12 bg-brand-card/80 p-4">
                <p className="text-xs text-text-muted">
                  Procesos automatizados
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-[#f0f8ff]">
                  +{processCount.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border border-brand-lavender/12 bg-brand-card/80 p-4">
                <p className="text-xs text-text-muted">SLA cumplido</p>
                <p className="mt-1 font-display text-2xl font-semibold text-[#f0f8ff]">
                  {slaCount.toFixed(1)}%
                </p>
              </div>

              {/* Barra de progreso animada */}
              <div className="rounded-xl border border-brand-lavender/12 bg-brand-card/80 p-4 sm:col-span-2">
                <p className="text-xs text-text-muted">
                  Escalabilidad multi-tenant sobre Azure
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-elevated">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-brand-violet to-brand-iris transition-all duration-[1400ms] ease-out"
                    style={{
                      width: `${Math.round((processCount / 1280) * 80)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Ticker de actividad */}
              <div className="rounded-xl border border-brand-lavender/12 bg-brand-card/50 p-4 sm:col-span-2">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Alertas operativas resueltas</span>
                  <span className="text-brand-lavender">96%</span>
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    {
                      label: "Nómina validada",
                      status: "Completado",
                      color: "text-brand-lavender",
                    },
                    {
                      label: "Escalado de caso prioritario",
                      status: "En curso",
                      color: "text-amber-300",
                    },
                    {
                      label: "Reporte ejecutivo generado",
                      status: "Listo",
                      color: "text-brand-violet",
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-lg bg-brand-elevated/60 px-3 py-2 text-xs"
                    >
                      <span className="text-text-muted">{row.label}</span>
                      <span className={row.color}>{row.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
