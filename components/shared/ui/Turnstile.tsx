"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

export const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type TurnstileApi = {
  render(container: HTMLElement, options: {
    sitekey: string;
    action: string;
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }): string;
  remove(id: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function Turnstile({ action, onToken }: {
  action: "contact" | "newsletter";
  onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Cargando la verificación de seguridad.");
  const renderWidget = useCallback(() => {
    if (!container.current || !window.turnstile || widget.current) return;
    widget.current = window.turnstile.render(container.current, {
      sitekey: turnstileSiteKey,
      action,
      callback: token => {
        setError("");
        setStatus("Verificación completada.");
        onToken(token);
      },
      "expired-callback": () => {
        setStatus("La verificación expiró. Inténtalo nuevamente.");
        onToken("");
      },
      "error-callback": () => {
        onToken("");
        setStatus("");
        setError("No se pudo verificar la seguridad. Recarga la pagina e intenta de nuevo.");
      },
    });
    setStatus("Completa la verificación de seguridad para continuar.");
  }, [action, onToken]);

  useEffect(() => {
    if (!turnstileSiteKey) return;
    renderWidget();
    return () => {
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = undefined;
    };
  }, [renderWidget]);

  if (!turnstileSiteKey) return null;
  return (
    <div aria-label="Verificación de seguridad">
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={renderWidget}
        onError={() => {
          setStatus("");
          setError("No se pudo cargar la verificacion de seguridad. Recarga la pagina.");
        }}
      />
      <div
        ref={container}
        aria-describedby="turnstile-status"
      />
      <p
        id="turnstile-status"
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {status}
      </p>
      {error && <p role="alert" className="mt-2 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
