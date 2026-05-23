import { Accordion } from "@/components/shared/ui/Accordion";

export function FAQAccordion({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 id="faq-heading" className="bg-gradient-to-r from-brand-violet via-brand-lavender to-brand-gold bg-clip-text font-display text-3xl font-bold text-transparent">
        Preguntas frecuentes
      </h2>
      <div className="mt-5">
        <Accordion items={items} />
      </div>
    </section>
  );
}
