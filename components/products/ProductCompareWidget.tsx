'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RefreshCw } from 'lucide-react'
import { commercialEvidenceEnabled } from '@/data/site'

type ProductSummary = {
  slug: string
  name: string
  shortDescription: string
  features: string[]
  benefits: string[]
  audiences: string[]
  integrations: string[]
  differentiators: string[]
  heroStats: { label: string; value: string }[]
}

type Props = {
  products: ProductSummary[]
}

// Categories of attributes to compare
const SECTIONS = [
  {
    label: 'Beneficios clave',
    key: 'benefits' as const,
  },
  {
    label: 'Funcionalidades',
    key: 'features' as const,
  },
  {
    label: 'Integraciones',
    key: 'integrations' as const,
  },
  {
    label: 'Diferenciadores',
    key: 'differentiators' as const,
  },
  {
    label: 'Audiencia',
    key: 'audiences' as const,
  },
]

function TagList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Lista">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${color}`}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-brand-lavender/15 bg-brand-void/50 px-3 py-2 text-center">
      <p className="font-display text-lg font-bold text-brand-lavender">{value}</p>
      <p className="text-[10px] text-text-subtle">{label}</p>
    </div>
  )
}

const TAG_COLORS = [
  'bg-brand-violet/15 text-brand-lavender',
  'bg-brand-gold/10 text-brand-gold',
]

export function ProductCompareWidget({ products }: Props) {
  const [leftSlug, setLeftSlug] = useState(products[0]?.slug ?? '')
  const [rightSlug, setRightSlug] = useState(products[1]?.slug ?? '')

  const left = products.find((p) => p.slug === leftSlug)
  const right = products.find((p) => p.slug === rightSlug)

  function swap() {
    setLeftSlug(rightSlug)
    setRightSlug(leftSlug)
  }

  const otherThanLeft = products.filter((p) => p.slug !== leftSlug)
  const otherThanRight = products.filter((p) => p.slug !== rightSlug)
  const visibleSections = commercialEvidenceEnabled
    ? SECTIONS
    : SECTIONS.filter((section) => section.key !== 'benefits')

  return (
    <div className="rounded-3xl border border-brand-lavender/18 bg-brand-card/60 p-6 backdrop-blur-sm sm:p-8">
      {/* Selectors */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
        {/* Left selector */}
        <div>
          <label htmlFor="compare-left" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
            Producto A
          </label>
          <select
            id="compare-left"
            value={leftSlug}
            onChange={(e) => setLeftSlug(e.target.value)}
            className="w-full rounded-xl border border-brand-lavender/20 bg-brand-void/60 px-3 py-2.5 text-sm font-semibold text-[#f0f8ff] outline-none transition focus:border-brand-violet"
          >
            {otherThanRight.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Swap button */}
        <button
          onClick={swap}
          aria-label="Intercambiar productos"
          title="Intercambiar"
          className="mt-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-lavender/20 text-text-muted transition hover:border-brand-lavender/50 hover:text-brand-lavender"
        >
          <RefreshCw className="h-4 w-4" />
        </button>

        {/* Right selector */}
        <div>
          <label htmlFor="compare-right" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
            Producto B
          </label>
          <select
            id="compare-right"
            value={rightSlug}
            onChange={(e) => setRightSlug(e.target.value)}
            className="w-full rounded-xl border border-brand-lavender/20 bg-brand-void/60 px-3 py-2.5 text-sm font-semibold text-[#f0f8ff] outline-none transition focus:border-brand-violet"
          >
            {otherThanLeft.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {left && right && (
        <>
          {/* Product headers */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[left, right].map((product, i) => (
              <div key={product.slug} className={`rounded-2xl border p-4 ${i === 0 ? 'border-brand-violet/40 bg-brand-violet/5' : 'border-brand-gold/25 bg-brand-gold/5'}`}>
                <p className={`text-xs font-bold uppercase tracking-[0.18em] ${i === 0 ? 'text-brand-lavender' : 'text-brand-gold'}`}>
                  Producto {i === 0 ? 'A' : 'B'}
                </p>
                <p className="mt-1 font-display text-base font-bold text-[#f0f8ff] sm:text-lg">{product.name}</p>
                <p className="mt-1 text-xs text-text-muted line-clamp-2">{product.shortDescription}</p>
                {commercialEvidenceEnabled && product.heroStats.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {product.heroStats.slice(0, 3).map((s) => (
                      <StatBadge key={s.label} label={s.label} value={s.value} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Section rows */}
          <div className="mt-6 space-y-6">
            {visibleSections.map((section) => (
              <div key={section.key}>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">{section.label}</p>
                <div className="grid grid-cols-2 gap-4">
                  {[left, right].map((product, i) => (
                    <TagList
                      key={product.slug}
                      items={product[section.key]}
                      color={TAG_COLORS[i]}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[left, right].map((product, i) => (
              <Link
                key={product.slug}
                href={`/productos/${product.slug}`}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition ${i === 0 ? 'bg-brand-violet text-white hover:bg-brand-iris' : 'border border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10'}`}
              >
                Ver {product.name}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
