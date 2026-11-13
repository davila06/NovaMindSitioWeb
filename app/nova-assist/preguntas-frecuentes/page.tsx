import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { novaAssistFaq } from "@/data/nova-assist";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Preguntas frecuentes sobre Nova Assist",
  description:
    "Respuestas sobre servicios, visitas, planes residenciales, dispositivos, respaldos, privacidad, seguridad y cobertura de Nova Assist.",
  path: "/nova-assist/preguntas-frecuentes",
  extraKeywords: ["soporte técnico Costa Rica", "mantenimiento de computadoras"],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: novaAssistFaq.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Nova Assist", item: `${siteConfig.url}/nova-assist` },
        { "@type": "ListItem", position: 3, name: "Preguntas frecuentes", item: `${siteConfig.url}/nova-assist/preguntas-frecuentes` },
      ],
    },
  ],
};

export default function NovaAssistFaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SectionWrapper className="pt-12 sm:pt-16">
        <Container className="max-w-4xl">
          <nav aria-label="Ruta de navegación" className="text-xs text-text-subtle"><Link href="/nova-assist" className="hover:text-white">Nova Assist</Link> / <span aria-current="page">Preguntas frecuentes</span></nav>
          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Respuestas claras</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl">Preguntas frecuentes de Nova Assist</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted">Alcance, límites, privacidad y qué esperar antes de solicitar ayuda.</p>
          </div>
          <div className="mt-8 divide-y divide-white/10 rounded-3xl border border-white/10 bg-[#0b1730]/60 px-5 sm:px-7">
            {novaAssistFaq.map(({ question, answer }, index) => (
              <details key={question} open={index === 0} className="group py-5">
                <summary className="min-h-8 cursor-pointer list-none pr-6 text-base font-semibold leading-6 text-white marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-200">{question}</summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-text-muted">{answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-orange-200/15 bg-orange-300/5 p-5">
            <p className="text-sm leading-6 text-text-muted">Si no estás seguro de qué modalidad elegir, usa el <Link href="/nova-assist#selector" className="font-semibold text-orange-100 underline underline-offset-4">selector de servicio</Link>. Para una consulta específica, <Link href="/nova-assist/solicitar" className="font-semibold text-orange-100 underline underline-offset-4">solicita ayuda</Link>.</p>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
