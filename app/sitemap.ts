import type { MetadataRoute } from "next";
import { getBlogPostSummaries } from "@/lib/content";
import { industries, roles } from "@/lib/market";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const siteUpdatedAt = new Date("2026-05-23");
  const blogPosts = await getBlogPostSummaries();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/sobre-nosotros`,
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/contacto`,
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/blog`,
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/industrias`,
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/roles`,
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/privacidad`,
      lastModified: siteUpdatedAt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/productos/${product.slug}`,
    lastModified: siteUpdatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${base}/industrias/${industry.slug}`,
    lastModified: siteUpdatedAt,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const rolePages: MetadataRoute.Sitemap = roles.map((role) => ({
    url: `${base}/roles/${role.slug}`,
    lastModified: siteUpdatedAt,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...blogPages,
    ...industryPages,
    ...rolePages,
  ];
}
