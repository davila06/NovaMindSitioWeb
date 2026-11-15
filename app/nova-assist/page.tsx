import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ServiceCard } from "@/components/nova-assist/ServiceCard";
import { ServiceSelector } from "@/components/nova-assist/ServiceSelector";
import { AnalyticsEvent } from "@/components/nova-assist/AnalyticsEvent";
import { TrackedLink } from "@/components/nova-assist/TrackedLink";
import { novaAssistServices } from "@/data/nova-assist";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Nova Assist | Soporte tecnológico claro para tu hogar",
  description:
    "Encuentra soporte tecnológico para computadoras, gaming, adultos mayores y hogares inteligentes. Revisa alcances, límites y opciones residenciales.",
  path: "/nova-assist",
  extraKeywords: [
    "soporte técnico Costa Rica",
    "soporte técnico a domicilio",
    "mantenimiento de computadoras",
    "soporte tecnológico para hogares",
  ],
});

export default function NovaAssistPage() {
  return (
    <>
      <AnalyticsEvent event="nova_assist_landing_view" />
      <SectionWrapper className="pb-8 pt-12 sm:pt-16">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-orange-200/15 bg-[radial-gradient(ellipse_at_82%_15%,rgba(56,189,248,0.16),transparent_30%),radial-gradient(ellipse_at_12%_0%,rgba(249,115,22,0.22),transparent_38%),linear-gradient(130deg,#08101f_5%,#0b1730_58%,#07101d)] px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-0 hidden h-full w-[45%] opacity-60 lg:block">
              <div className="absolute right-24 top-16 h-64 w-64 rounded-full border border-sky-200/20" />
              <div className="absolute right-8 top-28 h-64 w-64 rounded-full border border-orange-200/20" />
              <div className="absolute right-36 top-36 h-48 w-48 rounded-full border border-white/10" />
              <div className="absolute right-44 top-44 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.22),transparent_70%)]" />
            </div>
            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/20 bg-orange-300/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-orange-100">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                NOVA ASSIST · SOPORTE TECNOLÓGICO
              </div>
              <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">
                Nueva tecnología.
                <span className="block text-orange-200">Menos complicaciones.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                Te ayudamos a resolver problemas, mantener tus equipos y cuidar la tecnología de tu hogar.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#selector" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-300 px-5 py-3 text-sm font-bold text-[#17100a] transition hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Encontrar mi servicio <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/nova-assist/servicios" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200">
                  Ver todos los servicios <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 shrink-0 text-sky-200" aria-hidden="true" />
                Sin sorpresas: te explicamos el alcance antes de cualquier trabajo adicional.
              </p>
              <div className="mt-7 border-t border-white/15 pt-5">
                <p className="text-sm font-semibold text-white">¿Cómo podemos ayudarte?</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <TrackedLink event="nova_assist_segment_selected" segment="home" href="#selector" className="inline-flex min-h-11 items-center rounded-xl border border-orange-200/30 px-4 py-2 text-sm font-semibold text-orange-100">Para mi hogar</TrackedLink>
                  <TrackedLink event="nova_assist_segment_selected" segment="business" href="/nova-assist/empresas" className="inline-flex min-h-11 items-center rounded-xl border border-sky-200/30 px-4 py-2 text-sm font-semibold text-sky-100">Para mi empresa</TrackedLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper id="selector" className="py-12 sm:py-16">
        <Container>
          <ServiceSelector />
        </Container>
      </SectionWrapper>

      <SectionWrapper className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Opciones de servicio</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Elige la ayuda que necesitas.</h2>
              <p className="mt-3 text-sm leading-6 text-text-muted">Cada modalidad explica qué incluye, cuáles son sus límites y cuándo conviene elegir otra opción.</p>
            </div>
            <Link href="/nova-assist/comparar" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-orange-100 hover:text-white">
              Comparar Plan Familia y Total Home <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {novaAssistServices.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 rounded-3xl border border-sky-200/15 bg-[linear-gradient(120deg,rgba(56,189,248,0.08),rgba(16,34,66,0.65))] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Un proceso claro</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">Tú mantienes el control durante todo el proceso.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">Detectamos, explicamos y cotizamos cualquier trabajo fuera del alcance. Solo avanzamos cuando lo autorizas.</p>
            </div>
            <Link href="/nova-assist/como-funciona" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-sky-200/25 px-5 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-200/10">
              Cómo funciona <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
