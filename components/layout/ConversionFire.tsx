"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics-client";

/**
 * Fires a conversion event on mount — used on the /gracias thank-you page.
 * Also fires a gtag conversion for Google Ads if a conversion ID is set.
 */
export function ConversionFire() {
  useEffect(() => {
    // GA4 lead conversion event
    trackEvent("lead_conversion", {
      source: "contact_form",
      page: "/gracias",
    });

    // Google Ads conversion (optional — set NEXT_PUBLIC_GADS_CONVERSION_ID)
    const adsId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
    if (
      adsId &&
      typeof window !== "undefined" &&
      typeof window.gtag === "function"
    ) {
      window.gtag("event", "conversion", {
        send_to: adsId,
        value: 1.0,
        currency: "USD",
      });
    }
  }, []);

  return null;
}
