import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, CircleHelp, ShieldCheck, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ServiceViewEvent } from "@/components/nova-assist/ServiceViewEvent";
import {
  additionalPlanExclusions,
  novaAssistFaq,
  novaAssistServiceBySlug,
  novaAssistServices,
  serviceFaqQuestions,
} from "@/data/nova-assist";
import { createPageMetadata, siteConfig } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return novaAssistServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = novaAssistServiceBySlug[slug];
  if (!service) return {};
  return createPageMetadata({
    title: `${service.name} | Nova Assist Costa Rica`,
    description: `${service.tagline} Revisa qué incluye, sus límites y las exclusiones antes de solicitar ayuda a Nova Assist.`,
    path: `/nova-assist/${service.slug}`,
    extraKeywords: ["soporte técnico Costa Rica", service.name, "soporte tecnológico hogar"],
  });
}

export default async function NovaAssistServicePage({ params }: Props) {
  const { slug } = await params;
  const service = novaAssistServiceBySlug[slug];
  if (!service) notFound();

  const serviceQuestions = serviceFaqQuestions[service.slug] ?? [];
  const relevantFaq = serviceQuestions
    .map((question) => novaAssistFaq.find((item) => item.question === question))
    .filter((item) => item !== undefined);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/nova-assist/${service.slug}#service`,
        name: service.name,
        serviceType: service.category,
        description: service.problem,
        provider: { "@id": `${siteConfig.url}/#organization` },
        url: `${siteConfig.url}/nova-assist/${service.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteConfig.url}/` },
          { "@type": "ListItem", position: 2, name: "Nova Assist", item: `${siteConfig.url}/nova-assist` },
          { "@type": "ListItem", position: 3, name: service.name, item: `${siteConfig.url}/nova-assist/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ServiceViewEvent service={service.slug} />
      <SectionWrapper className="pb-8 pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Ruta de navegación" className="text-xs text-text-subtle">
            <Link href="/nova-assist" className="hover:text-white">Nova Assist</Link> / <Link href="/nova-assist/servicios" className="hover:text-white">Servicios</Link> / <span aria-current="page">{service.name}</span>
          </nav>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">{service.category}</p>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-6xl">{service.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-text-muted">{service.problem}</p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-text-subtle">{service.audience}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={`/nova-assist/solicitar?service=${service.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-300 px-5 py-3 text-sm font-bold text-[#17100a] hover:bg-orange-200">
                  Solicitar {service.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/nova-assist/como-funciona" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">Cómo funciona</Link>
              </div>
            </div>
            <aside className="rounded-3xl border border-orange-200/20 bg-[radial-gradient(circle_at_100%_0%,rgba(249,115,22,0.16),transparent_50%),#0b1730] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">Duración y límites</p>
              <p className="mt-3 font-display text-xl font-bold text-white">{service.duration}</p>
              <ul className="mt-4 space-y-2">
                {service.limits.map((limit) => <li key={limit} className="flex gap-2 text-sm leading-5 text-text-muted"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-200" aria-hidden="true" />{limit}</li>)}
              </ul>
            </aside>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper className="py-8 sm:py-12">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <section className="rounded-3xl border border-emerald-200/15 bg-emerald-950/15 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white"><Check className="h-5 w-5 text-emerald-300" aria-hidden="true" />Qué incluye</h2>
              <ul className="mt-6 space-y-4">
                {service.includes.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />{item}</li>)}
              </ul>
            </section>
            <section className="rounded-3xl border border-rose-200/15 bg-rose-950/10 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white"><X className="h-5 w-5 text-rose-300" aria-hidden="true" />Qué no incluye</h2>
              <ul className="mt-6 space-y-4">
                {service.excludes.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200"><X className="mt-1 h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />{item}</li>)}
              </ul>
            </section>
          </div>
        </Container>
      </SectionWrapper>

      {(service.slug === "plan-familia" || service.slug === "total-home") && (
        <SectionWrapper className="py-8">
          <Container>
            <div className="rounded-3xl border border-white/10 bg-[#0b1730]/65 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-white">Exclusiones aplicables a planes residenciales</h2>
              <p className="mt-2 text-sm leading-6 text-text-muted">Repuestos, licencias y especialidades no forman parte de la suscripción.</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {Object.entries(additionalPlanExclusions).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold capitalize text-orange-100">{category === "hardware" ? "Hardware" : category === "licenses" ? "Licencias y suscripciones" : "Trabajo especializado"}</h3>
                    <ul className="mt-2 space-y-1.5 text-xs leading-5 text-text-subtle">{items.map((item) => <li key={item}>· {item}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </SectionWrapper>
      )}

      {service.slug === "gamer" && (
        <SectionWrapper className="py-8">
          <Container>
            <div className="rounded-2xl border border-sky-200/20 bg-sky-950/15 p-5 text-sm leading-6 text-sky-50">
              Optimizamos los factores del equipo y la red local que pueden afectar tu experiencia. El resultado también depende del hardware, Internet, el juego y los servidores externos. No garantizamos FPS ni ping.
            </div>
          </Container>
        </SectionWrapper>
      )}

      {service.slug === "senior" && (
        <SectionWrapper className="py-8">
          <Container>
            <div className="rounded-3xl border border-orange-200/20 bg-orange-950/15 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white"><ShieldCheck className="h-5 w-5 text-orange-200" aria-hidden="true" />Tu seguridad bancaria es tuya</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-200">Nova Assist nunca te solicitará tu contraseña bancaria, PIN o códigos privados para realizar soporte. Te enseñamos y configuramos; tú mantienes siempre el control de tus cuentas.</p>
            </div>
          </Container>
        </SectionWrapper>
      )}

      <SectionWrapper className="py-8 sm:py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1fr]">
            <div className="rounded-3xl border border-orange-200/15 bg-orange-300/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">¿Conviene otra modalidad?</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-white">El servicio adecuado depende de lo que necesitas.</h2>
              <p className="mt-3 text-sm leading-6 text-text-muted">{service.whenToChooseAnother}</p>
              <Link href="/nova-assist/servicios" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-100 hover:text-white">Ver todos los servicios <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <section>
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white"><CircleHelp className="h-5 w-5 text-sky-200" aria-hidden="true" />Preguntas frecuentes</h2>
              <div className="mt-4 space-y-2">
                {relevantFaq.map((item) => <details key={item.question} className="group rounded-2xl border border-white/10 bg-[#0b1730]/55 p-4">
                  <summary className="min-h-8 cursor-pointer list-none pr-6 text-sm font-semibold text-white marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-200">{item.question}</summary>
                  <p className="mt-3 text-sm leading-6 text-text-muted">{item.answer}</p>
                </details>)}
              </div>
              <Link href="/nova-assist/preguntas-frecuentes" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-sky-100 hover:text-white">Ver todas las preguntas <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </section>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper className="pb-12 pt-6 sm:pb-16">
        <Container>
          <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#0b1730]/75 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">¿Listo para solicitar ayuda?</h2>
              <p className="mt-2 text-sm text-text-muted">Revisamos contigo el alcance, la zona y la disponibilidad antes de coordinar.</p>
            </div>
            <Link href={`/nova-assist/solicitar?service=${service.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-300 px-5 py-3 text-sm font-bold text-[#17100a] hover:bg-orange-200">Solicitar servicio <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <p className="mt-5 text-center text-xs text-text-subtle">Sin sorpresas. Cualquier trabajo adicional facturable requiere tu autorización.</p>
        </Container>
      </SectionWrapper>
    </>
  );
}
