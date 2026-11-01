"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, isAnalyticsConsented } from "@/lib/analytics-client";

export function AnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const sync = () => setEnabled(isAnalyticsConsented());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  if (!enabled) return null;

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
window.gtag = gtag;
gtag('consent', 'default', {analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      )}

      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");
window.clarity('consentv2', {analytics_Storage:'granted',ad_Storage:'denied'});`}
        </Script>
      )}
    </>
  );
}
