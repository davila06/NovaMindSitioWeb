import type { Metadata } from "next";
import { commercialEvidenceEnabled } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ContactForm } from "@/components/shared/ui/ContactForm";
import { createPageMetadata, siteConfig } from "@/lib/seo";
import { CheckCircle2, Clock, Users, Zap } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Contacto | Novamind Global",
  description:
    "Consulta sobre productos SaaS de Novamind Global, servicios de Nova Assist y soporte tecnológico para hogares en Costa Rica.",
  path: "/contacto",
});

const benefits = [
  { icon: Clock, text: "Revisamos tu solicitud y el contexto que compartas" },
  { icon: Users, text: "Acordamos el siguiente paso según tu necesidad" },
  { icon: Zap, text: "Alcance, disponibilidad y costos se confirman antes de avanzar" },
  { icon: CheckCircle2, text: "Las condiciones se documentan en la propuesta" },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteConfig.url}/contacto`,
        url: `${siteConfig.url}/contacto`,
        name: "Contacto | Novamind Global",
        description:
          "Consulta sobre productos SaaS de Novamind Global, servicios de Nova Assist y soporte tecnológico para hogares en Costa Rica.",
        inLanguage: "es-CR",
        about: { "@id": `${siteConfig.url}/#organization` },
        potentialAction: {
          "@type": "CommunicateAction",
          target: `${siteConfig.url}/contacto`,
          name: "Consultar sobre productos o servicios",
          actionStatus: "PotentialActionStatus",
          agent: { "@id": `${siteConfig.url}/#organization` },
        },
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
            name: "Contacto",
            item: `${siteConfig.url}/contacto`,
          },
        ],
      },
    ],
  };
  return (
    <SectionWrapper className="pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Columna izquierda — info */}
          <div className="lg:pt-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Hablemos
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-[#f0f8ff] sm:text-5xl">
              Tu siguiente salto digital empieza aquí
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              Consulta sobre productos SaaS de Novamind, servicios de Nova
              Assist o soporte para hogares. Revisaremos el contexto compartido
              y confirmaremos los siguientes pasos disponibles.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <li key={b.text} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-violet/20 text-brand-lavender">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-text-muted">{b.text}</span>
                  </li>
                );
              })}
            </ul>
            {/* Decorativo */}
            <div aria-hidden="true" className="mt-12 hidden lg:block">
              <div className="h-px w-full bg-gradient-to-r from-brand-violet/40 via-brand-lavender/20 to-transparent" />
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-text-subtle">
                Costa Rica · Empresa tecnológica IA-native
              </p>
            </div>

            {/* Prueba social */}
            {commercialEvidenceEnabled && <div className="mt-10 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
                Lo que dicen nuestros clientes
              </p>
              {[
                {
                  quote:
                    "En menos de 3 meses redujimos el tiempo de gestión de nómina a la mitad. El soporte fue excepcional desde el primer día.",
                  author: "Gerente de RRHH",
                  company: "Empresa de manufactura, 200+ colaboradores",
                },
                {
                  quote:
                    "El voicebot resuelve el 70% de las consultas sin intervención humana. Nuestro equipo ahora se enfoca en casos complejos.",
                  author: "Director de Operaciones",
                  company: "Contact center, Costa Rica",
                },
              ].map((t) => (
                <figure
                  key={t.author}
                  className="rounded-xl border border-brand-lavender/12 bg-brand-elevated/40 p-4"
                >
                  <blockquote className="text-sm leading-6 text-text-muted">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-xs text-text-subtle">
                    <span className="font-medium text-brand-lavender">
                      {t.author}
                    </span>
                    {" · "}
                    {t.company}
                  </figcaption>
                </figure>
              ))}
            </div>}
          </div>
          {/* Columna derecha — formulario flotante 3D */}
          <div className="[perspective:700px]">
            <div className="relative rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6 shadow-elevated backdrop-blur sm:p-8 [transform-style:preserve-3d] [transform:rotateY(-1deg)] transition-all duration-500 hover:[transform:rotateY(0deg)_translateZ(6px)]">
              {/* Top shimmer */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-lavender/50 to-transparent"
                aria-hidden="true"
              />
              {/* Depth shadow behind panel */}
              <div
                className="pointer-events-none absolute inset-x-4 -bottom-3 h-full rounded-2xl border border-brand-lavender/8 bg-brand-card/40 [transform:translateZ(-12px)]"
                aria-hidden="true"
              />
              <ContactForm plan={typeof plan === "string" ? plan : undefined} />
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
