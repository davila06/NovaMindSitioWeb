"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/shared/ui/Button";
import { Send } from "lucide-react";
import { contactDetails } from "@/data/site";
import { Turnstile, turnstileSiteKey } from "@/components/shared/ui/Turnstile";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [verificationAttempt, setVerificationAttempt] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setError("");
    if (!consentPrivacy) {
      setError("Acepta la política de privacidad para continuar.");
      return;
    }
    if (turnstileSiteKey && !turnstileToken) {
      setError("Completa la verificacion de seguridad para continuar.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          interest: "footer",
          consentPrivacy: true,
          turnstileToken: turnstileToken || undefined,
        }),
      });
      const json = (await res.json()) as { ok: boolean; message?: string };
      if (!json.ok) {
        setError(json.message ?? "No se pudo procesar.");
        return;
      }
      setSent(true);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
      setTurnstileToken("");
      setVerificationAttempt(attempt => attempt + 1);
    }
  }

  if (sent) {
    return (
      <p
        role="status"
        aria-live="polite"
        className="mt-3 rounded-xl border border-brand-lavender/20 bg-brand-card/60 px-3 py-2.5 text-xs text-brand-lavender"
      >
        ✓ ¡Listo! Te contactaremos pronto.
      </p>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            id="footer-newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@empresa.com"
            required
            disabled={loading}
            autoComplete="email"
            aria-label="Correo electrónico para novedades"
            className="flex-1 rounded-xl border border-brand-lavender/20 bg-brand-card/60 px-3 py-2 text-xs text-[#f0f8ff] placeholder:text-text-subtle outline-none focus:border-brand-lavender/50 focus:ring-1 focus:ring-brand-violet/30 transition disabled:opacity-60"
          />
          <button
            type="submit"
            aria-label="Suscribirse"
            disabled={loading}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-violet text-white transition hover:bg-brand-iris disabled:opacity-60"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        {/* Consentimiento explícito — Ley 8968 CR */}
        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={consentPrivacy}
            onChange={(e) => {
              setConsentPrivacy(e.target.checked);
              setError("");
            }}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-brand-violet"
          />
          <span className="text-[10px] leading-4 text-text-subtle">
            Acepto la{" "}
            <Link
              href="/privacidad"
              className="text-brand-lavender hover:underline"
            >
              política de privacidad
            </Link>
          </span>
        </label>
        <Turnstile key={verificationAttempt} action="newsletter" onToken={setTurnstileToken} />
      </form>
      {error && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-1.5 text-xs text-rose-400"
        >
          {error}
        </p>
      )}
    </>
  );
}

function LinkedInIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      className="mt-20 bg-brand-void/80"
      aria-label="Pie de página de Novamind Global"
    >
      {/* Línea de luz premium */}
      <div className="light-line" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        {/* Columna marca */}
        <div>
          <h4 className="bg-gradient-to-r from-brand-violet via-brand-lavender to-brand-gold bg-clip-text font-display text-xl font-bold text-transparent">
            Novamind Global
          </h4>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Productos SaaS de Novamind Global y servicios profesionales de Nova
            Assist, junto con PawTrack como iniciativa comunitaria.
          </p>
          {/* Redes sociales */}
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.linkedin.com/company/novamind-global"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Novamind Global"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-lavender/20 text-text-muted transition hover:border-brand-lavender/50 hover:text-brand-lavender"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Links rápidos */}
        <div>
          <h5 className="text-sm font-semibold text-[#f0f8ff]">
            Links rápidos
          </h5>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { href: "/", label: "Inicio" },
              { href: "/hogares", label: "Para hogares" },
              { href: "/empresas", label: "Para empresas" },
              { href: "/empresas#servicios", label: "Servicios Nova Assist" },
              { href: "/#productos", label: "Productos" },
              { href: "/sobre-nosotros", label: "Nosotros" },
              { href: "/blog", label: "Blog" },
              { href: "/contacto", label: "Contacto" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-muted transition hover:text-brand-lavender"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Productos y comunidad */}
        <div>
          <h5 className="text-sm font-semibold text-[#f0f8ff]">
            Productos SaaS
          </h5>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { href: "/productos/voicebot", label: "VoiceBot" },
              { href: "/productos/planillascr", label: "PlanillasCR" },
              { href: "/productos/ccerp", label: "CCERP" },
              { href: "/productos/mindflow", label: "MindFlow" },
              {
                href: "/productos/mindflow-ai-sales-engine",
                label: "MindFlow AI Sales Engine",
              },
              { href: "/productos/iads", label: "IADS" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-muted transition hover:text-brand-lavender"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-brand-lavender/10 pt-5">
            <h6 className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-200">
              Comunidad
            </h6>
            <Link
              href="/productos/pawtrack"
              className="mt-3 inline-flex text-sm text-text-muted transition hover:text-brand-lavender"
            >
              PawTrack CR
            </Link>
          </div>
        </div>

        {/* Newsletter + Contacto */}
        <div>
          <h5 className="text-sm font-semibold text-[#f0f8ff]">Contacto</h5>
          <div className="mt-4 space-y-1.5 text-sm text-text-muted">
            <p>
              <a href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </a>
            </p>
            <p>
              <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
            </p>
            <p>Costa Rica</p>
          </div>
          <Button
            href="/contacto"
            className="mt-5"
            trackingContext={{
              page: "global",
              section: "footer",
              ctaLabel: "consultar_disponibilidad",
              destination: "/contacto",
              intent: "contact",
            }}
          >
            Consultar disponibilidad
          </Button>

          {/* Newsletter inline */}
          <div className="mt-8">
            <h5 className="text-sm font-semibold text-[#f0f8ff]">
              Novedades de IA
            </h5>
            <p className="mt-1.5 text-xs text-text-muted">
              Insights mensuales. Sin spam.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="light-line" />
      <div className="py-5 text-center text-xs text-text-subtle">
        <div className="mb-3 flex justify-center gap-4">
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Terminos</Link>
        </div>
        © {new Date().getFullYear()} Novamind Global. Todos los derechos
        reservados. · Costa Rica
      </div>
    </footer>
  );
}
