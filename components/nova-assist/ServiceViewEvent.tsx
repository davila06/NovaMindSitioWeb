"use client";

import { AnalyticsEvent } from "./AnalyticsEvent";

export function ServiceViewEvent({ service, business = false }: { service: string; business?: boolean }) {
  return <AnalyticsEvent key={`${business}-${service}`} event="service_detail_viewed" segment={business ? "business" : "home"} service={service} />;
}
