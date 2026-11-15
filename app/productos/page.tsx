import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";
import { products } from "@/data/products";
import { createPageMetadata, siteConfig } from "@/lib/seo";

const catalog = [
  ...products.map((product) => ({
    slug: product.slug,
    name: product.name,
    description: product.shortDescription,
    category: product.slug === "pawtrack" ? "Comunidad" : "Producto",
  })),
  {
    slug: "novaclick",
    name: "NovaClick",
    description:
      "Diseño y desarrollo de sitios web, tiendas en línea y presencia digital para profesionales y PYMES en Costa Rica.",
    category: "Experiencia digital",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Productos | Novamind Global",
  description:
    "Explora los productos digitales y plataformas empresariales de Novamind Global.",
  path: "/productos",
});

export default function ProductsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/productos`,
        url: `${siteConfig.url}/productos`,
        name: "Productos | Novamind Global",
        description:
          "Catálogo de productos digitales y plataformas de Novamind Global.",
        inLanguage: "es-CR",
        about: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "ItemList",
        itemListElement: catalog.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          description: product.description,
          url: `${siteConfig.url}/productos/${product.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SectionWrapper className="enterprise-section-ink pb-12 pt-14 sm:pb-16 sm:pt-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400 sm:text-sm">
              Novamind Global · Productos
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-5xl">
              Productos para necesidades de negocio y comunidad
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Consulta la información disponible de cada producto. Las
              funciones, la disponibilidad y las condiciones se revisan de
              acuerdo con el producto y la propuesta correspondiente.
            </p>
            <Button
              href="/productos/saas"
              variant="enterprise"
              className="mt-7"
            >
              Información de plataformas empresariales
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper className="enterprise-section-light">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((product) => (
              <li key={product.slug}>
                <article className="enterprise-card flex h-full min-h-56 flex-col p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                    {product.category}
                  </p>
                  <h2 className="mt-4 text-xl font-semibold text-slate-900">
                    {product.name}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                  <Link
                    href={`/productos/${product.slug}`}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    Explorar {product.name}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </SectionWrapper>
    </>
  );
}
