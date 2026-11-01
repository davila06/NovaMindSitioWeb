import blogIndex from "@/data/blog-index.json";
import type { z } from "zod";
import { blogFrontmatterSchema } from "@/lib/content-schema";

export type BlogPostSummary = z.infer<typeof blogFrontmatterSchema> & {
  slug: string;
};

export type BlogPostDocument = BlogPostSummary & {
  content: string;
};

const documents: BlogPostDocument[] = blogIndex.map((post) => ({
  slug: post.slug,
  ...blogFrontmatterSchema.parse(post),
  content: post.content,
}));

export async function getBlogPostSummaries() {
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
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPostBySlug(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return documents.find((post) => post.slug === slug) || null;
}

/** Returns the raw word count of a content string */
export function getWordCount(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

/** Returns a human-readable reading time string, e.g. "4 min" */
export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}
