import type { MetadataRoute } from "next";
import { getBlogPostSummaries } from "@/lib/content";
import { industries, roles } from "@/lib/market";
import { products } from "@/data/products";
import { novaAssistServices } from "@/data/nova-assist";
import { businessServices } from "@/data/nova-assist-business";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const blogPosts = await getBlogPostSummaries();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/servicios`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/casos`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/comparar`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/demos`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/sobre-nosotros`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/contacto`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${base}/nova-assist`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/nova-assist/servicios`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/nova-assist/comparar`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nova-assist/como-funciona`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/nova-assist/preguntas-frecuentes`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nova-assist/empresas`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/nova-assist/empresas/comparar`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${base}/empresas`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/productos/saas`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/productos/novaclick`,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}/blog`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/industrias`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/roles`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/productos/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const novaAssistPages: MetadataRoute.Sitemap = novaAssistServices.filter((service) => service.slug !== "it-ondemand").map((service) => ({
    url: `${base}/nova-assist/${service.slug}`,
    changeFrequency: "monthly",
    priority: service.slug === "plan-familia" || service.slug === "total-home" ? 0.85 : 0.75,
  }));
  const businessPages: MetadataRoute.Sitemap = businessServices.map((service) => ({
    url: `${base}/nova-assist/empresas/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${base}/industrias/${industry.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const rolePages: MetadataRoute.Sitemap = roles.map((role) => ({
    url: `${base}/roles/${role.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const entries = [
    ...staticPages,
    ...novaAssistPages,
    ...businessPages,
    ...productPages,
    ...blogPages,
    ...industryPages,
    ...rolePages,
  ];
  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );
}
