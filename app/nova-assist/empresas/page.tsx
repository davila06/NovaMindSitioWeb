import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnalyticsEvent } from "@/components/nova-assist/AnalyticsEvent";
import { BusinessSelector } from "@/components/nova-assist/BusinessSelector";
import { businessServices } from "@/data/nova-assist-business";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Nova Assist Business | Soporte IT para empresas",
  description: "Soporte IT, Microsoft 365, Azure, seguridad y automatización para empresas en Costa Rica, con alcance acordado.",
  path: "/nova-assist/empresas",
  extraKeywords: ["soporte IT empresas Costa Rica", "soporte técnico empresarial", "consultoría cloud Costa Rica"],
});

export default function BusinessPage() {
  return <>
    <AnalyticsEvent event="nova_assist_landing_view" segment="business" />
    <SectionWrapper className="pb-8 pt-12 sm:pt-16"><Container>
      <nav aria-label="Ruta de navegación" className="text-xs text-text-subtle"><Link href="/nova-assist">Nova Assist</Link> / <span aria-current="page">Empresas</span></nav>
      <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-sky-200/20 bg-[radial-gradient(ellipse_at_90%_10%,rgba(56,189,248,0.2),transparent_40%),linear-gradient(125deg,#08101f,#10243a)] px-6 py-12 sm:p-14">
        <div aria-hidden="true" className="absolute -right-20 top-0 h-80 w-80 rounded-full border border-sky-200/20 shadow-[0_0_0_35px_rgba(56,189,248,0.03),0_0_0_75px_rgba(56,189,248,0.03)]" />
        <div className="relative max-w-3xl"><p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-200"><Building2 className="h-4 w-4" aria-hidden="true" /> Nova Assist Business</p>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-6xl">Tecnología que acompaña el crecimiento de tu empresa.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-text-muted">Soporte, nube, seguridad, Microsoft 365, automatización e inteligencia artificial con un equipo que entiende tu negocio.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="#selector" className="rounded-xl bg-sky-200 px-5 py-3 font-bold text-slate-950 hover:bg-white">Encontrar la solución</Link><Link href="/nova-assist/empresas/solicitar" className="rounded-xl border border-white/25 px-5 py-3 font-semibold text-white hover:bg-white/10">Hablar con Nova Assist</Link></div>
        </div>
      </div>
    </Container></SectionWrapper>
    <SectionWrapper id="selector" className="py-12"><Container><BusinessSelector /></Container></SectionWrapper>
    <SectionWrapper className="py-12"><Container>
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">Servicios empresariales</p><h2 className="mt-3 font-display text-3xl font-bold text-white">Una solución para cada etapa.</h2></div><Link href="/nova-assist/empresas/comparar" className="inline-flex min-h-11 items-center gap-2 font-semibold text-sky-100">Comparar Business y Business Pro <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{businessServices.map((service) => <article key={service.slug} className="flex flex-col rounded-3xl border border-white/10 bg-[#0b1730]/80 p-6">
        <h3 className="font-display text-xl font-bold text-white">{service.name}</h3><p className="mt-3 flex-1 text-sm leading-6 text-text-muted">{service.tagline}</p>
        <Link href={`/nova-assist/empresas/${service.slug}`} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-sky-100 hover:text-white">Conocer {service.name} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </article>)}</div>
    </Container></SectionWrapper>
  </>;
}
