import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { ContactForm } from '@/components/shared/ui/ContactForm'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Contacto | Novamind Global',
  description: 'Agenda una demo y descubre como automatizar procesos clave con IA aplicada.',
  path: '/contacto',
})

export default function ContactPage() {
  return (
    <SectionWrapper className="pt-12">
      <Container>
        <div className="mx-auto max-w-3xl rounded-2xl border border-brand-interactive/22 bg-slate-900/78 p-6 shadow-soft sm:p-8">
          <h1 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-4xl text-transparent">Hablemos de tu siguiente salto digital</h1>
          <p className="mt-3 text-slate-300">Comparte tus retos y armamos una propuesta inicial con roadmap y prioridades.</p>
          <ContactForm />
        </div>
      </Container>
    </SectionWrapper>
  )
}
