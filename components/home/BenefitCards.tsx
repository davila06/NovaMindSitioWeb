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
  const ref0 = useScrollReveal<HTMLDivElement>();
  const ref1 = useScrollReveal<HTMLDivElement>({
    rootMargin: "0px 0px -30px 0px",
  });
  const ref2 = useScrollReveal<HTMLDivElement>({
    rootMargin: "0px 0px -20px 0px",
  });
  const refs = [ref0, ref1, ref2];

  return (
    <SectionWrapper>
      <Container>
        <div className="grid gap-4 md:grid-cols-3 [perspective:1200px]">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={b.number}
                ref={refs[i]}
                className={`reveal group relative overflow-hidden rounded-2xl border ${b.border} bg-brand-card/80 p-6 transition-all duration-300 [transform-style:preserve-3d] hover:shadow-violet hover:[transform:translateY(-6px)_translateZ(16px)_rotateX(-1.5deg)]`}
              >
                {/* Parallax background number — appears to float on separate Z layer */}
                <span className="pointer-events-none absolute right-4 top-2 select-none font-display text-[5rem] font-bold leading-none text-brand-lavender opacity-[0.05] transition-transform duration-500 group-hover:[transform:translateZ(8px)_scale(1.1)]">
                  {b.number}
                </span>
                {/* Icon on higher Z layer */}
                <div
                  className={`relative inline-flex rounded-xl ${b.bg} p-2.5 transition-transform duration-300 group-hover:[transform:translateZ(12px)]`}
                >
                  <Icon className={`h-5 w-5 ${b.color}`} />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-[#f0f8ff] transition-transform duration-300 group-hover:[transform:translateZ(6px)]">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  {b.description}
                </p>
                {/* Bottom accent glow — deepest layer */}
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-px ${b.border.includes("gold") ? "bg-brand-gold/30" : "bg-brand-lavender/20"} [transform:translateZ(-4px)]`}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
