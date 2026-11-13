import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { planPolicies } from "@/data/nova-assist";
import { AnalyticsEvent } from "@/components/nova-assist/AnalyticsEvent";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Plan Familia o Total Home | Compara Nova Assist",
  description:
    "Compara dispositivos, usuarios, horas, visitas y seguimiento preventivo de Plan Familia y Total Home de Nova Assist.",
  path: "/nova-assist/comparar",
  extraKeywords: ["soporte tecnológico familiar", "soporte técnico para el hogar"],
});

const rows: Array<{ label: string; family: string; total: string }> = [
  { label: "Dispositivos registrados", family: `Hasta ${planPolicies.family.maxDevices}`, total: `Hasta ${planPolicies.totalHome.maxDevices}` },
  { label: "Usuarios residentes", family: `Hasta ${planPolicies.family.maxUsers}`, total: `Hasta ${planPolicies.totalHome.maxUsers}` },
  { label: "Soporte remoto al mes", family: `${planPolicies.family.remoteHours} horas`, total: `${planPolicies.totalHome.remoteHours} horas` },
  { label: "Duración de cada sesión remota", family: `Hasta ${planPolicies.family.remoteSessionMinutes} min`, total: `Hasta ${planPolicies.totalHome.remoteSessionMinutes} min` },
  { label: "Visitas al mes", family: String(planPolicies.family.visitsPerMonth), total: String(planPolicies.totalHome.visitsPerMonth) },
  { label: "Duración máxima por visita", family: `Hasta ${planPolicies.family.visitMinutes} min`, total: `Hasta ${planPolicies.totalHome.visitMinutes} min` },
  { label: "Objetivo de primera respuesta", family: `Hasta ${planPolicies.family.responseTargetBusinessHours} h laborales`, total: `Hasta ${planPolicies.totalHome.responseTargetBusinessHours} h laborales` },
  { label: "Atención prioritaria", family: "—", total: "Sí" },
  { label: "Mantenimiento", family: "Preventivo básico", total: "Preventivo ampliado" },
  { label: "Seguridad", family: "Básica", total: "Seguimiento ampliado" },
  { label: "Respaldos", family: "Configuración y verificación básica", total: "Configuración, verificación y seguimiento" },
  { label: "Controles parentales", family: "Cuando corresponda", total: "Cuando corresponda" },
  { label: "Historial de incidencias", family: "Sí", total: "Sí, con seguimiento" },
  { label: "Inventario y lifecycle", family: "—", total: "Sí" },
  { label: "Home Technology Profile", family: "—", total: "Sí" },
  { label: "Técnico principal", family: "No especificado", total: "Sujeto a disponibilidad" },
];

const comparisonSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteConfig.url}/` },
    { "@type": "ListItem", position: 2, name: "Nova Assist", item: `${siteConfig.url}/nova-assist` },
    { "@type": "ListItem", position: 3, name: "Comparar planes", item: `${siteConfig.url}/nova-assist/comparar` },
  ],
};

export default function ComparePlansPage() {
  return (
    <>
      <AnalyticsEvent event="plan_compare" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <SectionWrapper className="pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Ruta de navegación" className="text-xs text-text-subtle"><Link href="/nova-assist" className="hover:text-white">Nova Assist</Link> / <span aria-current="page">Comparar planes</span></nav>
          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Comparador de planes</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl">¿Plan Familia o Total Home?</h1>
            <p className="mt-4 text-base leading-7 text-text-muted">Familia te ayuda cuando lo necesitas. Total Home agrega administración preventiva y seguimiento de la tecnología de tu hogar.</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-[#0b1730]/65 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Ayuda cuando la necesitas</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">Plan Familia</h2>
              <p className="mt-3 text-sm leading-6 text-text-muted">Soporte tecnológico continuo para mantener los dispositivos de tu familia funcionando, actualizados, protegidos y respaldados.</p>
              <Link href="/nova-assist/plan-familia" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky-100">Ver Plan Familia <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </article>
            <article className="rounded-3xl border border-orange-200/30 bg-[radial-gradient(circle_at_100%_0%,rgba(249,115,22,0.12),transparent_45%),#0b1730] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">Seguimiento preventivo</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">Total Home</h2>
              <p className="mt-3 text-sm leading-6 text-text-muted">Administración preventiva del entorno tecnológico: inventario, red doméstica, respaldos, salud de dispositivos e historial.</p>
              <Link href="/nova-assist/total-home" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-orange-100">Ver Total Home <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </article>
          </div>

          <div className="mt-8 grid gap-3 md:hidden">
            {rows.map((row) => (
              <article key={row.label} className="rounded-2xl border border-white/10 bg-[#0b1730]/65 p-4">
                <h2 className="text-sm font-semibold text-white">{row.label}</h2>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div><dt className="text-sky-200">Plan Familia</dt><dd className="mt-1 leading-5 text-slate-200">{row.family}</dd></div>
                  <div><dt className="text-orange-200">Total Home</dt><dd className="mt-1 leading-5 text-slate-200">{row.total}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <div className="mt-8 hidden overflow-hidden rounded-3xl border border-white/10 md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Comparación de características de Plan Familia y Total Home</caption>
              <thead className="bg-white/[0.04]">
                <tr>
                  <th scope="col" className="w-[36%] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-text-subtle sm:px-6">Característica</th>
                  <th scope="col" className="px-4 py-4 text-sm font-bold text-white sm:px-6">Plan Familia</th>
                  <th scope="col" className="px-4 py-4 text-sm font-bold text-orange-100 sm:px-6">Total Home</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-white/10 odd:bg-[#0b1730]/55">
                    <th scope="row" className="px-4 py-4 text-xs font-medium leading-5 text-text-muted sm:px-6 sm:text-sm">{row.label}</th>
                    <td className="px-4 py-4 text-xs leading-5 text-slate-200 sm:px-6 sm:text-sm">{row.family}</td>
                    <td className="px-4 py-4 text-xs leading-5 text-slate-200 sm:px-6 sm:text-sm">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-5 text-text-subtle">El objetivo de primera respuesta indica recepción, clasificación e inicio de coordinación; no es un objetivo de resolución. Las horas y visitas no utilizadas no se acumulan.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              { title: "Familia es ideal si…", text: "Quieres tener ayuda disponible para los problemas tecnológicos cotidianos." },
              { title: "Total Home es ideal si…", text: "Quieres que Nova Assist dé seguimiento preventivo a la tecnología de tu hogar." },
            ].map((item) => <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0b1730]/50 p-5"><h2 className="flex items-center gap-2 font-semibold text-white"><Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />{item.title}</h2><p className="mt-2 text-sm leading-6 text-text-muted">{item.text}</p></div>)}
          </div>
          <div className="mt-8 rounded-2xl border border-orange-200/15 bg-orange-300/5 p-5">
            <h2 className="font-semibold text-white">Ambos planes tienen límites claros</h2>
            <p className="mt-2 text-sm leading-6 text-text-muted">Son residenciales. No incluyen hardware, licencias, almacenamiento cloud, reparación electrónica ni necesidades empresariales. <Link className="text-orange-100 underline underline-offset-4" href="/nova-assist/terminos">Consulta términos y uso</Link>.</p>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-orange-100"><X className="h-4 w-4" aria-hidden="true" />No se cobra trabajo adicional sin informarte y recibir tu autorización.</p>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
