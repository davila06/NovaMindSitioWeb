import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/shared/ui/ContactForm";

describe("Nova Assist service request flow", () => {
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

  it("submits a validated request and shows the returned identifier", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ok: true,
        channel: "cloudflare",
        requestId: "nova-request-123",
      }),
    });

    render(
      <ContactForm variant="service-request" service="visita-express" />,
    );
    expect(
      screen.getByRole("form", {
        name: "Solicitud de ayuda de Nova Assist",
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Sí, ya soy cliente" }));
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.change(screen.getByLabelText("Tipo de dispositivo"), {
      target: { value: "Computadora Windows" },
    });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.change(screen.getByLabelText("Descripción del problema"), {
      target: { value: "La computadora no inicia desde esta mañana." },
    });
    fireEvent.change(screen.getByLabelText("Urgencia de la solicitud"), {
      target: { value: "alta" },
    });
    fireEvent.change(screen.getByLabelText("Preferencia de atención"), {
      target: { value: "visit" },
    });
    fireEvent.change(screen.getByPlaceholderText("Provincia, cantón o zona aproximada"), {
      target: { value: "Zona de prueba" },
    });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Persona de prueba" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /^Correo electrónico$/ }));
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(payload).toMatchObject({
      customerStatus: "existing",
      plan: "nova-assist-visita-express",
      interest: "Visita Express",
      deviceType: "Computadora Windows",
      urgency: "alta",
      requestPreference: "visit",
      serviceArea: "Zona de prueba",
    });
    expect(payload).not.toHaveProperty("password");
    expect(payload).not.toHaveProperty("bankPin");
    expect(await screen.findByText("nova-request-123")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recibimos tu solicitud." })).toBeInTheDocument();
  });

  it("associates urgency and preference errors with their controls", () => {
    render(
      <ContactForm variant="service-request" service="visita-express" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Sí, ya soy cliente" }));
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.change(screen.getByLabelText("Tipo de dispositivo"), {
      target: { value: "Computadora Windows" },
    });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    fireEvent.change(screen.getByLabelText("Descripción del problema"), {
      target: { value: "La computadora no inicia desde esta mañana." },
    });
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));

    for (const [label, errorId] of [
      ["Urgencia de la solicitud", "request-urgency-error"],
      ["Preferencia de atención", "request-preference-error"],
    ]) {
      const control = screen.getByLabelText(label);
      expect(control).toHaveAttribute("aria-invalid", "true");
      expect(control).toHaveAttribute("aria-describedby", errorId);
      expect(document.getElementById(errorId)).toHaveTextContent(
        /Selecciona|Indica/,
      );
    }
  });
});
