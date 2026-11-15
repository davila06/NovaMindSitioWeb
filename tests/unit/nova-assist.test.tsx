import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { vi } from "vitest";
import { updateAnalyticsConsent } from "@/lib/analytics-client";
import { ServiceSelector } from "@/components/nova-assist/ServiceSelector";
import { BusinessSelector } from "@/components/nova-assist/BusinessSelector";
import { AnalyticsEvent } from "@/components/nova-assist/AnalyticsEvent";
import { StrictMode } from "react";
import {
  novaAssistServiceBySlug,
  planPolicies,
} from "@/data/nova-assist";

describe("Nova Assist service guidance", () => {
  it("records the current view once when analytics consent is granted after navigation", () => {
    localStorage.clear();
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    render(<StrictMode><AnalyticsEvent event="nova_assist_landing_view" /></StrictMode>);
    expect(gtag.mock.calls.filter(call => call[1] === "nova_assist_landing_view")).toHaveLength(0);
    updateAnalyticsConsent(true);
    expect(gtag.mock.calls.filter(call => call[1] === "nova_assist_landing_view")).toHaveLength(1);
    updateAnalyticsConsent(true);
    expect(gtag.mock.calls.filter(call => call[1] === "nova_assist_landing_view")).toHaveLength(1);
    vi.unstubAllGlobals();
    localStorage.clear();
  });
  it("emits one view under Strict Mode and one business recommendation per selection", () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    gtag.mockClear();
    render(<StrictMode><AnalyticsEvent event="plan_comparison_viewed" segment="business" /><BusinessSelector /></StrictMode>);
    expect(gtag.mock.calls.filter(call => call[1] === "plan_comparison_viewed")).toHaveLength(1);
    fireEvent.click(screen.getAllByRole("button", { pressed: false })[0]);
    expect(gtag.mock.calls.filter(call => call[1] === "service_recommended")).toHaveLength(1);
    vi.unstubAllGlobals();
    localStorage.clear();
  });
  it("disables the service choices in server-rendered HTML until hydration", () => {
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(<ServiceSelector />);
    const buttons = container.querySelectorAll<HTMLButtonElement>("fieldset button");
    expect(buttons.length).toBeGreaterThan(0);
    expect(Array.from(buttons).every((button) => button.disabled)).toBe(true);
  });

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

  it("records selector start, answer and recommendation only after interaction", () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    gtag.mockClear();
    render(<ServiceSelector />);
    expect(gtag).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Resolver un problema" }));
    expect(gtag.mock.calls.filter(call => call[0] === "event").map(call => call[1])).toEqual([
      "service_selector_started", "service_selector_answered", "service_recommended",
    ]);
    vi.unstubAllGlobals();
    localStorage.clear();
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
