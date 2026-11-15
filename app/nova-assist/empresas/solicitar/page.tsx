import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ContactForm } from "@/components/shared/ui/ContactForm";
import { businessServiceBySlug } from "@/data/nova-assist-business";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({ title: "Solicitar asesoría | Nova Assist Business", description: "Comparte tu necesidad empresarial con Nova Assist.", path: "/nova-assist/empresas/solicitar" }),
  robots: { index: false, follow: false },
};

export default async function BusinessRequestPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const slug = (await searchParams).service;
  const service = slug ? businessServiceBySlug[slug] : undefined;
  return <SectionWrapper className="pt-12"><Container>
    <Link href={service ? `/nova-assist/empresas/${service.slug}` : "/nova-assist/empresas"} className="text-sm text-sky-100">← Volver a servicios empresariales</Link>
    <div className="mt-7 grid gap-8 lg:grid-cols-[0.8fr_1fr]"><div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">Hablar con Nova Assist</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white">Cuéntanos qué necesita tu empresa.</h1>
      <p className="mt-4 text-sm leading-6 text-text-muted">Revisaremos la necesidad y confirmaremos el alcance antes de avanzar. No incluyas credenciales, tokens, IP internas ni información de tarjeta.</p>
      {service && <p className="mt-5 rounded-xl border border-sky-200/20 p-4 text-white">Servicio: {service.name}</p>}
    </div><div className="rounded-3xl border border-white/10 bg-[#0b1730]/80 p-6 sm:p-8"><ContactForm variant="business" plan={service ? `nova-assist-business-${service.slug}` : undefined} /></div></div>
  </Container></SectionWrapper>;
}
