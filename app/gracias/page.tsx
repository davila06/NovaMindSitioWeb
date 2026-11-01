import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";
import { ConversionFire } from "@/components/layout/ConversionFire";
import { createPageMetadata, siteConfig } from "@/lib/seo";
import { CheckCircle2, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "¡Mensaje recibido! | Novamind Global",
    description:
      "Hemos recibido tu consulta. Un especialista de Novamind Global te contactará pronto.",
    path: "/gracias",
  }),
  robots: { index: false, follow: false },
};

const nextSteps = [
  {
    icon: CheckCircle2,
    title: "Recibimos tu mensaje",
    description:
      "Tu consulta llegó correctamente. El equipo revisará la información que compartiste.",
  },
  {
    icon: Calendar,
    title: "Te contactamos",
    description:
      "Un especialista de Novamind te escribirá para entender tu necesidad y proponer una solución.",
  },
  {
    icon: ArrowRight,
    title: "Siguiente paso",
    description:
      "Si hace falta, nos pondremos en contacto para aclarar el alcance y las opciones disponibles.",
  },
];

export default function GraciasPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${siteConfig.url}/gracias`,
        url: `${siteConfig.url}/gracias`,
        name: '\u00a1Mensaje recibido! | Novamind Global',
        inLanguage: 'es-CR',
        description: 'Hemos recibido tu consulta. El equipo revisar\u00e1 la informaci\u00f3n compartida.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteConfig.url}/` },
            { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${siteConfig.url}/contacto` },
            { '@type': 'ListItem', position: 3, name: 'Confirmaci\u00f3n', item: `${siteConfig.url}/gracias` },
          ],
        },
      },
    ],
  }
  return (
    <SectionWrapper className="pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ConversionFire />
      <Container className="max-w-2xl text-center">
        {/* Ícono de confirmación */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-brand-lavender/30 bg-brand-lavender/10">
          <CheckCircle2 className="h-10 w-10 text-brand-lavender" />
        </div>

        <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] text-[#f0f8ff] sm:text-5xl">
          ¡Mensaje recibido!
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          Gracias por contactar a{" "}
          <strong className="text-[#f0f8ff]">Novamind Global</strong>. Revisamos
          tu consulta. Si necesitamos información adicional, nos pondremos en contacto.
        </p>

        {/* Próximos pasos */}
        <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          {nextSteps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-brand-lavender/15 bg-brand-card/60 p-5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-violet/20">
                <step.icon className="h-5 w-5 text-brand-lavender" />
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                Paso {i + 1}
              </p>
              <h3 className="mt-1 font-display text-base font-semibold text-[#f0f8ff]">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/">Volver al inicio</Button>
          <Button href="/productos/mindflow" variant="ghost">
            Explorar productos →
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
