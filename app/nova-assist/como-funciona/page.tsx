import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ClipboardList, MessageCircle, Search, ShieldCheck, Wrench } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { additionalWorkSteps } from "@/data/nova-assist";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cómo funciona el soporte de Nova Assist",
  description:
    "Conoce cómo solicitar ayuda a Nova Assist, confirmar alcance y disponibilidad, autorizar trabajos y prepararte para el servicio.",
  path: "/nova-assist/como-funciona",
});

const steps = [
  { icon: MessageCircle, title: "Cuéntanos qué sucede", description: "Comparte una descripción breve y la información necesaria para entender el problema. No envíes contraseñas, PIN ni códigos privados." },
  { icon: Search, title: "Te recomendamos el servicio", description: "Te orientamos según el tipo de problema, dispositivo, preferencia de atención y alcance que necesitas." },
  { icon: ClipboardList, title: "Confirmamos el alcance y la disponibilidad", description: "Revisamos contigo qué incluye la modalidad, la cobertura en tu zona y las opciones de agenda." },
  { icon: Wrench, title: "El técnico realiza el diagnóstico", description: "La intervención se limita al servicio autorizado. El soporte remoto requiere tu autorización y no es permanente." },
  { icon: MessageCircle, title: "Te explicamos cualquier hallazgo", description: "Si encontramos algo fuera del alcance, te explicamos el problema y las alternativas antes de seguir." },
  { icon: Check, title: "Tú autorizas el trabajo adicional", description: "No realizaremos trabajo adicional facturable sin informarte previamente y recibir tu autorización." },
  { icon: Wrench, title: "Ejecutamos y probamos", description: "Realizamos el trabajo aprobado y verificamos el resultado junto contigo cuando sea posible." },
  { icon: ClipboardList, title: "Documentamos el resultado", description: "Te explicamos qué se revisó, qué se hizo y si recomendamos un siguiente paso." },
];

export default function HowItWorksPage() {
  return (
    <SectionWrapper className="pt-12 sm:pt-16">
      <Container>
        <nav aria-label="Ruta de navegación" className="text-xs text-text-subtle"><Link href="/nova-assist" className="hover:text-white">Nova Assist</Link> / <span aria-current="page">Cómo funciona</span></nav>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">Sin sorpresas</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl">Tú mantienes el control durante todo el proceso.</h1>
          <p className="mt-4 text-base leading-7 text-text-muted">Desde tu primera solicitud hasta entender el resultado, cada paso se conversa contigo.</p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="relative rounded-3xl border border-white/10 bg-[#0b1730]/65 p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-200/20 bg-orange-300/10 text-orange-100"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <span className="font-display text-3xl font-bold text-white/20">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="mt-5 font-display text-lg font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-text-muted">{description}</p>
            </li>
          ))}
        </ol>

        <section className="mt-10 rounded-3xl border border-orange-200/20 bg-[radial-gradient(circle_at_100%_0%,rgba(249,115,22,0.13),transparent_45%),#0b1730] p-6 sm:p-8">
          <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-orange-200" aria-hidden="true" /><h2 className="font-display text-2xl font-bold text-white">Un trabajo adicional siempre sigue estos pasos</h2></div>
          <ol className="mt-6 grid gap-3 sm:grid-cols-5">
            {additionalWorkSteps.map((step, index) => <li key={step} className="flex min-h-16 items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm font-semibold text-white"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-300/15 text-xs text-orange-100">{index + 1}</span>{step}</li>)}
          </ol>
          <p className="mt-5 text-sm font-medium text-orange-100">No realizaremos un trabajo adicional facturable sin informarte previamente.</p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-sky-200/15 bg-sky-950/10 p-5">
            <h2 className="font-semibold text-white">Antes de una visita</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
              <li>· Ten a mano el dispositivo y su cargador si corresponde.</li>
              <li>· Identifica el problema principal y cuándo comenzó.</li>
              <li>· Si hay archivos importantes, cuéntanoslo antes de empezar; no se garantiza la recuperación de datos.</li>
              <li>· No compartas contraseñas bancarias, PIN ni códigos MFA.</li>
              <li>· La dirección y disponibilidad se confirman al coordinar.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0b1730]/50 p-5">
            <h2 className="font-semibold text-white">Después del servicio</h2>
            <p className="mt-3 text-sm leading-6 text-text-muted">Te explicaremos el resultado, las acciones realizadas y cualquier recomendación. Si necesitas algo fuera del alcance original, revisaremos contigo las opciones antes de coordinarlo.</p>
            <Link href="/nova-assist/privacidad" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-sky-100">Cómo cuidamos tus datos <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/nova-assist/solicitar" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-300 px-5 py-3 text-sm font-bold text-[#17100a]">Solicitar ayuda <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href="/nova-assist/preguntas-frecuentes" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white">Preguntas frecuentes</Link>
        </div>
      </Container>
    </SectionWrapper>
  );
}
