import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Cloud,
  Code2,
  Layers3,
  MonitorCog,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/shared/ui/Button";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Soluciones de tecnología para empresas | Novamind",
  description:
    "SaaS, presencia digital, soporte TI, cloud, seguridad e implementación para PYMES y organizaciones en Costa Rica.",
  path: "/empresas",
  extraKeywords: [
    "servicios tecnológicos para empresas Costa Rica",
    "software empresarial Costa Rica",
    "soporte TI para PYMES",
    "desarrollo web para empresas",
  ],
});

const serviceLines = [
  {
    icon: Code2,
    title: "Presencia digital y comercio",
    description:
      "Sitios web, tiendas en línea y experiencias digitales pensadas para presentar y captar clientes.",
    href: "/productos/novaclick",
    action: "Conocer NovaClick",
  },
  {
    icon: MonitorCog,
    title: "Soporte TI administrado",
    description:
      "Mesa de ayuda, soporte remoto o presencial y administración tecnológica según el alcance acordado.",
    href: "/servicios#servicios-grid",
    action: "Explorar soporte empresarial",
  },
  {
    icon: Cloud,
    title: "Cloud & Security",
    description:
      "Microsoft 365, Azure, seguridad, continuidad y acompañamiento para entornos cloud o híbridos.",
    href: "/servicios#servicios-grid",
    action: "Ver capacidades cloud",
  },
  {
    icon: Bot,
    title: "Consultoría y automatización",
    description:
      "Discovery, arquitectura, IA aplicada y automatización de procesos con alcance y entregables definidos.",
    href: "/servicios#servicios-grid",
    action: "Hablar con un especialista",
  },
  {
    icon: Layers3,
    title: "Implementación de SaaS",
    description:
      "Configuración, migración, integraciones y capacitación separadas de la licencia de producto.",
    href: "/contacto?plan=saas-implementation",
    action: "Solicitar asesoría",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y continuidad",
    description:
      "Evaluaciones y mejoras de seguridad con límites claros; no sustituyen una certificación o pentest.",
    href: "/servicios#servicios-grid",
    action: "Evaluar necesidades",
  },
];

export default function BusinessesPage() {
  return (
    <>
      <SectionWrapper className="pb-8 pt-14">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-brand-lavender/15 bg-[radial-gradient(ellipse_at_78%_10%,rgba(129,140,248,0.16),transparent_40%),linear-gradient(125deg,rgba(15,21,42,0.96),rgba(7,11,24,0.98))] p-7 sm:p-10 lg:p-14">
            <div className="relative max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-lavender">
                Novamind Global · Productos SaaS
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#f0f8ff] sm:text-5xl lg:text-6xl">
                Productos para operar mejor. Servicios para llevarlos a la
                práctica.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-7 text-text-muted">
                Para PYMES y organizaciones en Costa Rica: productos SaaS de
                Novamind Global y servicios profesionales de Nova Assist, con
                alcance y condiciones definidos para cada propuesta.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#servicios">Explorar servicios</Button>
                <Button href="/productos/saas" variant="ghost">
                  Ver productos SaaS
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper id="servicios">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                Servicios de Nova Assist
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
                Alcance definido. Implementación con contexto.
              </h2>
            </div>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-lavender"
            >
              Ver capacidades técnicas
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-text-muted">
            Nova Assist reúne consultoría, implementación y soporte. Las
            licencias y productos SaaS se presentan por separado bajo Novamind
            Global; el alcance de cada servicio se confirma en su propuesta.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceLines.map(({ icon: Icon, ...service }) => (
              <article
                key={service.title}
                className="group flex flex-col rounded-2xl border border-white/8 bg-brand-card/55 p-6 transition hover:-translate-y-1 hover:border-brand-lavender/30 hover:bg-brand-card/80"
              >
                <Icon
                  className="h-5 w-5 text-brand-lavender"
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-display text-xl font-semibold text-[#f0f8ff]">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-text-muted">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-lavender"
                >
                  {service.action}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container>
          <div className="flex flex-col justify-between gap-5 rounded-2xl border border-brand-lavender/15 bg-brand-card/50 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-lavender">
                Productos Novamind
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#f0f8ff]">
                Una licencia SaaS no es lo mismo que implementarla.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">
                Explora plataformas empresariales y conversa con el equipo
                sobre demos, disponibilidad y el estado de cada producto.
              </p>
            </div>
            <Button href="/productos/saas" className="shrink-0">
              Explorar catálogo SaaS
            </Button>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container>
          <div className="rounded-3xl border border-brand-lavender/15 bg-[linear-gradient(120deg,rgba(124,58,237,0.14),rgba(10,14,29,0.85))] p-7 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Un siguiente paso claro
            </p>
            <div className="mt-3 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-display text-3xl font-bold text-[#f0f8ff]">
                  Empecemos por tu operación, no por una demo genérica.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">
                  Cuéntanos el objetivo, los sistemas actuales y el alcance que
                  tienes en mente. Te ayudaremos a identificar la ruta adecuada.
                </p>
              </div>
              <Button href="/contacto?plan=cloud-security" className="shrink-0">
                Conversar con Novamind
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
