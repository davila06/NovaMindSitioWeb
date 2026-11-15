import { isAnalyticsConsented, trackEvent } from "@/lib/analytics-client";
import { novaAssistServices } from "@/data/nova-assist";
import { businessServices } from "@/data/nova-assist-business";

export type NovaEvent =
  | "nova_assist_landing_view" | "nova_assist_segment_selected"
  | "service_selector_started" | "service_selector_answered" | "service_recommended"
  | "service_detail_viewed" | "plan_comparison_viewed" | "service_cta_clicked"
  | "service_request_started" | "service_request_validation_failed"
  | "service_request_submitted" | "service_request_succeeded" | "service_request_failed"
  | "health_check_started" | "health_check_step_completed" | "health_check_reviewed"
  | "health_check_submitted" | "health_check_succeeded" | "health_check_failed";

const services = new Set([...novaAssistServices, ...businessServices].map(item => item.slug));
const values: Record<string, ReadonlySet<string>> = {
  segment: new Set(["home", "business"]),
  service_id: services,
  selector_version: new Set(["home_v1", "business_v1"]),
  route: new Set([
    "/nova-assist", "/nova-assist/comparar", "/nova-assist/solicitar",
    "/nova-assist/empresas", "/nova-assist/empresas/comparar",
    "/nova-assist/empresas/solicitar", "/nova-assist/empresas/health-check",
    ...novaAssistServices.map(item => `/nova-assist/${item.slug}`),
    ...businessServices.map(item => `/nova-assist/empresas/${item.slug}`),
  ]),
  cta_position: new Set(["segment", "selector", "detail", "catalog", "comparison", "hero"]),
  step_name: new Set(["need", "scope", "devices", "question", "review", "contact"]),
  outcome: new Set(["success", "failed", "blocked", "selected"]),
  error_category: new Set(["validation", "verification", "network", "server", "invalid_response"]),
  viewport_category: new Set(["mobile", "desktop"]),
  referrer_category: new Set(["direct", "internal", "external"]),
};

export function trackNovaEvent(event: NovaEvent, properties: Record<string, string | number> = {}) {
  if (typeof window !== "undefined" && isAnalyticsConsented() &&
      typeof window.gtag === "function") {
    const safePath = values.route.has(window.location.pathname)
      ? window.location.pathname
      : "";
    window.gtag("set", {
      page_location: `${window.location.origin}${safePath}`,
      page_referrer: "",
    });
  }
  const safe: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (key === "step_number" && Number.isInteger(value) && typeof value === "number" && value >= 1 && value <= 20) safe[key] = value;
    else if (typeof value === "string" && values[key]?.has(value)) safe[key] = value;
  }
  trackEvent(event, safe);
}
