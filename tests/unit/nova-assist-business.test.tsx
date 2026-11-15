import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { businessServices, businessServiceBySlug } from "@/data/nova-assist-business";
import { BusinessSelector } from "@/components/nova-assist/BusinessSelector";
import { resolveContactIntent } from "@/lib/contact-intent";

describe("Nova Assist Business", () => {
  it("keeps the business catalog and its related links consistent", () => {
    expect(businessServices).toHaveLength(12);
    for (const service of businessServices) {
      expect(service.included.length).toBeGreaterThan(0);
      expect(service.excluded.length).toBeGreaterThan(0);
      for (const slug of service.relatedServices) {
        expect(businessServiceBySlug[slug]).toBeDefined();
      }
    }
  });

  it("recommends a service with a clear next step", () => {
    render(<BusinessSelector />);
    fireEvent.click(screen.getByRole("button", { name: "Necesitamos gestionar la tecnología preventivamente" }));
    expect(screen.getByRole("heading", { name: "Business Pro" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Conocer Business Pro" })).toHaveAttribute(
      "href", "/nova-assist/empresas/business-pro",
    );
  });

  it("preserves the selected business service in the existing contact flow", () => {
    expect(resolveContactIntent("nova-assist-business-azure-cloud")).toMatchObject({
      plan: "nova-assist-business-azure-cloud",
      interest: "Azure & Cloud",
    });
  });
});
