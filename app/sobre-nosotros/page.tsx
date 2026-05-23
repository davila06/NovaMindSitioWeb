import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { createPageMetadata, siteConfig } from "@/lib/seo";
import { Linkedin } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre Nosotros | Novamind Global",
  description:
    "Conoce al equipo detrás de Novamind Global — empresa costarricense de software empresarial IA-native.",
  path: "/sobre-nosotros",
});

const team = [
  {
    name: "Denis Ávila",
    role: "CEO & Co-Fundador",
    bio: "Arquitecto de soluciones empresariales con enfoque en automatización operativa e IA aplicada a negocios críticos.",
    initials: "DA",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Equipo Técnico",
    role: "Ingeniería & Producto",
    bio: "Desarrolladores especializados en arquitectura SaaS multi-tenant, integración Azure y diseño de sistemas trazables.",
    initials: "ET",
    linkedin: null,
  },
  {
    name: "Equipo Comercial",
    role: "Ventas & Implementación",
    bio: "Consultores que acompañan desde el diagnóstico operativo hasta la adopción completa en cada empresa cliente.",
    initials: "EC",
    linkedin: null,
  },
];

const values = [
  {
    title: "Pragmatismo sobre promesas",
    description:
      "Vendemos lo que podemos entregar. Cada propuesta nace del diagnóstico real, no del catálogo de features.",
  },
  {
    title: "Software que respeta la operación",
    description:
      "Diseñamos para personas que operan procesos críticos. La UX no es decoración — es parte del resultado.",
  },
  {
    title: "Escalar sin complejidad innecesaria",
    description:
      "Arquitectura multi-tenant y modular para que cada empresa crezca sin acumular deuda operativa.",
  },
  {
    title: "IA aplicada, no IA de marketing",
    description:
      "Automatización donde resuelve problemas reales: nómina, cobranza, atención al cliente, procesos internos.",
  },
];

export default function SobreNosotrosPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteConfig.url}/sobre-nosotros`,
        url: `${siteConfig.url}/sobre-nosotros`,
        name: "Sobre Nosotros | Novamind Global",
        description:
          "Conoce al equipo detrás de Novamind Global — empresa costarricense de software empresarial IA-native.",
        inLanguage: "es-CR",
        about: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          url: siteConfig.url,
          foundingDate: "2022",
          foundingLocation: {
            "@type": "Place",
            addressCountry: "CR",
            addressLocality: "San José",
          },
          foundedBy: {
            "@type": "Person",
            name: "Equipo fundador Novamind Global",
            jobTitle: "Co-fundadores",
            nationality: { "@type": "Country", name: "Costa Rica" },
          },
          knowsAbout: [
            "Inteligencia Artificial",
            "SaaS Empresarial",
            "Nómina Digital",
            "Contact Center IA",
          ],
          employee: team.map((member) => ({
            "@type": "Person",
            name: member.name,
            jobTitle: member.role,
            description: member.bio,
            ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteConfig.url}/` },
          { "@type": "ListItem", position: 2, name: "Sobre Nosotros", item: `${siteConfig.url}/sobre-nosotros` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <SectionWrapper className="pt-12">
        <Container>
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">
              Quiénes somos
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-[#f0f8ff] sm:text-5xl">
              Software empresarial hecho en Costa Rica
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              Novamind Global es una empresa tecnológica costarricense que
              diseña plataformas IA-native para automatizar operaciones críticas
              de negocios, municipalidades y comunidades.
            </p>
          </div>

          {/* Equipo */}
          <div className="mt-16">
            <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">
              El equipo
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-soft"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-violet/25 font-display text-xl font-bold text-brand-lavender">
                      {member.initials}
                    </div>
                    <div>
                      <p className="font-display text-lg font-semibold text-[#f0f8ff]">
                        {member.name}
                      </p>
                      <p className="text-xs font-medium text-brand-gold">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-text-muted">
                    {member.bio}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-brand-lavender hover:text-[#f0f8ff]"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Valores */}
      <SectionWrapper className="section-alt">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">
              Principios
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              Lo que guía cada decisión
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`reveal-slide-up delay-${i * 100} rounded-2xl border border-brand-lavender/15 bg-brand-card/80 p-6`}
              >
                <h3 className="font-display text-xl font-bold text-[#f0f8ff]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Stack tecnológico */}
      <SectionWrapper>
        <Container>
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">
              Stack tecnológico
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-[#f0f8ff] sm:text-3xl">
              Construido sobre tecnología enterprise
            </h2>
            <p className="mt-3 text-text-muted">
              Cada componente fue elegido para garantizar escala, seguridad y
              velocidad de desarrollo.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[
              { name: "Microsoft Azure", detail: "Infraestructura cloud" },
              { name: "Next.js 15", detail: "Frontend & API" },
              { name: "TypeScript", detail: "Type-safety full-stack" },
              { name: "PostgreSQL", detail: "Base de datos relacional" },
              { name: "Redis", detail: "Caché y colas" },
              { name: "Docker", detail: "Contenedores & CI/CD" },
              { name: "OpenAI / Azure AI", detail: "Modelos de lenguaje" },
              { name: "Tailwind CSS", detail: "Sistema de diseño" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center rounded-2xl border border-brand-lavender/15 bg-brand-card/80 p-4 text-center transition hover:border-brand-lavender/35 hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-violet/20 text-lg font-bold text-brand-lavender">
                  {tech.name.charAt(0)}
                </div>
                <p className="mt-2 text-xs font-semibold text-[#f0f8ff]">
                  {tech.name}
                </p>
                <p className="mt-0.5 text-[10px] text-text-muted">
                  {tech.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
