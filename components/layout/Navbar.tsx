"use client";

import { navLinks } from "@/data/site";
import { Button } from "@/components/shared/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "";
  }

  return (
    <header
      className={`sticky top-4 z-40 transition-all ${scrolled ? "opacity-100" : "opacity-95"}`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border px-5 py-3 shadow-soft backdrop-blur-2xl transition-all sm:px-7 ${scrolled ? "border-brand-lavender/25 bg-[#06091a]/90" : "border-white/10 bg-[#06091a]/75"}`}
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-brand-lavender/30 bg-brand-card shadow-soft sm:h-11 sm:w-11">
            <Image
              src="/img/novamind-brand.webp"
              alt="NovaMind Global"
              fill
              className="object-cover object-center"
              sizes="44px"
              priority
            />
          </div>
          <div>
            <span className="block font-display text-[1.5rem] font-semibold leading-none tracking-[-0.03em] text-[#f0f8ff] sm:text-[1.65rem]">
              Novamind Global
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.26em] text-brand-lavender sm:text-[11px]">
              IA aplicada a negocios
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              onMouseEnter={() => router.prefetch(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative rounded-lg px-3 py-2 text-sm transition-all duration-150 ${
                isActive(link.href)
                  ? "text-brand-lavender bg-brand-violet/15"
                  : "text-text-muted hover:text-[#f0f8ff] hover:bg-brand-lavender/8"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-lavender" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button
            href="/contacto"
            trackingContext={{
              page: "global",
              section: "navbar",
              ctaLabel: "solicitar_demo",
              destination: "/contacto",
              intent: "demo",
            }}
          >
            Solicitar Demo
          </Button>
        </div>

        <button
          className="md:hidden"
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={mobileOpen ? "true" : "false"}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((current) => !current)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-[#f0f8ff]" />
          ) : (
            <Menu className="h-5 w-5 text-[#f0f8ff]" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="px-4 md:hidden">
          <div
            id="mobile-navigation"
            className="mt-3 rounded-2xl border border-brand-lavender/20 bg-[#06091a]/97 p-4 shadow-medium backdrop-blur-2xl"
          >
            <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "text-brand-lavender bg-brand-violet/15"
                      : "text-text-muted hover:text-[#f0f8ff] hover:bg-brand-lavender/8"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button
              href="/contacto"
              className="mt-4 w-full"
              trackingContext={{
                page: "global",
                section: "mobile_nav",
                ctaLabel: "solicitar_demo",
                destination: "/contacto",
                intent: "demo",
              }}
            >
              Solicitar Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
