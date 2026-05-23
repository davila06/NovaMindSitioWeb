import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { implementationSteps } from '@/data/site'
import { siteConfig } from '@/lib/seo'

export function ImplementationSection() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo implementamos soluciones IA en su empresa',
    description: 'Proceso de implementación de plataformas IA-native de Novamind Global: desde el diagnóstico hasta el escalado.',
    totalTime: 'P6W',
    supply: [{ '@type': 'HowToSupply', name: 'Acceso a sistemas actuales del cliente' }],
    tool: [{ '@type': 'HowToTool', name: 'Plataforma Novamind Global' }],
    step: implementationSteps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.description,
      url: `${siteConfig.url}/#implementacion`,
    })),
  }

  return (
    <SectionWrapper id="implementacion">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Como implementamos</p>
            <h2 className="mt-3 bg-gradient-to-r from-brand-gold via-brand-lavender to-brand-cobalt bg-clip-text font-display text-3xl text-transparent sm:text-4xl">
              De la oportunidad operativa a una ventaja competitiva real
            </h2>
            <p className="mt-4 text-slate-300">
              Nuestro proceso prioriza claridad, adopción y resultados. No se trata de vender humo con IA: se trata de integrarla donde realmente mejora la operación.
            </p>
          </div>
          <div className="grid gap-4">
            {implementationSteps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-brand-lavender/15 bg-brand-card/80 p-5 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet to-brand-iris text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[#f0f8ff]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
