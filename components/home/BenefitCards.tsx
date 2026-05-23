"use client";

import { Zap, Brain, Layers3 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useScrollReveal } from "@/lib/useScrollReveal";

const benefits = [
  {
    number: "01",
    icon: Zap,
    color: "text-brand-gold",
    border: "border-brand-gold/25",
    bg: "bg-brand-gold/10",
    title: "Automatización inteligente",
    description:
      "Procesos críticos automatizados con IA para empresas y comunidades que necesitan escalar.",
  },
  {
    number: "02",
    icon: Brain,
    color: "text-brand-lavender",
    border: "border-brand-violet/35",
    bg: "bg-brand-violet/15",
    title: "IA aplicada al negocio",
    description:
      "Inteligencia artificial que mejora la experiencia del cliente y la eficiencia operativa real.",
  },
  {
    number: "03",
    icon: Layers3,
    color: "text-brand-lavender",
    border: "border-brand-lavender/30",
    bg: "bg-brand-lavender/10",
    title: "Arquitectura enterprise",
    description:
      "SaaS multi-tenant sobre Azure, diseñado para crecer sin duplicar complejidad.",
  },
];

export function BenefitCards() {
  const ref0 = useScrollReveal<HTMLDivElement>()
  const ref1 = useScrollReveal<HTMLDivElement>({ rootMargin: '0px 0px -30px 0px' })
  const ref2 = useScrollReveal<HTMLDivElement>({ rootMargin: '0px 0px -20px 0px' })
  const refs = [ref0, ref1, ref2]

  return (
    <SectionWrapper>
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={b.number}
                ref={refs[i]}
                className={`reveal relative overflow-hidden rounded-2xl border ${b.border} bg-brand-card/80 p-6 transition hover:-translate-y-1 hover:shadow-violet`}
              >
                <span className="pointer-events-none absolute right-4 top-2 select-none font-display text-[5rem] font-bold leading-none text-brand-lavender opacity-[0.05]">
                  {b.number}
                </span>
                <div className={`inline-flex rounded-xl ${b.bg} p-2.5`}>
                  <Icon className={`h-5 w-5 ${b.color}`} />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-[#f0f8ff]">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
