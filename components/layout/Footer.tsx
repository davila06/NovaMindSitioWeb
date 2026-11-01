"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/shared/ui/Button";
import { Send } from "lucide-react";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setError("");
    if (!consentPrivacy) {
      setError("Acepta la política de privacidad para continuar.");
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

function GitHubIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
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
            Software empresarial IA-native para operaciones críticas en América
            Latina.
          </p>
          {/* Redes sociales */}
          <div className="mt-5 flex gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Novamind Global"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-lavender/20 text-text-muted transition hover:border-brand-lavender/50 hover:text-brand-lavender"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Novamind Global"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-lavender/20 text-text-muted transition hover:border-brand-lavender/50 hover:text-brand-lavender"
            >
              <GitHubIcon />
            </a>
          </div>
          {/* Badges de tecnología con shimmer */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["Azure", "Next.js 15", "TypeScript"].map((tech) => (
              <span
                key={tech}
                className="animate-shimmer rounded-full border border-brand-lavender/15 px-2.5 py-1 text-[11px] font-medium text-text-subtle"
              >
                {tech}
              </span>
            ))}
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
              { href: "/#productos", label: "Productos" },
              { href: "/industrias", label: "Industrias" },
              { href: "/roles", label: "Roles" },
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

        {/* Productos */}
        <div>
          <h5 className="text-sm font-semibold text-[#f0f8ff]">Productos</h5>
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
              { href: "/productos/pawtrack", label: "PawTrack CR / NALA" },
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

        {/* Newsletter + Contacto */}
        <div>
          <h5 className="text-sm font-semibold text-[#f0f8ff]">Contacto</h5>
          <div className="mt-4 space-y-1.5 text-sm text-text-muted">
            <p>
              <a href="mailto:info@novamindglobalcr.com">
                info@novamindglobalcr.com
              </a>
            </p>
            <p>
              <a href="tel:+50687669318">+506 8766 9318</a>
            </p>
            <p>Costa Rica</p>
          </div>
          <Button
            href="/contacto"
            className="mt-5"
            trackingContext={{
              page: "global",
              section: "footer",
              ctaLabel: "solicitar_demo",
              destination: "/contacto",
              intent: "demo",
            }}
          >
            Solicitar demo
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
        © {new Date().getFullYear()} Novamind Global. Todos los derechos
        reservados. · Costa Rica
      </div>
    </footer>
  );
}
