import Link from "next/link";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function PawTrackCommunitySection() {
  return (
    <SectionWrapper aria-labelledby="pawtrack-community-heading">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-sky-300/15 bg-[radial-gradient(ellipse_at_82%_15%,rgba(56,189,248,0.12),transparent_38%),linear-gradient(125deg,rgba(13,27,45,0.92),rgba(7,12,25,0.96))] p-7 sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-16 h-72 w-72 rounded-full border border-sky-300/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-7 h-52 w-52 rounded-full border border-sky-300/10"
          />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-200">
                <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
                Tecnología con propósito · Comunidad
              </div>
              <h2
                id="pawtrack-community-heading"
                className="mt-5 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl"
              >
                Cuando una mascota se pierde, todos podemos ayudar.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-text-muted">
                PawTrack CR ayuda a crear una identidad digital y conectar a
                familias y comunidades para facilitar el regreso a casa. Una
                iniciativa tecnológica de Novamind, con un recorrido propio y
                centrado en las mascotas.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100/70">
                La comunicación comercial no se mezcla con una alerta activa de
                mascota perdida.
              </p>
            </div>
            <Link
              href="/productos/pawtrack"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-sky-200/20 bg-sky-200/10 px-5 py-3 text-sm font-semibold text-sky-100 transition hover:border-sky-200/40 hover:bg-sky-200/15"
            >
              Conocer PawTrack
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="relative mt-8 border-t border-white/8 pt-4 text-xs leading-5 text-text-subtle">
            La comunidad y la información de PawTrack se mantienen separadas
            de las comunicaciones comerciales de Novamind.
          </p>
        </div>
      </Container>
    </SectionWrapper>
  );
}
