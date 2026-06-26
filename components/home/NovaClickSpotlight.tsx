import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/shared/ui/Button";
import { CheckCircle2, Zap, Home, Building2, ArrowRight } from "lucide-react";

const clickFixHighlights = [
  "Diagnóstico rápido en sitio",
  "Respaldo en nube incluido",
  "Seguridad digital del hogar",
  "Desde ₡19,500 · IVA incluido",
];

const itonHighlights = [
  "Soporte TI sin área interna",
  "Ciberseguridad y migración cloud",
  "SLA garantizado",
  "Desde ₡130,000 · IVA incluido",
];

export function NovaClickSpotlight() {
  return (
    <div className="border-y border-orange-500/10 bg-gradient-to-b from-orange-950/8 via-transparent to-transparent">
      <SectionWrapper aria-labelledby="novaclick-home-heading">
        <Container>
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-orange-300">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              Servicio especializado
            </div>
            <h2
              id="novaclick-home-heading"
              className="mt-4 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl"
            >
              <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                NovaClick
              </span>{" "}
              — soporte técnico inmediato
            </h2>
            <p className="mt-3 text-base text-text-muted">
              Nuestra unidad especializada de soporte TI para hogares y
              empresas. Técnicos con amplia experiencia, respuesta en horas y
              planes a tu medida.
            </p>
          </div>

          {/* Dual isometric panels — ClickFix leans right, ITOn leans left */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto [perspective:1100px]">
            {/* ClickFix */}
            <div className="group relative flex flex-col rounded-2xl border border-orange-500/25 bg-brand-card/80 p-6 [transform-style:preserve-3d] [transform:rotateY(4deg)_translateZ(6px)] transition-all duration-300 hover:[transform:rotateY(1deg)_translateZ(20px)] hover:border-orange-400/45 hover:shadow-[0_20px_60px_-16px_rgba(249,115,22,0.35)]">
              {/* Top shimmer */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-orange-400/45 to-transparent"
                aria-hidden="true"
              />
              {/* Depth shadow */}
              <div
                className="pointer-events-none absolute inset-x-3 -bottom-2.5 h-full rounded-2xl border border-orange-500/10 bg-brand-card/40 [transform:translateZ(-10px)]"
                aria-hidden="true"
              />
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 [transform:translateZ(8px)] shadow-[0_4px_16px_-4px_rgba(249,115,22,0.5)] transition-transform duration-300 group-hover:[transform:translateZ(16px)]">
                  <Home
                    className="h-5 w-5 text-orange-400"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="font-display text-base font-bold text-[#f0f8ff]">
                    ClickFix
                  </div>
                  <div className="text-xs text-orange-300">Para hogares</div>
                </div>
              </div>
              <p className="text-sm text-text-muted">
                Soporte a domicilio para familias y usuarios individuales.
                Virus, redes, SmartHome y más.
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {clickFixHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-text-muted"
                  >
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-orange-400"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/productos/novaclick#planes"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-400"
              >
                Ver planes ClickFix
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* ITOn-Demand */}
            <div className="group relative flex flex-col rounded-2xl border border-brand-lavender/25 bg-brand-card/80 p-6 [transform-style:preserve-3d] [transform:rotateY(-4deg)_translateZ(6px)] transition-all duration-300 hover:[transform:rotateY(-1deg)_translateZ(20px)] hover:border-brand-lavender/45 hover:shadow-[0_20px_60px_-16px_rgba(139,92,246,0.35)]">
              {/* Top shimmer */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-lavender/45 to-transparent"
                aria-hidden="true"
              />
              {/* Depth shadow */}
              <div
                className="pointer-events-none absolute inset-x-3 -bottom-2.5 h-full rounded-2xl border border-brand-lavender/8 bg-brand-card/40 [transform:translateZ(-10px)]"
                aria-hidden="true"
              />
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-violet/15 [transform:translateZ(8px)] shadow-[0_4px_16px_-4px_rgba(139,92,246,0.5)] transition-transform duration-300 group-hover:[transform:translateZ(16px)]">
                  <Building2
                    className="h-5 w-5 text-brand-lavender"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="font-display text-base font-bold text-[#f0f8ff]">
                    ITOn-Demand
                  </div>
                  <div className="text-xs text-brand-lavender">
                    Para empresas
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-muted">
                TI gestionado para PyMEs y empresas. Desde soporte básico hasta
                CTO as a Service.
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {itonHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-text-muted"
                  >
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-brand-lavender"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/productos/novaclick#planes"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-violet px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-iris"
              >
                Ver planes ITOn-Demand
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Bottom link */}
          <div className="mt-8 text-center">
            <Button
              href="/productos/novaclick"
              variant="ghost"
              trackingContext={{
                page: "home",
                section: "novaclick-spotlight",
                ctaLabel: "conocer_novaclick",
                destination: "/productos/novaclick",
                intent: "explore",
              }}
            >
              Conocer NovaClick completo →
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    </div>
  );
}
