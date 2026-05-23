import Link from 'next/link'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Container } from '@/components/layout/Container'
import { getBlogPostSummaries } from '@/lib/content'

type RelatedBlogPostsProps = {
  currentSlug: string
  currentCategory: string
}

export async function RelatedBlogPosts({ currentSlug, currentCategory }: RelatedBlogPostsProps) {
  const all = await getBlogPostSummaries()
  const related = all
    .filter((p) => p.slug !== currentSlug && p.category === currentCategory)
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <SectionWrapper>
      <Container className="max-w-4xl">
        <div className="border-t border-brand-lavender/15 pt-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">También te puede interesar</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-brand-lavender/15 bg-brand-card/70 p-5 transition hover:-translate-y-1 hover:border-brand-lavender/30 hover:shadow-soft"
              >
                <span className="rounded-full bg-brand-gold/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-gold">
                  {post.category}
                </span>
                <h3 className="mt-3 font-display text-sm font-semibold leading-snug text-[#f0f8ff] group-hover:text-brand-lavender transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-text-muted line-clamp-2">{post.summary}</p>
                <p className="mt-3 text-xs text-text-subtle">{post.readingTime} lectura</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
