"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { products } from "@/data/products";
import { Card } from "@/components/shared/ui/Card";
import { Button } from "@/components/shared/ui/Button";
import {
  Bot,
  Landmark,
  Building2,
  ShieldCheck,
  PawPrint,
  TrendingUp,
  Workflow,
} from "lucide-react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics-client";
import { useScrollReveal } from "@/lib/useScrollReveal";

const iconMap = {
  voicebot: Bot,
  planillascr: Landmark,
  ccerp: Building2,
  mindflow: TrendingUp,
  "mindflow-ai-sales-engine": Workflow,
  iads: ShieldCheck,
  pawtrack: PawPrint,
};

const accentMap: Record<
  string,
  {
    icon: string;
    border: string;
    badge: string;
    label: string;
    category: string;
    spotlight: string;
  }
> = {
  voicebot: {
    icon: "text-orange-400",
    border: "hover:border-orange-400/45",
    badge: "bg-orange-400/10 text-orange-300",
    label: "IA Conversacional",
    category: "IA",
    spotlight: "rgba(251,146,60,0.13)",
  },
  planillascr: {
    icon: "text-sky-400",
    border: "hover:border-sky-400/45",
    badge: "bg-sky-400/10 text-sky-300",
    label: "Nómina & RRHH",
    category: "RRHH",
    spotlight: "rgba(56,189,248,0.13)",
  },
  ccerp: {
    icon: "text-blue-400",
    border: "hover:border-blue-400/45",
    badge: "bg-blue-400/10 text-blue-300",
    label: "ERP Multiempresa",
    category: "ERP",
    spotlight: "rgba(96,165,250,0.13)",
  },
  mindflow: {
    icon: "text-amber-400",
    border: "hover:border-amber-400/45",
    badge: "bg-amber-400/10 text-amber-300",
    label: "Ventas Automatizadas",
    category: "Ventas",
    spotlight: "rgba(251,191,36,0.12)",
  },
  "mindflow-ai-sales-engine": {
    icon: "text-orange-400",
    border: "hover:border-orange-400/45",
    badge: "bg-orange-400/10 text-orange-300",
    label: "Revenue Operations",
    category: "Ventas",
    spotlight: "rgba(251,146,60,0.13)",
  },
  iads: {
    icon: "text-amber-400",
    border: "hover:border-amber-400/45",
    badge: "bg-amber-400/10 text-amber-300",
    label: "Servicios Digitales",
    category: "Digital",
    spotlight: "rgba(251,191,36,0.12)",
  },
  pawtrack: {
    icon: "text-sky-400",
    border: "hover:border-sky-400/45",
    badge: "bg-sky-400/10 text-sky-300",
    label: "Comunidades",
    category: "Digital",
    spotlight: "rgba(56,189,248,0.13)",
  },
};

const CATEGORIES = ["Todos", "IA", "ERP", "RRHH", "Ventas", "Digital"];

export function ProductGrid() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState("Todos");

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    // Per-product spotlight — reads accent color from data attribute
    const color = card.dataset.spotlight ?? "rgba(139,92,246,0.12)";
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    card.style.backgroundImage = `radial-gradient(300px circle at ${relX}px ${relY}px, ${color}, transparent 70%)`;
  }

  function handleMouseLeave(e: ReactMouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.backgroundImage = "";
  }

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter(
          (p) => (accentMap[p.slug]?.category ?? "") === activeCategory,
        );

  return (
    <SectionWrapper id="productos">
      <Container>
        <div ref={headingRef} className="mb-8 reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Portafolio de productos
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Soluciones diseñadas para operaciones reales
          </h2>
        </div>

        {/* Category filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                trackEvent("product_grid_filter", { category: cat });
              }}
              data-active={activeCategory === cat ? "true" : "false"}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                activeCategory === cat
                  ? "border-brand-violet bg-brand-violet/20 text-brand-lavender"
                  : "border-brand-lavender/20 text-text-muted hover:border-brand-lavender/40 hover:text-[#f0f8ff]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 [perspective:1400px]">
          {filtered.map((product, index) => {
            const Icon = iconMap[product.slug as keyof typeof iconMap];
            const accent = accentMap[product.slug] ?? {
              icon: "text-brand-lavender",
              border: "hover:border-brand-lavender/45",
              badge: "bg-brand-violet/10 text-brand-lavender",
              label: "Producto",
              category: "Digital",
            };
            const ordinal = String(index + 1).padStart(2, "0");

            return (
              <div
                key={product.slug}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-spotlight={accent.spotlight}
                className="relative rounded-2xl transition-[transform,box-shadow,background-image] duration-150 ease-out will-change-transform [transform-style:preserve-3d]"
              >
                {/* Stacked depth layer — pushed behind */}
                <div
                  className="pointer-events-none absolute inset-0.5 rounded-2xl bg-brand-violet/6 [transform:translateZ(-8px)]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-1 rounded-2xl bg-brand-violet/3 [transform:translateZ(-16px)]"
                  aria-hidden="true"
                />
                <Card
                  ordinal={ordinal}
                  className={`group flex h-full flex-col justify-between border-brand-lavender/15 ${accent.border}`}
                >
                  <div>
                    {/* Badge de categoría */}
                    <span
                      className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${accent.badge}`}
                    >
                      {accent.label}
                    </span>
                    <div className="mt-4 flex items-center gap-3">
                      <Icon
                        className={`h-6 w-6 ${accent.icon}`}
                        aria-hidden="true"
                      />
                      <h3 className="font-display text-xl text-[#f0f8ff]">
                        {product.name}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      {product.shortDescription}
                    </p>
                  </div>
                  <Button
                    href={`/productos/${product.slug}`}
                    className="mt-6 w-fit"
                    trackingContext={{
                      page: "home",
                      section: "product_grid",
                      ctaLabel:
                        product.slug === "pawtrack"
                          ? "descargar_gratis"
                          : "ver_producto",
                      destination: `/productos/${product.slug}`,
                      product: product.slug,
                      intent:
                        product.slug === "pawtrack" ? "download" : "explore",
                    }}
                  >
                    {product.slug === "pawtrack"
                      ? "Descargar gratis"
                      : "Ver cómo funciona"}
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
