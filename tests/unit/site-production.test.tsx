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
import { POST as submitContact } from "@/app/api/contact/route";
import { GET as health } from "@/app/api/health/route";
import { Footer } from "@/components/layout/Footer";
import { contactDetails } from "@/data/site";

afterEach(() => {
  cleanup();
  globalThis.__novamindRateLimitStore = undefined;
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("production destinations", () => {
  it("submits contact through the application service and a server-side destination", () => {
    const contactRoute = readFileSync(
      resolve("app/api/contact/route.ts"),
      "utf8",
    );
    expect(contactRoute).toContain("leadSubmissionService.submit(command)");
    expect(contactRoute).not.toContain("EmailLeadDestination");
    expect(contactRoute).not.toContain("sendMail(");
  });

  it("publishes only organization facts that are configured as public", () => {
    for (const file of ["app/layout.tsx", "app/sobre-nosotros/page.tsx"]) {
      const source = readFileSync(resolve(file), "utf8");
      for (const unsupportedField of [
        '"@type": "LocalBusiness"',
        "foundingDate:",
        "numberOfEmployees:",
        "foundingLocation:",
        "foundedBy:",
        "priceRange:",
        "openingHours:",
        "SearchAction",
      ]) {
        expect(source, file).not.toContain(unsupportedField);
      }
    }

    const footer = readFileSync(
      resolve("components/layout/Footer.tsx"),
      "utf8",
    );
    expect(footer).toContain(
      'href="https://www.linkedin.com/company/novamind-global"',
    );
    expect(footer).not.toContain('href="https://github.com"');
  });

  it("keeps the home page focused on the enterprise journey and real product routes", () => {
    const home = readFileSync(resolve("app/page.tsx"), "utf8");
    for (const section of [
      "HeroSection",
      "TrustBar",
      "ProblemsSection",
      "SolutionAreasSection",
      "NovaAssistServicesSection",
      "ImplementationSection",
      "ProductHighlights",
      "SecurityTrustSection",
      "HomeInsightsSection",
      "PawTrackCommunitySection",
      "FinalCTA",
    ]) {
      expect(home).toContain(section);
    }
    for (const removedSection of [
      "AudienceRoutesSection",
      "ProductGrid",
      "PricingTeaser",
      "TrustCenterSection",
      "NewsletterSection",
      "SolutionFinderSection",
    ]) {
      expect(home).not.toContain(removedSection);
    }
  });

  it("keeps liveness independent from optional monitoring", async () => {
    vi.stubEnv("MONITORING_WEBHOOK_URL", undefined);
    expect(
      (await health(new Request("https://novamindglobalcr.com/api/health")))
        .status,
    ).toBe(200);
  });

  it("reports unavailable delivery as not ready", async () => {
    vi.stubEnv("RESEND_API_KEY", undefined);
    vi.stubEnv("SMTP_HOST", undefined);
    expect(
      (
        await health(
          new Request("https://novamindglobalcr.com/api/health?check=ready"),
        )
      ).status,
    ).toBe(503);
  });

  it("reports missing production Turnstile configuration as not ready", async () => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("TURNSTILE_ENABLED", "false");
      const response = await health(
        new Request("https://novamindglobalcr.com/api/health?check=ready"),
      );
      expect(response.status).toBe(503);
      expect(await response.json()).toMatchObject({
        checks: { turnstile: false },
      });
  });

  function configureMail() {
    globalThis.__novamindRateLimitStore = undefined;
    vi.stubEnv("RESEND_API_KEY", "test-only");
    vi.stubEnv("CONTACT_TO_EMAIL", "novamindglobalcr@gmail.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "info@novamindglobalcr.com");
    vi.stubEnv("SMTP_HOST", undefined);
    vi.stubEnv("MONITORING_WEBHOOK_URL", undefined);
  }

  function requestFor(path: string, payload: Record<string, unknown>) {
    return new Request(`https://novamindglobalcr.com${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  const contact = {
    name: "Audit User",
    email: "audit@example.com",
    interest: "Consultoria",
    message: "Solicito informacion sobre servicios.",
    consentPrivacy: true,
  };

  it("accepts empty optional contact fields", async () => {
    const response = await submitContact(
      requestFor("/api/contact", {
        ...contact,
        website: "honeypot",
        leadVolume: "",
        urgency: "",
        implementationHorizon: "",
      }),
    );
    expect(response.status).toBe(200);
  });

  it("rejects credentials in contact text before attempting email delivery", async () => {
    configureMail();
    const sendMail = vi.fn();
    vi.stubGlobal("fetch", sendMail);
    const response = await submitContact(
      requestFor("/api/contact", {
        ...contact,
        message: "Mi contraseña: ejemplo-secreto",
      }),
    );
    expect(response.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("does not include invalid form values or client IPs in validation logs", async () => {
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await submitContact(
      new Request("https://novamindglobalcr.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": "192.0.2.44",
        },
        body: JSON.stringify({
          ...contact,
          name: "private-customer-name",
          email: "not-an-email",
        }),
      }),
    );
    expect(response.status).toBe(400);
    const capturedLogs = JSON.stringify(errorLog.mock.calls);
    expect(capturedLogs).not.toContain("private-customer-name");
    expect(capturedLogs).not.toContain("not-an-email");
    expect(capturedLogs).not.toContain("192.0.2.44");
  });

  it("does not include client IP or form values in unexpected-error logs", async () => {
    vi.stubEnv("SMTP_PORT", "not-a-port");
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const response = await submitContact(
        new Request("https://novamindglobalcr.com/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": "192.0.2.44",
          },
          body: JSON.stringify({
            ...contact,
            name: "private-customer-name",
          }),
        }),
      );
      expect(response.status).toBe(503);
      const capturedLogs = JSON.stringify(errorLog.mock.calls);
      expect(capturedLogs).not.toContain("private-customer-name");
      expect(capturedLogs).not.toContain("audit@example.com");
      expect(capturedLogs).not.toContain("192.0.2.44");
    } finally {
      errorLog.mockRestore();
    }
  });

  it("does not report a rejected contact email as delivered", async () => {
    configureMail();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            name: "validation_error",
            message: "Sender not verified",
          }),
          { status: 422 },
        ),
      ),
    );
    const response = await submitContact(requestFor("/api/contact", contact));
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ ok: false });
  });

  it("includes server-derived normalized lead routing in the existing contact email", async () => {
    configureMail();
    const sendMail = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email-test" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", sendMail);
    const response = await submitContact(
      new Request("https://novamindglobalcr.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": "192.0.2.44",
        },
        body: JSON.stringify({
          ...contact,
          plan: "nova-assist-business-it-health-check",
          interest: "IT Health Check",
          urgency: "media",
          requestPreference: "remote",
          turnstileToken: "server-only-test-token",
          message: "No registrar respuestas libres en la clasificación.",
        }),
      }),
    );
    expect(response.status).toBe(200);
    const mailRequest = JSON.parse(sendMail.mock.calls[0][1].body);
    const deliveredContent = `${mailRequest.text}\n${mailRequest.html}`;
    expect(deliveredContent).not.toContain("server-only-test-token");
    expect(deliveredContent).not.toContain("192.0.2.44");
    const intentLine = mailRequest.text
      .split("\n")
      .find((line: string) => line.startsWith("Clasificación interna (1.0.0): "));
    expect(intentLine).toBeDefined();
    const intent = JSON.parse(intentLine.replace("Clasificación interna (1.0.0): ", ""));
    expect(intent).toMatchObject({
      segment: "business",
      requestKind: "assessment",
      serviceId: "it-health-check",
      preferredDelivery: "remote",
    });
    expect(intent).not.toHaveProperty("companySizeRange");
    expect(intent).not.toHaveProperty("message");
  });

  it("does not accept newsletter without a delivery provider", async () => {
    configureMail();
    vi.stubEnv("RESEND_API_KEY", undefined);
    const response = await subscribeNewsletter(
      requestFor("/api/newsletter", {
        email: "reader@example.com",
        consentPrivacy: true,
      }),
    );
    expect(response.status).toBe(503);
  });

  it("does not report a rejected newsletter email as delivered", async () => {
    configureMail();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("{}", { status: 422 })),
    );
    const response = await subscribeNewsletter(
      requestFor("/api/newsletter", {
        email: "reader@example.com",
        consentPrivacy: true,
      }),
    );
    expect(response.status).toBe(503);
  });

  it("escapes newsletter HTML and supplies plain text", async () => {
    configureMail();
    const send = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ id: "email-test" }), { status: 200 }),
      );
    vi.stubGlobal("fetch", send);
    const response = await subscribeNewsletter(
      requestFor("/api/newsletter", {
        email: "reader@example.com",
        interest: "<img src=x>",
        consentPrivacy: true,
      }),
    );
    expect(response.status).toBe(200);
    const payload = JSON.parse(send.mock.calls[0][1].body);
    expect(payload.html).toContain("&lt;img src=x&gt;");
    expect(payload.html).not.toContain("<img src=x>");
    expect(payload.text).toContain("reader@example.com");
  });

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
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: contactDetails.email }),
    ).toHaveAttribute("href", "mailto:info@novamindglobalcr.com");
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
      .mockResolvedValue(
        new Response(JSON.stringify({ id: "email-test" }), { status: 200 }),
      );
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
