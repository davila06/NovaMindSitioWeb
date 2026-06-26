import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { getBlogPostSummaries } from "@/lib/content";
import { createPageMetadata, siteConfig } from "@/lib/seo";
import { BlogSearch } from "@/components/blog/BlogSearch";

export const metadata: Metadata = createPageMetadata({
  title: "Blog | Novamind Global",
  description:
    "Insights sobre IA aplicada, SaaS empresarial y transformación digital para organizaciones.",
  path: "/blog",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; page?: string }>;
}) {
  const { categoria, page: pageParam } = await searchParams;
  const allPosts = await getBlogPostSummaries();

  const POSTS_PER_PAGE = 10;

  // Derive unique categories
  const categories = Array.from(
    new Set(allPosts.map((p) => p.category)),
  ).sort();

  // Filter posts
  const filteredPosts = categoria
    ? allPosts.filter(
        (p) => p.category.toLowerCase() === categoria.toLowerCase(),
      )
    : allPosts;

  // Pagination
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * POSTS_PER_PAGE;
  const pagePosts = filteredPosts.slice(pageStart, pageStart + POSTS_PER_PAGE);

  const [featured, ...rest] = pagePosts;

  function buildHref(p: number) {
    const params = new URLSearchParams();
    if (categoria) params.set("categoria", categoria);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  }

  return (
    <SectionWrapper className="pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${siteConfig.url}/blog`,
            name: "Blog Novamind Global",
            description:
              "Insights sobre IA aplicada, SaaS empresarial y transformación digital para organizaciones.",
            url: `${siteConfig.url}/blog`,
            inLanguage: "es-CR",
            publisher: {
              "@type": "Organization",
              "@id": `${siteConfig.url}/#organization`,
              name: siteConfig.name,
            },
            blogPost: allPosts.slice(0, 10).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.summary,
              url: `${siteConfig.url}/blog/${post.slug}`,
              datePublished: post.date,
              articleSection: post.category,
              inLanguage: "es-CR",
              keywords: post.tags?.join(", ") ?? "",
              image: {
                "@type": "ImageObject",
                url: `${siteConfig.url}/blog/${post.slug}/opengraph-image`,
                width: 1200,
                height: 630,
              },
              author: {
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
              },
            })),
            numberOfItems: allPosts.length,
            keywords: Array.from(new Set(allPosts.flatMap((p) => p.tags ?? [])))
              .slice(0, 20)
              .join(", "),
          }),
        }}
      />
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">
            Publicaciones
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-[#f0f8ff] sm:text-5xl">
            Blog
          </h1>
          <p className="mt-3 text-text-muted">
            Insights sobre IA aplicada, SaaS empresarial y transformación
            digital.
          </p>
        </div>

        {/* Category filters + Search */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Link
            href="/blog"
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${!categoria ? "bg-brand-violet text-white" : "border border-brand-lavender/20 text-text-muted hover:border-brand-lavender/40 hover:text-[#f0f8ff]"}`}
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?categoria=${encodeURIComponent(cat)}`}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${categoria?.toLowerCase() === cat.toLowerCase() ? "bg-brand-violet text-white" : "border border-brand-lavender/20 text-text-muted hover:border-brand-lavender/40 hover:text-[#f0f8ff]"}`}
            >
              {cat}
            </Link>
          ))}
          <div className="ml-auto">
            <BlogSearch posts={allPosts} />
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <p className="mt-12 text-text-muted">
            No hay artículos en esta categoría aún.
          </p>
        )}

        {/* Card featured */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-10 block [perspective:800px]"
          >
            <div className="relative rounded-2xl border border-brand-violet/30 bg-brand-card/80 p-8 transition-all duration-300 hover:border-brand-lavender/50 hover:shadow-violet hover:[transform:translateY(-4px)_translateZ(12px)] [transform-style:preserve-3d]">
              {/* Depth layer — pushed behind */}
              <div
                className="pointer-events-none absolute inset-1 rounded-2xl bg-brand-violet/8 blur-sm [transform:translateZ(-8px)]"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
                  {featured.category}
                  {!categoria ? " · Destacado" : ""}
                </p>
                <span className="rounded-full bg-brand-lavender/10 px-2 py-0.5 text-[10px] text-brand-lavender">
                  {featured.readingTime} lectura
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-[#f0f8ff] transition-colors group-hover:text-brand-lavender sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-text-muted">
                {featured.summary}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs text-text-subtle">
                  {featured.date}
                </span>
                <span className="text-sm font-semibold text-brand-lavender">
                  Leer artículo →
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Grid secundario */}
        {rest.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 [perspective:1400px]">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div className="relative h-full rounded-2xl border border-brand-lavender/15 bg-brand-card/80 p-6 transition-all duration-300 hover:border-brand-lavender/40 hover:[transform:translateY(-6px)_translateZ(14px)_rotateX(-1deg)] hover:shadow-violet [transform-style:preserve-3d]">
                  {/* Depth layer 1 — mid */}
                  <div
                    className="pointer-events-none absolute inset-1.5 rounded-xl bg-brand-lavender/5 [transform:translateZ(-6px)]"
                    aria-hidden="true"
                  />
                  {/* Depth layer 2 — back */}
                  <div
                    className="pointer-events-none absolute inset-2.5 rounded-xl bg-brand-lavender/3 [transform:translateZ(-14px)]"
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                      {post.category}
                    </p>
                    <span className="rounded-full bg-brand-lavender/10 px-2 py-0.5 text-[10px] text-brand-lavender">
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-[#f0f8ff] transition-colors group-hover:text-brand-lavender">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-text-muted line-clamp-3">
                    {post.summary}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-brand-lavender/12 bg-brand-elevated/50 px-1.5 py-0.5 text-[10px] text-text-subtle"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-4 text-xs text-text-subtle">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Paginación del blog"
            className="mt-10 flex items-center justify-center gap-2"
          >
            {safePage > 1 && (
              <Link
                href={buildHref(safePage - 1)}
                className="flex h-9 items-center gap-1 rounded-lg border border-brand-lavender/20 px-3 text-sm text-text-muted hover:border-brand-lavender/40 hover:text-[#f0f8ff] transition"
              >
                ← Anterior
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={buildHref(p)}
                aria-current={p === safePage ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition ${p === safePage ? "border-brand-violet bg-brand-violet/20 text-brand-lavender" : "border-brand-lavender/15 text-text-muted hover:border-brand-lavender/35 hover:text-[#f0f8ff]"}`}
              >
                {p}
              </Link>
            ))}

            {safePage < totalPages && (
              <Link
                href={buildHref(safePage + 1)}
                className="flex h-9 items-center gap-1 rounded-lg border border-brand-lavender/20 px-3 text-sm text-text-muted hover:border-brand-lavender/40 hover:text-[#f0f8ff] transition"
              >
                Siguiente →
              </Link>
            )}
          </nav>
        )}

        {totalPages > 1 && (
          <p className="mt-3 text-center text-xs text-text-subtle">
            Página {safePage} de {totalPages} · {filteredPosts.length} artículos
          </p>
        )}
      </Container>
    </SectionWrapper>
  );
}
