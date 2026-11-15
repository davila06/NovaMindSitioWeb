import { afterEach, describe, expect, it, vi } from "vitest";
import { trackNovaEvent } from "@/lib/nova-analytics";
import { updateAnalyticsConsent } from "@/lib/analytics-client";

afterEach(() => {
  localStorage.clear();
  vi.unstubAllGlobals();
});

describe("Nova Assist analytics privacy", () => {
  it("only sends approved values and never sends without consent", () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    trackNovaEvent("service_recommended", { segment: "home", service_id: "gamer" });
    expect(gtag).not.toHaveBeenCalled();
    updateAnalyticsConsent(true);
    gtag.mockClear();
    trackNovaEvent("service_recommended", {
      segment: "home", service_id: "gamer",
      route: "/nova-assist?email=private@example.com",
      email: "private@example.com",
    });

    expect(gtag).toHaveBeenCalledWith("event", "service_recommended", {
      segment: "home", service_id: "gamer",
    });
    trackNovaEvent("service_recommended", { segment: "private@example.com", service_id: "private@example.com" });
    expect(gtag).toHaveBeenLastCalledWith("event", "service_recommended", {});
    updateAnalyticsConsent(false);
    gtag.mockClear();
    trackNovaEvent("service_recommended", { segment: "home" });
    expect(gtag).not.toHaveBeenCalled();
  });

  it("sets GA page context to an approved route without query or fragment data", () => {
    const gtag = vi.fn();
    vi.stubGlobal("gtag", gtag);
    updateAnalyticsConsent(true);
    gtag.mockClear();
    window.history.replaceState({}, "", "/nova-assist/solicitar?email=private%40example.com#private");
    trackNovaEvent("service_request_started", { segment: "home" });
    expect(gtag).toHaveBeenNthCalledWith(1, "set", {
      page_location: `${window.location.origin}/nova-assist/solicitar`,
      page_referrer: "",
    });
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("private@example.com");
  });
});
