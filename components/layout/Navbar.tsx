"use client";

import { primaryNavigation, type PrimaryNavigationItem } from "@/data/site";
import { Button } from "@/components/shared/ui/Button";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { trackEvent } from "@/lib/analytics-client";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuTriggers = useRef(new Map<string, HTMLButtonElement>());
  useFocusTrap(menuRef, mobileOpen, triggerRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen && !activeMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (mobileOpen) {
        setMobileOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (activeMenu) {
        setActiveMenu(null);
        menuTriggers.current.get(activeMenu)?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeMenu, mobileOpen]);

  function isActive(href: string) {
    const route = href.split("#")[0];
    if (!route) return false;
    if (route === "/") return pathname === "/";
    return pathname === route || pathname.startsWith(`${route}/`);
  }

  function trackNavigation(link: { href: string; label: string }) {
    trackEvent("navigation_click", {
      label: link.label,
      destination: link.href,
    });
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-150 ${
        scrolled
          ? "border-white/10 bg-[#07111f]/98 shadow-[0_8px_24px_rgba(7,17,31,0.28)]"
          : "border-white/5 bg-[#07111f]/95"
      }`}
    >
      <div className="mx-auto flex min-h-[76px] w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 sm:gap-3"
          aria-label="Novamind Global, inicio"
          onClick={() => {
            setMobileOpen(false);
            setActiveMenu(null);
          }}
        >
          <span className="relative h-9 w-9 overflow-hidden rounded-lg border border-cyan-400/30 bg-brand-card sm:h-10 sm:w-10">
            <Image
              src="/img/novamind-brand.webp"
              unoptimized
              alt=""
              fill
              className="object-cover object-center"
              sizes="40px"
              priority
            />
          </span>
          <span>
            <span className="block font-display text-lg font-semibold leading-tight tracking-[-0.03em] text-white sm:text-xl">
              Novamind Global
            </span>
            <span className="mt-0.5 hidden text-[10px] uppercase tracking-[0.18em] text-cyan-400 sm:block">
              Tecnología empresarial
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center lg:flex"
          aria-label="Navegación principal"
        >
          <ul className="flex items-center gap-0.5">
            {primaryNavigation.map((item, index) => (
              <DesktopNavigationItem
                key={item.href}
                item={item}
                index={index}
                open={activeMenu === item.href}
                isActive={isActive}
                onOpen={() => setActiveMenu(item.href)}
                onClose={() => setActiveMenu(null)}
                onToggle={() =>
                  setActiveMenu((current) =>
                    current === item.href ? null : item.href,
                  )
                }
                onNavigate={trackNavigation}
                onPrefetch={router.prefetch}
                triggerRef={(element) => {
                  if (element) menuTriggers.current.set(item.href, element);
                  else menuTriggers.current.delete(item.href);
                }}
              />
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button
            href="/contacto"
            variant="enterprise"
            trackingContext={{
              page: "global",
              section: "navbar",
              ctaLabel: "hablar_con_un_especialista",
              destination: "/contacto",
              intent: "contact",
            }}
            className="px-4"
          >
            Hablar con un especialista
          </Button>
        </div>

        <button
          ref={triggerRef}
          type="button"
          aria-expanded={mobileOpen}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:border-cyan-400/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 lg:hidden"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((current) => !current)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-[#07111f] px-4 pb-5 shadow-[0_24px_48px_rgba(7,17,31,0.45)] lg:hidden">
          <div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
            id="mobile-navigation"
            className="mx-auto max-h-[calc(100dvh-6rem)] max-w-[1440px] overflow-y-auto overscroll-contain py-3"
          >
            <nav className="grid gap-5 sm:grid-cols-2" aria-label="Navegación móvil">
              {primaryNavigation.map((item) => (
                <MobileNavigationGroup
                  key={item.href}
                  item={item}
                  isActive={isActive}
                  onNavigate={trackNavigation}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </nav>
            <Button
              href="/contacto"
              variant="enterprise"
              className="mt-5 w-full"
              trackingContext={{
                page: "global",
                section: "mobile_nav",
                ctaLabel: "hablar_con_un_especialista",
                destination: "/contacto",
                intent: "contact",
              }}
            >
              Hablar con un especialista
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function DesktopNavigationItem({
  item,
  index,
  open,
  isActive,
  onOpen,
  onClose,
  onToggle,
  onNavigate,
  onPrefetch,
  triggerRef,
}: {
  item: PrimaryNavigationItem;
  index: number;
  open: boolean;
  isActive: (href: string) => boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onNavigate: (link: { href: string; label: string }) => void;
  onPrefetch: (href: string) => void;
  triggerRef: (element: HTMLButtonElement | null) => void;
}) {
  const menuId = `desktop-navigation-menu-${index}`;

  return (
    <li
      className="relative"
      onMouseEnter={item.children.length ? onOpen : undefined}
      onMouseLeave={(event) => {
        if (
          item.children.length &&
          !event.currentTarget.contains(document.activeElement)
        ) {
          onClose();
        }
      }}
      onFocusCapture={item.children.length ? onOpen : undefined}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onClose();
        }
      }}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          prefetch={false}
          onMouseEnter={() => onPrefetch(item.href)}
          onClick={() => onNavigate(item)}
          aria-current={isActive(item.href) ? "page" : undefined}
          className={`flex min-h-11 items-center rounded-l-lg px-2.5 text-[13px] font-medium transition-colors xl:px-3 ${
            isActive(item.href) || open
              ? "text-white"
              : "text-slate-200 hover:text-white"
          }`}
        >
          {item.label}
        </Link>
        {item.children.length > 0 && (
          <button
            ref={triggerRef}
            type="button"
            aria-label={`${open ? "Cerrar" : "Abrir"} opciones de ${item.label}`}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={onToggle}
            className="inline-flex min-h-11 min-w-8 items-center justify-center rounded-r-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      {open && item.children.length > 0 && (
        <div
          id={menuId}
          className="absolute left-0 top-full z-50 w-[min(34rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_24px_64px_rgba(7,17,31,0.24)]"
        >
          <div className="border-b border-slate-200 px-3 pb-3 pt-2">
            <p className="text-sm font-semibold text-slate-900">{item.label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {item.description}
            </p>
          </div>
          <ul className="grid gap-1 pt-2 sm:grid-cols-2">
            {item.children.map((child) => (
              <li key={`${child.href}-${child.label}`}>
                <MenuChildLink
                  item={child}
                  onNavigate={onNavigate}
                  onClose={onClose}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function MenuChildLink({
  item,
  onNavigate,
  onClose,
}: {
  item: { href: string; label: string; description?: string };
  onNavigate: (link: { href: string; label: string }) => void;
  onClose: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={() => {
        onNavigate(item);
        onClose();
      }}
      className="group flex min-h-11 items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
    >
      <span>
        <span className="block text-sm font-semibold text-slate-900 group-hover:text-blue-700">
          {item.label}
        </span>
        {item.description && (
          <span className="mt-1 block text-xs leading-5 text-slate-500">
            {item.description}
          </span>
        )}
      </span>
      <span aria-hidden="true" className="shrink-0 text-blue-700">
        →
      </span>
    </Link>
  );
}

function MobileNavigationGroup({
  item,
  isActive,
  onNavigate,
  onClose,
}: {
  item: PrimaryNavigationItem;
  isActive: (href: string) => boolean;
  onNavigate: (link: { href: string; label: string }) => void;
  onClose: () => void;
}) {
  const allLinks = [item, ...item.children];

  return (
    <section aria-labelledby={`mobile-nav-${item.label.toLowerCase()}`}>
      <Link
        id={`mobile-nav-${item.label.toLowerCase()}`}
        href={item.href}
        onClick={() => {
          onNavigate(item);
          onClose();
        }}
        aria-current={isActive(item.href) ? "page" : undefined}
        className={`flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold ${
          isActive(item.href)
            ? "bg-blue-100 text-blue-700"
            : "text-white hover:bg-white/10"
        }`}
      >
        {item.label}
      </Link>
      {item.children.length > 0 && (
        <ul className="mt-1 space-y-0.5 border-l border-white/10 pl-2">
          {allLinks.slice(1).map((child) => (
            <li key={`${child.href}-${child.label}`}>
              <Link
                href={child.href}
                onClick={() => {
                  onNavigate(child);
                  onClose();
                }}
                aria-current={isActive(child.href) ? "page" : undefined}
                className={`flex min-h-11 items-center rounded-lg px-3 py-2 text-sm ${
                  isActive(child.href)
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
