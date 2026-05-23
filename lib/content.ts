import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { z } from 'zod'
import { blogFrontmatterSchema } from '@/lib/content-schema'

export type BlogPostSummary = z.infer<typeof blogFrontmatterSchema> & {
  slug: string
}

export type BlogPostDocument = BlogPostSummary & {
  content: string
}

const blogDirectory = path.join(process.cwd(), 'content', 'blog')

async function readBlogFile(fileName: string) {
  const filePath = path.join(blogDirectory, fileName)
  const source = await fs.readFile(filePath, 'utf8')
  const { data, content } = matter(source)
  const frontmatter = blogFrontmatterSchema.parse(data)
  const slug = fileName.replace(/\.mdx$/, '')

  return {
    slug,
    ...frontmatter,
    content: content.trim(),
  }
}

export async function getBlogPostSummaries() {
  const files = await fs.readdir(blogDirectory)
  const documents = await Promise.all(
    files.filter((file) => file.endsWith('.mdx')).map((file) => readBlogFile(file)),
  )

  return documents
    .map((document) => ({
      slug: document.slug,
      title: document.title,
      summary: document.summary,
      category: document.category,
      date: document.date,
      tags: document.tags,
      readingTime: getReadingTime(document.content),
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export async function getBlogPostBySlug(slug: string) {
  const fileName = `${slug}.mdx`
  const filePath = path.join(blogDirectory, fileName)

  try {
    await fs.access(filePath)
  } catch {
    return null
  }

  return readBlogFile(fileName)
}

/** Returns the raw word count of a content string */
export function getWordCount(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length
}

/** Returns a human-readable reading time string, e.g. "4 min" */
export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min`
}
