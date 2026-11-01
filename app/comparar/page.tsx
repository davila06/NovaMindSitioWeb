import type { Metadata } from "next";
import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";
import { createPageMetadata } from "@/lib/seo";
import { Check, X, Minus } from "lucide-react";
import { businessProducts } from "@/data/products";
import { ProductCompareWidget } from "@/components/products/ProductCompareWidget";
import { commercialEvidenceEnabled } from "@/data/site";

export const metadata: Metadata = createPageMetadata({
  title: "Comparar plataformas | Novamind",
  description:
    "Compara las capacidades descritas de las plataformas empresariales de Novamind.",
  path: "/comparar",
});

type CellValue = boolean | "partial" | string;

const features: {
  category: string;
  items: {
    label: string;
    novamind: CellValue;
    traditional: CellValue;
    note?: string;
  }[];
}[] = [
  {
    category: "Inteligencia Artificial",
    items: [
      { label: "IA generativa integrada", novamind: true, traditional: false },
      {
        label: "Automatización de flujos con IA",
        novamind: true,
        traditional: "partial",
      },
      { label: "Análisis predictivo", novamind: true, traditional: false },
      {
        label: "Procesamiento de lenguaje natural",
        novamind: true,
        traditional: false,
      },
      {
        label: "Entrenamiento con datos propios",
        novamind: true,
        traditional: false,
      },
    ],
  },
  {
    category: "Implementación & Tiempo de valor",
    items: [
      {
        label: "Tiempo hasta primera demo",
        novamind: "< 1 semana",
        traditional: "2–6 meses",
      },
      {
        label: "Parametrización sin código",
        novamind: true,
        traditional: "partial",
      },
      {
        label: "Onboarding guiado por especialista",
        novamind: true,
        traditional: "partial",
      },
      {
        label: "Actualización sin migración manual",
        novamind: true,
        traditional: false,
      },
    ],
  },
  {
    category: "Arquitectura técnica",
    items: [
      { label: "Multi-tenant nativo", novamind: true, traditional: false },
      {
        label: "Sobre infraestructura Azure",
        novamind: true,
        traditional: "partial",
      },
      { label: "API REST documentada", novamind: true, traditional: "partial" },
      {
        label: "Integración con ERP/CRM existentes",
        novamind: true,
        traditional: "partial",
      },
      {
        label: "Escalado automático por carga",
        novamind: true,
        traditional: false,
      },
    ],
  },
  {
    category: "Cumplimiento legal (Costa Rica)",
    items: [
      {
        label: "Facturación electrónica Hacienda",
        novamind: true,
        traditional: "partial",
      },
      {
        label: "Nómina CCSS actualizada",
        novamind: true,
        traditional: "partial",
      },
      {
        label: "Auditoría y trazabilidad completa",
        novamind: true,
        traditional: false,
      },
      { label: "Soporte para Ley 8968", novamind: true, traditional: false },
    ],
  },
  {
    category: "Soporte & Servicio",
    items: [
      {
        label: "Soporte en español (Costa Rica)",
        novamind: true,
        traditional: "partial",
      },
      {
        label: "SLA definido por contrato",
        novamind: true,
        traditional: "partial",
      },
      {
        label: "Actualizaciones incluidas",
        novamind: true,
        traditional: false,
      },
      {
        label: "Acceso al equipo de ingeniería",
        novamind: true,
        traditional: false,
      },
    ],
  },
];

function Cell({ value }: { value: CellValue }) {
  if (value === true)
    return (
      <Check className="mx-auto h-5 w-5 text-brand-lavender" aria-label="Sí" />
    );
  if (value === false)
    return <X className="mx-auto h-5 w-5 text-rose-400/70" aria-label="No" />;
  if (value === "partial")
    return (
      <Minus
        className="mx-auto h-5 w-5 text-brand-gold/80"
        aria-label="Parcial"
      />
    );
  return <span className="text-xs font-medium text-[#f0f8ff]">{value}</span>;
}

