import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "@/lib/turnstile";

const request = new Request("https://novamindglobalcr.com/api/contact");

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Turnstile verification", () => {
  function enable() {
    vi.stubEnv("TURNSTILE_ENABLED", "true");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
  }

  it("preserves local behavior when protection is disabled", async () => {
    vi.stubEnv("TURNSTILE_ENABLED", "false");
    await expect(verifyTurnstile(undefined, request, "contact")).resolves.toBeUndefined();
  });

  it("fails closed without a configured secret or a token", async () => {
    enable();
    await expect(verifyTurnstile(undefined, request, "contact")).rejects.toMatchObject({status: 403});
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    await expect(verifyTurnstile("token", request, "contact")).rejects.toThrow("not configured");
  });

  it("accepts a token only for its hostname and action", async () => {
    enable();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({success: true, hostname: "novamindglobalcr.com", action: "contact"}),
    }));
    await expect(verifyTurnstile("token", request, "contact")).resolves.toBeUndefined();
    await expect(verifyTurnstile("token", request, "newsletter")).rejects.toMatchObject({status: 403});
    await expect(verifyTurnstile("token", new Request("https://staging.novamindglobalcr.com"), "contact")).rejects.toMatchObject({status: 403});
  });

  it("rejects expired tokens and invalid provider responses", async () => {
    enable();
    const fetch = vi.fn()
      .mockResolvedValueOnce({ok: true, json: async () => ({success: false})})
      .mockResolvedValueOnce({ok: true, json: async () => ({})})
      .mockResolvedValueOnce({ok: false, status: 503});
    vi.stubGlobal("fetch", fetch);
    await expect(verifyTurnstile("expired", request, "contact")).rejects.toMatchObject({status: 403});
    await expect(verifyTurnstile("token", request, "contact")).rejects.toThrow("invalid response");
    await expect(verifyTurnstile("token", request, "contact")).rejects.toThrow("503");
  });
});
