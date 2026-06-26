import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { industries } from "@/lib/market";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Industrias | Novamind Global",
  description:
    "Soluciones de IA y SaaS por industria para acelerar operaciones críticas.",
  path: "/industrias",
});

export default function IndustriesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/industrias`,
        url: `${siteConfig.url}/industrias`,
        name: "Industrias | Novamind Global",
        description:
          "Soluciones de IA y SaaS por industria para acelerar operaciones críticas.",
        inLanguage: "es-CR",
        about: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "ItemList",
        itemListElement: industries.map((industry, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: industry.title,
          description: industry.subtitle,
          url: `${siteConfig.url}/industrias/${industry.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: `${siteConfig.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Industrias",
            item: `${siteConfig.url}/industrias`,
          },
        ],
      },
    ],
  };

  return (
    <SectionWrapper className="pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Container>
        <h1 className="bg-gradient-to-r from-brand-violet via-brand-lavender to-brand-gold bg-clip-text font-display text-4xl font-bold text-transparent">
          Industrias
        </h1>
        <p className="mt-3 text-text-muted">
          Rutas específicas para sectores con procesos complejos y necesidad de
          trazabilidad.
        </p>
        {/* Isometric sector map — alternating Z angles create cityscape depth */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 [perspective:1000px]">
          {industries.map((industry, i) => {
            // Alternate rows/columns for isometric stagger
            const rotY =
              i % 2 === 0
                ? "hover:[transform:rotateY(5deg)_translateZ(16px)_translateY(-4px)]"
                : "hover:[transform:rotateY(-5deg)_translateZ(16px)_translateY(-4px)]";
            const rotX = i < 2 ? "" : "[transform:translateZ(-4px)]";
            return (
              <Link
                key={industry.slug}
                href={`/industrias/${industry.slug}`}
                className={`group relative block rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-soft [transform-style:preserve-3d] transition-all duration-300 ${rotY} ${rotX} hover:border-brand-lavender/36 hover:shadow-[0_20px_48px_-14px_rgba(139,92,246,0.35)]`}
              >
                {/* Top shimmer */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-lavender/30 to-transparent"
                  aria-hidden="true"
                />
                {/* Building number badge */}
                <div
                  className="pointer-events-none absolute right-5 top-5 font-display text-5xl font-bold text-brand-lavender/8 [transform:translateZ(-6px)] select-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="font-display text-2xl font-semibold text-[#f0f8ff] [transform:translateZ(5px)]">
                  {industry.title}
                </h2>
                <p className="mt-3 text-sm text-text-muted">
                  {industry.subtitle}
                </p>
                {/* Arrow indicator */}
                <span
                  className="mt-4 inline-block text-xs font-semibold text-brand-lavender transition-all duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  Ver sector →
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
