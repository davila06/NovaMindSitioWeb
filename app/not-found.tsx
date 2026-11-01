import Link from "next/link";
import {
  Home,
  LayoutGrid,
  Mail,
  BookOpen,
  Building2,
  Users,
} from "lucide-react";
import { getBlogPostSummaries } from "@/lib/content";
import { products } from "@/data/products";
import { headers } from "next/headers";
import { siteConfig } from "@/lib/seo";

const SITE_URL = siteConfig.url;

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Página no encontrada | Novamind Global",
  description: "La ruta solicitada no existe en novamindglobalcr.com.",
  url: `${SITE_URL}/404`,
  inLanguage: "es-CR",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${SITE_URL}/`,
      },
      { "@type": "ListItem", position: 2, name: "No encontrado" },
    ],
  },
};

const quickLinks = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: LayoutGrid, label: "Productos", href: "/#productos" },
  { icon: BookOpen, label: "Blog", href: "/blog" },
  { icon: Building2, label: "Industrias", href: "/industrias" },
  { icon: Users, label: "Roles", href: "/roles" },
  { icon: Mail, label: "Contacto", href: "/contacto" },
];

/** Simple token overlap scorer — returns how many words in `query` appear in `text` */
function scoreMatch(query: string, text: string): number {
  const words = query
    .toLowerCase()
    .split(/[-\s]+|[/]/)
    .filter((w) => w.length > 2);
  const hay = text.toLowerCase();
  return words.reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
}

export default async function NotFound() {
  const headersList = await headers();
  const referer = headersList.get("referer") ?? "";
  const xUrl = headersList.get("x-url") ?? "";
  // Derive the attempted path from referer or x-url header
  const attemptedPath = (() => {
    try {
      const url = xUrl || referer;
      if (!url) return "";
      const u = new URL(url);
      return u.pathname;
    } catch {
      return "";
    }
  })();

  // Collect candidates — blog posts + products
  const blogPosts = await getBlogPostSummaries();

  type Suggestion = { label: string; href: string; meta: string };
  const candidates: Array<{ score: number; item: Suggestion }> = [];

  for (const post of blogPosts) {
    const score = scoreMatch(
      attemptedPath,
      `${post.slug} ${post.title} ${post.category}`,
    );
    if (score > 0)
      candidates.push({
        score,
        item: {
          label: post.title,
          href: `/blog/${post.slug}`,
          meta: post.category,
        },
      });
  }
  for (const product of products) {
    const score = scoreMatch(
      attemptedPath,
      `${product.slug} ${product.name} ${product.shortDescription ?? ""}`,
    );
    if (score > 0)
      candidates.push({
        score,
        item: {
          label: product.name,
          href: `/productos/${product.slug}`,
          meta: "Producto",
        },
      });
  }

  const suggestions = candidates
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((c) => c.item);

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* Halo decorativo */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/12 blur-[80px]"
      />

      {/* Número gigante decorativo */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none font-display text-[10rem] font-bold leading-none text-brand-lavender opacity-[0.06] sm:text-[14rem]"
      >
        404
      </p>

      <div className="relative -mt-10 max-w-lg">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">
          Página no encontrada
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-[#f0f8ff] sm:text-5xl">
          Parece que esto no existe
        </h1>
        <p className="mt-4 text-text-muted">
          La ruta que buscas fue movida, eliminada o nunca existió. Pero el
          universo Novamind sigue operando.
        </p>

        {/* Smart suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-7 rounded-2xl border border-brand-lavender/15 bg-brand-card/70 p-5 text-left">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-text-subtle">
              ¿Buscabas esto?
            </p>
            <ul className="space-y-2">
              {suggestions.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2 hover:border-brand-lavender/25 hover:bg-brand-elevated/60 transition"
                  >
                    <span className="text-sm font-medium text-[#f0f8ff]">
                      {s.label}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold">
                      {s.meta}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {quickLinks.map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-2 rounded-xl border border-brand-lavender/25 bg-brand-card/80 px-4 py-2.5 text-sm font-medium text-text-muted transition hover:border-brand-lavender/50 hover:text-[#f0f8ff]"
              >
                <Icon className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
