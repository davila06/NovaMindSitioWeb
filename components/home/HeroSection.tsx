"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Badge } from "@/components/shared/ui/Badge";
import { Button } from "@/components/shared/ui/Button";

export function HeroSection() {
  return (
    <SectionWrapper className="relative overflow-hidden pb-8 pt-10 sm:pt-14">
      {/* Subtle ambient light keeps the visual focus on the message. */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-brand-violet/6 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-[300px] w-[300px] rounded-full bg-brand-iris/6 blur-3xl" />
      </div>
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ── Copy ──────────────────────────────────────── */}
          <div className="enter-fade-up">
            <Badge>Tecnología aplicada · Empresas y hogares</Badge>

            <h1 className="mt-5 font-display text-[2.8rem] font-bold leading-[1.04] tracking-[-0.04em] text-[#f0f8ff] sm:text-[3.8rem] lg:text-[4.5rem]">
              Soluciones tecnológicas para avanzar con{" "}
              <span className="bg-gradient-to-r from-brand-violet via-brand-iris to-brand-lavender bg-clip-text text-transparent">
                IA aplicada y soporte confiable
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-text-muted">
              Productos SaaS de Novamind Global y servicios de Nova Assist para
              empresas, además de soporte tecnológico para hogares en Costa Rica.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href="/empresas"
                trackingContext={{
                  page: "home",
                  section: "hero",
                  ctaLabel: "explorar_empresas",
                  destination: "/empresas",
                  intent: "explore",
                }}
              >
                Explorar soluciones B2B
              </Button>
              <Button
                href="/hogares"
                variant="ghost"
                trackingContext={{
                  page: "home",
                  section: "hero",
                  ctaLabel: "explorar_hogares",
                  destination: "/hogares",
                  intent: "explore",
                }}
              >
                Soporte para hogares →
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-muted">
              <span>Alcance definido</span>
              <span>Implementación por etapas</span>
              <span>Condiciones documentadas</span>
            </div>
          </div>

          <EcosystemOverview />
        </div>
      </Container>
    </SectionWrapper>
  );
}

function EcosystemOverview() {
  const lines = [
    {
      number: "01",
      title: "Novamind Global",
      detail: "Productos SaaS e inteligencia aplicada",
      tone: "text-brand-lavender",
    },
    {
      number: "02",
      title: "Nova Assist",
      detail: "Consultoría, implementación y soporte",
      tone: "text-brand-gold",
    },
    {
      number: "03",
      title: "PawTrack",
      detail: "Una iniciativa tecnológica comunitaria",
      tone: "text-sky-300",
    },
  ];

  return (
    <aside
      aria-label="Marcas y líneas del ecosistema Novamind"
      className="relative"
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-violet/10 via-transparent to-brand-iris/8 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative rounded-2xl border border-brand-lavender/20 bg-brand-surface/90 p-6 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.7)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
          Ecosistema Novamind
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-[#f0f8ff]">
          Productos, servicios y comunidad
        </h2>
        <ol className="mt-6 divide-y divide-white/8">
          {lines.map((line) => (
            <li
              key={line.number}
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <span className={`pt-0.5 text-xs font-semibold ${line.tone}`}>
                {line.number}
              </span>
              <div>
                <h3 className="font-semibold text-[#f0f8ff]">{line.title}</h3>
                <p className="mt-1 text-sm leading-5 text-text-muted">
                  {line.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
