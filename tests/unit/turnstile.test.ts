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
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("TURNSTILE_ENABLED", "false");
    await expect(verifyTurnstile(undefined, request, "contact")).resolves.toBeUndefined();
  });

  it("fails closed when production has Turnstile disabled", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("TURNSTILE_ENABLED", "false");
    await expect(verifyTurnstile(undefined, request, "contact")).rejects.toThrow(
      "Turnstile must be enabled in production.",
    );
  });

  it("only bypasses verification for an explicit test-only setting", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("TURNSTILE_TEST_BYPASS", "true");
    vi.stubEnv("TURNSTILE_ENABLED", "true");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    await expect(verifyTurnstile(undefined, request, "contact")).resolves.toBeUndefined();
  });

  it("does not allow the test bypass in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("TURNSTILE_TEST_BYPASS", "true");
    vi.stubEnv("TURNSTILE_ENABLED", "true");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    await expect(verifyTurnstile("token", request, "contact")).rejects.toThrow(
      "not configured",
    );
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
    await expect(verifyTurnstile("token", request, "contact")).rejects.toMatchObject({
      status: 503,
      message: "No se pudo verificar la seguridad. Intenta nuevamente.",
    });
    await expect(verifyTurnstile("token", request, "contact")).rejects.toMatchObject({
      status: 503,
      message: "No se pudo verificar la seguridad. Intenta nuevamente.",
    });
  });

  it("returns a safe unavailable error when Siteverify times out or has an invalid response", async () => {
    enable();
    const fetch = vi
      .fn()
      .mockRejectedValueOnce(new DOMException("Timed out", "TimeoutError"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new SyntaxError("invalid JSON");
        },
      });
    vi.stubGlobal("fetch", fetch);
    await expect(verifyTurnstile("token", request, "contact")).rejects.toMatchObject({
      status: 503,
      message: "No se pudo verificar la seguridad. Intenta nuevamente.",
    });
    await expect(verifyTurnstile("token", request, "contact")).rejects.toMatchObject({
      status: 503,
      message: "No se pudo verificar la seguridad. Intenta nuevamente.",
    });
  });
});
