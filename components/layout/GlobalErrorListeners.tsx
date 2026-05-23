"use client";

import { useEffect } from "react";

type ClientErrorEvent = {
  source: string;
  message: string;
  severity: "info" | "warning" | "error" | "critical";
  stack?: string;
  route?: string;
  context?: Record<string, unknown>;
};

function reportClientError(event: ClientErrorEvent) {
  const payload = {
    ...event,
    route: event.route || window.location.pathname,
  };

  const jsonPayload = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([jsonPayload], { type: "application/json" });
    const sent = navigator.sendBeacon("/api/monitoring/error", blob);
    if (sent) return;
  }

  fetch("/api/monitoring/error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonPayload,
    keepalive: true,
  }).catch(() => {
    // Avoid throwing from error reporting in the browser runtime.
  });
}

export function GlobalErrorListeners() {
  useEffect(() => {
    function onError(event: ErrorEvent) {
      // Resource load failures (img, script, link) fire a plain Event, not an
      // ErrorEvent. Without this guard, the Next.js dev overlay receives the
      // plain Event and renders String(event) → "[object Event]".
      if (!(event instanceof ErrorEvent)) return;

      reportClientError({
        source: "frontend.window_error",
        message: event.message || "Unhandled client error",
        severity: "error",
        stack: event.error instanceof Error ? event.error.stack : undefined,
        context: {
          fileName: event.filename || "unknown",
          line: event.lineno,
          column: event.colno,
        },
      });
    }

    function onUnhandledRejection(event: PromiseRejectionEvent) {
      const reason = event.reason;

      if (reason instanceof Error) {
        reportClientError({
          source: "frontend.unhandled_rejection",
          message: reason.message,
          severity: "error",
          stack: reason.stack,
        });
        return;
      }

      // A DOM Event object (isTrusted property) being used as a rejection value
      // is a resource-load failure (e.g. reject passed directly as an onerror handler).
      // Downgrade to warning — it is not a JS runtime error.
      if (
        reason !== null &&
        typeof reason === "object" &&
        "isTrusted" in reason
      ) {
        reportClientError({
          source: "frontend.unhandled_rejection",
          message: "Promise rejected with DOM Event (resource load failure)",
          severity: "warning",
          context: { isTrusted: (reason as Event).isTrusted },
        });
        return;
      }

      reportClientError({
        source: "frontend.unhandled_rejection",
        message:
          typeof reason === "string" ? reason : "Unhandled promise rejection",
        severity: "error",
        context: { reason: String(reason) },
      });
    }

    // capture:true — our handler runs before the Next.js overlay so resource
    // errors filtered above never reach it.
    window.addEventListener("error", onError, true);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError, true);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
