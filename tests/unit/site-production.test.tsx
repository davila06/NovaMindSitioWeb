import React from "react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/lib/seo";
import { PwaInstallActions } from "@/components/products/PwaInstallActions";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ProductCTA } from "@/components/products/ProductCTA";
import { productBySlug } from "@/data/products";
import { POST as subscribeNewsletter } from "@/app/api/newsletter/route";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("production destinations", () => {
  it("uses the PawTrack brand and preserves access to its app", () => {
    expect(productBySlug.pawtrack.name).toBe("PawTrack CR / NALA");
    expect(productBySlug.pawtrack.heroSubtitle).toContain("Inspirado por NALA");
    render(<ProductCTA name="PawTrack CR / NALA" />);
    expect(
      screen.getByRole("link", { name: "Acceder a PawTrack CR" }),
    ).toHaveAttribute("href", "https://app.pawtrackcr.com/login");
    expect(
      screen.queryByRole("link", { name: "Quiero una demo" }),
    ).not.toBeInTheDocument();
    for (const file of [
      "app/productos/pawtrack/page.tsx",
      "components/layout/Footer.tsx",
      "lib/market.ts",
      "data/products.ts",
    ]) {
      expect(readFileSync(resolve(file), "utf8"), file).not.toContain(
        "Mi Mascotica",
      );
    }
  });

  it("publishes the selected primary email and example recipient", () => {
    expect(
      readFileSync(resolve("components/layout/Footer.tsx"), "utf8"),
    ).toContain("mailto:info@novamindglobalcr.com");
    const example = readFileSync(resolve(".env.example"), "utf8");
    expect(example).toContain("CONTACT_TO_EMAIL=novamindglobalcr@gmail.com");
    expect(example).toContain("CONTACT_FROM_EMAIL=info@novamindglobalcr.com");
  });

  it("routes newsletter notifications using the shared mail configuration", async () => {
    globalThis.__novamindRateLimitStore = undefined;
    vi.stubEnv("RESEND_API_KEY", "test-only");
    vi.stubEnv("CONTACT_TO_EMAIL", "novamindglobalcr@gmail.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "info@novamindglobalcr.com");
    vi.stubEnv("CONTACT_EMAIL", undefined);
    vi.stubEnv("FROM_EMAIL", undefined);
    const sendMail = vi
      .fn()
      .mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", sendMail);
    const response = await subscribeNewsletter(
      new Request("https://novamindglobalcr.com/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "reader@example.com",
          consentPrivacy: true,
        }),
      }),
    );
    expect(response.status).toBe(200);
    const payload = JSON.parse(sendMail.mock.calls[0][1].body);
    expect(payload.to).toBe("novamindglobalcr@gmail.com");
    expect(payload.from).toBe("info@novamindglobalcr.com");
  });

  it("uses the acquired domain for public metadata", () => {
    expect(siteConfig.url).toBe("https://novamindglobalcr.com");
    for (const file of [
      "app/layout.tsx",
      "app/sitemap.ts",
      "app/robots.ts",
      "app/blog/feed.xml/route.ts",
      "app/not-found.tsx",
      "components/home/TestimonialsSection.tsx",
      "app/privacidad/page.tsx",
      "app/terminos/page.tsx",
      "lib/og-image.tsx",
      "app/blog/[slug]/opengraph-image.tsx",
      "components/products/ProductHero.tsx",
      "components/layout/Footer.tsx",
      "components/layout/DemoCalendarModal.tsx",
      "components/shared/ui/ContactForm.tsx",
      "app/api/newsletter/route.ts",
    ]) {
      const source = readFileSync(resolve(file), "utf8");
      expect(source, file).not.toContain("https://novamindglobal.com");
      expect(source, file).not.toContain("novamindglobal.com");
    }
  });

  it("links PawTrack actions to its own live application", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false })),
    );
    render(<PwaInstallActions />);
    expect(
      screen.getByRole("link", { name: "Acceder a PawTrack CR" }),
    ).toHaveAttribute("href", "https://app.pawtrackcr.com/login");
    expect(
      screen.getByRole("link", { name: "Conocer PawTrack CR" }),
    ).toHaveAttribute("href", "https://pawtrackcr.com");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("uses the supplied WhatsApp number", () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(new URL(link.getAttribute("href")!).pathname).toBe("/50687669318");
  });
});
