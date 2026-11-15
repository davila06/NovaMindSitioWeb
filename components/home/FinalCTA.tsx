import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";

export function FinalCTA() {
  return (
    <SectionWrapper
      aria-labelledby="final-cta-heading"
      className="enterprise-section-ink border-t border-white/10"
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
            Un siguiente paso claro
          </p>
          <h2
            id="final-cta-heading"
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl"
          >
            Hablemos de lo que quieres mejorar.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Comparte el contexto. Revisaremos contigo el alcance y las opciones
            disponibles para dar el siguiente paso.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href="/contacto"
              variant="enterprise"
              trackingContext={{
                page: "home",
                section: "final_cta",
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
                section: "final_cta",
                ctaLabel: "explorar_soluciones",
                destination: "/soluciones",
                intent: "explore",
              }}
            >
              Explorar soluciones
            </Button>
          </div>
          <p className="mt-7 text-sm text-slate-300">
            ¿Buscas soporte para tu hogar?{" "}
            <Link
              href="/nova-assist"
              className="inline-flex min-h-11 items-center gap-1 font-semibold text-cyan-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              Soporte para hogares
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </Container>
    </SectionWrapper>
  );
}
