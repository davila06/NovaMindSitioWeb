import { describe, expect, it } from "vitest";
import { createNovaAssistIntent } from "@/lib/nova-assist-intent";

describe("Nova Assist normalized intent", () => {
  it("normalizes residential services and existing request choices", () => {
    expect(createNovaAssistIntent({
      plan: "nova-assist-visita-express",
      urgency: "alta",
      requestPreference: "visit",
    })).toEqual({
      schemaVersion: "1.0.0",
      segment: "home",
      requestKind: "residential_service",
      serviceId: "visita-express",
      source: "nova_assist_home",
      urgencyCategory: "urgent",
      preferredDelivery: "onsite",
      technologyAreas: ["device_support"],
      consentVersion: "2026-01",
    });
  });

  it.each([
    ["business", "business_support"],
    ["azure-cloud", "business_opportunity"],
    ["it-health-check", "assessment"],
    ["technology-projects", "consulting_project"],
  ] as const)("classifies business service %s as %s", (serviceId, requestKind) => {
    expect(createNovaAssistIntent({
      plan: `nova-assist-business-${serviceId}`,
    })).toMatchObject({
      segment: "business",
      requestKind,
      serviceId,
      source: "nova_assist_business",
    });
  });

  it("maps legacy residential links to the current catalog service", () => {
    expect(createNovaAssistIntent({ plan: "clickfix-familiar" })).toMatchObject({
      segment: "home",
      requestKind: "residential_service",
      serviceId: "plan-familia",
      source: "nova_assist_home",
    });
  });

  it("keeps general inquiries free of arbitrary text and unavailable qualification fields", () => {
    const untrustedInput = {
      interest: "private@example.com",
      plan: "unknown-free-form-plan",
      message: "We have 24 employees and use Azure",
      companySizeRange: "24",
      hasInternalIT: "yes",
    };
    const intent = createNovaAssistIntent(untrustedInput);
    expect(intent).toEqual({
      schemaVersion: "1.0.0",
      segment: "business",
      requestKind: "general_inquiry",
      serviceId: "general-inquiry",
      source: "contact_form",
      consentVersion: "2026-01",
    });
    expect(JSON.stringify(intent)).not.toContain("private@example.com");
    expect(intent).not.toHaveProperty("companySizeRange");
    expect(intent).not.toHaveProperty("hasInternalIT");
    expect(intent).not.toHaveProperty("message");
  });

  it("maps existing urgency and delivery values without deriving a commercial score", () => {
    expect(createNovaAssistIntent({
      plan: "nova-assist-business-it-health-check",
      urgency: "media",
      requestPreference: "remote",
    })).toMatchObject({
      urgencyCategory: "soon",
      preferredDelivery: "remote",
    });
    expect(createNovaAssistIntent({
      plan: "nova-assist-business-it-health-check",
      urgency: "baja",
      requestPreference: "unsure",
    })).toMatchObject({
      urgencyCategory: "standard",
      preferredDelivery: "unsure",
    });
  });
});
