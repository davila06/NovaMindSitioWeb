import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BusinessHealthCheck } from "@/components/nova-assist/BusinessHealthCheck";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({ title: "IT Health Check | Nova Assist", description: "Comparte contexto general para orientar una conversación inicial sobre la tecnología de tu empresa.", path: "/nova-assist/empresas/health-check" }),
  robots: { index: false, follow: false },
};

export default function HealthCheckPage() {
  return <SectionWrapper className="pt-12"><Container>
    <Link href="/nova-assist/empresas/it-health-check" className="text-sm text-sky-100">← Volver a IT Health Check</Link>
    <h1 className="mt-6 font-display text-4xl font-bold text-white">Conozcamos tu entorno.</h1>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">Esta orientación no es una auditoría ni genera una puntuación de seguridad. La solicitud se envía solo cuando la confirmes.</p>
    <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1730]/80 p-6 sm:p-8"><BusinessHealthCheck /></div>
  </Container></SectionWrapper>;
}
