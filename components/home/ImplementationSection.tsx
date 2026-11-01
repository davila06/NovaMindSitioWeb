import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { implementationSteps } from "@/data/site";

export function ImplementationSection() {
  return (
    <SectionWrapper id="implementacion">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Forma de trabajo
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              Un proceso claro, definido con cada organización
            </h2>
            <p className="mt-4 text-slate-300">
              Acordamos prioridades, responsables y entregables con base en el
              contexto del proyecto. Cada etapa y sus condiciones se confirman
              antes de avanzar.
            </p>
          </div>

          <ol className="grid gap-4">
            {implementationSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-brand-lavender/15 bg-brand-card/80 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-lavender/20 bg-brand-lavender/10 text-sm font-bold text-brand-lavender">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[#f0f8ff]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </SectionWrapper>
  );
}
