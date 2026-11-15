import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { updateAnalyticsConsent } from "@/lib/analytics-client";
import { BusinessHealthCheck } from "@/components/nova-assist/BusinessHealthCheck";

describe("IT Health Check", () => {
  it("starts when review is requested without answering optional questions", () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    gtag.mockClear();
    render(<BusinessHealthCheck />);
    fireEvent.click(screen.getByRole("button", { name: /continuar a contacto/i }));
    expect(gtag.mock.calls.filter(call => call[1] === "health_check_started")).toHaveLength(1);
    vi.unstubAllGlobals();
    localStorage.clear();
  });
  it("tracks progress and review without sending answers", () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    gtag.mockClear();
    render(<BusinessHealthCheck />);
    fireEvent.change(screen.getByLabelText("Industria"), { target: { value: "Comercio" } });
    fireEvent.click(screen.getByRole("button", { name: /continuar a contacto/i }));
    const events = gtag.mock.calls.map(call => call[1]);
    expect(events).toContain("health_check_started");
    expect(events).toContain("health_check_step_completed");
    expect(events).toContain("health_check_reviewed");
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("Comercio");
    vi.unstubAllGlobals();
    localStorage.clear();
  });
  it("transfers only the selected context to the secure contact flow", () => {
    render(<BusinessHealthCheck />);
    fireEvent.change(screen.getByLabelText("Industria"), { target: { value: "Comercio" } });
    fireEvent.change(screen.getByLabelText("¿Utilizan MFA?"), { target: { value: "Sí" } });
    fireEvent.click(screen.getByRole("button", { name: /continuar a contacto/i }));
    expect(screen.getByText(/orientar una conversación inicial/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/tu nombre/i), { target: { value: "Ana Perez" } });
    fireEvent.change(screen.getByPlaceholderText(/correo@ejemplo.com/i), { target: { value: "ana@example.com" } });
    fireEvent.change(screen.getByLabelText("Empresa"), { target: { value: "Empresa Ejemplo" } });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    expect(screen.getByLabelText("Mensaje")).toHaveValue(
      "IT Health Check: contexto inicial.\nIndustria: Comercio\n¿Utilizan MFA?: Sí",
    );
  });
});
