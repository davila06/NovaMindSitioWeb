"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const PROOFS = [
  {
    action: "agendó una demo de Voicebot",
    company: "Contact Center · San José",
  },
  { action: "está evaluando Mindflow AI", company: "Aseguradora · Guatemala" },
  { action: "activó PlanillasCR este mes", company: "Municipalidad · Heredia" },
  { action: "solicitó integración ERP", company: "Distribuidora · Panamá" },
  {
    action: "está revisando el portafolio",
    company: "Banca regional · San José",
  },
  { action: "pidió propuesta para IADS", company: "Ministerio · Costa Rica" },
];

export function SocialProofToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first toast after 9 seconds
    const first = setTimeout(() => {
      setVisible(true);

      // Cycle every 14 seconds
      const interval = setInterval(() => {
        setVisible(false);
        setTimeout(() => {
          setIndex((i) => (i + 1) % PROOFS.length);
          setVisible(true);
        }, 600);
      }, 14000);

      return () => clearInterval(interval);
    }, 9000);

    return () => clearTimeout(first);
  }, []);

  const proof = PROOFS[index];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 left-4 z-40 flex items-center gap-3 rounded-2xl border border-brand-lavender/20 bg-brand-surface/95 px-4 py-3 shadow-[0_8px_32px_rgba(249,115,22,0.18)] backdrop-blur-xl transition-all duration-500 md:bottom-10 md:left-8 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
    >
      <CheckCircle2
        className="h-5 w-5 shrink-0 text-brand-lavender"
        aria-hidden="true"
      />
      <div>
        <p className="text-sm font-semibold text-[#f0f8ff]">
          Alguien <span className="text-brand-lavender">{proof.action}</span>
        </p>
        <p className="mt-0.5 text-xs text-text-muted">{proof.company}</p>
      </div>
    </div>
  );
}
