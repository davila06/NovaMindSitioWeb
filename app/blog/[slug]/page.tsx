import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import remarkGfm from 'remark-gfm'
import { getBlogPostBySlug, getBlogPostSummaries } from '@/lib/content'
import { createPageMetadata, siteConfig } from '@/lib/seo'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getBlogPostSummaries().then((posts) => posts.map((post) => ({ slug: post.slug })))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return createPageMetadata({
      title: 'Blog | Novamind Global',
      description: 'Insights sobre IA aplicada y SaaS empresarial.',
      path: '/blog',
    })
  }

  return createPageMetadata({
    title: `${post.title} | Novamind Global`,
    description: post.summary,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const postUrl = `${siteConfig.url}/blog/${post.slug}`
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${siteConfig.url}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  return (
    <SectionWrapper className="pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Container className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">{post.category}</p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.02em] text-transparent sm:text-5xl bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text">
          {post.title}
        </h1>
        <p className="mt-4 text-slate-300">{post.summary}</p>
        <p className="mt-3 text-sm text-slate-400">{post.date}</p>
        <article className="mt-10 space-y-6 rounded-2xl border border-brand-interactive/22 bg-slate-900/78 p-6 shadow-elevated sm:p-8">
          <div className="space-y-6 text-base leading-8 text-slate-200">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
              components={{
                h2: (props) => <h2 className="font-display text-2xl text-slate-100" {...props} />,
                h3: (props) => <h3 className="font-display text-xl text-slate-100" {...props} />,
                p: (props) => <p className="text-base leading-8 text-slate-200" {...props} />,
                ul: (props) => <ul className="list-disc space-y-2 pl-6 text-slate-200" {...props} />,
                ol: (props) => <ol className="list-decimal space-y-2 pl-6 text-slate-200" {...props} />,
                li: (props) => <li className="leading-8" {...props} />,
                strong: (props) => <strong className="font-semibold text-slate-50" {...props} />,
                a: (props) => <a className="text-brand-interactive underline-offset-4 hover:underline" {...props} />,
              }}
            />
          </div>
        </article>
      </Container>
    </SectionWrapper>
  )
}
