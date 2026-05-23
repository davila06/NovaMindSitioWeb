"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { updateAnalyticsConsent } from "@/lib/analytics-client";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nm-cookie-consent");
    if (!stored) {
      // Default-deny: initialize gtag consent as denied until user decides
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("consent", "default", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          wait_for_update: 500,
        });
      }
      const t = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    updateAnalyticsConsent(true);
    setVisible(false);
  }

  function decline() {
    updateAnalyticsConsent(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-20 right-4 z-50 w-80 rounded-2xl border border-brand-lavender/20 bg-brand-surface/97 p-5 shadow-[0_12px_48px_rgba(249,115,22,0.18)] backdrop-blur-2xl md:bottom-8 md:right-8"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Cookie
            className="h-5 w-5 shrink-0 text-brand-gold"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-[#f0f8ff]">Usamos cookies</p>
        </div>
        <button
          onClick={decline}
          aria-label="Cerrar aviso de cookies"
          className="text-text-muted transition hover:text-[#f0f8ff]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-xs leading-5 text-text-muted">
        Usamos cookies propias y de análisis para mejorar tu experiencia y medir
        el rendimiento del sitio.{" "}
        <Link
          href="/privacidad"
          className="text-brand-lavender hover:underline"
        >
          Más información
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={decline}
          className="flex-1 rounded-xl border border-brand-lavender/20 py-2 text-xs font-medium text-text-muted transition hover:border-brand-lavender/40 hover:text-[#f0f8ff]"
        >
          Solo esenciales
        </button>
        <button
          onClick={accept}
          className="flex-1 rounded-xl bg-brand-violet py-2 text-xs font-semibold text-white transition hover:bg-brand-iris"
        >
          Aceptar todas
        </button>
      </div>
    </div>
  );
}
