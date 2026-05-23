'use client'

import { useUTM } from '@/lib/useUTM'
import { useScrollDepth } from '@/lib/useScrollDepth'

/**
 * Client-side analytics bootstrap: UTM capture + scroll depth tracking.
 * Mounted once in AppShell so it runs on every page.
 */
export function AnalyticsBootstrap() {
  useUTM()
  useScrollDepth()
  return null
}
