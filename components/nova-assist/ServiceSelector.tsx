"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics-client";
import { novaAssistServiceBySlug } from "@/data/nova-assist";

const needs = [
  { id: "problem", label: "Resolver un problema", slug: "visita-express", reason: "Es una buena primera opción para diagnosticar un incidente principal en una sola visita." },
  { id: "maintenance", label: "Mantenimiento completo", slug: "visita-premium", reason: "Incluye una intervención más amplia para mantenimiento, optimización y respaldo básico acordado." },
  { id: "gaming", label: "Mejorar gaming", slug: "gamer", reason: "Revisa equipo, configuración gráfica y factores de la red local que pueden influir en el juego." },
  { id: "senior", label: "Ayuda para una persona adulta mayor", slug: "senior", reason: "Combina ajustes accesibles, ayuda con comunicación y orientación de seguridad." },
  { id: "smart-home", label: "Configurar dispositivos inteligentes", slug: "smart-home", reason: "Ayuda a configurar un pequeño ecosistema doméstico de hasta tres dispositivos compatibles." },
  { id: "recurring", label: "Soporte recurrente", slug: "plan-familia", reason: "Elige según la cantidad de dispositivos y el nivel de seguimiento preventivo que prefieres." },
  { id: "business", label: "Soporte para una empresa", slug: "it-ondemand", reason: "Las necesidades corporativas se definen en un alcance empresarial y no se cubren con planes residenciales." },
];

export function ServiceSelector() {
  const [selected, setSelected] = useState("");
  const [moreWork, setMoreWork] = useState(false);
  const [devices, setDevices] = useState("");
  const [interactive, setInteractive] = useState(false);
  const choice = needs.find((need) => need.id === selected);
  const slug = selected === "recurring"
    ? devices ? devices === "8" ? "total-home" : "plan-familia" : undefined
    : selected === "problem" && moreWork ? "visita-premium" : choice?.slug;
  const recommendation = needs.find((need) => need.id === (selected === "problem" && moreWork ? "maintenance" : selected));
  const title = slug ? novaAssistServiceBySlug[slug]?.name : undefined;
  const reason = selected === "recurring" && devices
    ? devices === "8"
      ? "Total Home está pensado para hogares con hasta ocho dispositivos y seguimiento preventivo."
      : "Plan Familia cubre hasta cinco dispositivos para soporte tecnológico cotidiano."
    : selected === "problem" && moreWork
      ? "Como también necesitas respaldo o mantenimiento, una visita de hasta 120 minutos ofrece más espacio para el trabajo acordado."
      : recommendation?.reason;

  useEffect(() => {
    setInteractive(true);
  }, []);

  function choose(id: string) {
    if (!selected) trackEvent("service_selector_start", { source: "nova_assist" });
    setSelected(id);
    setMoreWork(false);
    setDevices("");
    trackEvent("service_selector_choice", { need: id });
  }

  function complete() {
    if (slug) trackEvent("service_selector_complete", { service: slug });
  }

  return (
    <div
      data-interactive={interactive ? "true" : "false"}
      className="grid gap-8 lg:grid-cols-[1fr_0.85fr]"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Selector de servicio</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">¿Qué necesitas resolver?</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">Elige la situación que mejor describe lo que buscas. La recomendación inicial no sustituye la confirmación de alcance y disponibilidad.</p>
        <fieldset className="mt-6">
          <legend className="sr-only">Selecciona tu necesidad</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {needs.map((need) => {
              const active = selected === need.id;
              return (
                <button
                  type="button"
                  key={need.id}
                  aria-pressed={active}
                  onClick={() => choose(need.id)}
                  className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200 ${
                    active ? "border-orange-200/60 bg-orange-300/10 text-white" : "border-white/10 bg-[#0b1730]/75 text-text-muted hover:border-white/25 hover:text-white"
                  }`}
                >
                  {need.label}
                  {active ? <Check className="h-4 w-4 shrink-0 text-orange-200" aria-hidden="true" /> : <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </fieldset>

        {selected === "problem" && (
          <fieldset className="mt-5 rounded-2xl border border-white/10 bg-[#0b1730]/55 p-4">
            <legend className="px-1 text-sm font-semibold text-white">¿También necesitas respaldo, limpieza o mantenimiento?</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" aria-pressed={!moreWork} onClick={() => setMoreWork(false)} className={`rounded-xl px-4 py-2.5 text-sm ${!moreWork ? "bg-orange-300 text-[#17100a]" : "border border-white/15 text-text-muted"}`}>No, es un problema puntual</button>
              <button type="button" aria-pressed={moreWork} onClick={() => setMoreWork(true)} className={`rounded-xl px-4 py-2.5 text-sm ${moreWork ? "bg-orange-300 text-[#17100a]" : "border border-white/15 text-text-muted"}`}>Sí, necesito más tareas</button>
            </div>
          </fieldset>
        )}

        {selected === "recurring" && (
          <fieldset className="mt-5 rounded-2xl border border-white/10 bg-[#0b1730]/55 p-4">
            <legend className="px-1 text-sm font-semibold text-white">¿Cuántos dispositivos quieres cubrir?</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {[["5", "Hasta 5 dispositivos"], ["8", "Hasta 8 dispositivos"]].map(([value, label]) => (
                <button type="button" key={value} aria-pressed={devices === value} onClick={() => setDevices(value)} className={`rounded-xl px-4 py-2.5 text-sm ${devices === value ? "bg-orange-300 text-[#17100a]" : "border border-white/15 text-text-muted"}`}>{label}</button>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      <aside aria-live="polite" aria-atomic="true" className="flex min-h-64 flex-col justify-between rounded-3xl border border-orange-300/20 bg-[radial-gradient(circle_at_100%_0%,rgba(249,115,22,0.17),transparent_44%),linear-gradient(145deg,rgba(16,34,66,0.9),rgba(6,11,22,0.95))] p-6 sm:p-8">
        {slug && reason ? (
          <>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">Te recomendamos</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-muted">{reason}</p>
              <p className="mt-4 rounded-xl border border-white/10 bg-black/15 p-3 text-xs leading-5 text-text-subtle">
                Alcance: {slug === "visita-express" ? "1 incidente principal · hasta 60 minutos" : slug === "visita-premium" ? "hasta 120 minutos" : slug === "smart-home" ? "hasta 3 dispositivos compatibles" : slug === "plan-familia" ? "hasta 5 dispositivos · 4 h remotas y 1 visita al mes" : slug === "total-home" ? "hasta 8 dispositivos · 8 h remotas y 2 visitas al mes" : "revisamos el alcance contigo antes de avanzar"}.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link onClick={complete} href={`/nova-assist/${slug}`} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-300 px-4 py-3 text-sm font-bold text-[#17100a] transition hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Ver servicio <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link onClick={complete} href={`/nova-assist/solicitar?service=${slug}`} className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200">
                Solicitar ayuda
              </Link>
            </div>
          </>
        ) : (
          <div className="my-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">Una recomendación clara</p>
            <h3 className="mt-3 font-display text-2xl font-bold text-white">Selecciona una necesidad</h3>
            <p className="mt-3 text-sm leading-6 text-text-muted">Te mostraremos una modalidad, su alcance inicial y el siguiente paso.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
