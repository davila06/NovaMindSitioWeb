'use client'

import { ReactNode, useEffect } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { BottomNav } from '@/components/layout/BottomNav'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { FloatingChat } from '@/components/layout/FloatingChat'
import { ExitIntent } from '@/components/layout/ExitIntent'
import { StickyCTABar } from '@/components/layout/StickyCTABar'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { BackToTop } from '@/components/layout/BackToTop'
import { SocialProofToast } from '@/components/layout/SocialProofToast'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { KeyboardShortcuts } from '@/components/layout/KeyboardShortcuts'
import { WebVitalsReporter } from '@/components/layout/WebVitalsReporter'
import { AnalyticsBootstrap } from '@/components/layout/AnalyticsBootstrap'
import { RoutePreloader } from '@/components/layout/RoutePreloader'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  // Service Worker registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch(() => { /* SW is progressive enhancement — ignore failures */ })
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <a
        href="#main-content"
        className="sr-only z-[9999] rounded-xl border border-brand-lavender/40 bg-brand-card px-5 py-2.5 text-sm font-semibold text-brand-lavender shadow-elevated backdrop-blur focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido principal
      </a>
      <CommandPalette />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <BottomNav />
      <FloatingChat />
      <ExitIntent />
      <StickyCTABar />
      <CustomCursor />
      <BackToTop />
      <SocialProofToast />
      <CookieConsent />
      <WhatsAppButton />
      <KeyboardShortcuts />
      <WebVitalsReporter />
      <AnalyticsBootstrap />
      <RoutePreloader />
    </>
  )
}
