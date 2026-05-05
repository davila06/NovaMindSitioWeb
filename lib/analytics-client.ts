export function trackEvent(eventName: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }

  if (typeof window.clarity === 'function') {
    const tags = Object.entries(params)
      .map(([key, value]) => `${key}:${String(value)}`)
      .join('|')

    if (tags) {
      window.clarity('event', `${eventName}:${tags}`)
    } else {
      window.clarity('event', eventName)
    }
  }
}

export type CtaTrackingContext = {
  page: string
  section: string
  ctaLabel: string
  destination: string
  product?: string
  intent?: string
}

export function trackCtaClick(context: CtaTrackingContext) {
  trackEvent('cta_click', {
    page: context.page,
    section: context.section,
    cta_label: context.ctaLabel,
    destination: context.destination,
    product: context.product || 'na',
    intent: context.intent || 'na',
  })
}

export type FormProgressContext = {
  form: string
  step: string
  field?: string
  valueType?: string
  completionRate?: number
  valid?: boolean
}

export function trackFormProgress(context: FormProgressContext) {
  trackEvent('form_progress', {
    form: context.form,
    step: context.step,
    field: context.field || 'na',
    value_type: context.valueType || 'na',
    completion_rate: context.completionRate ?? 0,
    valid: context.valid ?? false,
  })
}
