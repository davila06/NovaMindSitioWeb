export const CONSENT_VERSION = "2026-11";
export const CONSENT_EVENT = "nm:consent-change";

export function readAnalyticsConsent(): {
  analytics: boolean;
  version: string;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const value = JSON.parse(
      localStorage.getItem("nm-cookie-consent") || "null",
    );
    return value?.version === CONSENT_VERSION &&
      typeof value.analytics === "boolean"
      ? value
      : null;
  } catch {
    return null;
  }
}

export function isAnalyticsConsented(): boolean {
  return readAnalyticsConsent()?.analytics === true;
}

/**
 * Grant or revoke gtag consent + persist to localStorage.
 * Called by CookieConsent on accept/decline.
 */
export function updateAnalyticsConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      "nm-cookie-consent",
      JSON.stringify({
        analytics: granted,
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
      }),
    );
  } catch {
    /* ignore */
  }

  // Google Consent Mode v2
  if (typeof window.gtag === "function") {
    const consentValue = granted ? "granted" : "denied";
    window.gtag("consent", "update", {
      analytics_storage: consentValue,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  // Microsoft Clarity consent
  if (typeof window.clarity === "function") {
    window.clarity("consentv2", {
      analytics_Storage: granted ? "granted" : "denied",
      ad_Storage: "denied",
    });
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function trackLeadConversion(
  requestId: string,
  params: Record<string, string>,
) {
  if (!isAnalyticsConsented()) return;
  try {
    const key = `nm-lead:${requestId}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    return;
  }
  trackEvent("lead_conversion", { ...params, request_id: requestId });
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;
  if (!isAnalyticsConsented()) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (typeof window.clarity === "function") {
    const tags = Object.entries(params)
      .map(([key, value]) => `${key}:${String(value)}`)
      .join("|");

    if (tags) {
      window.clarity("event", `${eventName}:${tags}`);
    } else {
      window.clarity("event", eventName);
    }
  }
}

export type CtaTrackingContext = {
  page: string;
  section: string;
  ctaLabel: string;
  destination: string;
  product?: string;
  intent?: string;
};

export function trackCtaClick(context: CtaTrackingContext) {
  trackEvent("cta_click", {
    page: context.page,
    section: context.section,
    cta_label: context.ctaLabel,
    destination: context.destination,
    product: context.product || "na",
    intent: context.intent || "na",
  });
}

export type FormProgressContext = {
  form: string;
  step: string;
  field?: string;
  valueType?: string;
  completionRate?: number;
  valid?: boolean;
};

export function trackFormProgress(context: FormProgressContext) {
  trackEvent("form_progress", {
    form: context.form,
    step: context.step,
    field: context.field || "na",
    value_type: context.valueType || "na",
    completion_rate: context.completionRate ?? 0,
    valid: context.valid ?? false,
  });
}
