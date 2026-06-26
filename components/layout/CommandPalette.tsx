"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
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
  const [focusedIndex, setFocusedIndex] = useState(0);
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
      setFocusedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  // Reset focused index when filtered list changes
  useEffect(() => {
    setFocusedIndex(0);
  }, [query]);

  function navigate(href: string) {
    router.push(href);
    setOpen(false);
  }

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[focusedIndex]) navigate(filtered[focusedIndex].href);
    }
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
            onKeyDown={handleInputKeyDown}
            placeholder="Buscar páginas, productos, acciones…"
            className="flex-1 bg-transparent text-sm text-[#f0f8ff] outline-none placeholder:text-text-muted"
            aria-label="Buscar comandos"
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
          {(() => {
            let flatIndex = -1;
            return ["Navegación", "Productos", "Acciones"].map((group) => {
              const items = filtered.filter((c) => c.group === group);
              if (!items.length) return null;
              return (
                <div key={group} className="mb-2">
                  <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-text-subtle">
                    {group}
                  </p>
                  {items.map((cmd) => {
                    flatIndex++;
                    const isFocused = flatIndex === focusedIndex;
                    const itemIndex = flatIndex;
                    return (
                      <button
                        key={cmd.href + cmd.label}
                        id={`cmd-item-${itemIndex}`}
                        onClick={() => navigate(cmd.href)}
                        onMouseEnter={() => setFocusedIndex(itemIndex)}
                        data-focused={isFocused ? "true" : undefined}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-[#f0f8ff] transition ${
                          isFocused
                            ? "bg-brand-violet/20 text-brand-lavender"
                            : "hover:bg-brand-elevated"
                        }`}
                      >
                        {cmd.label}
                        <ChevronRight
                          className={`h-3.5 w-3.5 transition ${isFocused ? "text-brand-lavender" : "text-text-muted"}`}
                        />
                      </button>
                    );
                  })}
                </div>
              );
            });
          })()}
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
