"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics-client";

const INTERESTS = [
  "VoiceBot / Contact Center",
  "PlanillasCR / Nómina",
  "CCERP / ERP",
  "MindFlow / Ventas",
  "Todos los productos",
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(INTERESTS[4]);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError("Ingresa un correo empresarial válido.");
      return;
    }

    if (!consentPrivacy) {
      setError("Debes aceptar la política de privacidad para suscribirte.");
      return;
    }

    setLoading(true);
    try {
      trackEvent("newsletter_subscribe_attempt", {
        email_domain: email.split("@")[1] ?? "",
        interest,
      });
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          interest,
          consentPrivacy: true,
        }),
      });
      const json = (await res.json()) as { ok: boolean; message?: string };
      if (!json.ok) {
        setError(json.message ?? "No se pudo procesar. Intenta de nuevo.");
        return;
      }
      trackEvent("newsletter_subscribed", {
        email_domain: email.split("@")[1] ?? "",
        interest,
      });
      setSubmitted(true);
      try {
        localStorage.setItem("nm-newsletter", "1");
      } catch {
        /* ignore */
      }
    } catch {
      setError("No se pudo procesar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden border-y border-brand-lavender/10 bg-brand-surface/60 py-16">
      {/* Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/8 blur-[80px]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-lavender/20 bg-brand-card/80">
            <Mail className="h-5 w-5 text-brand-lavender" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">
            Newsletter
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-[#f0f8ff] sm:text-3xl">
            IA aplicada a negocios, sin ruido
          </h2>
          <p className="mt-2 text-text-muted">
            Casos reales, métricas y estrategias para operaciones en LATAM. Sin
            spam.
          </p>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-8 flex flex-col items-center gap-3"
            >
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              <p className="font-display text-lg font-semibold text-[#f0f8ff]">
                ¡Suscrito correctamente!
              </p>
              <p className="text-sm text-text-muted">
                Te avisaremos cuando publiquemos nuevo contenido.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@empresa.com"
                  required
                  autoComplete="email"
                  aria-label="Correo electrónico"
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="flex-1 rounded-xl border border-brand-lavender/20 bg-brand-void/60 px-4 py-2.5 text-sm text-[#f0f8ff] outline-none ring-brand-violet transition focus:ring-2 placeholder:text-text-subtle"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand-violet px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-iris disabled:opacity-60 shrink-0"
                >
                  {loading ? "Enviando…" : "Suscribirse"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>

              <div className="mt-3">
                <label className="text-xs text-text-muted">
                  Interés principal:{" "}
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="ml-1 rounded-lg border border-brand-lavender/15 bg-brand-card/60 px-2 py-0.5 text-xs text-[#f0f8ff] outline-none"
                  >
                    {INTERESTS.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </label>
              </div>

              {error && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-2 text-xs text-rose-400"
                >
                  {error}
                </p>
              )}

              <p className="mt-4 text-xs text-text-subtle">
                Sin spam. Puedes darte de baja en cualquier momento. Ley 8968
                CR.
              </p>

              {/* Consentimiento explícito — obligatorio Ley 8968 */}
              <label className="mt-3 flex cursor-pointer items-start gap-2 text-left">
                <input
                  type="checkbox"
                  checked={consentPrivacy}
                  onChange={(e) => {
                    setConsentPrivacy(e.target.checked);
                    setError("");
                  }}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brand-violet"
                />
                <span className="text-xs leading-5 text-text-muted">
                  Acepto el tratamiento de mis datos conforme a la{" "}
                  <Link
                    href="/privacidad"
                    className="text-brand-lavender hover:underline"
                    target="_blank"
                  >
                    política de privacidad
                  </Link>{" "}
                  de Novamind Global. <span className="text-rose-300">*</span>
                </span>
              </label>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
