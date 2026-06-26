"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { testimonials } from "@/data/site";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useEffect, useState } from "react";

const SITE_URL = "https://novamindglobal.com";

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Novamind Global",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Contactar para cotización personalizada",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: String(testimonials.length),
    reviewCount: String(testimonials.length),
  },
  review: testimonials.map((t) => {
    const parts = t.author.split(", ");
    return {
      "@type": "Review",
      author: { "@type": "Person", name: parts[0] ?? t.author },
      reviewBody: t.quote,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    };
  }),
};

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 fill-brand-gold text-brand-gold"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

type TestimonialCardProps = {
  quote: string;
  author: string;
  large?: boolean;
  active?: boolean;
};

function TestimonialCard({
  quote,
  author,
  large = false,
  active = false,
}: TestimonialCardProps) {
  const parts = author.split(", ");
  const name = parts[0];
  const company = parts.slice(1).join(", ");
  const wrapClass = `relative overflow-hidden rounded-2xl border bg-brand-card/85 backdrop-blur-sm transition-all duration-300 h-full ${large ? "p-8" : "p-6"} ${active ? "border-brand-lavender/30 shadow-[0_12px_40px_-8px_rgba(139,92,246,0.3)] [transform:rotateX(-1deg)_rotateY(-0.5deg)]" : "border-brand-lavender/15"}`;
  const quoteClass = `relative mt-4 font-serif italic leading-7 text-[#f0f8ff] ${large ? "text-lg" : "text-base"}`;
  return (
    <div className={wrapClass}>
      {/* Top shimmer */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-lavender/35 to-transparent"
        aria-hidden="true"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-2 select-none font-serif text-[7rem] leading-none text-brand-lavender opacity-[0.07]"
      >
        &ldquo;
      </span>
      <StarRating />
      <p className={quoteClass}>&ldquo;{quote}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 border-t border-brand-lavender/12 pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-violet/30 text-sm font-semibold text-brand-lavender">
          {name?.charAt(0) ?? "N"}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#f0f8ff]">{name}</p>
          {company && <p className="text-xs text-text-muted">{company}</p>}
        </div>
      </div>
    </div>
  );
}

// Single-card fade carousel — active card is fully visible, others hidden
const CARD_CLASSES = {
  active: "z-20 opacity-100 translate-y-0 pointer-events-auto",
  hidden: "z-10 opacity-0 translate-y-2 pointer-events-none",
};

export function TestimonialsSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const N = 3; // testimonials[0], testimonials[1], video

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % N), 5000);
    return () => clearInterval(id);
  }, []);

  function prev() {
    setActive((a) => (a - 1 + N) % N);
  }
  function next() {
    setActive((a) => (a + 1) % N);
  }

  return (
    <SectionWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingSchema),
        }}
      />
      <Container>
        <div ref={headingRef} className="mb-10 max-w-2xl reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Casos de impacto
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Lo que dicen quienes ya operan con Novamind
          </h2>
        </div>

        {/* Fade carousel stage — 3D card deck effect */}
        <div
          className="relative mx-auto max-w-2xl [perspective:1100px]"
          aria-live="polite"
        >
          {/* Background depth layers — permanent deck illusion */}
          <div
            className="pointer-events-none absolute inset-x-6 inset-y-0 rounded-2xl border border-brand-lavender/12 bg-brand-card/50 [transform:translateZ(-22px)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-10 inset-y-0 rounded-2xl border border-brand-lavender/6 bg-brand-card/30 [transform:translateZ(-42px)]"
            aria-hidden="true"
          />

          {/* Front card region — slight tilt toward viewer */}
          <div className="relative [transform-style:preserve-3d]">
            {/* ── Card 0: testimonials[0] ── */}
            <div
              className={`transition-all duration-500 ease-out ${active === 0 ? CARD_CLASSES.active : "absolute inset-0 " + CARD_CLASSES.hidden}`}
            >
              <TestimonialCard
                quote={testimonials[0]?.quote ?? ""}
                author={testimonials[0]?.author ?? ""}
                large
                active={active === 0}
              />
            </div>

            {/* ── Card 1: testimonials[1] ── */}
            <div
              className={`transition-all duration-500 ease-out ${active === 1 ? CARD_CLASSES.active : "absolute inset-0 " + CARD_CLASSES.hidden}`}
            >
              <TestimonialCard
                quote={testimonials[1]?.quote ?? ""}
                author={testimonials[1]?.author ?? ""}
                large
                active={active === 1}
              />
            </div>

            {/* ── Card 2: Video placeholder ── */}
            <div
              className={`transition-all duration-500 ease-out ${active === 2 ? CARD_CLASSES.active : "absolute inset-0 " + CARD_CLASSES.hidden}`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-brand-violet/35 bg-brand-card/85 p-8 backdrop-blur-sm shadow-[0_12px_40px_-8px_rgba(139,92,246,0.3)] [transform:rotateX(-1deg)_rotateY(-0.5deg)]">
                {/* Top shimmer */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-iris/50 to-transparent"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-violet/25 ring-1 ring-brand-violet/30">
                    <Play
                      className="h-6 w-6 fill-brand-lavender text-brand-lavender"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
                      Video
                    </p>
                    <p className="font-display text-lg font-semibold text-[#f0f8ff]">
                      Historia de éxito real
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-text-muted">
                  Cómo automatizamos la nómina de 340 empleados en menos de 6
                  semanas, con visibilidad ejecutiva en tiempo real.
                </p>
                <button
                  className="mt-6 text-sm font-semibold text-brand-lavender transition hover:text-[#f0f8ff]"
                  aria-label="Ver video de caso de éxito"
                >
                  Ver video →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-lavender/25 bg-brand-card/70 text-text-muted transition hover:border-brand-lavender/50 hover:text-brand-lavender"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: N }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-brand-lavender" : "w-2 bg-white/20 hover:bg-white/40"}`}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-lavender/25 bg-brand-card/70 text-text-muted transition hover:border-brand-lavender/50 hover:text-brand-lavender"
            aria-label="Testimonio siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
