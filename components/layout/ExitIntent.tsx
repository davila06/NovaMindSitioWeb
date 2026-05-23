"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, FileText, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics-client";

export function ExitIntent() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already seen this session
    if (dismissed) return;
    try {
      if (sessionStorage.getItem("nm-exit-intent")) return;
    } catch { /* ignore */ }

    // Only on desktop (pointer events)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !dismissed) {
        setVisible(true);
        trackEvent("exit_intent_shown", { page: window.location.pathname });
      }
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [dismissed]);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    try { sessionStorage.setItem("nm-exit-intent", "1"); } catch { /* ignore */ }
  }

  function handleCTA(action: string) {
    trackEvent("exit_intent_cta", { action });
    dismiss();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Recurso gratuito"
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      {/* Backdrop tap-to-close */}
      <div className="absolute inset-0" onClick={dismiss} aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl border border-brand-violet/40 bg-brand-surface/97 p-5 shadow-[0_8px_60px_rgba(56,189,248,0.24)] backdrop-blur-2xl">
        <div className="flex items-start gap-4">
          {/* Lead magnet icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-gold/30 bg-brand-gold/10">
            <FileText className="h-5 w-5 text-brand-gold" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Recurso gratuito
            </p>
            <p className="mt-0.5 font-display text-base font-bold text-[#f0f8ff] leading-snug">
              Guía: Automatización operacional para LATAM
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Casos reales, métricas y pasos concretos para escalar operaciones con IA.
            </p>
          </div>

          <button
            onClick={dismiss}
            aria-label="Cerrar"
            className="mt-0.5 shrink-0 rounded-lg p-1 text-text-subtle hover:text-[#f0f8ff]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href="/contacto?intent=guia-automatizacion"
            onClick={() => handleCTA("download_guide")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gold/90 py-2.5 text-center text-sm font-semibold text-brand-void transition hover:bg-brand-gold"
          >
            Descargar guía gratis
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={dismiss}
            className="rounded-xl border border-brand-lavender/25 px-4 py-2.5 text-sm text-text-muted hover:text-[#f0f8ff]"
          >
            No gracias
          </button>
        </div>
      </div>
    </div>
  );
}
