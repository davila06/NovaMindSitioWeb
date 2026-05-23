"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics-client";

type Post = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readingTime: string;
};

type BlogSearchProps = {
  posts: Post[];
};

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const trackDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return posts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query, posts]);

  function handleOpen() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
    setQuery("");
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    // Debounced analytics: fire after 600ms of no typing
    if (trackDebounceRef.current) clearTimeout(trackDebounceRef.current);
    if (value.trim().length >= 3) {
      trackDebounceRef.current = setTimeout(() => {
        trackEvent("blog_search", {
          query: value.trim(),
          results_count: results.length,
        });
      }, 600);
    }
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        aria-label="Buscar artículos"
        className="flex items-center gap-2 rounded-xl border border-brand-lavender/20 bg-brand-card/60 px-3 py-2 text-sm text-text-muted transition hover:border-brand-lavender/40 hover:text-[#f0f8ff]"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Buscar artículos…</span>
        <kbd className="hidden rounded border border-brand-lavender/15 px-1.5 py-0.5 font-mono text-[10px] sm:block">
          /
        </kbd>
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Buscar artículos del blog"
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24"
        >
          <div
            className="absolute inset-0 bg-brand-void/80 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-xl rounded-2xl border border-brand-lavender/20 bg-brand-card/98 shadow-elevated backdrop-blur-xl">
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-brand-lavender/15 px-4 py-3.5">
              <Search
                className="h-4 w-4 shrink-0 text-text-muted"
                aria-hidden="true"
              />
              <input
                autoFocus
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Busca por título, categoría o tema…"
                className="flex-1 bg-transparent text-sm text-[#f0f8ff] outline-none placeholder:text-text-muted"
                aria-label="Término de búsqueda"
                aria-controls="blog-search-results"
              />
              <button
                onClick={handleClose}
                aria-label="Cerrar búsqueda"
                className="text-text-muted hover:text-[#f0f8ff]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div
              id="blog-search-results"
              role="listbox"
              aria-label="Resultados"
              className="max-h-80 overflow-y-auto p-2"
            >
              {query.trim() === "" && (
                <p className="py-8 text-center text-sm text-text-subtle">
                  Escribe para buscar artículos…
                </p>
              )}
              {query.trim() !== "" && results.length === 0 && (
                <p
                  role="status"
                  aria-live="polite"
                  className="py-8 text-center text-sm text-text-muted"
                >
                  Sin resultados para &ldquo;{query}&rdquo;
                </p>
              )}
              {results.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  role="option"
                  aria-selected="false"
                  onClick={handleClose}
                  className="block rounded-xl px-3 py-3 transition hover:bg-brand-elevated"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-text-subtle">
                      {post.readingTime}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-semibold text-[#f0f8ff]">
                    {post.title}
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted line-clamp-1">
                    {post.summary}
                  </p>
                </Link>
              ))}
            </div>

            <div className="border-t border-brand-lavender/10 px-4 py-2.5">
              <p className="text-[10px] text-text-subtle">
                <kbd className="rounded border border-brand-lavender/15 px-1 font-mono text-[9px]">
                  ↑↓
                </kbd>{" "}
                navegar ·{" "}
                <kbd className="rounded border border-brand-lavender/15 px-1 font-mono text-[9px]">
                  Enter
                </kbd>{" "}
                abrir ·{" "}
                <kbd className="rounded border border-brand-lavender/15 px-1 font-mono text-[9px]">
                  Esc
                </kbd>{" "}
                cerrar
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
