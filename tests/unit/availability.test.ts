import { afterEach, describe, expect, it, vi } from "vitest";
import { runAvailabilityCheck } from "@/operations/availability/worker";

afterEach(() => vi.unstubAllGlobals());

function bindings(previous: { healthy: boolean } | null = null) {
  const state = previous && {
    ...previous,
    checkedAt: "2026-11-01T00:00:00.000Z",
    incidentStartedAt: previous.healthy ? null : "2026-11-01T00:00:00.000Z",
    failures: previous.healthy ? [] : ["HTTP 503"],
  };
  const get = vi.fn().mockResolvedValue(state ? JSON.stringify(state) : null);
  const put = vi.fn().mockResolvedValue(undefined);
  const send = vi.fn().mockResolvedValue({ messageId: "test-delivery" });
  return { MONITOR_STATE: { get, put }, EMAIL: { send } };
}

function healthyResponse() {
  return new Response(JSON.stringify({ status: "ready" }), { status: 200 });
}

describe("Cloudflare availability monitor", () => {
  it("records healthy readiness without sending an email", async () => {
    const env = bindings();
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => healthyResponse()));
    const result = await runAvailabilityCheck(env);
    expect(result.healthy).toBe(true);
    expect(env.EMAIL.send).not.toHaveBeenCalled();
    expect(env.MONITOR_STATE.put).toHaveBeenCalledWith("status", expect.any(String));
  });

  it("alerts once for an outage and suppresses repeated notifications", async () => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => new Response("", { status: 503 })));
    const first = bindings();
    expect((await runAvailabilityCheck(first)).healthy).toBe(false);
    expect(first.EMAIL.send).toHaveBeenCalledOnce();
    expect(first.EMAIL.send).toHaveBeenCalledWith(expect.objectContaining({
      subject: "[Novamind] Alerta de disponibilidad",
    }));
    const repeated = bindings({ healthy: false });
    await runAvailabilityCheck(repeated);
    expect(repeated.EMAIL.send).not.toHaveBeenCalled();
  });

  it("sends a recovery notification only after an outage", async () => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => healthyResponse()));
    const env = bindings({ healthy: false });
    const result = await runAvailabilityCheck(env);
    expect(result.incidentStartedAt).toBeNull();
    expect(env.EMAIL.send).toHaveBeenCalledWith(expect.objectContaining({
      subject: "[Novamind] Disponibilidad recuperada",
    }));
  });

  it("does not save successful notification state when email delivery fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => new Response("", { status: 503 })));
    const env = bindings();
    env.EMAIL.send.mockRejectedValue(new Error("Email unavailable"));
    await expect(runAvailabilityCheck(env)).rejects.toThrow("Email unavailable");
    expect(env.MONITOR_STATE.put).not.toHaveBeenCalled();
  });

  it("retries transient probe failures and requires readiness, not just HTTP 200", async () => {
    const env = bindings();
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async (url: string) =>
      url.includes("health") ? new Response('{"status":"not-ready"}') : healthyResponse()));
    expect((await runAvailabilityCheck(env)).healthy).toBe(false);
    expect(env.EMAIL.send).toHaveBeenCalledOnce();
    vi.stubGlobal("fetch", vi.fn()
      .mockRejectedValueOnce(new Error("Timeout"))
      .mockImplementation(async () => healthyResponse()));
    const recovered = bindings();
    expect((await runAvailabilityCheck(recovered)).healthy).toBe(true);
    expect(recovered.EMAIL.send).not.toHaveBeenCalled();
  });

  it("fails explicitly on corrupted persisted state", async () => {
    const env = bindings();
    env.MONITOR_STATE.get.mockResolvedValue('{"healthy":"invalid"}');
    await expect(runAvailabilityCheck(env)).rejects.toThrow();
    expect(env.MONITOR_STATE.put).not.toHaveBeenCalled();
  });
});
