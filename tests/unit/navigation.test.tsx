import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

vi.mock("next/navigation", () => ({ usePathname: () => "/contacto", useRouter: () => ({ prefetch: vi.fn(), push: vi.fn() }) }));
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/shared/ui/Button";

afterEach(cleanup);

describe("navigation and public evidence", () => {
  it("announces menu expansion and restores keyboard focus", () => {
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: "Abrir menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(trigger).toHaveFocus();
  });

  it("does not mark a home anchor active on another page", () => {
    render(<Navbar />);
    for (const link of screen.getAllByRole("link", { name: "Productos" })) expect(link).not.toHaveAttribute("aria-current");
  });

  it("removes navigation from disabled links", () => {
    render(<Button href="/contacto" disabled>Disabled</Button>);
    const link = screen.getByRole("link", { name: "Disabled" });
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("tabindex", "-1");
  });

  it("does not publish unsupported prices or ratings in product schema", () => {
    for (const file of ["components/products/ProductPageContent.tsx", "components/home/ProductCatalogSchema.tsx"]) {
      const source = readFileSync(resolve(file), "utf8");
      expect(source).not.toContain("aggregateRating:");
      expect(source).not.toContain("price: '0'");
    }
  });

  it("does not mount synthetic social proof or Pages Router preloading", () => {
    const source = readFileSync(resolve("components/layout/AppShell.tsx"), "utf8");
    expect(source).not.toContain("<SocialProofToast");
    expect(source).not.toContain("<RoutePreloader");
  });
});