import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnalyticsEvent } from "@/components/nova-assist/AnalyticsEvent";
import { businessServiceBySlug } from "@/data/nova-assist-business";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Comparar Business y Business Pro | Nova Assist",
  description: "Compara soporte recurrente y gestión preventiva para elegir una conversación inicial con Nova Assist.",
  path: "/nova-assist/empresas/comparar",
});

export default function CompareBusinessPage() {
  const plans = [businessServiceBySlug.business, businessServiceBySlug["business-pro"]];
  return <SectionWrapper className="pt-12"><Container>
    <AnalyticsEvent event="plan_comparison_viewed" segment="business" />
    <Link href="/nova-assist/empresas" className="text-sm text-sky-100">← Volver a empresas</Link>
    <h1 className="mt-6 font-display text-4xl font-bold text-white">Business o Business Pro</h1>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-text-muted">La propuesta confirma alcance y condiciones. Business Pro incluye las capacidades de Business según el servicio contratado y suma gestión preventiva.</p>
    <div className="mt-8 grid gap-5 md:grid-cols-2">{plans.map((plan) => <section key={plan.slug} className="rounded-3xl border border-white/10 bg-[#0b1730]/80 p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-white">{plan.name}</h2><p className="mt-3 text-sm text-text-muted">{plan.audience}</p>
      <ul className="mt-6 space-y-3">{plan.capabilities.map((item) => <li key={item} className="text-sm leading-6 text-text-muted">· {item}</li>)}</ul>
      <Link href={`/nova-assist/empresas/${plan.slug}`} className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-sky-200 px-5 py-3 text-sm font-bold text-slate-950">Conocer {plan.name}</Link>
    </section>)}</div>
  </Container></SectionWrapper>;
}
