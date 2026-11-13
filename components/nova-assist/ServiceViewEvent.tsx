"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics-client";

export function ServiceViewEvent({ service }: { service: string }) {
  useEffect(() => {
    trackEvent("service_view", { service });
    if (service === "plan-familia") trackEvent("family_plan_view");
    if (service === "total-home") trackEvent("total_home_view");
  }, [service]);
  return null;
}
