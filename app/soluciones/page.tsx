import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";
import { solutionAreas } from "@/data/site";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Soluciones empresariales | Novamind Global",
  description:
    "Explora áreas de IA y automatización, cloud, aplicaciones empresariales, datos e integración, ingeniería de software y experiencia digital.",
  path: "/soluciones",
});

export default function SolutionsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/soluciones`,
    url: `${siteConfig.url}/soluciones`,
    name: "Soluciones empresariales | Novamind Global",
    description:
      "Áreas de solución vinculadas a servicios y productos publicados por Novamind Global.",
    inLanguage: "es-CR",
    about: { "@id": `${siteConfig.url}/#organization` },
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
              Novamind Global · Soluciones
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-5xl">
              Opciones tecnológicas para retos de operación
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Explora áreas relacionadas con los servicios y productos
              disponibles. La solución, el alcance y las integraciones se
              definen según el contexto de cada iniciativa.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href="/contacto"
                variant="enterprise"
                trackingContext={{
                  page: "solutions",
                  section: "hero",
                  ctaLabel: "hablar_con_un_especialista",
                  destination: "/contacto",
                  intent: "contact",
                }}
              >
                Hablar con un especialista
              </Button>
              <Button href="/servicios" variant="ghost">
                Explorar servicios
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper className="enterprise-section-light">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionAreas.map((area) => (
              <li key={area.title}>
                <article className="enterprise-card flex h-full min-h-56 flex-col p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                    Área de solución
                  </p>
                  <h2 className="mt-4 text-xl font-semibold text-slate-900">
                    {area.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {area.description}
                  </p>
                  <Link
                    href={area.href}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    {area.action}
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
