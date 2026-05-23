"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, CalendarDays, Send, LayoutGrid } from "lucide-react";

const options = [
  {
    icon: CalendarDays,
    label: "Agendar demo",
    description: "30 minutos sin compromiso",
    href: "/contacto",
    color: "text-brand-lavender",
    bg: "bg-brand-violet/15",
  },
  {
    icon: Send,
    label: "Enviar mensaje",
    description: "Te respondemos en menos de 24h",
    href: "/contacto",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
  },
  {
    icon: LayoutGrid,
    label: "Ver productos",
    description: "Explora el portafolio completo",
    href: "/#productos",
    color: "text-brand-lavender",
    bg: "bg-brand-lavender/10",
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <span className="text-xs text-text-muted">Novamind está disponible</span>
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-brand-lavender"
            style={{ animation: `blink 1.2s ${i * 0.2}s ease-in-out infinite` }}
          />
        ))}
      </span>
    </div>
  );
}

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (open) {
      setShowTyping(true);
      const t = setTimeout(() => setShowTyping(false), 1800);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {/* Panel */}
      {open && (
        <div className="w-72 rounded-2xl border border-brand-lavender/25 bg-brand-surface/95 p-4 shadow-[0_8px_40px_rgba(249,115,22,0.22)] backdrop-blur-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
            ¿En qué podemos ayudarte?
          </p>

          {showTyping ? (
            <TypingIndicator />
          ) : (
            <div className="mt-3 space-y-2">
              {options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <Link
                    key={opt.label}
                    href={opt.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl border border-brand-lavender/12 bg-brand-card/80 px-3 py-2.5 transition hover:border-brand-lavender/30 hover:bg-brand-elevated/80"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${opt.bg}`}
                    >
                      <Icon className={`h-4 w-4 ${opt.color}`} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#f0f8ff]">
                        {opt.label}
                      </p>
                      <p className="text-xs text-text-muted">
                        {opt.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-violet text-white shadow-[0_4px_24px_rgba(249,115,22,0.45)] transition hover:bg-brand-iris hover:scale-105 active:scale-95"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
