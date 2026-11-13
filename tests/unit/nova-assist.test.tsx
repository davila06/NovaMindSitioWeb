import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceSelector } from "@/components/nova-assist/ServiceSelector";
import {
  novaAssistServiceBySlug,
  planPolicies,
} from "@/data/nova-assist";

describe("Nova Assist service guidance", () => {
  it("keeps the published limits aligned with the defined service model", () => {
    expect(planPolicies.express).toEqual({ maxIncidents: 1, durationMinutes: 60 });
    expect(planPolicies.premium.durationMinutes).toBe(120);
    expect(planPolicies.smartHome.maxDevices).toBe(3);
    expect(planPolicies.family).toMatchObject({
      maxDevices: 5,
      maxUsers: 5,
      remoteHours: 4,
      remoteSessionMinutes: 60,
      visitsPerMonth: 1,
      visitMinutes: 90,
      responseTargetBusinessHours: 8,
    });
    expect(planPolicies.totalHome).toMatchObject({
      maxDevices: 8,
      maxUsers: 8,
      remoteHours: 8,
      remoteSessionMinutes: 90,
      visitsPerMonth: 2,
      visitMinutes: 120,
      responseTargetBusinessHours: 4,
    });
    expect(planPolicies.policies.deviceSubstitutionsPerMonth).toBe(2);
  });

  it("recommends Premium when a problem also needs broader maintenance", () => {
    render(<ServiceSelector />);
    fireEvent.click(screen.getByRole("button", { name: "Resolver un problema" }));
    fireEvent.click(screen.getByRole("button", { name: "Sí, necesito más tareas" }));

    expect(screen.getByRole("heading", { name: "Visita Premium" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ver servicio/i })).toHaveAttribute(
      "href",
      "/nova-assist/visita-premium",
    );
  });

  it("waits for device count before recommending a recurring plan", () => {
    render(<ServiceSelector />);
    fireEvent.click(screen.getByRole("button", { name: "Soporte recurrente" }));

    expect(screen.queryByRole("heading", { name: "Plan Familia" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Hasta 8 dispositivos" }));
    expect(screen.getByRole("heading", { name: "Total Home" })).toBeInTheDocument();
  });

  it("describes Total Home as preventive management, not only expanded household support", () => {
    expect(novaAssistServiceBySlug["total-home"].tagline).toContain(
      "Administración preventiva",
    );
    expect(novaAssistServiceBySlug["total-home"].includes).toContain(
      "Inventario tecnológico del hogar, historial de incidencias y seguimiento.",
    );
  });
});
