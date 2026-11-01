"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "¿Para qué tipo de empresas están diseñadas las soluciones de Novamind?",
    a: "Trabajamos con PYMES y organizaciones que buscan resolver procesos de nómina, ventas, atención al cliente, servicios financieros y operación multiempresa. Revisamos el contexto y el alcance antes de recomendar una plataforma o servicio.",
  },
  {
    q: "¿Cuánto tiempo tarda una implementación típica?",
    a: "El calendario depende del producto, las integraciones, los datos y el alcance acordado. Se propone un plan por etapas después de revisar esos factores.",
  },
  {
    q: "¿Cómo se integra con mi sistema ERP o CRM actual?",
    a: "La compatibilidad y el trabajo de integración se revisan para cada sistema y caso de uso. La propuesta especifica las interfaces, dependencias y trabajo requerido antes de iniciar.",
  },
  {
    q: "¿Los datos de mi empresa están seguros en la nube?",
    a: "La arquitectura, los controles y las responsabilidades dependen de la plataforma y su modalidad de implementación. Podemos revisar los requisitos aplicables y documentar el alcance antes de contratar.",
  },
  {
    q: "¿Qué soporte ofrecen después de la implementación?",
    a: "Los canales, horarios, alcance y niveles de servicio se acuerdan según la solución y quedan documentados en la propuesta o contrato.",
  },
  {
    q: "¿Puedo hacer una prueba antes de comprometer presupuesto?",
    a: "Puedes consultar por una demostración. La disponibilidad, el formato, el alcance y cualquier costo se confirman antes de coordinarla.",
  },
];

function FAQCard({
  item,
  index,
}: {
  item: (typeof FAQ_ITEMS)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-brand-lavender/20 bg-brand-card/70">
      <h3>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`faq-answer-${index}`}
          aria-label={`${expanded ? "Ocultar respuesta" : "Mostrar respuesta"}: ${item.q}`}
          className="flex min-h-20 w-full items-center justify-between gap-5 p-5 text-left font-display text-sm font-semibold leading-snug text-[#f0f8ff] transition-colors hover:bg-brand-card/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-lavender sm:text-base"
          onClick={() => setExpanded((value) => !value)}
        >
          <span>{item.q}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-brand-lavender transition-transform ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      {expanded && (
        <div
          id={`faq-answer-${index}`}
          className="border-t border-brand-lavender/10 px-5 py-4 text-sm leading-6 text-text-muted"
        >
          {item.a}
        </div>
      )}
    </article>
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
            Selecciona una pregunta para ampliar la respuesta.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQCard key={item.q} item={item} index={i} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
