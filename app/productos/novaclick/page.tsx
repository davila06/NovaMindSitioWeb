import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Globe2, LineChart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/shared/ui/Button";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "NovaClick: sitios web y comercio digital | Novamind",
  description:
    "Diseño y desarrollo de sitios web, tiendas en línea y presencia digital para profesionales y PYMES en Costa Rica.",
  path: "/productos/novaclick",
  extraKeywords: [
    "diseño de páginas web Costa Rica",
    "tiendas en línea Costa Rica",
    "presencia digital para PYMES",
    "desarrollo web para profesionales",
  ],
});

const offers = [
  {
    name: "NovaClick Start",
    eyebrow: "Lanzar",
    description:
      "Una presencia profesional para explicar tu oferta y facilitar el contacto.",
    icon: Globe2,
    includes: [
      "Landing o sitio informativo",
      "Formulario y acceso a WhatsApp",
      "Diseño adaptable a móvil",
      "Configuración SEO inicial",
    ],
  },
  {
    name: "NovaClick Business",
    eyebrow: "Crecer",
    description:
      "Un sitio para comunicar, publicar contenido y convertir visitas en oportunidades.",
    icon: LineChart,
    includes: [
      "Sitio multipágina según alcance",
      "Secciones de servicios y captación",
      "Analítica y presencia local",
      "Capacitación para actualización de contenido",
    ],
  },
  {
    name: "NovaClick Commerce",
    eyebrow: "Vender",
    description:
      "Una tienda digital diseñada alrededor de tu catálogo y proceso de venta.",
    icon: ShoppingBag,
    includes: [
      "Catálogo y páginas de producto",
      "Carrito y flujo de compra",
      "Integraciones definidas en discovery",
      "Preparación para operar y medir",
    ],
  },
];

export default function NovaClickPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "NovaClick",
    serviceType: "Diseño web y comercio electrónico",
    description:
      "Servicios de presencia digital, creación de sitios web y comercio electrónico para profesionales y PYMES.",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "Costa Rica" },
    url: `${siteConfig.url}/productos/novaclick`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SectionWrapper className="pb-10 pt-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.75fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-lavender">
                NovaClick · Presencia digital
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#f0f8ff] sm:text-5xl lg:text-6xl">
                Tu negocio merece una presencia digital que trabaje contigo.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-7 text-text-muted">
                Diseñamos y desarrollamos sitios web y comercio electrónico para
                profesionales y PYMES en Costa Rica. Alcance, contenido,
                integraciones y costos se acuerdan antes de iniciar.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  href="/contacto?plan=novaclick-web"
                  trackingContext={{
                    page: "novaclick",
                    section: "hero",
                    ctaLabel: "cotizar_sitio_web",
                    destination: "/contacto?plan=novaclick-web",
                    intent: "consultation",
                  }}
                >
                  Conversar sobre mi sitio
                </Button>
                <Button href="#soluciones" variant="ghost">
                  Ver soluciones
                </Button>
              </div>
              <p className="mt-4 text-xs leading-5 text-text-subtle">
                Dominio, hosting, licencias, pasarelas de pago y servicios de
                terceros se cotizan por separado.
              </p>
            </div>
            <div className="rounded-3xl border border-brand-lavender/15 bg-[radial-gradient(ellipse_at_75%_15%,rgba(129,140,248,0.16),transparent_42%),linear-gradient(145deg,rgba(18,23,45,0.88),rgba(7,11,24,0.96))] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
                Del primer contacto al lanzamiento
              </p>
              <ol className="mt-7 space-y-5">
                {[
                  ["01", "Aterrizamos objetivos, audiencia y alcance."],
                  ["02", "Diseñamos la experiencia y validamos contenido."],
                  ["03", "Construimos, revisamos y preparamos el lanzamiento."],
                  ["04", "Definimos el acompañamiento posterior, si aplica."],
                ].map(([step, description]) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-display text-sm font-bold text-brand-lavender">
                      {step}
                    </span>
                    <p className="text-sm leading-6 text-text-muted">
                      {description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper id="soluciones">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Soluciones NovaClick
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
              Un alcance acorde a la etapa de tu negocio.
            </h2>
            <p className="mt-3 text-sm leading-6 text-text-muted">
              Estos paquetes describen puntos de partida; la propuesta final
              detalla entregables, límites, revisiones y dependencias.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {offers.map(({ icon: Icon, ...offer }, index) => (
              <article
                key={offer.name}
                className={`flex flex-col rounded-2xl border bg-brand-card/65 p-6 ${
                  index === 1
                    ? "border-brand-lavender/30"
                    : "border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-lavender">
                    {offer.eyebrow}
                  </span>
                  <Icon
                    className="h-5 w-5 text-brand-lavender"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-[#f0f8ff]">
                  {offer.name}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-text-muted">
                  {offer.description}
                </p>
                <ul className="mt-5 flex-1 space-y-3">
                  {offer.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-5 text-text-muted"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-lavender"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={
                    index === 2
                      ? "/contacto?plan=novaclick-commerce"
                      : "/contacto?plan=novaclick-web"
                  }
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-lavender"
                >
                  Solicitar una propuesta
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container>
          <div className="rounded-3xl border border-brand-lavender/15 bg-brand-card/55 p-7 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-[#f0f8ff]">
              Qué definimos antes de comenzar
            </h2>
            <div className="mt-6 grid gap-5 text-sm leading-6 text-text-muted sm:grid-cols-2">
              <p>
                Objetivos, mapa del sitio, materiales que aporta cada parte,
                integraciones, fechas, rondas de revisión y criterios de
                aceptación.
              </p>
              <p>
                Cambios de alcance, contenido adicional, licencias y
                mantenimiento se cotizan explícitamente; no se asume trabajo
                ilimitado ni servicios recurrentes implícitos.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/contacto?plan=novaclick-web">
                Solicitar diagnóstico inicial
              </Button>
              <Button href="/empresas" variant="ghost">
                Ver todas las soluciones B2B
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
