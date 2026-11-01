import { describe, expect, it, vi } from "vitest";
import { promises as fs } from "node:fs";
import { getBlogPostSummaries } from "@/lib/content";
import {
  validateMarketPagesContent,
  validateProductsContent,
} from "@/lib/content-schema";

describe("lib/content-schema", () => {
  it("sirve el blog sin depender del filesystem en runtime", async () => {
    const readDirectory = vi
      .spyOn(fs, "readdir")
      .mockRejectedValue(new Error("filesystem unavailable"));
    try {
      expect((await getBlogPostSummaries()).length).toBeGreaterThan(0);
    } finally {
      readDirectory.mockRestore();
    }
  });

  it("valida un producto correcto", () => {
    const result = validateProductsContent([
      {
        slug: "demo-product",
        name: "Demo Product",
        shortDescription: "Descripcion breve del producto para validacion.",
        heroTitle: "Titulo principal para validacion de schema",
        heroSubtitle: "Subtitulo principal para validacion de schema",
        heroStats: [{ label: "Ahorro", value: "30%" }],
        problem: ["Problema 1"],
        solution: ["Solucion 1"],
        benefits: ["Beneficio 1"],
        features: ["Feature 1"],
        audiences: ["Audience 1"],
        integrations: ["Integracion 1"],
        differentiators: ["Diferenciador 1"],
        showcase: [{ title: "Caso", detail: "Detalle", accent: "Acento" }],
        faq: [{ question: "Pregunta?", answer: "Respuesta." }],
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0]?.slug).toBe("demo-product");
  });

  it("rechaza market pages invalidas", () => {
    expect(() =>
      validateMarketPagesContent([
        {
          slug: "rrhh",
          title: "RRHH",
          subtitle: "corto",
          problemPoints: [],
          valuePoints: [],
          recommendedProducts: [],
        },
      ]),
    ).toThrow();
  });
});
