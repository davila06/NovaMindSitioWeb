import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ServiceViewEvent } from "@/components/nova-assist/ServiceViewEvent";
import { TrackedLink } from "@/components/nova-assist/TrackedLink";
import { businessServiceBySlug, businessServices } from "@/data/nova-assist-business";
import { createPageMetadata, siteConfig } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return businessServices.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = businessServiceBySlug[(await params).slug];
  if (!service) return {};
  return createPageMetadata({ title: `${service.name} | Nova Assist Business`, description: service.description, path: `/nova-assist/empresas/${service.slug}`, extraKeywords: service.keywords });
}

export default async function BusinessServicePage({ params }: Props) {
  const service = businessServiceBySlug[(await params).slug];
  if (!service) notFound();
  const url = `${siteConfig.url}/nova-assist/empresas/${service.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: service.name, description: service.description, url, provider: { "@id": `${siteConfig.url}/#organization` } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Nova Assist", item: `${siteConfig.url}/nova-assist` },
        { "@type": "ListItem", position: 2, name: "Empresas", item: `${siteConfig.url}/nova-assist/empresas` },
        { "@type": "ListItem", position: 3, name: service.name, item: url },
      ] },
      { "@type": "FAQPage", mainEntity: service.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };
  const requestHref = service.slug === "it-health-check" ? "/nova-assist/empresas/health-check" : `/nova-assist/empresas/solicitar?service=${service.slug}`;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <ServiceViewEvent service={service.slug} business />
    <SectionWrapper className="pb-8 pt-12 sm:pt-16"><Container>
      <nav aria-label="Ruta de navegación" className="text-xs text-text-subtle"><Link href="/nova-assist">Nova Assist</Link> / <Link href="/nova-assist/empresas">Empresas</Link> / <span aria-current="page">{service.name}</span></nav>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.7fr]">
        <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">Nova Assist Business</p><h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-6xl">{service.name}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-white">{service.tagline}</p><p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">{service.description}</p>
          <TrackedLink event="service_cta_clicked" segment="business" position="detail" serviceId={service.slug} href={requestHref} className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-sky-200 px-5 py-3 font-bold text-slate-950 hover:bg-white">{service.cta}</TrackedLink>
        </div>
        <aside className="rounded-3xl border border-sky-200/20 bg-[#10263c] p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">¿Para quién?</p><p className="mt-3 text-white">{service.audience}</p><p className="mt-4 text-sm leading-6 text-text-muted">El alcance y las condiciones se definen en la propuesta. No compartas contraseñas ni datos sensibles.</p></aside>
      </div>
    </Container></SectionWrapper>
    <SectionWrapper className="py-8"><Container><div className="grid gap-5 lg:grid-cols-2">
      {([["Qué incluye", service.included], ["Qué no incluye", service.excluded]] as const).map(([title, items]) => <section key={title} className="rounded-3xl border border-white/10 bg-[#0b1730]/75 p-6 sm:p-8"><h2 className="font-display text-2xl font-bold text-white">{title}</h2><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="text-sm leading-6 text-text-muted">· {item}</li>)}</ul></section>)}
    </div></Container></SectionWrapper>
    <SectionWrapper className="py-8"><Container><div className="grid gap-8 lg:grid-cols-2">
      <section><h2 className="font-display text-2xl font-bold text-white">Capacidades</h2><ul className="mt-4 space-y-3">{service.capabilities.map((item) => <li key={item} className="rounded-xl border border-white/10 p-4 text-sm text-text-muted">{item}</li>)}</ul></section>
      <section><h2 className="font-display text-2xl font-bold text-white">Casos de uso</h2><ul className="mt-4 space-y-3">{service.useCases.map((item) => <li key={item} className="rounded-xl border border-sky-200/15 bg-sky-200/5 p-4 text-sm text-text-muted">{item}</li>)}</ul>
        {service.process && <><h2 className="mt-8 font-display text-2xl font-bold text-white">Proceso orientativo</h2><ol className="mt-4 flex flex-wrap gap-2">{service.process.map((step) => <li key={step} className="rounded-full border border-sky-200/25 px-3 py-2 text-xs text-sky-100">{step}</li>)}</ol></>}
      </section>
    </div></Container></SectionWrapper>
    <SectionWrapper className="py-8"><Container><section><h2 className="font-display text-2xl font-bold text-white">Preguntas frecuentes</h2>{service.faq.map((item) => <details key={item.question} className="mt-3 rounded-xl border border-white/10 p-4 text-text-muted"><summary className="cursor-pointer font-semibold text-white">{item.question}</summary><p className="mt-3 text-sm leading-6">{item.answer}</p></details>)}</section>
      <section className="mt-10"><h2 className="font-display text-2xl font-bold text-white">Servicios relacionados</h2><div className="mt-4 flex flex-wrap gap-3">{service.relatedServices.map((slug) => <Link key={slug} href={`/nova-assist/empresas/${slug}`} className="rounded-xl border border-white/15 px-4 py-3 text-sm text-sky-100 hover:bg-white/5">{businessServiceBySlug[slug].name}</Link>)}</div></section>
      {(service.slug === "business" || service.slug === "business-pro") && <Link href="/nova-assist/empresas/comparar" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-sky-100">Comparar Business y Business Pro →</Link>}
    </Container></SectionWrapper>
  </>;
}
