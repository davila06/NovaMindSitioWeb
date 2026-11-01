import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Términos y Condiciones | Novamind Global",
    description:
      "Términos y condiciones de uso del sitio web y servicios de Novamind Global.",
    path: "/terminos",
  }),
  robots: { index: false, follow: true },
};

const sections = [
  {
    title: "1. Aceptación",
    content:
      "Al acceder a novamindglobalcr.com usted acepta estos Términos. Si no está de acuerdo, por favor no utilice este sitio.",
  },
  {
    title: "2. Descripción del servicio",
    content:
      "Novamind Global ofrece información sobre sus productos de software empresarial y un canal de contacto comercial. El sitio es informativo; las condiciones contractuales específicas se acuerdan mediante contrato firmado.",
  },
  {
    title: "3. Propiedad intelectual",
    content:
      "Todo el contenido de este sitio (textos, imágenes, marcas, código) es propiedad de Novamind Global S.A. o sus licenciantes. Queda prohibida su reproducción sin autorización escrita.",
  },
  {
    title: "4. Uso permitido",
    content:
      "Puede usar este sitio para: conocer nuestros productos, contactarnos comercialmente y compartir enlaces. Está prohibido: scraping automatizado, inyección de código malicioso, suplantación de identidad o uso fraudulento del formulario de contacto.",
  },
  {
    title: "5. Limitación de responsabilidad",
    content:
      "Novamind Global no garantiza la disponibilidad ininterrumpida del sitio ni la exactitud de toda la información. No somos responsables de daños indirectos derivados del uso o imposibilidad de uso del sitio.",
  },
  {
    title: "6. Terceros y enlaces",
    content:
      "Este sitio puede contener enlaces a servicios de terceros (LinkedIn, YouTube, etc.). Novamind Global no controla ni es responsable del contenido de esos sitios.",
  },
  {
    title: "7. Modificaciones",
    content:
      "Podemos modificar estos Términos en cualquier momento. El uso continuado del sitio tras la publicación de cambios constituye su aceptación.",
  },
  {
    title: "8. Ley aplicable",
    content:
      "Estos Términos se rigen por las leyes de la República de Costa Rica. Cualquier disputa se someterá a los tribunales competentes de San José, Costa Rica.",
  },
];

export default function TerminosPage() {
  return (
    <SectionWrapper className="pt-12">
      <Container className="max-w-3xl">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">
            Legal
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-[-0.03em] text-[#f0f8ff]">
            Términos y Condiciones
          </h1>
          <p className="mt-4 text-text-muted">
            Última actualización: enero 2026 · Vigente para el sitio{" "}
            <strong className="text-[#f0f8ff]">novamindglobalcr.com</strong>
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-brand-lavender/15 bg-brand-card/60 p-6"
            >
              <h2 className="font-display text-lg font-semibold text-[#f0f8ff]">
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                {s.content}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-text-subtle">
          Consultas legales:{" "}
          <a
            href="mailto:legal@novamindglobalcr.com"
            className="text-brand-lavender hover:underline"
          >
            legal@novamindglobalcr.com
          </a>
        </p>
      </Container>
    </SectionWrapper>
  );
}
