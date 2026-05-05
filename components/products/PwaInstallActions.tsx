'use client'

import { useCallback, useEffect, useState } from 'react'
import { trackCtaClick } from '@/lib/analytics-client'

type DeferredInstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

type InstallPlatform = 'ios' | 'android' | 'desktop'

function detectPlatform(userAgent: string): InstallPlatform {
  const isIPhone = /iPhone|iPad|iPod/i.test(userAgent)
  const isAndroid = /Android/i.test(userAgent)

  if (isIPhone) return 'ios'
  if (isAndroid) return 'android'
  return 'desktop'
}

export function PwaInstallActions() {
  const [deferredPrompt, setDeferredPrompt] = useState<DeferredInstallPrompt | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showManualHint, setShowManualHint] = useState(false)
  const [platform, setPlatform] = useState<InstallPlatform>('desktop')

  useEffect(() => {
    setPlatform(detectPlatform(window.navigator.userAgent))

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    setIsInstalled(isStandalone)

    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault()
      setDeferredPrompt(event as DeferredInstallPrompt)
    }

    function onAppInstalled() {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  const triggerInstall = useCallback(async (promptEvent?: DeferredInstallPrompt) => {
    trackCtaClick({
      page: 'product/pawtrack',
      section: 'product_cta',
      ctaLabel: 'instalar_app',
      destination: 'pwa_install_prompt',
      product: 'pawtrack',
      intent: 'download',
    })

    const installPrompt = promptEvent ?? deferredPrompt

    if (!installPrompt) {
      setShowManualHint(true)
      return
    }

    await installPrompt.prompt()
    const result = await installPrompt.userChoice

    if (result.outcome === 'accepted') {
      setIsInstalled(true)
    }

    setDeferredPrompt(null)
  }, [deferredPrompt])

  useEffect(() => {
    if (!deferredPrompt || isInstalled) return

    const autoPromptKey = 'mi-mascotica-autoprompt-v1'
    if (sessionStorage.getItem(autoPromptKey)) return

    sessionStorage.setItem(autoPromptKey, '1')
    void triggerInstall(deferredPrompt)
  }, [deferredPrompt, isInstalled, triggerInstall])

  const primaryLabel = isInstalled
    ? 'App instalada'
    : platform === 'ios'
      ? 'Instalar en iPhone'
      : platform === 'android'
        ? 'Descargar app en Android'
        : 'Descargar app gratis'

  const manualHint =
    platform === 'ios'
      ? 'En iPhone, abre Compartir y elige "Agregar a pantalla de inicio" para instalar Mi Mascotica.'
      : platform === 'android'
        ? 'En Android, abre el menu del navegador y elige "Instalar aplicacion" o "Agregar a pantalla de inicio".'
        : 'En escritorio, usa el icono de instalacion del navegador o el menu y elige "Instalar aplicacion".'

  return (
    <>
      <button
        type="button"
        onClick={() => void triggerInstall()}
        className="inline-flex items-center justify-center rounded-2xl bg-brand-cta px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium"
      >
        {primaryLabel}
      </button>

      <button
        type="button"
        onClick={() => {
          trackCtaClick({
            page: 'product/pawtrack',
            section: 'product_cta',
            ctaLabel: 'abrir_version_web',
            destination: '/productos/pawtrack',
            product: 'pawtrack',
            intent: 'explore',
          })
          window.location.assign('/productos/pawtrack')
        }}
        className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
      >
        Abrir version web
      </button>

      {showManualHint && !isInstalled && (
        <p className="w-full text-xs text-slate-200">
          {manualHint}
        </p>
      )}
    </>
  )
}