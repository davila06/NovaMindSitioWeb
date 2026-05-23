"use client";

import { AtSign, Bot } from "lucide-react";

const WA_NUMBER = "50688888888"; // TODO: reemplazar con número real de WhatsApp
const WA_MESSAGE =
  "Hola, me interesa conocer más sobre los productos de Novamind Global.";

export function WhatsAppButton() {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-brand-violet/40 bg-brand-violet/90 shadow-[0_0_20px_rgba(249,115,22,0.35)] backdrop-blur transition hover:scale-110 hover:bg-brand-iris hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] active:scale-95 md:bottom-6 md:right-6"
    >
      <AtSign className="h-5 w-5 stroke-white" aria-hidden="true" />
    </a>
  );
}
