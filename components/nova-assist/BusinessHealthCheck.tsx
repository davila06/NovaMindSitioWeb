"use client";

import { useEffect, useState } from "react";
import { ContactForm } from "@/components/shared/ui/ContactForm";
import { trackNovaEvent } from "@/lib/nova-analytics";

const fields = [
  { label: "Industria", options: ["Comercio", "Servicios", "Manufactura", "Educación", "Salud", "Otra"] },
  { label: "Tamaño aproximado de la empresa", options: ["1 a 10 personas", "11 a 50 personas", "51 a 200 personas", "Más de 200 personas"] },
  { label: "Sedes", options: ["Una sede", "Varias sedes", "Sin sede fija"] },
  { label: "Modalidad de trabajo", options: ["Presencial", "Remoto", "Híbrido"] },
  { label: "Tipos de dispositivos", options: ["Computadoras", "Móviles", "Computadoras y móviles", "Otros"] },
  { label: "Gestión actual de dispositivos", options: ["Equipo interno", "Proveedor", "Sin gestión definida"] },
  { label: "Microsoft 365, Teams, SharePoint o OneDrive", options: ["Utilizamos algunos", "No utilizamos", "No sé"] },
  { label: "Azure u otros servicios cloud", options: ["Azure", "Otros servicios", "Ambos", "No sé", "Ninguno"] },
  { label: "¿Utilizan MFA?", options: ["Sí", "No", "No sé"] },
  { label: "¿Utilizan protección de endpoints?", options: ["Sí", "No", "No sé"] },
  { label: "¿Utilizan respaldos?", options: ["Sí", "No", "No sé"] },
  { label: "Modelo de soporte IT", options: ["Equipo interno", "Proveedor", "Persona generalista", "Ninguno"] },
  { label: "Necesidad principal", options: ["Soporte", "Seguridad", "Cloud", "Costos", "Productividad", "Automatización", "IA", "Proyecto", "Orientación"] },
];

export function BusinessHealthCheck() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [interactive, setInteractive] = useState(false);
  useEffect(() => { setInteractive(true); }, []);
  const message = ["IT Health Check: contexto inicial.", ...fields.filter((field) => answers[field.label]).map((field) => `${field.label}: ${answers[field.label]}`)].join("\n");
  if (ready) return <div>
    <p className="mb-6 rounded-xl border border-sky-200/20 bg-sky-200/5 p-4 text-sm leading-6 text-text-muted">Gracias. Podemos utilizar esta información para orientar una conversación inicial con Nova Assist. Revisa y edita el mensaje antes de enviarlo.</p>
    <button type="button" onClick={() => setReady(false)} className="mb-5 text-sm font-semibold text-sky-100 underline">Editar respuestas</button>
    <ContactForm variant="business" plan="nova-assist-business-it-health-check" initialMessage={message} healthCheck />
  </div>;
  return <div>
    <p className="text-sm leading-6 text-text-muted">Responde solo lo que desees. No incluyas contraseñas, tokens, direcciones IP internas ni detalles de vulnerabilidades.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">{fields.map((field, index) => <label key={field.label} className="space-y-2 text-sm text-text-muted">
      <span>{field.label}</span>
      <select disabled={!interactive} value={answers[field.label] ?? ""} onChange={(event) => {
        if (!started) { setStarted(true); trackNovaEvent("health_check_started", { segment: "business" }); }
        trackNovaEvent("health_check_step_completed", { segment: "business", step_name: "question", step_number: index + 1 });
        setAnswers((current) => ({ ...current, [field.label]: event.target.value }));
      }} className="w-full rounded-xl border border-white/20 bg-[#08101f] px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-200">
        <option value="">Prefiero no indicar</option>{field.options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>)}</div>
    <button type="button" disabled={!interactive} onClick={() => {
      if (!started) { setStarted(true); trackNovaEvent("health_check_started", { segment: "business" }); }
      trackNovaEvent("health_check_reviewed", { segment: "business", step_name: "review" });
      setReady(true);
    }} className="mt-6 min-h-12 rounded-xl bg-sky-200 px-5 py-3 font-bold text-slate-950 hover:bg-white disabled:opacity-50">Continuar a contacto</button>
  </div>;
}
