"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { businessServices } from "@/data/nova-assist-business";
import { trackNovaEvent } from "@/lib/nova-analytics";

export function BusinessSelector() {
  const [selected, setSelected] = useState("");
  const [interactive, setInteractive] = useState(false);
  useEffect(() => { setInteractive(true); }, []);
  const service = businessServices.find((item) => item.slug === selected);

  function choose(slug: string) {
    const properties = { segment: "business", selector_version: "business_v1" };
    if (!selected) trackNovaEvent("service_selector_started", properties);
    setSelected(slug);
    trackNovaEvent("service_selector_answered", { ...properties, step_name: "need", step_number: 1 });
    trackNovaEvent("service_recommended", { ...properties, service_id: slug });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">Orientación empresarial</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">¿Qué necesita tu empresa?</h2>
        <p className="mt-3 text-sm leading-6 text-text-muted">Selecciona una necesidad para conocer una opción inicial. Confirmaremos el alcance contigo.</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2" role="group" aria-label="Necesidades empresariales">
          {businessServices.map((item) => (
            <button type="button" key={item.slug} disabled={!interactive} aria-pressed={selected === item.slug} onClick={() => choose(item.slug)}
              className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 ${selected === item.slug ? "border-sky-200 bg-sky-300/15 text-white" : "border-white/10 bg-[#0b1730]/75 text-text-muted hover:border-sky-200/50"}`}>
              {item.need}
            </button>
          ))}
        </div>
      </div>
      <aside aria-live="polite" aria-atomic="true" className="rounded-3xl border border-sky-200/20 bg-[linear-gradient(145deg,#10263c,#091321)] p-6 sm:p-8">
        {service ? <>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Una opción para empezar</p>
          <h3 className="mt-3 font-display text-2xl font-bold text-white">{service.name}</h3>
          <p className="mt-3 text-sm leading-6 text-text-muted"><strong className="text-white">Por qué:</strong> {service.why}</p>
          <p className="mt-3 text-sm leading-6 text-text-muted"><strong className="text-white">Qué es:</strong> {service.description}</p>
          <p className="mt-3 text-sm leading-6 text-text-muted"><strong className="text-white">Siguiente paso:</strong> revisa el servicio y comparte tu necesidad.</p>
          <Link onClick={() => trackNovaEvent("service_cta_clicked", { segment: "business", service_id: service.slug, cta_position: "selector" })} href={`/nova-assist/empresas/${service.slug}`} className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-sky-200 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Conocer {service.name}</Link>
        </> : <p className="text-sm leading-6 text-text-muted">Elige una necesidad para conocer por qué puede convenirte una modalidad y cuál es el siguiente paso.</p>}
      </aside>
    </div>
  );
}
