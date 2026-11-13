import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ServiceCard } from "@/components/nova-assist/ServiceCard";
import { novaAssistServices } from "@/data/nova-assist";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Servicios de Nova Assist | Soporte para hogar y empresa",
  description:
    "Explora servicios de soporte tecnológico residencial y empresarial de Nova Assist. Conoce alcances, exclusiones y límites antes de solicitar ayuda.",
  path: "/nova-assist/servicios",
  extraKeywords: ["mantenimiento de computadoras", "configuración WiFi", "soporte tecnológico hogar"],
});

export default function NovaAssistServicesPage() {
  return (
    <SectionWrapper className="pt-12 sm:pt-16">
      <Container>
        <nav aria-label="Ruta de navegación" className="text-xs text-text-subtle">
          <Link href="/nova-assist" className="hover:text-white">Nova Assist</Link> / <span aria-current="page">Servicios</span>
        </nav>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Servicios Nova Assist</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl">Ayuda tecnológica con alcance claro.</h1>
          <p className="mt-4 text-base leading-7 text-text-muted">Compara opciones para resolver un problema, cuidar los dispositivos del hogar o solicitar soporte para una empresa. Los costos y la disponibilidad se confirman antes de avanzar.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/nova-assist#selector" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-orange-300 px-4 py-3 text-sm font-bold text-[#17100a]">Encontrar mi servicio <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/nova-assist/comparar" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white">Comparar planes</Link>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {novaAssistServices.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      </Container>
    </SectionWrapper>
  );
}
