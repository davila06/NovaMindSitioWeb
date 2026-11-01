"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
  (process.env.NODE_ENV === "production" ? "0x4AAAAAAFvyFdddHQCD-d-2" : "");

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
  const renderWidget = useCallback(() => {
    if (!container.current || !window.turnstile || widget.current) return;
    widget.current = window.turnstile.render(container.current, {
      sitekey: turnstileSiteKey,
      action,
      callback: token => { setError(""); onToken(token); },
      "expired-callback": () => { onToken(""); },
      "error-callback": () => {
        onToken("");
        setError("No se pudo verificar la seguridad. Recarga la pagina e intenta de nuevo.");
      },
    });
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
    <div>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={renderWidget}
        onError={() => setError("No se pudo cargar la verificacion de seguridad. Recarga la pagina.")}
      />
      <div ref={container} />
      {error && <p role="alert" className="mt-2 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
