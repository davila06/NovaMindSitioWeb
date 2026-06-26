"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bot,
  X,
  CalendarDays,
  Send,
  Zap,
  Home,
  Building2,
  ChevronLeft,
  Shield,
  Cpu,
  Users,
  Gamepad2,
  Wifi,
  Star,
} from "lucide-react";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Screen = "main" | "novaclick" | "hogar" | "empresa";

// ─── Planes ClickFix (hogar) ─────────────────────────────────────────────────
const hogarPlans = [
  {
    icon: Cpu,
    emoji: "⚡",
    name: "Express",
    price: "₡19,500",
    tagline: "Diagnóstico rápido · 1 visita",
    href: "/contacto?plan=clickfix-express",
    hot: false,
  },
  {
    icon: Star,
    emoji: "⭐",
    name: "Premium",
    price: "₡32,000",
    tagline: "Respaldo en nube · 15 días gtía",
    href: "/contacto?plan=clickfix-premium",
    hot: true,
  },
  {
    icon: Users,
    emoji: "👨‍👩‍👧",
    name: "Familiar",
    price: "₡52,000/mes",
    tagline: "3 equipos · soporte remoto ∞",
    href: "/contacto?plan=clickfix-familiar",
    hot: false,
  },
  {
    icon: Gamepad2,
    emoji: "🎮",
    name: "Gamer",
    price: "₡45,000",
    tagline: "PC + consola · pasta térmica",
    href: "/contacto?plan=clickfix-gamer",
    hot: false,
  },
  {
    icon: Wifi,
    emoji: "🏠",
    name: "SmartHome",
    price: "₡39,000",
    tagline: "IoT · cámaras · 30 días gtía",
    href: "/contacto?plan=clickfix-smarthome",
    hot: false,
  },
  {
    icon: Shield,
    emoji: "🛡️",
    name: "Total",
    price: "₡65,000/mes",
    tagline: "Visitas ∞ · SLA 4 h · 6 meses",
    href: "/contacto?plan=clickfix-total",
    hot: true,
  },
];

// ─── Planes ITOn-Demand (empresa) ─────────────────────────────────────────────
const empresaPlans = [
  {
    icon: Building2,
    emoji: "🏢",
    name: "Básico",
    price: "₡130,000/mes",
    tagline: "Hasta 5 estaciones · SLA 48 h",
    href: "/contacto?plan=iton-basico",
    hot: false,
  },
  {
    icon: Shield,
    emoji: "🔒",
    name: "Avanzado",
    price: "₡320,000/mes",
    tagline: "20 est. · ciberseguridad Azure",
    href: "/contacto?plan=iton-avanzado",
    hot: true,
  },
  {
    icon: Zap,
    emoji: "🚀",
    name: "Total",
    price: "₡640,000/mes",
    tagline: "Ilimitado · NOC · SLA 4 h 24/7",
    href: "/contacto?plan=iton-total",
    hot: false,
  },
];

// ─── Texto del bot por pantalla ───────────────────────────────────────────────
const botMessages: Record<Screen, string> = {
  main: "¡Hola! ¿En qué puedo ayudarte hoy?",
  novaclick: "¿El soporte es para tu hogar o empresa?",
  hogar: "Elige el plan que mejor se adapta a ti 👇",
  empresa: "Planes de TI gestionado para empresas 👇",
};

