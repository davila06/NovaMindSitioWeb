'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Grid3X3, BookOpen, Mail } from 'lucide-react'

const mobileNavItems = [
  { href: '/',         icon: Home,      label: 'Inicio' },
  { href: '/#productos', icon: Grid3X3,  label: 'Productos' },
  { href: '/blog',     icon: BookOpen,  label: 'Blog' },
  { href: '/contacto', icon: Mail,      label: 'Contacto' },
]

export function BottomNav() {
  const pathname = usePathname()

  function isActive(href: string) {
    const path = href.split('#')[0]
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path) && path !== ''
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-lavender/15 bg-brand-void/92 backdrop-blur-2xl md:hidden"
      aria-label="Navegación principal móvil"
    >
      <div className="flex justify-around px-2 py-2 pb-safe">
        {mobileNavItems.map(({ href, icon: Icon, label }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all ${
                active
                  ? 'text-brand-lavender'
                  : 'text-text-subtle hover:text-text-muted'
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[10px] font-medium">{label}</span>
              {active && (
                <span className="h-1 w-1 rounded-full bg-brand-lavender" aria-hidden="true" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
