"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Star,
  CreditCard,
  RefreshCcw,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Zap,
  Info,
  ChevronDown,
} from "lucide-react";
import {
  clickFixPlans,
  itonDemandPlans,
  type NovaClickPlan,
} from "@/data/novaclick";
import { Button } from "@/components/shared/ui/Button";

type Tab = "residential" | "enterprise";

// ─── Payment badge ────────────────────────────────────────────────────────────
function PaymentBadge({
  type,
  accent,
}: {
  type: "single" | "monthly";
  accent: "orange" | "violet";
}) {
  const isOrange = accent === "orange";
  if (type === "monthly") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${isOrange ? "bg-orange-500/15 text-orange-300" : "bg-brand-violet/15 text-brand-lavender"}`}
      >
        <RefreshCcw className="h-2.5 w-2.5" aria-hidden="true" />
        Suscripción mensual
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-text-muted">
      <CreditCard className="h-2.5 w-2.5" aria-hidden="true" />
      Pago único
    </span>
  );
}

// ─── Limitations toggle ───────────────────────────────────────────────────────
function LimitationsToggle({ limitations }: { limitations: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[11px] text-text-muted/70 transition hover:text-text-muted"
      >
        <Info className="h-3 w-3" aria-hidden="true" />
        Limitaciones
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ul className="mt-2 space-y-1 border-t border-white/8 pt-2">
          {limitations.map((lim) => (
            <li
              key={lim}
              className="flex items-start gap-1.5 text-[11px] text-text-muted/60"
            >
              <AlertTriangle
                className="mt-0.5 h-3 w-3 shrink-0 text-amber-400/60"
                aria-hidden="true"
              />
              {lim}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Plan card ────────────────────────────────────────────────────────────────
function PlanCard({
  plan,
  accent,
  index,
  total,
}: {
  plan: NovaClickPlan;
  accent: "orange" | "violet";
  index: number;
  total: number;
}) {
  const isOrange = accent === "orange";

  // Podium 3D: highlighted card rises on Z, flanking cards tilt toward it
  const isPodiumCenter = plan.highlight;
  // Detect if this card is directly adjacent to a highlighted card (heuristic: check position)
  const podiumClass = isPodiumCenter
    ? "scale-[1.04] z-10 [transform:translateZ(18px)] hover:[transform:translateZ(28px)_translateY(-6px)]"
    : "hover:[transform:translateY(-6px)_translateZ(4px)]";

  const wrapperClass = plan.highlight
    ? isOrange
      ? "border-orange-400/60 shadow-[0_24px_64px_-12px_rgba(249,115,22,0.45),0_0_0_1px_rgba(249,115,22,0.2)]"
      : "border-brand-lavender/60 shadow-[0_24px_64px_-12px_rgba(139,92,246,0.45),0_0_0_1px_rgba(139,92,246,0.2)]"
    : "border-white/8 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]";

  const glowInner = plan.highlight
    ? isOrange
      ? "from-orange-500/12 via-transparent to-transparent"
      : "from-brand-violet/12 via-transparent to-transparent"
    : "from-white/3 via-transparent to-transparent";

  const highlightBadgeBg = isOrange
    ? "bg-orange-500 text-white shadow-[0_4px_14px_rgba(249,115,22,0.5)]"
    : "bg-brand-violet text-white shadow-[0_4px_14px_rgba(139,92,246,0.5)]";

  const checkClass = isOrange ? "text-orange-400" : "text-brand-lavender";
  const priceClass = isOrange ? "text-orange-300" : "text-brand-lavender";
  const guaranteeColor = isOrange ? "text-orange-300" : "text-brand-lavender";
  const slaColor = isOrange ? "text-orange-200" : "text-sky-300";

  const ctaHighlight = isOrange
    ? "bg-orange-500 text-white hover:bg-orange-400 shadow-[0_4px_20px_rgba(249,115,22,0.4)]"
    : "bg-brand-violet text-white hover:bg-brand-iris shadow-[0_4px_20px_rgba(139,92,246,0.4)]";

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-gradient-to-b from-brand-card/95 to-brand-card/80 p-6 backdrop-blur-sm transition-all duration-300 [transform-style:preserve-3d] ${wrapperClass} ${podiumClass}`}
    >
      {/* Inner glow */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b ${glowInner}`}
        aria-hidden="true"
      />

      {/* Podium base glow for highlighted card */}
      {plan.highlight && (
        <div
          className={`pointer-events-none absolute -bottom-3 left-4 right-4 h-6 rounded-full blur-xl opacity-60 ${isOrange ? "bg-orange-500/50" : "bg-brand-violet/50"}`}
          aria-hidden="true"
        />
      )}

      {/* Shimmer line */}
      {plan.highlight && (
        <div
          className={`absolute inset-x-0 top-0 h-px rounded-t-2xl ${isOrange ? "bg-gradient-to-r from-transparent via-orange-400 to-transparent" : "bg-gradient-to-r from-transparent via-brand-lavender to-transparent"}`}
          aria-hidden="true"
        />
      )}

      {/* "Más popular" badge */}
      {plan.highlight && (
        <div
          className="absolute -top-4 left-0 right-0 flex justify-center"
          aria-label="Plan más popular"
        >
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold tracking-wide ${highlightBadgeBg}`}
          >
            <Star className="h-3 w-3 fill-current" aria-hidden="true" />
            Más popular
          </span>
        </div>
      )}

      {/* Top meta row */}
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
          {plan.name}
        </span>
        <PaymentBadge type={plan.paymentType} accent={accent} />
      </div>

      {/* Price */}
      <div
        className={`mt-2 font-display text-3xl font-bold leading-none ${priceClass}`}
      >
        {plan.priceLabel}
        <span className="ml-1.5 text-xs font-normal text-text-muted">
          IVA inc.
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {plan.tagline}
      </p>

      {/* Meta pills row */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {/* Duration */}
        <span className="inline-flex items-center gap-1 rounded-full bg-white/6 px-2.5 py-0.5 text-[10px] text-text-muted">
          <Clock className="h-2.5 w-2.5" aria-hidden="true" />
          {plan.minDuration}
        </span>
        {/* Guarantee */}
        <span
          className={`inline-flex items-center gap-1 rounded-full bg-white/6 px-2.5 py-0.5 text-[10px] font-semibold ${guaranteeColor}`}
        >
          <ShieldCheck className="h-2.5 w-2.5" aria-hidden="true" />
          Garantía {plan.guarantee}
        </span>
        {/* SLA */}
        {plan.sla && (
          <span
            className={`inline-flex items-center gap-1 rounded-full bg-white/6 px-2.5 py-0.5 text-[10px] font-semibold ${slaColor}`}
          >
            <Zap className="h-2.5 w-2.5" aria-hidden="true" />
            SLA: {plan.sla}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-white/6" aria-hidden="true" />

      {/* Features */}
      <ul className="flex-1 space-y-2.5">
        {plan.features.map((feat) => (
          <li
            key={feat}
            className="flex items-start gap-2 text-sm text-text-muted"
          >
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${checkClass}`}
              aria-hidden="true"
            />
            {feat}
          </li>
        ))}
      </ul>

      {/* Limitations collapsible */}
      {plan.limitations.length > 0 && (
        <LimitationsToggle limitations={plan.limitations} />
      )}

      {/* Cancellation note */}
      {plan.cancellationPolicy && (
        <p className="mt-2 text-[10px] leading-relaxed text-text-muted/60">
          ⚠️ {plan.cancellationPolicy}
        </p>
      )}

      {/* CTA */}
      <Link
        href={plan.ctaHref}
        className={`mt-5 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
          plan.highlight
            ? ctaHighlight
            : "border border-white/12 bg-white/5 text-[#f0f8ff] hover:bg-white/10 hover:border-white/20"
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────
export function NovaClickPlanGrid() {
  const [tab, setTab] = useState<Tab>("residential");

  const plans = tab === "residential" ? clickFixPlans : itonDemandPlans;
  const accent = tab === "residential" ? "orange" : "violet";

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex justify-center">
        <div
          className="inline-flex rounded-full border border-brand-lavender/20 bg-brand-surface/50 p-1"
          role="tablist"
          aria-label="Línea de servicio"
        >
          <button
            role="tab"
            onClick={() => setTab("residential")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              tab === "residential"
                ? "bg-orange-500 text-white shadow"
                : "text-text-muted hover:text-[#f0f8ff]"
            }`}
          >
            🏠 ClickFix — Residencial
          </button>
          <button
            role="tab"
            onClick={() => setTab("enterprise")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              tab === "enterprise"
                ? "bg-brand-violet text-white shadow"
                : "text-text-muted hover:text-[#f0f8ff]"
            }`}
          >
            🏢 ITOn-Demand — Empresarial
          </button>
        </div>
      </div>

      {/* Context label */}
      <p className="mt-4 text-center text-sm text-text-muted">
        {tab === "residential"
          ? "Servicio técnico a domicilio para hogares. Precios IVA incluido."
          : "Soporte TI gestionado para empresas. Precios IVA incluido, factura electrónica disponible."}
      </p>

      {/* Plans grid — extra top padding so highlighted badge doesn't clip */}
      <div className="mt-8 grid gap-5 pt-5 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {plans.map((plan, i) => (
          <PlanCard
            key={plan.slug}
            plan={plan}
            accent={accent}
            index={i}
            total={plans.length}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 flex justify-center">
        <Button
          href="/contacto"
          trackingContext={{
            page: "novaclick",
            section: "plan-grid",
            ctaLabel:
              tab === "residential" ? "agenda_clickfix" : "solicita_iton",
            destination: "/contacto",
            intent: "demo",
          }}
        >
          {tab === "residential"
            ? "Agenda tu servicio ClickFix"
            : "Solicita tu plan ITOn-Demand"}
        </Button>
      </div>
    </div>
  );
}
