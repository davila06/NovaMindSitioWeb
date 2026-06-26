"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { RotateCcw } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "¿Para qué tipo de empresas están diseñadas las soluciones de Novamind?",
    a: "Nos especializamos en empresas medianas y grandes de América Latina en sectores como seguros, nómina, contact centers, municipalidades y ERP multiempresa. Nuestras plataformas están construidas para operaciones críticas con alto volumen de procesos y requerimientos de trazabilidad.",
  },
  {
    q: "¿Cuánto tiempo tarda una implementación típica?",
    a: "Dependiendo del producto y el alcance, las primeras fases de valor se logran en 4–8 semanas. Trabajamos con implementación incremental para no interrumpir tu operación actual, activando módulos por etapas y validando resultados antes de escalar.",
  },
  {
    q: "¿Cómo se integra con mi sistema ERP o CRM actual?",
    a: "Nuestras plataformas están diseñadas para convivir con el stack existente. Ofrecemos conectores para los ERP más comunes en LATAM, APIs REST documentadas y webhooks para flujos personalizados. No es necesario migrar toda la infraestructura.",
  },
  {
    q: "¿Los datos de mi empresa están seguros en la nube?",
    a: "Sí. Operamos sobre Microsoft Azure con cifrado en tránsito y en reposo, controles de acceso por rol, trazabilidad de eventos críticos y cumplimiento con estándares de seguridad empresarial. Ofrecemos instancias dedicadas para clientes con requerimientos de aislamiento.",
  },
  {
    q: "¿Qué soporte ofrecen después de la implementación?",
    a: "Contamos con soporte técnico continuo, actualizaciones de plataforma incluidas y acompañamiento operativo. Nuestros planes incluyen SLA definidos según criticidad del proceso y acceso a canal directo con el equipo de producto de Novamind.",
  },
  {
    q: "¿Puedo hacer una prueba antes de comprometer presupuesto?",
    a: "Sí. Ofrecemos demos personalizadas de 30 minutos mostrando el producto con escenarios reales de tu industria. También podemos preparar un piloto acotado según tu caso de uso específico, sin costo inicial.",
  },
];

function FAQCard({
  item,
  index,
}: {
  item: (typeof FAQ_ITEMS)[0];
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group relative h-48 cursor-pointer [perspective:1000px]"
      onClick={() => setFlipped((v) => !v)}
    >
      {/* Inner 3D container */}
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        }`}
      >
        {/* FRONT — question */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-brand-lavender/20 bg-gradient-to-br from-brand-card/95 to-brand-card/70 p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] backdrop-blur-sm [backface-visibility:hidden]">
          {/* Shimmer top */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-lavender/40 to-transparent"
            aria-hidden="true"
          />

          <div className="flex items-start justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-lavender/60">
              #{String(index + 1).padStart(2, "0")}
            </span>
            <RotateCcw
              className="h-3.5 w-3.5 shrink-0 text-brand-lavender/40 transition group-hover:rotate-180 group-hover:text-brand-lavender/70"
              style={{ transitionDuration: "400ms" }}
              aria-hidden="true"
            />
          </div>

          <p className="font-display text-sm font-semibold leading-snug text-[#f0f8ff] sm:text-base">
            {item.q}
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-lavender/40">
            Toca para ver respuesta →
          </p>
        </div>

        {/* BACK — answer */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-brand-violet/30 bg-gradient-to-br from-brand-violet/15 to-brand-card/90 p-6 shadow-[0_4px_24px_-4px_rgba(139,92,246,0.3)] backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {/* Shimmer top */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-iris/60 to-transparent"
            aria-hidden="true"
          />

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-iris/70">
            Respuesta
          </span>

          <p className="text-sm leading-relaxed text-[#f0f8ff]/90">{item.a}</p>

          <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-iris/40">
            ← Volver
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <SectionWrapper id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Todo lo que necesitas saber
          </h2>
          <p className="mt-3 text-text-muted">
            Toca cada tarjeta para revelar la respuesta. Respuestas directas a
            las dudas más comunes.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQCard key={i} item={item} index={i} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
