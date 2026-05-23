'use client'

import { useEffect } from 'react'

/**
 * Reads UTM parameters from the URL on first visit and persists them
 * to sessionStorage so they survive SPA navigation within the session.
 * The stored value is automatically picked up by ContactForm.
 */
export function useUTM() {
  useEffect(() => {
    try {
      // Don't overwrite existing UTM data (first-touch attribution)
      if (sessionStorage.getItem('nm-utm')) return

      const params = new URLSearchParams(window.location.search)
      const utm = {
        source: params.get('utm_source') ?? '',
        medium: params.get('utm_medium') ?? '',
        campaign: params.get('utm_campaign') ?? '',
        term: params.get('utm_term') ?? '',
        content: params.get('utm_content') ?? '',
        referrer: document.referrer || '',
        landingPage: window.location.pathname,
        capturedAt: new Date().toISOString(),
      }

      // Only store if at least one UTM param is present (or referrer is set)
      const hasUtm = utm.source || utm.medium || utm.campaign
      const hasReferrer = utm.referrer && !utm.referrer.includes(window.location.hostname)
      if (hasUtm || hasReferrer) {
        sessionStorage.setItem('nm-utm', JSON.stringify(utm))
      }
    } catch { /* ignore — private browsing may block sessionStorage */ }
  }, [])
}

/** Read the stored UTM data synchronously (call only on client). */
export function getStoredUTM(): Record<string, string> | null {
  try {
    const raw = sessionStorage.getItem('nm-utm')
    return raw ? (JSON.parse(raw) as Record<string, string>) : null
  } catch {
    return null
  }
}
