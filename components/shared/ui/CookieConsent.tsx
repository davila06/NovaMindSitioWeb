"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  readAnalyticsConsent,
  updateAnalyticsConsent,
} from "@/lib/analytics-client";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVisible(readAnalyticsConsent() === null);
    setMounted(true);
    const sync = () => setVisible(false);
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  function saveConsent(decision: "accepted" | "rejected") {
    updateAnalyticsConsent(decision === "accepted");
    setVisible(false);
  }

  if (!mounted) return null;
  if (!visible)
    return (
      <div className="bg-brand-void px-4 py-4 pb-24 text-center md:pb-4">
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="rounded-lg px-3 py-2 text-xs text-text-muted hover:text-text-primary"
        >
          Preferencias de cookies
        </button>
      </div>
    );

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      className="fixed bottom-20 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-brand-lavender/20 bg-brand-card/95 px-5 py-4 shadow-xl backdrop-blur-md md:bottom-4"
    >
      <p className="text-sm font-semibold text-[#f0f8ff]">
        Este sitio usa cookies
      </p>
      <p className="mt-1.5 text-xs leading-5 text-text-muted">
        Utilizamos cookies analíticas (Google Analytics, Microsoft Clarity) para
        mejorar la experiencia y medir el rendimiento. Conforme a la{" "}
        <Link
          href="/privacidad"
          className="text-brand-lavender hover:underline"
        >
          Ley 8968 de Costa Rica
        </Link>
        , necesitamos su consentimiento explícito antes de activarlas.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => saveConsent("accepted")}
          className="rounded-xl bg-brand-violet px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-iris"
        >
          Aceptar todas
        </button>
        <button
          onClick={() => saveConsent("rejected")}
          className="rounded-xl border border-brand-lavender/25 px-4 py-2 text-xs font-semibold text-text-muted transition hover:border-brand-lavender/50 hover:text-[#f0f8ff]"
        >
          Solo esenciales
        </button>
        <Link
          href="/privacidad"
          className="ml-auto text-[10px] text-text-subtle hover:text-text-muted hover:underline"
        >
          Política de privacidad
        </Link>
      </div>
    </div>
  );
}
