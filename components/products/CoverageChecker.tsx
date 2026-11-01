"use client";

import { useState } from "react";
import {
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Navigation,
} from "lucide-react";
import { coverageZones, type CoverageZone } from "@/data/service-plans";

type CheckResult = {
  zone: CoverageZone;
  selectedZoneName: string;
};

const allZoneExamples = coverageZones.flatMap((z) =>
  z.examples.map((ex) => ({ label: ex, zone: z })),
);

export function CoverageChecker() {
  const [selected, setSelected] = useState<string>("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [open, setOpen] = useState(false);

  function handleCheck() {
    if (!selected) return;
    const found = allZoneExamples.find((z) => z.label === selected);
    if (found) {
      setResult({ zone: found.zone, selectedZoneName: found.label });
    }
  }

  function handleSelect(label: string) {
    setSelected(label);
    setResult(null);
    setOpen(false);
  }

  const resultConfig = result
    ? result.zone.surcharge === 0
      ? {
          icon: (
            <CheckCircle2
              className="h-6 w-6 text-emerald-400"
              aria-hidden="true"
            />
          ),
          title: "¡Estás dentro de la zona de cobertura!",
          detail:
            "Tu dirección está incluida en la tarifa base. Sin recargos adicionales.",
          bg: "border-emerald-500/30 bg-emerald-500/5",
          pill: "bg-emerald-500/15 text-emerald-300",
          pillText: "Sin recargo",
        }
      : result.zone.surcharge === 5000
        ? {
            icon: (
              <AlertTriangle
                className="h-6 w-6 text-amber-400"
                aria-hidden="true"
              />
            ),
            title: "Zona con recargo menor",
            detail: `Tu zona está fuera de los 10 km base. Se aplicará un recargo de desplazamiento al servicio seleccionado.`,
            bg: "border-amber-500/30 bg-amber-500/5",
            pill: "bg-amber-500/15 text-amber-300",
            pillText: "+ ₡5,000 recargo",
          }
        : {
            icon: (
              <AlertTriangle
                className="h-6 w-6 text-orange-400"
                aria-hidden="true"
              />
            ),
            title: "Zona con recargo por distancia",
            detail: `Tu zona requiere mayor desplazamiento desde San José. Se aplicará un recargo al servicio seleccionado.`,
            bg: "border-orange-500/30 bg-orange-500/5",
            pill: "bg-orange-500/15 text-orange-300",
            pillText: "+ ₡10,000 recargo",
          }
    : null;

  return (
    <div className="mx-auto max-w-lg">
      {/* Card */}
      <div className="relative z-10 rounded-2xl border border-white/10 bg-brand-card/80 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        {/* Header with map pin 3D icon */}
        <div className="relative flex items-center gap-4 rounded-t-2xl border-b border-white/8 bg-gradient-to-r from-orange-500/10 to-transparent px-6 py-5">
          {/* 3D floating icon */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            {/* Shadow layer */}
            <div
              className="absolute inset-0 translate-y-1 scale-90 rounded-2xl bg-orange-600/40 blur-md"
              aria-hidden="true"
            />
            {/* Face */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-orange-400 to-orange-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_12px_rgba(249,115,22,0.4)]">
              <MapPin
                className="h-7 w-7 text-white drop-shadow-sm"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-[#f0f8ff]">
              Verificar cobertura
            </h3>
            <p className="text-xs text-text-muted">
              Ingresa tu zona para ver si aplica recargo de desplazamiento.
            </p>
          </div>
        </div>

        {/* Selector + button */}
        <div className="px-6 py-5">
          <label
            htmlFor="zone-select"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-text-muted"
          >
            ¿En qué zona estás?
          </label>

          {/* Custom dropdown */}
          <div className="relative">
            <button
              id="zone-select"
              onClick={() => setOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm transition hover:border-white/20 hover:bg-white/8"
            >
              <span className={selected ? "text-[#f0f8ff]" : "text-text-muted"}>
                {selected || "Selecciona tu zona o ciudad…"}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {open && (
              <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-white/12 bg-brand-card shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]">
                {coverageZones.map((zone) => (
                  <div key={zone.name}>
                    {/* Zone group header */}
                    <div
                      className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                        zone.surcharge === 0
                          ? "text-emerald-400/80"
                          : zone.surcharge === 5000
                            ? "text-amber-400/80"
                            : "text-orange-400/80"
                      }`}
                    >
                      {zone.label}
                    </div>
                    {zone.examples.map((ex) => (
                      <button
                        key={ex}
                        onClick={() => handleSelect(ex)}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-text-muted transition hover:bg-white/6 hover:text-[#f0f8ff]"
                      >
                        <Navigation
                          className="h-3.5 w-3.5 shrink-0 opacity-50"
                          aria-hidden="true"
                        />
                        {ex}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleCheck}
            disabled={!selected}
            className="mt-3 w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(249,115,22,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            Verificar cobertura
          </button>
        </div>

        {/* Result */}
        {resultConfig && result && (
          <div className={`mx-4 mb-5 rounded-xl border p-4 ${resultConfig.bg}`}>
            <div className="flex items-start gap-3">
              {resultConfig.icon}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-[#f0f8ff]">
                    {resultConfig.title}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${resultConfig.pill}`}
                  >
                    {resultConfig.pillText}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">
                  {resultConfig.detail}
                </p>
                <p className="mt-1 text-xs text-text-muted/60">
                  Zona seleccionada:{" "}
                  <strong className="text-text-muted">
                    {result.selectedZoneName}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Zones legend */}
      <div className="relative z-0 mt-4 grid grid-cols-3 gap-2">
        {[
          {
            label: "Zona base",
            sub: "Sin recargo · ≤ 10 km",
            color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300",
          },
          {
            label: "Zona cercana",
            sub: "+ ₡5,000 · 10–18 km",
            color: "border-amber-500/20 bg-amber-500/5 text-amber-300",
          },
          {
            label: "Zona lejana",
            sub: "+ ₡10,000 · > 18 km",
            color: "border-orange-500/20 bg-orange-500/5 text-orange-300",
          },
        ].map(({ label, sub, color }) => (
          <div
            key={label}
            className={`rounded-xl border px-3 py-2 text-center ${color}`}
          >
            <div className="text-xs font-semibold">{label}</div>
            <div className="mt-0.5 text-[10px] opacity-80">{sub}</div>
          </div>
        ))}
      </div>

      {/* Isometric rings map */}
      <IsoRingsMap highlight={result?.zone.surcharge ?? null} />
    </div>
  );
}

// ── Isometric concentric rings map ─────────────────────────────────────────
function IsoRingsMap({ highlight }: { highlight: number | null }) {
  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
        Mapa de zonas de cobertura
      </p>
      {/* SVG isometric rings — pure CSS, no inline styles */}
      <div className="relative h-[180px] w-[280px] [perspective:600px]">
        <div className="absolute inset-0 [transform:rotateX(55deg)] [transform-style:preserve-3d]">
          {/* Ring 3 — far (orange) */}
          <div
            className={`absolute left-1/2 top-1/2 h-[168px] w-[268px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500 ${
              highlight === 10000
                ? "border-orange-400 bg-orange-500/12 shadow-[0_0_24px_4px_rgba(249,115,22,0.35)]"
                : "border-orange-500/30 bg-orange-500/5"
            }`}
            aria-hidden="true"
          />
          {/* Ring 2 — nearby (amber) */}
          <div
            className={`absolute left-1/2 top-1/2 h-[118px] w-[188px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500 ${
              highlight === 5000
                ? "border-amber-400 bg-amber-500/14 shadow-[0_0_20px_4px_rgba(245,158,11,0.35)]"
                : "border-amber-500/30 bg-amber-500/5"
            }`}
            aria-hidden="true"
          />
          {/* Ring 1 — base (emerald) */}
          <div
            className={`absolute left-1/2 top-1/2 h-[72px] w-[112px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500 ${
              highlight === 0
                ? "border-emerald-400 bg-emerald-500/16 shadow-[0_0_18px_4px_rgba(52,211,153,0.35)]"
                : "border-emerald-500/30 bg-emerald-500/5"
            }`}
            aria-hidden="true"
          />
          {/* Center dot — San José */}
          <div
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50 bg-white/80"
            aria-label="San José (centro)"
          />
        </div>
        {/* Center label overlay — not rotated, stays readable */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-white/60">
          San José
        </div>
      </div>
    </div>
  );
}
