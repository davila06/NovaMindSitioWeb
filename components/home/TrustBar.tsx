import { Container } from "@/components/layout/Container";
import { trustBadges } from "@/data/site";
import { ShieldCheck, Layers, Cloud, BarChart3, Lock, Cpu } from "lucide-react";

const icons = [ShieldCheck, Layers, Cloud, BarChart3, Lock, Cpu];

const techBadges = [
  "Microsoft Azure",
  "Next.js 15",
  "TypeScript",
  "Multi-tenant SaaS",
  "Empresa Costarricense",
];

const allBadges = [...trustBadges, ...techBadges];

export function TrustBar() {
  return (
    <div className="py-4 overflow-hidden">
      <Container>
        {/* Línea de luz superior */}
        <div className="light-line mb-6" />
      </Container>

      {/* Conveyor belt — perspective tilt gives 3D belt feel */}
      <div
        className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [perspective:900px]"
        role="marquee"
        aria-label="Certificaciones, tecnologías y características de confianza de Novamind Global"
      >
        {/* The belt strip itself is tilted in 3D */}
        <div className="flex w-full [transform:rotateX(-6deg)] [transform-style:preserve-3d]">
          <ul className="animate-marquee flex shrink-0 gap-4 pr-4" role="list">
            {allBadges.map((badge, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li
                  key={`a-${badge}`}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-brand-lavender/18 bg-brand-card/70 px-5 py-2.5 text-sm font-medium text-text-muted backdrop-blur whitespace-nowrap transition-transform duration-300 hover:[transform:translateZ(8px)_scale(1.04)]"
                >
                  <Icon
                    className="h-4 w-4 text-brand-lavender"
                    aria-hidden="true"
                  />
                  {badge}
                </li>
              );
            })}
          </ul>
          {/* Duplicate for seamless loop */}
          <ul
            className="animate-marquee flex shrink-0 gap-4 pr-4"
            aria-hidden="true"
            role="presentation"
          >
            {allBadges.map((badge, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li
                  key={`b-${badge}`}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-brand-lavender/18 bg-brand-card/70 px-5 py-2.5 text-sm font-medium text-text-muted backdrop-blur whitespace-nowrap"
                >
                  <Icon
                    className="h-4 w-4 text-brand-lavender"
                    aria-hidden="true"
                  />
                  {badge}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Container>
        <div className="light-line mt-6" />
      </Container>
    </div>
  );
}
