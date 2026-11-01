"use client";

import { ReactNode, useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FloatingChat } from "@/components/layout/FloatingChat";
import { StickyCTABar } from "@/components/layout/StickyCTABar";
import { BackToTop } from "@/components/layout/BackToTop";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { KeyboardShortcuts } from "@/components/layout/KeyboardShortcuts";
import { WebVitalsReporter } from "@/components/layout/WebVitalsReporter";
import { AnalyticsBootstrap } from "@/components/layout/AnalyticsBootstrap";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  // Service Worker registration
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        /* SW is progressive enhancement — ignore failures */
      });
    }
  }, []);

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
      <StickyCTABar />
      <BackToTop />
      <WhatsAppButton />
      <KeyboardShortcuts />
      <WebVitalsReporter />
      <AnalyticsBootstrap />
    </>
  );
}
