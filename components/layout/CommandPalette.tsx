"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import { navLinks } from "@/data/site";
import { products } from "@/data/products";
import { useFocusTrap } from "@/lib/useFocusTrap";

const COMMANDS = [
  ...navLinks.map((l) => ({
    label: l.label,
    href: l.href,
    group: "Navegación",
  })),
  ...products.map((p) => ({
    label: p.name,
    href: `/productos/${p.slug}`,
    group: "Productos",
  })),
  { label: "Agendar demo", href: "/contacto", group: "Acciones" },
  { label: "Ver precios", href: "/#precios", group: "Acciones" },
  { label: "FAQ / Preguntas frecuentes", href: "/#faq", group: "Acciones" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useFocusTrap(panelRef, open, triggerRef);

  // Expose toggle for hint badge
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) triggerRef.current = document.activeElement as HTMLElement;
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  function navigate(href: string) {
    router.push(href);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-void/75 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Paleta de comandos"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-brand-lavender/25 bg-brand-surface/98 shadow-[0_24px_80px_rgba(249,115,22,0.22)] backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-brand-lavender/15 px-4 py-3.5">
          <Search
            className="h-4 w-4 shrink-0 text-text-muted"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar páginas, productos, acciones…"
            className="flex-1 bg-transparent text-sm text-[#f0f8ff] outline-none placeholder:text-text-muted"
            aria-label="Buscar"
          />
          <kbd className="hidden rounded border border-brand-lavender/20 px-1.5 py-0.5 text-[10px] text-text-subtle sm:block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-text-muted">
              Sin resultados para &ldquo;{query}&rdquo;
            </p>
          )}
          {["Navegación", "Productos", "Acciones"].map((group) => {
            const items = filtered.filter((c) => c.group === group);
            if (!items.length) return null;
            return (
              <div key={group} className="mb-2">
                <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-text-subtle">
                  {group}
                </p>
                {items.map((cmd) => (
                  <button
                    key={cmd.href + cmd.label}
                    onClick={() => navigate(cmd.href)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-[#f0f8ff] transition hover:bg-brand-elevated"
                  >
                    {cmd.label}
                    <ChevronRight className="h-3.5 w-3.5 text-text-muted" />
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 border-t border-brand-lavender/12 px-4 py-2 text-[10px] text-text-subtle">
          <span>
            <kbd className="mr-1 rounded border border-brand-lavender/20 px-1 py-0.5">
              ↵
            </kbd>
            navegar
          </span>
          <span>
            <kbd className="mr-1 rounded border border-brand-lavender/20 px-1 py-0.5">
              ↑↓
            </kbd>
            mover
          </span>
          <span>
            <kbd className="mr-1 rounded border border-brand-lavender/20 px-1 py-0.5">
              ESC
            </kbd>
            cerrar
          </span>
        </div>
      </div>
    </div>
  );
}
