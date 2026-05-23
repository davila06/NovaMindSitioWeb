"use client";

import { Building2, Users, Landmark, HeartHandshake } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useCases } from "@/data/site";
import { useScrollReveal } from "@/lib/useScrollReveal";

const iconMap: Record<
  string,
  { icon: React.ElementType; color: string; border: string; bg: string }
> = {
  "Empresas grandes": {
    icon: Building2,
    color: "text-brand-lavender",
    border: "border-brand-violet/35",
    bg: "bg-brand-violet/15",
  },
  PyMEs: {
    icon: Users,
    color: "text-brand-lavender",
    border: "border-brand-lavender/30",
    bg: "bg-brand-lavender/10",
  },
  Municipalidades: {
    icon: Landmark,
    color: "text-brand-gold",
    border: "border-brand-gold/30",
    bg: "bg-brand-gold/10",
  },
  Comunidades: {
    icon: HeartHandshake,
    color: "text-brand-iris",
    border: "border-brand-violet/30",
    bg: "bg-brand-violet/10",
  },
};

export function UseCasesSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  return (
    <SectionWrapper>
      <Container>
        <div ref={headingRef} className="max-w-2xl reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Segmentos que atendemos
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Casos de uso por segmento
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item, i) => {
            const meta = iconMap[item.title];
            const Icon = meta?.icon ?? Building2;
            return (
              <div
                key={item.title}
                className={`reveal-slide-up delay-${i * 100} group rounded-2xl border ${meta?.border ?? "border-brand-lavender/20"} bg-brand-card/80 p-5 transition hover:-translate-y-1 hover:shadow-violet`}
              >
                <div
                  className={`inline-flex rounded-xl ${meta?.bg ?? "bg-brand-violet/15"} p-2.5`}
                >
                  <Icon
                    className={`h-5 w-5 ${meta?.color ?? "text-brand-lavender"}`}
                  />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-[#f0f8ff]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
