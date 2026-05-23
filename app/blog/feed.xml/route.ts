import { NextResponse } from 'next/server'
import { getBlogPostSummaries } from '@/lib/content'

const SITE_URL = 'https://novamindglobal.com'
const SITE_NAME = 'Novamind Global'
const SITE_DESCRIPTION = 'Insights sobre IA aplicada, SaaS empresarial y transformación digital para organizaciones en LATAM.'
const AUTHOR_EMAIL = 'contacto@novamindglobal.com'

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = await getBlogPostSummaries()

  const items = posts
    .slice(0, 20)
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.summary)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <dc:creator>${SITE_NAME}</dc:creator>
    </item>`
    })
    .join('\n')

  const lastBuildDate = posts.length > 0
    ? new Date(posts[0]!.date).toUTCString()
    : new Date().toUTCString()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>es-cr</language>
    <managingEditor>${AUTHOR_EMAIL} (${SITE_NAME})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${SITE_NAME})</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>1440</ttl>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo-novamind.svg</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}/blog</link>
    </image>
${items}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
