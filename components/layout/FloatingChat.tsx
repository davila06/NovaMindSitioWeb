"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Globe2,
  House,
  MessageSquareText,
  PawPrint,
  X,
} from "lucide-react";

const destinations = [
  {
    href: "/hogares",
    label: "Soporte para hogares",
    description: "Asistencia para personas y familias",
    icon: House,
    accent: "text-orange-200 bg-orange-300/10 border-orange-200/15",
  },
  {
    href: "/empresas",
    label: "Soluciones para empresas",
    description: "SaaS, servicios e implementación",
    icon: Building2,
    accent: "text-brand-lavender bg-brand-lavender/10 border-brand-lavender/15",
  },
  {
    href: "/productos/novaclick",
    label: "NovaClick",
    description: "Sitios web y comercio digital",
    icon: Globe2,
    accent: "text-sky-200 bg-sky-300/10 border-sky-200/15",
  },
  {
    href: "/productos/pawtrack",
    label: "PawTrack CR",
    description: "Identidad y comunidad para mascotas",
    icon: PawPrint,
    accent: "text-emerald-200 bg-emerald-300/10 border-emerald-200/15",
  },
];

export function FloatingChat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="fixed bottom-36 right-4 z-40 flex flex-col items-end gap-3 md:bottom-20 md:right-6">
      {open && (
        <section
          role="dialog"
          aria-label="Accesos rápidos de Novamind"
          className="w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-brand-lavender/20 bg-brand-surface/98 shadow-[0_12px_48px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        >
          <div className="flex items-start justify-between border-b border-white/8 px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-lavender">
                Novamind · Costa Rica
              </p>
              <h2 className="mt-1 font-display text-lg font-semibold text-[#f0f8ff]">
                ¿Qué necesitas resolver?
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar accesos rápidos"
              className="rounded-lg p-1.5 text-text-muted transition hover:bg-white/8 hover:text-[#f0f8ff]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-2 p-3">
            {destinations.map(({ href, label, description, icon: Icon, accent }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 rounded-xl border border-white/6 px-3 py-3 transition hover:border-brand-lavender/20 hover:bg-white/[0.04]"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${accent}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#f0f8ff]">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-xs text-text-muted">
                    {description}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-lavender"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
          <div className="border-t border-white/8 px-5 py-3">
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-lavender transition hover:text-[#f0f8ff]"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Hablar con el equipo
            </Link>
          </div>
        </section>
      )}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Cerrar accesos rápidos" : "Explorar Novamind"}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-violet text-white shadow-[0_4px_24px_rgba(139,92,246,0.4)] transition hover:scale-105 hover:bg-brand-iris active:scale-95"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <MessageSquareText className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
