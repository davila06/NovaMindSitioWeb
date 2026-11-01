'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

function sendMetric(metric: { name: string; value: number; id: string; rating: string }) {
  const roundedValue = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value)
  const body = JSON.stringify({
    source: 'web_vitals',
    message: `Web Vital: ${metric.name} = ${roundedValue} (${metric.rating})`,
    severity: 'info',
    context: {
      metric: metric.name,
      value: metric.value,
      unit: metric.name === 'CLS' ? 'ratio' : 'milliseconds',
      rating: metric.rating,
      id: metric.id,
      route: window.location.pathname,
    },
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/monitoring/error', new Blob([body], { type: 'application/json' }))
  } else {
    fetch('/api/monitoring/error', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => {})
  }
}

export function WebVitalsReporter() {
  useEffect(() => {
    onCLS((m) => sendMetric({ ...m, rating: m.rating ?? 'good' }))
    onFCP((m) => sendMetric({ ...m, rating: m.rating ?? 'good' }))
    onINP((m) => sendMetric({ ...m, rating: m.rating ?? 'good' }))
    onLCP((m) => sendMetric({ ...m, rating: m.rating ?? 'good' }))
    onTTFB((m) => sendMetric({ ...m, rating: m.rating ?? 'good' }))
  }, [])

  return null
}
