"use client";

import { trackCtaClick } from "@/lib/analytics-client";

const PAWTRACK_URL = "https://pawtrackcr.com";
const PAWTRACK_APP_URL = "https://app.pawtrackcr.com/login";

export function PwaInstallActions() {
  function trackVisit(ctaLabel: string, destination: string) {
    trackCtaClick({
      page: "product/pawtrack",
      section: "product_cta",
      ctaLabel,
      destination,
      product: "pawtrack",
      intent: "explore",
    });
  }

  return (
    <>
      <a
        href={PAWTRACK_APP_URL}
        onClick={() => trackVisit("acceder_pawtrack", PAWTRACK_APP_URL)}
        className="inline-flex items-center justify-center rounded-2xl bg-brand-cta px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium"
      >
        Acceder a PawTrack CR
      </a>

      <a
        href={PAWTRACK_URL}
        onClick={() => trackVisit("conocer_pawtrack", PAWTRACK_URL)}
        className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
      >
        Conocer PawTrack CR
      </a>
    </>
  );
}
