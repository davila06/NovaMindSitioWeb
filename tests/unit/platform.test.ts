import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const bindings = vi.hoisted(() => ({ send: vi.fn(), limit: vi.fn() }));
vi.mock("#platform", () => ({
  getPlatformBindings: () => ({
    runtime: "cloudflare",
    email: { send: bindings.send },
    rateLimiters: { contact: { limit: bindings.limit } },
  }),
}));
import { sendMail } from "@/lib/email";
import { enforceRateLimit, getClientIp } from "@/lib/security";

beforeEach(() => {
  vi.stubEnv("MAIL_PROVIDER", "cloudflare");
  vi.stubEnv("CONTACT_FROM_EMAIL", "info@novamindglobalcr.com");
  vi.stubEnv("CONTACT_TO_EMAIL", "novamindglobalcr@gmail.com");
  bindings.send.mockReset();
  bindings.limit.mockReset();
});
afterEach(() => vi.unstubAllEnvs());

describe("Cloudflare platform contracts", () => {
  it("accepts only a confirmed native email delivery", async () => {
    bindings.send.mockResolvedValue({ messageId: "cf-delivery" });
    await expect(
      sendMail({
        subject: "Test",
        html: "<p>Test</p>",
        text: "Test",
        requestId: "request-test",
      }),
    ).resolves.toEqual({ channel: "cloudflare", deliveryId: "cf-delivery" });
    expect(bindings.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: [{ email: "novamindglobalcr@gmail.com" }],
        text: "Test",
      }),
    );
  });

  it("does not accept a native provider failure", async () => {
    bindings.send.mockRejectedValue(new Error("sender unverified"));
    await expect(
      sendMail({
        subject: "Test",
        html: "<p>Test</p>",
        text: "Test",
        requestId: "request-test",
      }),
    ).rejects.toThrow();
  });

  it("uses the rate limiter binding rather than process state", async () => {
    bindings.limit.mockResolvedValue({ success: false });
    expect(
      (
        await enforceRateLimit({
          key: "contact:ip",
          limit: 5,
          windowMs: 600000,
        })
      ).allowed,
    ).toBe(false);
    expect(bindings.limit).toHaveBeenCalledWith({ key: "contact:ip" });
  });

  it("trusts only the Cloudflare supplied client IP in Workers", () => {
    const request = new Request("https://novamindglobalcr.com", {
      headers: {
        "x-forwarded-for": "spoofed",
        "cf-connecting-ip": "203.0.113.1",
      },
    });
    expect(getClientIp(request)).toBe("203.0.113.1");
  });
});
