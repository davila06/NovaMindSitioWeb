"use client";
import { Container } from "@/components/layout/Container";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function ManifestoSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      {/* Deep background */}
      <div aria-hidden="true" className="absolute inset-0 bg-brand-void" />
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/8 blur-[120px]"
      />
      {/* Cinematic large text watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span className="font-display text-[22vw] font-black uppercase leading-none tracking-tighter text-white/[0.025] sm:text-[18vw]">
          ESCALA
        </span>
      </div>

      <Container className="relative">
        <div
          ref={headingRef}
          className="mx-auto max-w-5xl text-center reveal [perspective:1000px]"
        >
          {/* Label */}
          <div className="mb-10 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-lavender/30" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
              Manifiesto
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-lavender/30" />
          </div>

          {/* 3D layered headline — text shadow layers create Z-depth */}
          <div className="relative [transform-style:preserve-3d]">
            {/* Shadow layer 3 — deepest, offset most */}
            <p
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 font-display text-[2.6rem] font-black leading-[1.05] tracking-[-0.04em] text-brand-violet/10 [transform:translateZ(-20px)_translateX(6px)_translateY(6px)] sm:text-[4rem] lg:text-[5.5rem]"
            >
              Operaciones que{" "}
              <span className="text-brand-violet/10">escalan.</span>
            </p>
            {/* Shadow layer 2 — mid depth */}
            <p
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 font-display text-[2.6rem] font-black leading-[1.05] tracking-[-0.04em] text-brand-violet/18 [transform:translateZ(-10px)_translateX(3px)_translateY(3px)] sm:text-[4rem] lg:text-[5.5rem]"
            >
              Operaciones que{" "}
              <span className="text-brand-iris/20">escalan.</span>
            </p>
            {/* Primary text — front layer */}
            <p className="relative font-display text-[2.6rem] font-black leading-[1.05] tracking-[-0.04em] text-[#f0f8ff] [transform:translateZ(0px)] sm:text-[4rem] lg:text-[5.5rem]">
              Operaciones que{" "}
              <span className="bg-gradient-to-r from-brand-violet via-brand-iris to-brand-lavender bg-clip-text text-transparent">
                escalan.
              </span>
            </p>
          </div>

          <p className="mx-auto mt-6 max-w-2xl font-display text-lg font-light tracking-wide text-text-muted sm:text-xl">
            El software que no crece con tu empresa no es una solución — es un
            techo.
          </p>

          {/* Quote attribution */}
          <div className="mt-12">
            <div className="mx-auto h-px w-16 bg-brand-lavender/30" />
            <cite className="mt-4 block text-sm not-italic tracking-[0.15em] text-text-subtle">
              — Equipo Novamind Global · San José, Costa Rica
            </cite>
          </div>
        </div>
      </Container>
    </section>
  );
}
