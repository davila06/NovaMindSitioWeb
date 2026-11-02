import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CookieConsent } from "@/components/shared/ui/CookieConsent";
import { ConversionFire } from "@/components/layout/ConversionFire";
import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { isAnalyticsConsented, trackEvent, updateAnalyticsConsent } from "@/lib/analytics-client";

vi.mock("next/script", () => ({
  default: ({ children, strategy, ...props }: React.ComponentProps<"script"> & { strategy?: string }) => {
    void strategy;
    return <script {...props}>{children}</script>;
  },
}));

afterEach(() => { cleanup(); localStorage.clear(); sessionStorage.clear(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe("analytics consent", () => {
  it("loads the NovaMind tag only after consent and removes it on revocation", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", undefined);
    vi.stubEnv("NEXT_PUBLIC_CLARITY_ID", undefined);
    const { container } = render(<AnalyticsScripts />);
    expect(container.querySelector("script")).toBeNull();
    fireEvent(window, new Event("nm:consent-change"));
    expect(container.querySelector("script")).toBeNull();
    localStorage.setItem("nm-cookie-consent", JSON.stringify({ version: "2026-11", analytics: true }));
    fireEvent(window, new Event("nm:consent-change"));
    expect(container.querySelector("script[src]")).toHaveAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-NYG6JCK4S2");
    expect(container.querySelector("#ga4-init")).toHaveTextContent("gtag('config', 'G-NYG6JCK4S2')");
    localStorage.setItem("nm-cookie-consent", JSON.stringify({ version: "2026-11", analytics: false }));
    fireEvent(window, new Event("nm:consent-change"));
    expect(container.querySelector("script")).toBeNull();
  });

  it("allows an explicit Analytics measurement ID override", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST123456");
    updateAnalyticsConsent(true);
    const { container } = render(<AnalyticsScripts />);
    expect(container.querySelector("script[src]")).toHaveAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-TEST123456");
  });

  it("stores a versioned decision understood by analytics", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: "Aceptar todas" }));
    expect(isAnalyticsConsented()).toBe(true);
    expect(JSON.parse(localStorage.getItem("nm-cookie-consent")!).version).toBe("2026-11");
  });

  it("persists rejection and allows reopening preferences", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: "Solo esenciales" }));
    expect(isAnalyticsConsented()).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Preferencias de cookies" }));
    expect(screen.getByRole("button", { name: "Aceptar todas" })).toBeInTheDocument();
  });

  it("does not send custom events after consent is revoked", () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    trackEvent("allowed");
    updateAnalyticsConsent(false);
    trackEvent("blocked");
    expect(gtag).toHaveBeenCalledWith("event", "allowed", {});
    expect(gtag).not.toHaveBeenCalledWith("event", "blocked", {});
    expect(JSON.parse(localStorage.getItem("nm-cookie-consent")!).analytics).toBe(false);
  });

  it("does not count visiting thanks as a lead", () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    gtag.mockClear();
    render(<ConversionFire />);
    expect(gtag).not.toHaveBeenCalled();
  });
});