"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";
import { trackEvent } from "@/lib/analytics-client";

type Scenario = "nomina" | "contactcenter" | "erp";

const scenarios: Record<
  Scenario,
  {
    label: string;
    inputLabel: string;
    inputPlaceholder: string;
    unit: string;
    costPerUnit: number;
    savingPct: number;
    metric: string;
  }
> = {
  nomina: {
    label: "Nómina",
    inputLabel: "Empleados en planilla",
    inputPlaceholder: "ej. 120",
    unit: "empleados",
    costPerUnit: 18,
    savingPct: 0.38,
    metric: "ahorro mensual estimado en procesamiento",
  },
  contactcenter: {
    label: "Contact Center",
    inputLabel: "Llamadas / tickets por mes",
    inputPlaceholder: "ej. 5000",
    unit: "interacciones/mes",
    costPerUnit: 3.2,
    savingPct: 0.42,
    metric: "reducción de costo operativo mensual",
  },
  erp: {
    label: "ERP / Backoffice",
    inputLabel: "Usuarios operativos",
    inputPlaceholder: "ej. 40",
    unit: "usuarios",
    costPerUnit: 55,
    savingPct: 0.31,
    metric: "ahorro en horas-hombre mensual (estimado)",
  },
};

function formatUSD(value: number) {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ROICalculator() {
  const [scenario, setScenario] = useState<Scenario>("nomina");
  const [volume, setVolume] = useState("");

  const sc = scenarios[scenario];
  const parsed = parseInt(volume.replace(/\D/g, ""), 10);
  const monthlySaving =
    !isNaN(parsed) && parsed > 0
      ? Math.round(parsed * sc.costPerUnit * sc.savingPct)
      : null;
  const annualSaving = monthlySaving !== null ? monthlySaving * 12 : null;

  return (
    <SectionWrapper>
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">
              Calculadora de ROI
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              ¿Cuánto podrías ahorrar con Novamind?
            </h2>
            <p className="mt-3 text-text-muted">
              Estimación orientativa basada en benchmarks de implementación
              real.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-elevated backdrop-blur sm:p-8">
            {/* Selector de escenario */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(scenarios) as Scenario[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setScenario(key);
                    setVolume("");
                    trackEvent("roi_scenario_selected", { scenario: key });
                  }}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    scenario === key
                      ? "bg-brand-violet text-white shadow-violet"
                      : "border border-brand-lavender/20 text-text-muted hover:border-brand-lavender/40 hover:text-[#f0f8ff]"
                  }`}
                >
                  {scenarios[key].label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-text-muted">
                {sc.inputLabel}
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={volume}
                onChange={(e) => {
                  const val = e.target.value;
                  setVolume(val);
                  const num = parseInt(val.replace(/\D/g, ""), 10);
                  if (!isNaN(num) && num > 0) {
                    const saving = Math.round(
                      num * sc.costPerUnit * sc.savingPct,
                    );
                    trackEvent("roi_calculated", {
                      scenario,
                      volume: num,
                      monthly_saving_usd: saving,
                    });
                  }
                }}
                placeholder={sc.inputPlaceholder}
                className="mt-2 w-full rounded-xl border border-brand-lavender/20 bg-brand-void/60 px-4 py-3 text-[#f0f8ff] outline-none ring-brand-violet transition focus:ring-2"
              />
            </div>

            {/* Resultado */}
            <div
              className={`mt-6 rounded-xl border transition-all duration-300 ${monthlySaving !== null ? "border-brand-violet/35 bg-brand-violet/10 p-6" : "border-brand-lavender/12 bg-brand-elevated/30 p-6"}`}
            >
              {monthlySaving !== null ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
                      Ahorro mensual estimado
                    </p>
                    <p className="mt-1 font-display text-4xl font-bold text-[#f0f8ff]">
                      {formatUSD(monthlySaving)}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">{sc.metric}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
                      Ahorro anual estimado
                    </p>
                    <p className="mt-1 font-display text-4xl font-bold text-brand-lavender">
                      {formatUSD(annualSaving!)}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      Proyección a 12 meses
                    </p>
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <Button
                      href="/contacto"
                      trackingContext={{
                        page: "home",
                        section: "roi_calculator",
                        ctaLabel: "ver_propuesta",
                        destination: "/contacto",
                        intent: "demo",
                      }}
                    >
                      Ver propuesta personalizada →
                    </Button>
                  </div>
                  {/* 3D bar chart */}
                  <div className="sm:col-span-2">
                    <Bars3D monthly={monthlySaving} annual={annualSaving!} />
                  </div>
                </div>
              ) : (
                <p className="text-center text-sm text-text-subtle">
                  Ingresa un volumen para ver el estimado de ahorro.
                </p>
              )}
            </div>

            <p className="mt-4 text-xs text-text-subtle">
              * Estimaciones basadas en benchmarks de industria. El ahorro real
              depende del contexto operativo específico.
            </p>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

// ── 3D Bar chart visualization ────────────────────────────────────────────
function Bars3D({ monthly, annual }: { monthly: number; annual: number }) {
  const monthlyRef = useRef<HTMLDivElement>(null);
  const annualRef = useRef<HTMLDivElement>(null);
  const MAX_H = 96;

  useEffect(() => {
    const mH = Math.max(14, Math.round((monthly / annual) * MAX_H));
    const aH = MAX_H;
    if (monthlyRef.current) monthlyRef.current.style.height = `${mH}px`;
    if (annualRef.current) annualRef.current.style.height = `${aH}px`;
  }, [monthly, annual]);

  return (
    <div
      className="mt-5 flex items-end justify-center gap-8 [perspective:400px]"
      aria-hidden="true"
    >
      {/* Monthly bar */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-16 [transform-style:preserve-3d] hover:[transform:rotateY(-8deg)_rotateX(-2deg)] transition-transform duration-300">
          {/* Front face */}
          <div
            ref={monthlyRef}
            className="w-16 rounded-t-lg bg-gradient-to-t from-brand-violet to-brand-iris transition-all duration-700 ease-out"
          />
          {/* Top cap */}
          <div className="absolute inset-x-0 top-0 h-3 rounded-t-lg bg-brand-lavender/35 [transform:rotateX(-90deg)_translateZ(6px)_translateY(-6px)]" />
          {/* Right side */}
          <div className="absolute bottom-0 right-0 top-0 w-3 bg-brand-violet/40 [transform:rotateY(-90deg)_translateX(6px)_translateZ(-6px)]" />
        </div>
        <span className="text-[10px] font-semibold text-text-muted">
          Mensual
        </span>
      </div>

      {/* Annual bar */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-16 [transform-style:preserve-3d] hover:[transform:rotateY(-8deg)_rotateX(-2deg)] transition-transform duration-300">
          <div
            ref={annualRef}
            className="w-16 rounded-t-lg bg-gradient-to-t from-brand-gold/70 to-brand-gold transition-all duration-700 ease-out"
          />
          <div className="absolute inset-x-0 top-0 h-3 rounded-t-lg bg-brand-gold/40 [transform:rotateX(-90deg)_translateZ(6px)_translateY(-6px)]" />
          <div className="absolute bottom-0 right-0 top-0 w-3 bg-brand-gold/30 [transform:rotateY(-90deg)_translateX(6px)_translateZ(-6px)]" />
        </div>
        <span className="text-[10px] font-semibold text-text-muted">Anual</span>
      </div>
    </div>
  );
}
