import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  Cloud,
  Code2,
  GitBranch,
  Layers3,
  LockKeyhole,
  Network,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { productBySlug } from "@/data/products";
import { solutionAreas } from "@/data/site";
import type { Product } from "@/lib/types";
import type { getBlogPostSummaries } from "@/lib/content";

const problemCards = [
  {
    title: "Automatizar procesos",
    description:
      "Identificar tareas repetitivas y evaluar flujos que puedan organizarse mejor.",
    icon: Workflow,
  },
  {
    title: "Modernizar sistemas",
    description:
      "Revisar plataformas y dependencias antes de definir cambios por etapas.",
    icon: Layers3,
  },
  {
    title: "Integrar información",
    description:
      "Conectar herramientas cuando la compatibilidad y el alcance lo permitan.",
    icon: Network,
  },
  {
    title: "Escalar operaciones",
    description:
      "Alinear procesos y herramientas con las necesidades de cada equipo.",
    icon: Building2,
  },
];

const solutionIcons = {
  automation: Bot,
  cloud: Cloud,
  applications: Building2,
  data: Network,
  engineering: Code2,
  experience: GitBranch,
};

const serviceCards = [
  {
    title: "Advisory & Assessment",
    description:
      "Revisión de necesidades y contexto para orientar los siguientes pasos. IT Health Check no es una auditoría ni genera una puntuación.",
    href: "/nova-assist/empresas/health-check",
    action: "Conocer IT Health Check",
    icon: Search,
  },
  {
    title: "Implementación",
    description:
      "Configuración o desarrollo de componentes acordados para una iniciativa.",
    href: "/empresas",
    action: "Explorar servicios empresariales",
    icon: Code2,
  },
  {
    title: "Modernización",
    description:
      "Evaluación de plataformas, dependencias y opciones según el entorno actual.",
    href: "/servicios",
    action: "Ver capacidades",
    icon: Cloud,
  },
  {
    title: "Managed Services",
    description:
      "Soporte TI y acompañamiento empresarial sujeto al alcance de cada servicio.",
    href: "/nova-assist/empresas",
    action: "Explorar Nova Assist Business",
    icon: ShieldCheck,
  },
];

const featuredProductSlugs = [
  "voicebot",
  "planillascr",
  "ccerp",
] as const;

const featuredProducts = featuredProductSlugs
  .map((slug) => productBySlug[slug])
  .filter((product): product is Product => product !== undefined);

type HomeInsight = Awaited<ReturnType<typeof getBlogPostSummaries>>[number];

