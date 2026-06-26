"use client";

import { Button } from "@/components/shared/ui/Button";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function CTASection() {
  const headingRef = useScrollReveal<HTMLDivElement>();

  return (
    <SectionWrapper className="overflow-hidden">
      <Container>
        {/* Cierre tipográfico de impacto */}
        <div ref={headingRef} className="relative py-16 text-center reveal">
          {/* Halo de fondo decorativo — 3D depth layers */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center [perspective:600px]"
          >
            {/* Back halo */}
            <div className="h-80 w-80 rounded-full bg-brand-violet/10 blur-3xl [transform:translateZ(-40px)]" />
            {/* Mid halo */}
            <div className="absolute h-56 w-56 rounded-full bg-brand-lavender/12 blur-2xl [transform:translateZ(-20px)]" />
            {/* Front pulse ring */}
            <div className="absolute h-32 w-32 rounded-full border border-brand-violet/25 [transform:translateZ(0px)] animate-pulse" />
          </div>

          <p className="relative text-sm font-semibold uppercase tracking-[0.22em] text-brand-gold">
            ¿Listo para escalar?
          </p>

          {/* Statement tipográfico principal — Z-elevated */}
          <h2 className="relative mt-4 font-display text-[3rem] font-bold leading-[1.02] tracking-[-0.04em] text-transparent sm:text-[4.5rem] lg:text-[6rem] bg-gradient-to-r from-brand-violet via-brand-lavender to-brand-gold bg-clip-text [transform:translateZ(8px)]">
            Operaciones que escalan.
          </h2>

          <p className="relative mx-auto mt-6 max-w-xl text-lg text-text-muted">
            El software que su equipo necesita para convertir procesos críticos
            en ventajas competitivas reales.
          </p>

          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <Button
              href="/contacto"
              trackingContext={{
                page: "home",
                section: "final_cta",
                ctaLabel: "quiero_demo",
                destination: "/contacto",
                intent: "demo",
              }}
            >
              Agendar conversación →
            </Button>
            <Button
              href="/contacto"
              variant="ghost"
              trackingContext={{
                page: "home",
                section: "final_cta",
                ctaLabel: "hablar_experto",
                destination: "/contacto",
                intent: "consultation",
              }}
            >
              Hablar con un experto
            </Button>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
