import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FAQSection } from "@/components/home/FAQSection";

describe("FAQ accessibility", () => {
  it("supports keyboard activation and exposes only the expanded answer", async () => {
    render(<FAQSection />);
    const user = userEvent.setup();

    const question = screen.getByRole("button", {
      name: /mostrar respuesta: ¿para qué tipo de empresas/i,
    });
    expect(question).toHaveAttribute("aria-expanded", "false");

    await user.tab();
    expect(question).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(question).toHaveAccessibleName(
      /ocultar respuesta: ¿para qué tipo de empresas/i,
    );
    expect(
      screen.getByText(/trabajamos con PYMES y organizaciones/i),
    ).toBeVisible();
  });
});
