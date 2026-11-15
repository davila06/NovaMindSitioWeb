"use client";

import { useEffect, useRef } from "react";
import { trackNovaEvent, type NovaEvent } from "@/lib/nova-analytics";
import { CONSENT_EVENT, isAnalyticsConsented } from "@/lib/analytics-client";

export function AnalyticsEvent({ event, segment, service }: { event: NovaEvent; segment?: "home" | "business"; service?: string }) {
  const sent = useRef(false);
  useEffect(() => {
    const send = () => {
      if (sent.current || !isAnalyticsConsented() ||
          (typeof window.gtag !== "function" && typeof window.clarity !== "function")) return;
      sent.current = true;
      trackNovaEvent(event, { ...(segment ? { segment } : {}), ...(service ? { service_id: service } : {}) });
    };
    send();
    window.addEventListener(CONSENT_EVENT, send);
    window.addEventListener("nm:analytics-ready", send);
    window.addEventListener("storage", send);
    return () => {
      window.removeEventListener(CONSENT_EVENT, send);
      window.removeEventListener("nm:analytics-ready", send);
      window.removeEventListener("storage", send);
    };
  }, [event, segment, service]);
  return null;
}
