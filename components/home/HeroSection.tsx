import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";

const trustSignals = [
  "Costa Rica",
  "Implementación por etapas",
  "Alcance definido",
  "Integración con sistemas existentes",
];

const deliveryStages = [
  { number: "01", label: "Necesidad", detail: "Objetivo y contexto" },
  { number: "02", label: "Solución", detail: "Alcance e integraciones" },
  { number: "03", label: "Entrega", detail: "Etapas y responsabilidades" },
];

export function HeroSection() {
  return (
    <SectionWrapper className="enterprise-section-ink relative overflow-hidden pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(25,195,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(25,195,255,0.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <Container>
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400 sm:text-sm">
              Tecnología empresarial · IA · Cloud · Software
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl sm:leading-[1.08] lg:text-[3.5rem] lg:leading-[1.1]">
              Tecnología e IA para resolver problemas reales de operación.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Automatizamos procesos, modernizamos plataformas y construimos
              soluciones empresariales conectadas a la realidad de cada
              organización.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/contacto"
                variant="enterprise"
                trackingContext={{
                  page: "home",
                  section: "hero",
                  ctaLabel: "hablar_con_un_especialista",
                  destination: "/contacto",
                  intent: "contact",
                }}
              >
                Hablar con un especialista
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                href="/soluciones"
                variant="ghost"
                className="!border-white/25 !text-white hover:!border-cyan-400 hover:!bg-white/5"
                trackingContext={{
                  page: "home",
                  section: "hero",
                  ctaLabel: "explorar_soluciones",
                  destination: "/soluciones",
                  intent: "explore",
                }}
              >
                Explorar soluciones
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-5 text-xs leading-5 text-slate-300 sm:text-sm">
              {trustSignals.map((signal) => (
                <li key={signal} className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                    aria-hidden="true"
                  />
                  {signal}
                </li>
              ))}
            </ul>
          </div>

          <aside
            aria-label="Etapas para definir y entregar una solución"
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-blue-600/10 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b172a]/90 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.3)] sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
                    Un punto de partida claro
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Del reto operativo al trabajo acordado
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/10 text-cyan-400"
                >
                  <ArrowDownRight className="h-5 w-5" />
                </span>
              </div>

              <ol className="mt-2">
                {deliveryStages.map((stage, index) => (
                  <li
                    key={stage.number}
                    className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-white/10 py-4 last:border-b-0 sm:gap-4"
                  >
                    <span className="font-mono text-xs text-cyan-400">
                      {stage.number}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white sm:text-base">
                        {stage.label}
                      </p>
                      <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                        {stage.detail}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${
                        index === deliveryStages.length - 1
                          ? "bg-blue-600"
                          : "bg-cyan-400/70"
                      }`}
                    />
                  </li>
                ))}
              </ol>
              <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-5 text-slate-300">
                Productos, servicios y acompañamiento, según el alcance de cada
                iniciativa.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </SectionWrapper>
  );
}
