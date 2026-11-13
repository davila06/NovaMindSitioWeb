import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Privacidad y seguridad del servicio | Nova Assist",
    description:
      "Conoce cómo Nova Assist limita el acceso a la información durante un servicio y qué datos nunca debes compartir con un técnico.",
    path: "/nova-assist/privacidad",
  }),
  robots: { index: false, follow: true },
};

// LEGAL_REVIEW: Confirm this service-specific notice, retention schedule, and legal basis before representing it as the complete privacy policy.
const privacyPrinciples = [
  { title: "Acceso necesario y autorizado", text: "El técnico accede únicamente a la información necesaria para realizar el servicio que autorizaste. El soporte remoto requiere autorización, se limita al incidente y no implica acceso permanente." },
  { title: "No conservar credenciales", text: "Nova Assist no debe solicitar ni guardar contraseñas. Nunca compartas contraseñas bancarias, PIN, códigos MFA, códigos privados ni datos completos de tarjetas." },
  { title: "Tus archivos siguen siendo tuyos", text: "No se deben copiar archivos sin autorización ni revisar información personal que no esté relacionada con el servicio. Las copias necesarias para un trabajo deben acordarse contigo previamente." },
  { title: "Confidencialidad durante la atención", text: "La información observada durante la intervención no debe fotografiarse sin necesidad ni compartirse fuera de quienes deban atender el servicio." },
  { title: "Solicitud de ayuda", text: "El formulario solicita datos de contacto y una descripción del problema para revisar la solicitud. No incluyas información sensible o credenciales en el mensaje." },
];

export default function NovaAssistPrivacyPage() {
  return (
    <SectionWrapper className="pt-12 sm:pt-16">
      <Container className="max-w-4xl">
        <nav aria-label="Ruta de navegación" className="text-xs text-text-subtle"><Link href="/nova-assist" className="hover:text-white">Nova Assist</Link> / <span aria-current="page">Privacidad</span></nav>
        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">Privacidad y seguridad</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl">Tú mantienes el control de tus datos.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-text-muted">Durante un servicio, la información debe mantenerse dentro del alcance autorizado y limitarse a lo necesario para atender tu solicitud.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {privacyPrinciples.map((item, index) => <article key={item.title} className={`rounded-3xl border p-5 sm:p-6 ${index === 0 ? "border-sky-200/20 bg-sky-950/15 sm:col-span-2" : "border-white/10 bg-[#0b1730]/55"}`}><h2 className="font-display text-lg font-semibold text-white">{item.title}</h2><p className="mt-2 text-sm leading-6 text-text-muted">{item.text}</p></article>)}
        </div>
        <div className="mt-8 rounded-3xl border border-orange-200/25 bg-orange-950/15 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-white">Seguridad bancaria</h2>
          <p className="mt-3 text-base leading-7 text-slate-200">Nova Assist nunca te solicitará tu contraseña bancaria, PIN o códigos privados para realizar soporte tecnológico. El técnico puede orientarte en una configuración legítima, pero tú mantienes el control de tus credenciales.</p>
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b1730]/45 p-5">
          <h2 className="font-semibold text-white">Política general del sitio</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">Para conocer los canales para ejercer derechos sobre tus datos y el tratamiento general de información del sitio, consulta la <Link href="/privacidad" className="text-sky-100 underline underline-offset-4">política de privacidad de NovaMind Global</Link> o escribe a <a href="mailto:privacidad@novamindglobalcr.com" className="text-sky-100 underline underline-offset-4">privacidad@novamindglobalcr.com</a>.</p>
          <p className="mt-2 text-xs leading-5 text-text-subtle">La política general complementa estos principios del servicio. No envíes información sensible en el formulario de soporte.</p>
        </div>
      </Container>
    </SectionWrapper>
  );
}
