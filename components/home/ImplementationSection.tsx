import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { implementationSteps } from "@/data/site";

export function ImplementationSection() {
  return (
    <SectionWrapper
      id="como-trabajamos"
      aria-labelledby="process-heading"
      className="enterprise-section-subtle scroll-mt-24"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="enterprise-kicker">Forma de trabajo</p>
            <h2
              id="process-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-900 sm:text-4xl"
            >
              Cómo trabajamos
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Discover → Design → Build → Operate → Optimize
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Cada iniciativa comienza por entender el contexto. Las
              prioridades, entregables y responsabilidades se definen antes de
              avanzar.
            </p>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {implementationSteps.map((step, index) => (
              <li
                key={step.title}
                className="relative rounded-xl border border-slate-200 bg-white p-4 sm:min-h-48 sm:p-5"
              >
                <span className="font-mono text-xs font-semibold tracking-[0.12em] text-blue-700">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-sm font-bold leading-6 text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </SectionWrapper>
  );
}
