import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card } from '@/components/shared/ui/Card'
import { getBlogPostSummaries } from '@/lib/content'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Blog | Novamind Global',
  description: 'Insights sobre IA aplicada, SaaS empresarial y transformación digital para organizaciones.',
  path: '/blog',
})

export default async function BlogPage() {
  const blogPosts = await getBlogPostSummaries()

  return (
    <SectionWrapper className="pt-12">
      <Container>
        <h1 className="font-display text-4xl tracking-[-0.02em] text-transparent sm:text-5xl bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text">
          Blog
        </h1>
        <p className="mt-3 text-slate-300">Contenido base para liderazgo en IA aplicada y SaaS enterprise.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="border-brand-interactive/25 bg-slate-900/72">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">{post.category}</p>
              <h2 className="mt-2 font-display text-xl leading-snug text-brand-surface">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{post.summary}</p>
              <p className="mt-4 text-xs text-slate-400">{post.date}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-block text-sm font-semibold text-brand-interactive hover:text-brand-energy transition-colors">
                Leer más →
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
