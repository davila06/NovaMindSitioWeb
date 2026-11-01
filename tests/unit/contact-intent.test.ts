import { describe, expect, it } from "vitest";
import { businessProducts, products } from "@/data/products";
import { homeSupportPlans, itManagedPlans } from "@/data/service-plans";
import { resolveContactIntent } from "@/lib/contact-intent";

describe("business catalog and contact intent", () => {
  it("keeps PawTrack out of the commercial SaaS catalog", () => {
    expect(businessProducts.map((product) => product.slug)).not.toContain(
      "pawtrack",
    );
    expect(businessProducts.length).toBeLessThan(products.length);
  });

  it("routes residential support plans to the household interest", () => {
    const plan = homeSupportPlans[0];
    const planId = new URL(plan.ctaHref, "https://novamind.example").searchParams.get("plan");
    expect(resolveContactIntent(planId ?? undefined)).toEqual({
      plan: planId,
      interest: "Soporte tecnológico para hogares",
    });
  });

  it("routes managed IT plans to the business interest", () => {
    const plan = itManagedPlans[0];
    const planId = new URL(plan.ctaHref, "https://novamind.example").searchParams.get("plan");
    expect(resolveContactIntent(planId ?? undefined)).toEqual({
      plan: planId,
      interest: "Soporte TI para empresas",
    });
  });

  it("routes business product inquiries to the selected product", () => {
    const product = businessProducts[0];
    expect(resolveContactIntent(`saas-${product.slug}`)).toEqual({
      plan: `saas-${product.slug}`,
      interest: product.name,
    });
  });
});
