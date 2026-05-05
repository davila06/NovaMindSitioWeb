import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { industries } from '@/lib/market'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Industrias | Novamind Global',
  description: 'Soluciones de IA y SaaS por industria para acelerar operaciones críticas.',
  path: '/industrias',
})

export default function IndustriesPage() {
  return (
    <SectionWrapper className="pt-12">
      <Container>
        <h1 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-4xl text-transparent">Industrias</h1>
        <p className="mt-3 text-slate-300">Rutas específicas para sectores con procesos complejos y necesidad de trazabilidad.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {industries.map((industry) => (
            <Link key={industry.slug} href={`/industrias/${industry.slug}`} className="rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-interactive/36 hover:shadow-medium">
              <h2 className="font-display text-2xl text-slate-100">{industry.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{industry.subtitle}</p>
            </Link>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