export default function CompararPage() {
  // Slim product summaries for the client widget (avoids sending full data)
  const productSummaries = businessProducts.map((p) => ({
    slug: p.slug,
    name: p.name,
    shortDescription: p.shortDescription,
    features: p.features,
    benefits: commercialEvidenceEnabled ? p.benefits : [],
    audiences: p.audiences,
    integrations: p.integrations,
    differentiators: p.differentiators,
    heroStats: commercialEvidenceEnabled ? p.heroStats : [],
  }));

  return (
    <>
      <SectionWrapper className="pt-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">
              Comparativa directa
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-[-0.03em] text-[#f0f8ff] sm:text-5xl">
              Compara plataformas Novamind
            </h1>
            <p className="mt-4 text-lg text-text-muted">
              Revisa las capacidades descritas y consulta al equipo para
              confirmar alcance, disponibilidad e integraciones.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* Product-to-product selector */}
      <SectionWrapper className="pb-0">
        <Container>
          <div className="mb-3">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">
              Compara entre productos
            </p>
            <p className="mt-1 text-text-muted text-sm">
              Selecciona dos soluciones Novamind para ver su comparativa lado a
              lado.
            </p>
          </div>
          <ProductCompareWidget products={productSummaries} />
        </Container>
      </SectionWrapper>

      {commercialEvidenceEnabled ? (
      <SectionWrapper>
        <Container>
          {/* Leyenda */}
          <div className="mb-6 flex flex-wrap items-center gap-5 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand-lavender" /> Incluido
            </span>
            <span className="flex items-center gap-1.5">
              <X className="h-4 w-4 text-rose-400/70" /> No disponible
            </span>
            <span className="flex items-center gap-1.5">
              <Minus className="h-4 w-4 text-brand-gold/80" /> Parcial / con
              costo adicional
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-brand-lavender/18">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-brand-lavender/15 bg-brand-card/80">
                  <th className="py-4 pl-6 pr-4 text-left font-semibold text-text-muted">
                    Característica
                  </th>
                  <th className="px-4 py-4 text-center">
                    <span className="font-display text-base font-bold text-brand-lavender">
                      Novamind Global
                    </span>
                    <span className="ml-2 rounded-full bg-brand-violet/20 px-2 py-0.5 text-[10px] font-bold text-brand-lavender">
                      IA-native
                    </span>
                  </th>
                  <th className="px-4 py-4 pr-6 text-center font-semibold text-text-muted">
                    Software Tradicional
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((group) => (
                  <Fragment key={group.category}>
                    <tr
                      className="border-b border-brand-lavender/10 bg-brand-surface/30"
                    >
                      <td
                        colSpan={3}
                        className="py-3 pl-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold"
                      >
                        {group.category}
                      </td>
                    </tr>
                    {group.items.map((item) => (
                      <tr
                        key={item.label}
                        className="border-b border-brand-lavender/8 transition hover:bg-brand-elevated/20"
                      >
                        <td className="py-3 pl-6 pr-4 text-text-muted">
                          {item.label}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Cell value={item.novamind} />
                        </td>
                        <td className="px-4 py-3 pr-6 text-center">
                          <Cell value={item.traditional} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 rounded-2xl border border-brand-violet/30 bg-brand-violet/10 p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-[#f0f8ff]">
              Solicite información sobre una demostración
            </h2>
            <p className="mt-3 text-text-muted">
              Confirme la disponibilidad, el formato y el alcance de la
              demostración para las plataformas que desea evaluar.
            </p>
            <Button href="/contacto" className="mt-6">
              Consultar disponibilidad de demo →
            </Button>
          </div>
        </Container>
      </SectionWrapper>
      ) : (
        <SectionWrapper>
          <Container>
            <p className="mx-auto max-w-3xl rounded-2xl border border-brand-lavender/18 bg-brand-card/70 p-6 text-center text-sm leading-6 text-text-muted">
              No publicamos comparaciones generales con otras categorías de
              software sin criterios verificables y vigentes. La comparativa
              entre plataformas Novamind muestra la información funcional
              disponible; confirma los requisitos específicos con el equipo.
            </p>
          </Container>
        </SectionWrapper>
      )}
    </>
  );
}
