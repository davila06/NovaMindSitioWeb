import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { novaAssistServiceBySlug } from "@/data/nova-assist";
import { ContactForm } from "@/components/shared/ui/ContactForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Solicitar ayuda tecnológica | Nova Assist",
    description:
      "Cuéntanos qué necesitas y qué dispositivo presenta el problema. Nova Assist confirmará alcance y disponibilidad antes de coordinar.",
    path: "/nova-assist/solicitar",
  }),
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function NovaAssistRequestPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const selectedService = typeof service === "string" ? novaAssistServiceBySlug[service] : undefined;

  return (
    <SectionWrapper className="pt-12 sm:pt-16">
      <Container>
        <Link href={selectedService ? `/nova-assist/${selectedService.slug}` : "/nova-assist"} className="inline-flex min-h-10 items-center gap-2 text-sm text-text-muted hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{selectedService ? `Volver a ${selectedService.name}` : "Volver a Nova Assist"}</Link>
        <div className="mt-7 grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div className="lg:pt-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Solicitar ayuda</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl">Cuéntanos qué necesitas.</h1>
            <p className="mt-4 text-base leading-7 text-text-muted">Recibimos tu solicitud, revisamos el contexto y te contactamos para confirmar los siguientes pasos, la disponibilidad y el alcance antes de coordinar.</p>
            {selectedService && <div className="mt-5 rounded-2xl border border-orange-200/20 bg-orange-300/5 p-4"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-200">Servicio seleccionado</p><p className="mt-1 font-semibold text-white">{selectedService.name}</p><p className="mt-1 text-sm text-text-muted">{selectedService.duration}</p></div>}
            <div className="mt-6 flex gap-3 rounded-2xl border border-sky-200/15 bg-sky-950/10 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-200" aria-hidden="true" />
              <p className="text-sm leading-6 text-text-muted">No compartas contraseñas, PIN, códigos MFA, contraseñas bancarias ni datos de tarjeta. Solo pedimos la información necesaria para entender tu solicitud.</p>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#0b1730]/80 p-5 shadow-[0_24px_70px_-35px_rgba(0,0,0,0.9)] sm:p-8">
            <ContactForm variant="service-request" service={selectedService?.slug} />
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
