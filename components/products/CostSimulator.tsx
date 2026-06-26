"use client";

import { useState } from "react";
import {
  Calculator,
  MapPin,
  CreditCard,
  RefreshCcw,
  Zap,
  Tag,
} from "lucide-react";
import {
  clickFixPlans,
  itonDemandPlans,
  coverageZones,
} from "@/data/novaclick";

type Line = "clickfix" | "iton";

function fmt(n: number) {
  return "₡" + n.toLocaleString("es-CR");
}

export function CostSimulator() {
  const [line, setLine] = useState<Line>("clickfix");
  const [planSlug, setPlanSlug] = useState<string>("");
  const [zoneSlug, setZoneSlug] = useState<string>("");
  const [annualPay, setAnnualPay] = useState(false);

  const plans = line === "clickfix" ? clickFixPlans : itonDemandPlans;
  const selectedPlan = plans.find((p) => p.slug === planSlug) ?? null;
  const selectedZone = coverageZones.find((z) => z.name === zoneSlug) ?? null;

  const basePrice = selectedPlan?.price ?? 0;
  const surcharge = selectedZone?.surcharge ?? 0;
  const subtotal = basePrice + surcharge;
  const isMonthly = selectedPlan?.paymentType === "monthly";
  const annualDiscount =
    isMonthly && annualPay ? Math.round(subtotal * 12 * 0.15) : 0;
  const annualTotal =
    isMonthly && annualPay ? subtotal * 12 - annualDiscount : null;
  const total = annualTotal ?? subtotal;

  const ready = selectedPlan && selectedZone;

  const lineColor = line === "clickfix" ? "orange" : "violet";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-card/80 shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        {/* Header */}
        <div
          className={`flex items-center gap-4 border-b border-white/8 px-6 py-5 ${
            line === "clickfix"
              ? "bg-gradient-to-r from-orange-500/10 to-transparent"
              : "bg-gradient-to-r from-brand-violet/10 to-transparent"
          }`}
        >
          {/* 3D icon */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            <div
              className={`absolute inset-0 translate-y-1 scale-90 rounded-2xl blur-md ${
                line === "clickfix" ? "bg-orange-600/40" : "bg-brand-violet/40"
              }`}
              aria-hidden="true"
            />
            <div
              className={`relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ${
                line === "clickfix"
                  ? "bg-gradient-to-b from-orange-400 to-orange-600"
                  : "bg-gradient-to-b from-brand-iris to-brand-violet"
              }`}
            >
              <Calculator
                className="h-7 w-7 text-white drop-shadow-sm"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-[#f0f8ff]">
              Simulador de costos
            </h3>
            <p className="text-xs text-text-muted">
              Selecciona plan y zona para calcular tu tarifa exacta.
            </p>
          </div>
        </div>

        <div className="space-y-5 px-6 py-5">
          {/* Line toggle */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              Línea de servicio
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["clickfix", "🏠 ClickFix Residencial"],
                  ["iton", "🏢 ITOn-Demand Empresarial"],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => {
                    setLine(val);
                    setPlanSlug("");
                    setZoneSlug("");
                    setAnnualPay(false);
                  }}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                    line === val
                      ? val === "clickfix"
                        ? "border-orange-500/40 bg-orange-500/15 text-orange-300"
                        : "border-brand-lavender/40 bg-brand-violet/15 text-brand-lavender"
                      : "border-white/8 bg-white/3 text-text-muted hover:bg-white/6"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Plan select */}
          <div>
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-text-muted"
              htmlFor="plan-select"
            >
              Plan
            </label>
            <select
              id="plan-select"
              value={planSlug}
              onChange={(e) => setPlanSlug(e.target.value)}
              className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-[#f0f8ff] transition hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-brand-lavender/40"
            >
              <option value="">Selecciona un plan…</option>
              {plans.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} — {p.priceLabel}
                  {p.paymentType === "monthly" ? "/mes" : " (pago único)"}
                </option>
              ))}
            </select>
          </div>

          {/* Zone select */}
          <div>
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-text-muted"
              htmlFor="zone-select"
            >
              <MapPin className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
              Zona de servicio
            </label>
            <select
              id="zone-select"
              value={zoneSlug}
              onChange={(e) => setZoneSlug(e.target.value)}
              className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-[#f0f8ff] transition hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-brand-lavender/40"
            >
              <option value="">Selecciona tu zona…</option>
              {coverageZones.map((z) => (
                <option key={z.name} value={z.name}>
                  {z.label}
                  {z.surcharge > 0
                    ? ` — recargo ${fmt(z.surcharge)}`
                    : " — sin recargo"}
                </option>
              ))}
            </select>
          </div>

          {/* Annual pay toggle — only for monthly plans */}
          {isMonthly && selectedPlan && (
            <div className="flex items-center justify-between rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                <span className="text-sm font-semibold text-brand-gold">
                  Pago anual
                </span>
                <span className="rounded-full bg-brand-gold/15 px-2 py-0.5 text-[10px] font-bold text-brand-gold">
                  15% OFF
                </span>
              </div>
              <button
                onClick={() => setAnnualPay((v) => !v)}
                className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${annualPay ? "bg-brand-gold" : "bg-white/15"}`}
                title="Activar pago anual con 15% de descuento"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${annualPay ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </button>
            </div>
          )}
        </div>

        {/* Result panel */}
        {ready && (
          <div className="animate-pop3d border-t border-white/8 bg-white/2 px-6 py-5 [perspective:600px]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              Resumen de costo
            </p>

            <dl className="space-y-2">
              {/* Base */}
              <div className="flex items-center justify-between text-sm">
                <dt className="flex items-center gap-1.5 text-text-muted">
                  {selectedPlan.paymentType === "monthly" ? (
                    <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  Tarifa {selectedPlan.name}
                  {isMonthly && !annualPay && "/mes"}
                </dt>
                <dd className="font-semibold text-[#f0f8ff]">
                  {fmt(basePrice)}
                </dd>
              </div>

              {/* Surcharge */}
              {surcharge > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <dt className="flex items-center gap-1.5 text-amber-400">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    Recargo de desplazamiento
                  </dt>
                  <dd className="font-semibold text-amber-300">
                    {fmt(surcharge)}
                  </dd>
                </div>
              )}

              {surcharge === 0 && (
                <div className="flex items-center justify-between text-sm">
                  <dt className="flex items-center gap-1.5 text-emerald-400">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    Sin recargo (zona base)
                  </dt>
                  <dd className="font-semibold text-emerald-400">₡0</dd>
                </div>
              )}

              {/* Monthly × 12 */}
              {isMonthly && annualPay && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <dt className="text-text-muted">Subtotal 12 meses</dt>
                    <dd className="text-text-muted">{fmt(subtotal * 12)}</dd>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <dt className="flex items-center gap-1.5 text-brand-gold">
                      <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                      Descuento anual (15%)
                    </dt>
                    <dd className="font-semibold text-brand-gold">
                      −{fmt(annualDiscount)}
                    </dd>
                  </div>
                </>
              )}

              {/* Divider */}
              <div className="my-1 h-px bg-white/8" />

              {/* Total — 3D pop-out */}
              <div className="flex items-center justify-between [perspective:400px]">
                <dt className="text-sm font-bold text-[#f0f8ff]">
                  Total
                  {isMonthly && annualPay ? " anual" : isMonthly ? "/mes" : ""}
                </dt>
                <dd
                  className={`font-display text-3xl font-bold transition-all duration-500 [transform-style:preserve-3d] [transform:translateZ(0px)_scale(1)] hover:[transform:translateZ(24px)_scale(1.08)] drop-shadow-lg ${
                    line === "clickfix"
                      ? "text-orange-300 drop-shadow-[0_0_16px_rgba(249,115,22,0.6)]"
                      : "text-brand-lavender drop-shadow-[0_0_16px_rgba(139,92,246,0.6)]"
                  }`}
                >
                  {fmt(total)}
                </dd>
              </div>
            </dl>

            {/* SLA badge */}
            {selectedPlan.sla && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-sky-300">
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                SLA incluido: {selectedPlan.sla}
              </div>
            )}

            {/* CTA */}
            <a
              href={selectedPlan.ctaHref}
              className={`mt-4 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-95 ${
                line === "clickfix"
                  ? "bg-orange-500 text-white shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:bg-orange-400"
                  : "bg-brand-violet text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:bg-brand-iris"
              }`}
            >
              Contratar {selectedPlan.name}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
