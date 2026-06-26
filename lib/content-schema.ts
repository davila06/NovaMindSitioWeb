import { z } from "zod";
import type { Product } from "@/lib/types";

type MarketPageShape = {
  slug: string;
  title: string;
  subtitle: string;
  problemPoints: string[];
  valuePoints: string[];
  recommendedProducts: Array<{ name: string; href: string }>;
};

export const blogFrontmatterSchema = z.object({
  title: z.string().min(10).max(160),
  summary: z.string().min(20).max(220),
  category: z.string().min(2).max(80),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string().min(1).max(40)).optional(),
  author: z.string().max(80).optional(),
  readTime: z.number().int().positive().optional(),
});

const productSchema: z.ZodType<Product> = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  shortDescription: z.string().min(10),
  heroTitle: z.string().min(10),
  heroSubtitle: z.string().min(10),
  heroStats: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .optional()
    .default([]),
  screenshotUrl: z.string().optional(),
  demoVideoId: z.string().optional(),
  problem: z.array(z.string().min(1)).min(1),
  solution: z.array(z.string().min(1)).min(1),
  benefits: z.array(z.string().min(1)).min(1),
  features: z.array(z.string().min(1)).min(1),
  audiences: z.array(z.string().min(1)).min(1),
  integrations: z.array(z.string().min(1)).min(1),
  differentiators: z.array(z.string().min(1)).min(1),
  showcase: z
    .array(
      z.object({
        title: z.string().min(1),
        detail: z.string().min(1),
        accent: z.string().min(1),
      }),
    )
    .min(1),
  faq: z
    .array(z.object({ question: z.string().min(1), answer: z.string().min(1) }))
    .min(1),
});

const marketPageSchema: z.ZodType<MarketPageShape> = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  subtitle: z.string().min(10),
  problemPoints: z.array(z.string().min(1)).min(1),
  valuePoints: z.array(z.string().min(1)).min(1),
  recommendedProducts: z
    .array(
      z.object({ name: z.string().min(1), href: z.string().startsWith("/") }),
    )
    .min(1),
});

export function validateProductsContent(products: Product[]) {
  return z.array(productSchema).parse(products);
}

export function validateMarketPagesContent(marketPages: MarketPageShape[]) {
  return z.array(marketPageSchema).parse(marketPages);
}
