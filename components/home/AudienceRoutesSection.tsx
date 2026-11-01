import Link from "next/link";
import { ArrowUpRight, Building2, Home } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

const audiences = [
  {
    href: "/hogares",
    eyebrow: "B2C · Personas y hogares",
    title: "Tecnología que funciona en casa.",
    description:
      "Soporte cercano para equipos, conectividad, seguridad digital y hogares conectados.",
    action: "Explorar soporte para hogares",
    icon: Home,
    accent: "orange",
  },
  {
    href: "/empresas",
    eyebrow: "B2B · PYMES y organizaciones",
    title: "Tecnología que mueve tu operación.",
    description:
      "Productos SaaS de Novamind Global y servicios de Nova Assist: presencia digital, soporte TI, nube, seguridad e implementación.",
    action: "Explorar soluciones empresariales",
    icon: Building2,
    accent: "violet",
  },
] as const;

export function AudienceRoutesSection() {
  return (
    <SectionWrapper aria-labelledby="audience-routes-heading" className="pt-8">
      <Container>
        <div className="mb-7 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Ecosistema Novamind · productos, servicios y comunidad
          </p>
          <h2
            id="audience-routes-heading"
            className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl"
          >
            ¿Qué necesitas resolver?
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            const accent =
              audience.accent === "orange"
                ? "border-orange-400/20 hover:border-orange-300/45 text-orange-300"
                : "border-brand-lavender/20 hover:border-brand-lavender/45 text-brand-lavender";
            return (
              <Link
                key={audience.href}
                href={audience.href}
                className={`group relative overflow-hidden rounded-2xl border bg-brand-card/65 p-6 transition duration-300 hover:-translate-y-1 hover:bg-brand-card/90 sm:p-8 ${accent}`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-current opacity-[0.04] blur-3xl transition-opacity group-hover:opacity-[0.09]"
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                      {audience.eyebrow}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-current/20 bg-current/10">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-7 max-w-lg font-display text-2xl font-bold text-[#f0f8ff] sm:text-3xl">
                    {audience.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
                    {audience.description}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#f0f8ff]">
                    {audience.action}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-6 select-none font-display text-6xl font-bold text-white/[0.035]"
                >
                  0{index + 1}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
