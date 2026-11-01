import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Badge } from "@/components/shared/ui/Badge";
import { Product } from "@/lib/types";
import Image from "next/image";

/** Marco de browser premium para screenshots de producto */
function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-lavender/20 bg-brand-elevated shadow-elevated">
      {/* Barra de tabs */}
      <div className="flex items-center gap-1.5 border-b border-brand-lavender/12 bg-brand-card/80 px-4 py-2.5">
        <span
          className="h-2.5 w-2.5 rounded-full bg-orange-400/70"
          aria-hidden="true"
        />
        <span
          className="h-2.5 w-2.5 rounded-full bg-amber-300/70"
          aria-hidden="true"
        />
        <span
          className="h-2.5 w-2.5 rounded-full bg-sky-400/70"
          aria-hidden="true"
        />
        <div className="ml-3 flex-1 rounded-md bg-brand-void/60 px-3 py-1 text-[11px] text-text-subtle">
          Vista del producto
        </div>
      </div>
      <div className="relative aspect-video">
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

export function ProductHero({ product }: { product: Product }) {
  return (
    <SectionWrapper className="pb-8 pt-12">
      <Container>
        <div className="grid gap-8 rounded-3xl border border-brand-lavender/18 bg-gradient-to-br from-brand-surface to-brand-card p-6 shadow-elevated lg:grid-cols-[1fr_0.9fr] lg:p-8">
          <div>
            <Badge>Producto Novamind</Badge>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-[#f0f8ff] sm:text-5xl md:text-6xl">
              {product.heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-text-muted">
              {product.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {product.audiences.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-brand-lavender/28 bg-brand-card/60 px-4 py-2 text-sm font-medium text-text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Screenshot con marco de browser o panel de stats */}
          {product.screenshotUrl ? (
            <BrowserFrame
              src={product.screenshotUrl}
              alt={`Captura de pantalla de ${product.name}`}
            />
          ) : (product.heroStats?.length ?? 0) > 0 ? (
            <div className="rounded-2xl border border-brand-lavender/20 bg-brand-void/80 p-6 shadow-elevated">
              <p className="text-sm text-text-muted">Indicadores de valor</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {product.heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-brand-lavender/18 bg-brand-elevated/60 p-4"
                  >
                    <p className="text-xs uppercase tracking-wide text-text-subtle">
                      {stat.label}
                    </p>
                    <p
                      className="mt-2 font-display text-3xl font-bold text-[#f0f8ff]"
                      aria-label={`${stat.label}: ${stat.value}`}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </SectionWrapper>
  );
}
