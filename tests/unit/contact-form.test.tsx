import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ContactForm } from "@/components/shared/ui/ContactForm";
import { updateAnalyticsConsent } from "@/lib/analytics-client";

describe("ContactForm", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("disables form controls in server-rendered HTML until hydration", () => {
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(<ContactForm variant="service-request" />);
    expect(container.querySelector("form fieldset:disabled")).not.toBeNull();
    expect(container.querySelector("form button")?.matches(":disabled")).toBe(true);
  });

  it("preserva el plan del enlace sin persistir datos personales", () => {
    render(<ContactForm plan="clickfix-express" />);
    fireEvent.change(screen.getByPlaceholderText(/tu nombre/i), { target: { value: "Ana Perez" } });
    fireEvent.change(screen.getByPlaceholderText(/correo@ejemplo.com/i), { target: { value: "ana@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    expect(screen.getByLabelText(/interés principal/i)).toHaveValue("Soporte tecnológico para hogares");
    expect(localStorage.getItem("nm-contact-draft")).toBeNull();
  });

  it("preserva el servicio empresarial seleccionado al enviar", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, channel: "protected" }),
    });
    render(<ContactForm variant="business" plan="nova-assist-business-azure-cloud" />);
    fireEvent.change(screen.getByPlaceholderText(/tu nombre/i), { target: { value: "Ana Perez" } });
    fireEvent.change(screen.getByPlaceholderText(/correo@ejemplo.com/i), { target: { value: "ana@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    expect(screen.getByLabelText(/interés principal/i)).toHaveValue("Azure & Cloud");
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "Necesitamos revisar nuestra arquitectura cloud." } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /enviar solicitud/i }));
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      const body = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(body.plan).toBe("nova-assist-business-azure-cloud");
      expect(body.interest).toBe("Azure & Cloud");
    });
  });

  it("registra el envío empresarial sin datos personales", async () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, channel: "cloudflare", requestId: "test-request" }),
    });
    render(<ContactForm variant="business" plan="nova-assist-business-azure-cloud" />);
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Ana Perez" } });
    fireEvent.change(screen.getByLabelText("Correo empresarial"), { target: { value: "ana@example.com" } });
    fireEvent.change(screen.getByLabelText("Empresa"), { target: { value: "Empresa Ejemplo" } });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "Necesitamos revisar la nube." } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /enviar solicitud/i }));
    await waitFor(() => expect(gtag.mock.calls.some(call => call[1] === "service_request_succeeded")).toBe(true));
    const eventArgs = JSON.stringify(gtag.mock.calls);
    expect(gtag.mock.calls.some(call => call[1] === "form_progress")).toBe(false);
    expect(eventArgs).not.toContain("ana@example.com");
    expect(eventArgs).not.toContain("Empresa Ejemplo");
    expect(eventArgs).not.toContain("Necesitamos revisar la nube");
  });

  it("reports failed requests using a fixed category rather than the server message", async () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    fetchMock.mockResolvedValueOnce({ ok: false, status: 503, json: async () => ({ ok: false, message: "private@example.com" }) });
    render(<ContactForm variant="business" />);
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Ana Perez" } });
    fireEvent.change(screen.getByLabelText("Correo empresarial"), { target: { value: "ana@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "Necesitamos revisar la nube." } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /enviar solicitud/i }));
    await waitFor(() => expect(gtag.mock.calls.some(call => call[1] === "service_request_failed")).toBe(true));
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("private@example.com");
  });

  it.each([
    [true, "health_check_succeeded"],
    [false, "health_check_failed"],
  ])("tracks the Health Check outcome for a real submit (success=%s)", async (success, expected) => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    gtag.mockClear();
    fetchMock.mockResolvedValueOnce({
      ok: success,
      json: async () => success ? { ok: true, channel: "cloudflare" } : { ok: false, message: "private@example.com" },
    });
    render(<ContactForm variant="business" plan="nova-assist-business-it-health-check" healthCheck />);
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Ana Perez" } });
    fireEvent.change(screen.getByLabelText("Correo empresarial"), { target: { value: "ana@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "Necesitamos revisar la nube." } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /enviar solicitud/i }));
    await waitFor(() => expect(gtag.mock.calls.filter(call => call[1] === expected)).toHaveLength(1));
    expect(gtag.mock.calls.filter(call => call[1] === "health_check_submitted")).toHaveLength(1);
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("private@example.com");
  });

  it("mantiene PawTrack fuera de los intereses comerciales", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText(/tu nombre/i), { target: { value: "Ana Perez" } });
    fireEvent.change(screen.getByPlaceholderText(/correo@ejemplo.com/i), { target: { value: "ana@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));

    expect(screen.queryByRole("option", { name: /PawTrack/i })).not.toBeInTheDocument();
  });

  it("no registra abandono mientras se editan campos", () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    render(<ContactForm />);
    fireEvent.change(screen.getByPlaceholderText(/tu nombre/i), { target: { value: "Ana" } });
    fireEvent.change(screen.getByPlaceholderText(/tu nombre/i), { target: { value: "Ana Perez" } });
    expect(gtag.mock.calls.some(call => call[1] === "form_progress" && call[2]?.step === "abandon")).toBe(false);
  });

  it("muestra errores de validacion si faltan campos requeridos", async () => {
    render(<ContactForm />);

    // El formulario es multi-paso; en el paso 1 se muestra "Siguiente"
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));

    await waitFor(() => {
      expect(screen.getByText(/ingresa un nombre valido/i)).toBeInTheDocument();
    });
  });

  it("envia el formulario y muestra confirmacion en caso exitoso", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, channel: "resend", requestId: "req-123" }),
    });

    render(<ContactForm />);

    // Paso 1: llenar nombre y correo, avanzar
    fireEvent.change(screen.getByPlaceholderText(/tu nombre/i), {
      target: { value: "Juan Perez" },
    });
    fireEvent.change(screen.getByPlaceholderText(/correo@ejemplo.com/i), {
      target: { value: "juan@empresa.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));

    // Paso 2: "Interés principal" ya tiene valor por defecto, avanzar
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /siguiente/i }),
      ).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));

    // Paso 3: llenar mensaje y enviar
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/cuéntanos sobre tu operación/i),
      ).toBeInTheDocument();
    });
    fireEvent.change(
      screen.getByPlaceholderText(/cuéntanos sobre tu operación/i),
      {
        target: {
          value:
            "Necesitamos automatizar procesos de seguimiento comercial este trimestre.",
        },
      },
    );

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /enviar solicitud/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );
    });

    expect(
      await screen.findByText(/solicitud enviada por resend/i),
    ).toBeInTheDocument();
  });
});
