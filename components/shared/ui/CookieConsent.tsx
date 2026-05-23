"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "nm-cookie-consent";
const POLICY_VERSION = "2026-01";

type ConsentState = "accepted" | "rejected" | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as {
          decision: ConsentState;
          version: string;
        };
        // Re-ask if policy version changed
        if (parsed.version === POLICY_VERSION) {
          setConsent(parsed.decision);
        }
      }
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, []);

  function saveConsent(decision: "accepted" | "rejected") {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          decision,
          version: POLICY_VERSION,
          timestamp: new Date().toISOString(),
        }),
      );
    } catch {
      /* ignore */
    }
    setConsent(decision);

    // If analytics was accepted, fire a custom event so GTM / GA can initialise
    if (decision === "accepted" && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("nm:cookie-consent", { detail: { analytics: true } }),
      );
    }
  }

  // Don't render until client-side hydration to avoid layout shift
  if (!mounted || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-brand-lavender/20 bg-brand-card/95 px-5 py-4 shadow-xl backdrop-blur-md"
    >
      <p className="text-sm font-semibold text-[#f0f8ff]">
        Este sitio usa cookies
      </p>
      <p className="mt-1.5 text-xs leading-5 text-text-muted">
        Utilizamos cookies analíticas (Google Analytics, Microsoft Clarity) para
        mejorar la experiencia y medir el rendimiento. Conforme a la{" "}
        <Link
          href="/privacidad#cookies"
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