export function ProblemsSection() {
  return (
    <SectionWrapper
      aria-labelledby="problems-heading"
      className="enterprise-section-light"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="enterprise-kicker">Problemas que abordamos</p>
          <h2
            id="problems-heading"
            className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-900 sm:text-4xl"
          >
            Problemas que podemos ayudarte a resolver
          </h2>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {problemCards.map(({ title, description, icon: Icon }, index) => (
            <li
              key={title}
              className="enterprise-card min-h-52 p-5 sm:p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-6 font-mono text-xs font-semibold tracking-[0.12em] text-blue-700">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </SectionWrapper>
  );
}

export function SolutionAreasSection() {
  return (
    <SectionWrapper
      aria-labelledby="solutions-heading"
      className="enterprise-section-ink"
    >
      <Container>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-400">
              Áreas de solución
            </p>
            <h2
              id="solutions-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl"
            >
              Áreas de solución
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Tecnología conectada al reto que quieres resolver.
            </p>
          </div>
          <Link
            href="/soluciones"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-cyan-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            Ver todas las soluciones
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {solutionAreas.map((area) => {
            const Icon = solutionIcons[area.icon];
            return (
              <li key={area.title}>
                <Link
                  href={area.href}
                  className="group flex h-full min-h-48 flex-col rounded-xl border border-white/10 bg-white/[0.035] p-5 transition-colors duration-150 hover:border-cyan-400/50 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 sm:p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {area.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">
                    {area.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                    {area.action}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </SectionWrapper>
  );
}

export function NovaAssistServicesSection() {
  return (
    <SectionWrapper
      aria-labelledby="services-heading"
      className="enterprise-section-subtle"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="enterprise-kicker">Servicios de Nova Assist</p>
          <h2
            id="services-heading"
            className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-900 sm:text-4xl"
          >
            Servicios de Nova Assist
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">
            El servicio, sus entregables y sus condiciones se definen en la
            propuesta correspondiente.
          </p>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map(({ title, description, href, action, icon: Icon }) => (
            <li key={title} className="enterprise-card flex min-h-64 flex-col p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                {description}
              </p>
              <Link
                href={href}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                {action}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </SectionWrapper>
  );
}

export function ProductHighlights() {
  return (
    <SectionWrapper
      id="productos-destacados"
      aria-labelledby="featured-products-heading"
      className="enterprise-section-light scroll-mt-24"
    >
      <Container>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="enterprise-kicker">Productos Novamind</p>
            <h2
              id="featured-products-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-900 sm:text-4xl"
            >
              Productos destacados
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Explora algunas de las plataformas del catálogo; el alcance y la
              disponibilidad se confirman por producto.
            </p>
          </div>
          <Link
            href="/productos"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Ver todos los productos
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <li key={product.slug}>
              <Link
                href={`/productos/${product.slug}`}
                className="enterprise-card group flex h-full min-h-64 flex-col overflow-hidden"
              >
                <span className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <span className="font-mono text-xs font-semibold tracking-[0.12em] text-blue-700">
                    PLATAFORMA · 0{index + 1}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-display text-xl font-semibold text-slate-900">
                    {product.name}
                  </span>
                  <span className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {product.shortDescription}
                  </span>
                  <span className="mt-5 text-sm font-semibold text-blue-700">
                    Conocer producto
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </SectionWrapper>
  );
}

export function SecurityTrustSection() {
  return (
    <SectionWrapper
      aria-labelledby="trust-heading"
      className="enterprise-section-subtle"
    >
      <Container>
        <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10 lg:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <LockKeyhole className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="max-w-3xl">
            <p className="enterprise-kicker">Seguridad y confianza</p>
            <h2
              id="trust-heading"
              className="mt-2 font-display text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl"
            >
              Seguridad y confianza
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Consulta las políticas de privacidad y los términos publicados
              para conocer el alcance de la información que se solicita.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <Link
              href="/privacidad"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Privacidad
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/terminos"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Términos
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

export function TechnologyEcosystemSection() {
  return (
    <SectionWrapper
      aria-labelledby="ecosystem-heading"
      className="enterprise-section-ink"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-400">
              Ecosistema tecnológico
            </p>
            <h2
              id="ecosystem-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl"
            >
              Ecosistema tecnológico
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Las integraciones parten de tu entorno actual. La compatibilidad
              con tus sistemas y el alcance de cada iniciativa se revisan antes
              de definir una propuesta.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.035] p-5 sm:p-7">
            <ol className="space-y-4">
              {[
                "Sistemas y procesos actuales",
                "Compatibilidad y alcance por revisar",
                "Entregables y responsabilidades acordadas",
              ].map((item, index) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/25 text-xs font-semibold text-cyan-400">
                    0{index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-6 text-slate-200">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
            <Link
              href="/servicios"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              Conversar sobre una integración
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

export function HomeInsightsSection({ posts }: { posts: HomeInsight[] }) {
  if (posts.length === 0) return null;

  return (
    <SectionWrapper
      aria-labelledby="insights-heading"
      className="enterprise-section-light"
    >
      <Container>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="enterprise-kicker">Ideas y actualidad</p>
            <h2
              id="insights-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-900 sm:text-4xl"
            >
              Insights
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Leer todas las publicaciones
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <InsightCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </SectionWrapper>
  );
}

function InsightCard({ post }: { post: HomeInsight }) {
  return (
    <article className="enterprise-card flex h-full flex-col p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
        {post.category}
      </p>
      <h3 className="mt-4 text-lg font-semibold leading-7 text-slate-900">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {post.summary}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        Leer artículo
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
