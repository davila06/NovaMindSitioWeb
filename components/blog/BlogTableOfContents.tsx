'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type TocItem = {
  id: string
  text: string
  level: number
}

function buildToc(): TocItem[] {
  const article = document.querySelector('article')
  if (!article) return []
  return Array.from(article.querySelectorAll('h2, h3')).map((el) => ({
    id: el.id || '',
    text: el.textContent ?? '',
    level: el.tagName === 'H2' ? 2 : 3,
  })).filter((item) => item.id)
}

export function BlogTableOfContents() {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    setItems(buildToc())
  }, [])

  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <nav aria-label="Tabla de contenidos" className="hidden lg:block">
      <div className="sticky top-24 w-56 rounded-2xl border border-brand-lavender/15 bg-brand-card/70 p-5 backdrop-blur">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Contenidos</p>
        <ol className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'block text-xs leading-5 transition-colors hover:text-brand-lavender',
                  item.level === 3 && 'pl-3',
                  activeId === item.id ? 'font-semibold text-brand-lavender' : 'text-text-muted',
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