// ─── Indicador de escritura ───────────────────────────────────────────────────
function TypingDots() {
  return (
    <span className="inline-flex gap-0.5 align-middle">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full bg-brand-lavender typing-dot-${i}`}
        />
      ))}
    </span>
  );
}

// ─── Burbuja del bot ─────────────────────────────────────────────────────────
function BotBubble({ text, typing }: { text: string; typing: boolean }) {
  return (
    <div className="flex items-start gap-2 mb-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-violet/30 text-[10px] text-brand-lavender">
        <Bot className="h-3 w-3" />
      </span>
      <div className="rounded-2xl rounded-tl-none bg-brand-elevated/80 px-3 py-2 text-xs text-[#f0f8ff] leading-5 max-w-[200px]">
        {typing ? <TypingDots /> : text}
      </div>
    </div>
  );
}

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("main");
  const [typing, setTyping] = useState(false);

  // Cada vez que cambia la pantalla → simular escritura 900ms
  useEffect(() => {
    if (!open) return;
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 900);
    return () => clearTimeout(t);
  }, [open, screen]);

  // Reset al cerrar
  function handleClose() {
    setOpen(false);
    setTimeout(() => setScreen("main"), 300);
  }

  return (
    <div className="fixed bottom-36 right-4 z-40 flex flex-col items-end gap-3 md:bottom-20 md:right-6">
      {/* ── Panel principal ── */}
      {open && (
        <div className="w-72 overflow-hidden rounded-2xl border border-brand-lavender/25 bg-brand-surface/96 shadow-[0_8px_40px_rgba(139,92,246,0.28)] backdrop-blur-2xl">
          {/* Header */}
          <div
            className={`flex items-center justify-between px-4 py-3 ${screen === "hogar" || screen === "empresa" ? "border-b border-orange-500/20 bg-orange-950/30" : "border-b border-brand-lavender/15 bg-brand-card/60"}`}
          >
            {screen !== "main" ? (
              <button
                onClick={() =>
                  setScreen(
                    screen === "hogar" || screen === "empresa"
                      ? "novaclick"
                      : "main",
                  )
                }
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[#f0f8ff]/70 transition hover:bg-brand-lavender/15 hover:text-[#f0f8ff]"
                aria-label="Volver a la pantalla anterior"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Volver
              </button>
            ) : (
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                Asistente
              </span>
            )}
            <button
              onClick={handleClose}
              aria-label="Cerrar chat"
              className="text-text-muted transition hover:text-[#f0f8ff]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Cuerpo */}
          <div className="p-4">
            {/* Burbuja del bot */}
            <BotBubble text={botMessages[screen]} typing={typing} />

            {/* ── Pantalla: Main ── */}
            {!typing && screen === "main" && (
              <div className="space-y-2">
                {/* NovaClick — opción destacada */}
                <button
                  onClick={() => setScreen("novaclick")}
                  className="group flex w-full items-center gap-3 rounded-xl border border-orange-500/30 bg-orange-950/40 px-3 py-2.5 text-left transition hover:border-orange-400/50 hover:bg-orange-900/40"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/20 text-orange-300 transition group-hover:bg-orange-500/30">
                    <Zap className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-orange-200">
                      Soporte técnico
                    </p>
                    <p className="text-xs text-orange-400/80">
                      ClickFix · hogar &amp; empresa
                    </p>
                  </div>
                  <ChevronLeft
                    className="h-3.5 w-3.5 rotate-180 text-orange-400/60"
                    aria-hidden="true"
                  />
                </button>

                {/* Agendar demo */}
                <Link
                  href="/contacto"
                  onClick={handleClose}
                  className="flex items-center gap-3 rounded-xl border border-brand-lavender/12 bg-brand-card/80 px-3 py-2.5 transition hover:border-brand-lavender/30 hover:bg-brand-elevated/80"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-violet/15">
                    <CalendarDays className="h-4 w-4 text-brand-lavender" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#f0f8ff]">
                      Agendar demo
                    </p>
                    <p className="text-xs text-text-muted">
                      30 min · sin compromiso
                    </p>
                  </div>
                </Link>

                {/* Enviar mensaje */}
                <Link
                  href="/contacto"
                  onClick={handleClose}
                  className="flex items-center gap-3 rounded-xl border border-brand-lavender/12 bg-brand-card/80 px-3 py-2.5 transition hover:border-brand-lavender/30 hover:bg-brand-elevated/80"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-gold/10">
                    <Send className="h-4 w-4 text-brand-gold" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#f0f8ff]">
                      Enviar mensaje
                    </p>
                    <p className="text-xs text-text-muted">
                      Respuesta en menos de 24 h
                    </p>
                  </div>
                </Link>
              </div>
            )}

            {/* ── Pantalla: NovaClick ── */}
            {!typing && screen === "novaclick" && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setScreen("hogar")}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-orange-500/25 bg-orange-950/30 px-3 py-4 text-center transition hover:border-orange-400/50 hover:bg-orange-900/30"
                >
                  <Home className="h-7 w-7 text-orange-300 transition group-hover:scale-110" />
                  <div>
                    <p className="text-sm font-bold text-orange-200">Hogar</p>
                    <p className="text-[10px] text-orange-400/70">ClickFix</p>
                    <p className="mt-1 text-[10px] text-orange-400/70">
                      desde ₡19,500
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setScreen("empresa")}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-brand-lavender/25 bg-brand-card/80 px-3 py-4 text-center transition hover:border-brand-lavender/45 hover:bg-brand-elevated/80"
                >
                  <Building2 className="h-7 w-7 text-brand-lavender transition group-hover:scale-110" />
                  <div>
                    <p className="text-sm font-bold text-[#f0f8ff]">Empresa</p>
                    <p className="text-[10px] text-text-muted">ITOn-Demand</p>
                    <p className="mt-1 text-[10px] text-text-muted">
                      desde ₡130k/mes
                    </p>
                  </div>
                </button>
              </div>
            )}

            {/* ── Pantalla: Planes Hogar ── */}
            {!typing && screen === "hogar" && (
              <div className="max-h-64 space-y-1.5 overflow-y-auto pr-0.5">
                {hogarPlans.map((plan) => (
                  <Link
                    key={plan.name}
                    href={plan.href}
                    onClick={handleClose}
                    className="group flex items-center gap-2.5 rounded-xl border border-orange-500/18 bg-orange-950/25 px-3 py-2 transition hover:border-orange-400/40 hover:bg-orange-900/30"
                  >
                    <span className="text-base leading-none select-none">
                      {plan.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-orange-200">
                          {plan.name}
                        </p>
                        {plan.hot && (
                          <span className="rounded-full bg-orange-500/30 px-1.5 py-0.5 text-[9px] font-bold uppercase text-orange-300">
                            ★ TOP
                          </span>
                        )}
                      </div>
                      <p className="truncate text-[10px] text-orange-400/70">
                        {plan.tagline}
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold text-orange-300 whitespace-nowrap">
                      {plan.price}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* ── Pantalla: Planes Empresa ── */}
            {!typing && screen === "empresa" && (
              <div className="space-y-1.5">
                {empresaPlans.map((plan) => (
                  <Link
                    key={plan.name}
                    href={plan.href}
                    onClick={handleClose}
                    className="group flex items-center gap-2.5 rounded-xl border border-brand-lavender/18 bg-brand-card/80 px-3 py-2 transition hover:border-brand-lavender/40 hover:bg-brand-elevated/80"
                  >
                    <span className="text-base leading-none select-none">
                      {plan.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-[#f0f8ff]">
                          {plan.name}
                        </p>
                        {plan.hot && (
                          <span className="rounded-full bg-brand-violet/30 px-1.5 py-0.5 text-[9px] font-bold uppercase text-brand-lavender">
                            ★ TOP
                          </span>
                        )}
                      </div>
                      <p className="truncate text-[10px] text-text-muted">
                        {plan.tagline}
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold text-brand-lavender whitespace-nowrap">
                      {plan.price}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-brand-lavender/10 px-4 py-2">
            <p className="text-center text-[10px] text-text-subtle">
              Novamind Global · Costa Rica 🇨🇷
            </p>
          </div>
        </div>
      )}

      {/* ── Botón flotante ── */}
      <button
        onClick={() => (open ? handleClose() : setOpen(true))}
        aria-label={open ? "Cerrar chat" : "Abrir asistente"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-violet text-white shadow-[0_4px_24px_rgba(139,92,246,0.5)] transition hover:bg-brand-iris hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        {/* Ping indicator — solo visible cuando está cerrado */}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-orange-400" />
          </span>
        )}
      </button>
    </div>
  );
}
