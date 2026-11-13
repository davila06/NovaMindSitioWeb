"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics-client";

export function AnalyticsEvent({ event }: { event: string }) {
  useEffect(() => {
    trackEvent(event);
  }, [event]);
  return null;
}
