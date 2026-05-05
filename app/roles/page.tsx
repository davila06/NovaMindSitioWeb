import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { roles } from '@/lib/market'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Roles | Novamind Global',
  description: 'Soluciones IA por rol de liderazgo para maximizar impacto operativo y de negocio.',
  path: '/roles',
})

export default function RolesPage() {
  return (
    <SectionWrapper className="pt-12">
      <Container>
        <h1 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-4xl text-transparent">Soluciones por rol</h1>
        <p className="mt-3 text-slate-300">Recomendaciones enfocadas en prioridades de CEOs, COOs y líderes operativos.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {roles.map((role) => (
            <Link key={role.slug} href={`/roles/${role.slug}`} className="rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-interactive/36 hover:shadow-medium">
              <h2 className="font-display text-2xl text-slate-100">{role.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{role.subtitle}</p>
            </Link>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
