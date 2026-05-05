import { Accordion } from '@/components/shared/ui/Accordion'

export function FAQAccordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <section>
      <h2 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">Preguntas frecuentes</h2>
      <div className="mt-5">
        <Accordion items={items} />
      </div>
    </section>
  )
}
