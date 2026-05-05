'use client'

import { navLinks } from '@/data/site'
import { Button } from '@/components/shared/ui/Button'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <header className={`sticky top-4 z-40 transition-all ${scrolled ? 'opacity-100' : 'opacity-95'}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border px-5 py-4 shadow-soft backdrop-blur-xl transition-all sm:px-7 ${scrolled ? 'border-brand-interactive/30 bg-slate-900/88' : 'border-white/15 bg-slate-900/72'}`}>
        <Link href="/" className="flex items-center gap-4" onClick={() => setMobileOpen(false)}>
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-brand-interactive/40 bg-slate-800 shadow-soft sm:h-14 sm:w-14">
            <Image src="/img/novamind-brand.webp" alt="NovaMind Global" fill className="object-cover object-center" sizes="(min-width: 640px) 56px, 48px" />
          </div>
          <div>
            <span className="block font-display text-[1.7rem] font-semibold leading-none tracking-[-0.03em] text-brand-surface sm:text-[1.95rem]">Novamind Global</span>
            <span className="mt-1 block text-[12px] uppercase tracking-[0.28em] text-brand-accent sm:text-[13px]">IA aplicada a negocios</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-brand-interactive/15 hover:text-brand-interactive">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            href="/contacto"
            trackingContext={{
              page: 'global',
              section: 'navbar',
              ctaLabel: 'solicitar_demo',
              destination: '/contacto',
              intent: 'demo',
            }}
          >
            Solicitar Demo
          </Button>
        </div>

        <button
          className="md:hidden"
          aria-label={mobileOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((current) => !current)}
        >
          {mobileOpen ? <X className="h-5 w-5 text-brand-surface" /> : <Menu className="h-5 w-5 text-brand-surface" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="px-4 md:hidden">
          <div id="mobile-navigation" className="mt-3 rounded-2xl border border-brand-interactive/25 bg-slate-900/95 p-4 shadow-medium backdrop-blur-xl">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-slate-100 transition hover:bg-brand-interactive/20"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button
              href="/contacto"
              className="mt-4 w-full"
              trackingContext={{
                page: 'global',
                section: 'mobile_nav',
                ctaLabel: 'solicitar_demo',
                destination: '/contacto',
                intent: 'demo',
              }}
            >
              Solicitar Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
