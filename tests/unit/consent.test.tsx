import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CookieConsent } from "@/components/shared/ui/CookieConsent";
import { ConversionFire } from "@/components/layout/ConversionFire";
import { isAnalyticsConsented, trackEvent, updateAnalyticsConsent } from "@/lib/analytics-client";

afterEach(() => { cleanup(); localStorage.clear(); sessionStorage.clear(); vi.unstubAllGlobals(); });

describe("analytics consent", () => {
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