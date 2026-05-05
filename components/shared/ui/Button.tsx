'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { CtaTrackingContext, trackCtaClick, trackEvent } from '@/lib/analytics-client'

type ButtonVariant = 'solid' | 'ghost'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: ButtonVariant
  className?: string
  trackingEvent?: string
  trackingLabel?: string
  trackingContext?: CtaTrackingContext
}

export function Button({ children, href, variant = 'solid', className = '', trackingEvent, trackingLabel, trackingContext }: ButtonProps) {
  const style =
    variant === 'solid'
      ? 'bg-gradient-energy text-white shadow-medium hover:brightness-105 hover:shadow-elevated'
      : 'bg-white/8 text-brand-interactive border border-brand-interactive/40 hover:bg-brand-interactive/12 hover:text-brand-surface'

  const classes = `inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${style} ${className}`

  function onTrackClick() {
    if (trackingContext) {
      trackCtaClick({
        ...trackingContext,
        destination: href || trackingContext.destination,
      })
      return
    }

    if (!trackingEvent) return
    trackEvent(trackingEvent, {
      label: trackingLabel || 'cta',
      destination: href || 'button',
      variant,
    })
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onTrackClick}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onTrackClick}>
      {children}
    </button>
  )
}
