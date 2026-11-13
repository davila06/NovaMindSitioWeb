import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/lib/seo";

describe("canonical sitemap", () => {
  it("includes public commercial entry points without duplicates", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    for (const path of [
      "/nova-assist",
      "/nova-assist/servicios",
      "/nova-assist/visita-express",
      "/nova-assist/visita-premium",
      "/nova-assist/plan-familia",
      "/nova-assist/total-home",
      "/nova-assist/comparar",
      "/nova-assist/como-funciona",
      "/nova-assist/preguntas-frecuentes",
      "/empresas",
      "/servicios",
      "/casos",
      "/comparar",
      "/demos",
      "/productos/saas",
      "/productos/novaclick",
      "/productos/pawtrack",
    ])
      expect(urls).toContain(`${siteConfig.url}${path}`);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("excludes noindex pages and fabricated modification dates", async () => {
    const entries = await sitemap();
    for (const path of ["/privacidad", "/terminos", "/gracias", "/offline"])
      expect(entries.map((entry) => entry.url)).not.toContain(
        `${siteConfig.url}${path}`,
      );
    expect(
      entries
        .filter((entry) => !entry.url.includes("/blog/"))
        .every((entry) => entry.lastModified === undefined),
    ).toBe(true);
  });
});
