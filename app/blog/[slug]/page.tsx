import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import remarkGfm from 'remark-gfm'
import { getBlogPostBySlug, getBlogPostSummaries, getReadingTime, getWordCount } from '@/lib/content'
import { createPageMetadata, siteConfig } from '@/lib/seo'
import { BlogProgressBar } from '@/components/blog/BlogProgressBar'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { BlogAuthorBio } from '@/components/blog/BlogAuthorBio'
import { BlogTableOfContents } from '@/components/blog/BlogTableOfContents'
import { RelatedBlogPosts } from '@/components/blog/RelatedBlogPosts'
import { CopyCodeBlock } from '@/components/blog/CopyCodeBlock'
import Link from 'next/link'

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
  const readingTime = getReadingTime(post.content)
  const wordCount = getWordCount(post.content)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    url: postUrl,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'es-CR',
    wordCount,
    articleSection: post.category,
    keywords: post.tags?.join(', ') ?? '',
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/blog/${post.slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Organization',
      name: 'Novamind Global',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Novamind Global',
      url: siteConfig.url,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo-novamind.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.article-summary'],
    },
  }

  return (
    <SectionWrapper className="pt-12">
      <BlogProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Container className="max-w-5xl">
        {/* Layout: ToC aside + main content */}
        <div className="flex gap-10">
          <div className="min-w-0 flex-1">
            {/* Breadcrumb */}
            <Link href="/blog" className="text-xs text-text-muted hover:text-brand-lavender transition">
              ← Blog
            </Link>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                {post.category}
              </span>
              <span className="text-xs text-text-muted">{post.date}</span>
              <span className="rounded-full bg-brand-lavender/10 px-2.5 py-0.5 text-xs text-brand-lavender">
                {readingTime} lectura
              </span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-brand-lavender/15 bg-brand-elevated/50 px-2 py-0.5 text-xs text-text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Headline */}
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.06] tracking-[-0.02em] text-[#f0f8ff] sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-7 text-text-muted">{post.summary}</p>

            {/* Share row */}
            <div className="mt-5 flex items-center justify-between border-b border-brand-lavender/12 pb-5">
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* Article body */}
            <article className="mt-8 space-y-6 rounded-2xl border border-brand-lavender/18 bg-brand-card/80 p-6 shadow-soft sm:p-8">
              <div className="space-y-5 text-base leading-8 text-text-muted">
                <MDXRemote
                  source={post.content}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                  components={{
                    h2: (props) => <h2 className="font-display text-2xl font-bold text-[#f0f8ff]" {...props} />,
                    h3: (props) => <h3 className="font-display text-xl font-semibold text-[#f0f8ff]" {...props} />,
                    p: (props) => <p className="text-base leading-8 text-text-muted" {...props} />,
                    ul: (props) => <ul className="list-disc space-y-2 pl-6 text-text-muted" {...props} />,
                    ol: (props) => <ol className="list-decimal space-y-2 pl-6 text-text-muted" {...props} />,
                    li: (props) => <li className="leading-7" {...props} />,
                    strong: (props) => <strong className="font-semibold text-[#f0f8ff]" {...props} />,
                    a: (props) => <a className="text-brand-lavender underline-offset-4 hover:underline" {...props} />,
                    pre: (props) => <CopyCodeBlock {...props} />,
                    code: (props) => <code className="rounded bg-brand-elevated px-1.5 py-0.5 font-mono text-sm text-brand-lavender" {...props} />,
                  }}
                />
              </div>
            </article>

            {/* Share bottom */}
            <div className="mt-6 flex items-center justify-between border-t border-brand-lavender/12 pt-5">
              <ShareButtons title={post.title} url={postUrl} />
              <Link href="/blog" className="text-xs text-text-muted hover:text-brand-lavender transition">
                ← Más artículos
              </Link>
            </div>

            {/* Author bio */}
            <BlogAuthorBio postUrl={postUrl} />
          </div>

          {/* Sidebar: Table of Contents */}
          <BlogTableOfContents />
        </div>
      </Container>
      <RelatedBlogPosts currentSlug={post.slug} currentCategory={post.category} />
    </SectionWrapper>
  )
}
