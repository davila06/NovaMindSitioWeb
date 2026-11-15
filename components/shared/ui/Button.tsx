'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { CtaTrackingContext, trackCtaClick, trackEvent } from '@/lib/analytics-client'

type ButtonVariant = 'solid' | 'ghost' | 'enterprise'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: ButtonVariant
  className?: string
  isLoading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  trackingEvent?: string
  trackingLabel?: string
  trackingContext?: CtaTrackingContext
  onClick?: () => void
}

export function Button({ children, href, variant = 'solid', className = '', isLoading = false, disabled = false, type = 'button', trackingEvent, trackingLabel, trackingContext, onClick }: ButtonProps) {
  const style =
    variant === 'solid'
      ? 'relative bg-brand-violet text-white font-semibold btn-violet-halo before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none hover:bg-brand-iris active:scale-[0.97]'
      : variant === 'ghost'
        ? 'border border-brand-lavender/40 text-brand-lavender bg-transparent hover:bg-brand-lavender/8 hover:border-brand-lavender/70'
        : 'border border-brand-violet bg-brand-violet text-white shadow-[0_8px_24px_rgba(11,99,246,0.24)] hover:border-brand-iris hover:bg-brand-iris'

  const isDisabled = disabled || isLoading
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 overflow-hidden ${isDisabled ? 'opacity-60 pointer-events-none' : ''} ${style} ${className}`

  function onTrackClick() {
    if (isDisabled) return
    onClick?.()
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
    if (isDisabled) return <a role="link" tabIndex={-1} aria-disabled="true" className={classes}>{children}</a>
    return (
      <Link href={href} className={classes} onClick={onTrackClick} aria-disabled={isDisabled || undefined}>
        {isLoading && <SpinnerIcon />}
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onTrackClick} disabled={isDisabled} type={type} aria-busy={isLoading ? 'true' : undefined}>
      {isLoading && <SpinnerIcon />}
      {children}
    </button>
  )
}

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
