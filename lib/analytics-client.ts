/** Checks if the user has granted analytics consent (stored by CookieConsent). */
export function isAnalyticsConsented(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("nm-cookie-consent") === "all";
  } catch {
    return false;
  }
}

/**
 * Grant or revoke gtag consent + persist to localStorage.
 * Called by CookieConsent on accept/decline.
 */
export function updateAnalyticsConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("nm-cookie-consent", granted ? "all" : "essential");
  } catch {
    /* ignore */
  }

  // Google Consent Mode v2
  if (typeof window.gtag === "function") {
    const consentValue = granted ? "granted" : "denied";
    window.gtag("consent", "update", {
      analytics_storage: consentValue,
      ad_storage: consentValue,
      ad_user_data: consentValue,
      ad_personalization: consentValue,
    });
  }
  // Microsoft Clarity consent
  if (typeof window.clarity === "function") {
    if (granted) {
      window.clarity("consent");
    }
  }
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
