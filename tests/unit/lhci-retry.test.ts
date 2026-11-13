import { describe, expect, it } from "vitest";
import {
  collectLhciUrlsWithRetry,
  runLhciWithRetry,
} from "../../scripts/lhci-retry.mjs";

describe("Lighthouse CI trace retry", () => {
  it("retries a NO_NAVSTART collection and returns the successful result", async () => {
    const results = [
      { status: 1, output: "Lighthouse failed: NO_NAVSTART" },
      { status: 0, output: "collection complete" },
    ];
    let attempts = 0;

    const result = await runLhciWithRetry(async () => {
      attempts += 1;
      return results[attempts - 1];
    });

    expect(attempts).toBe(2);
    expect(result).toEqual(results[1]);
  });

  it("retries only the failed URL and preserves collected reports", async () => {
    const calls: Array<{ url: string; additive: boolean }> = [];
    let secondUrlAttempts = 0;

    const result = await collectLhciUrlsWithRetry(
      ["/", "/nova-assist"],
      async (url, additive) => {
        calls.push({ url, additive });
        if (url === "/nova-assist" && secondUrlAttempts++ === 0) {
          return { status: 1, output: "Lighthouse failed: NO_NAVSTART" };
        }
        return { status: 0, output: "collection complete" };
      },
    );

    expect(result.status).toBe(0);
    expect(calls).toEqual([
      { url: "/", additive: false },
      { url: "/nova-assist", additive: true },
      { url: "/nova-assist", additive: true },
    ]);
  });

  it("does not retry assertion or other collection failures", async () => {
    let attempts = 0;
    const failure = { status: 1, output: "Lighthouse assertion failed" };

    const result = await runLhciWithRetry(async () => {
      attempts += 1;
      return failure;
    });

    expect(attempts).toBe(1);
    expect(result).toBe(failure);
  });

  it("returns failure after the bounded NO_NAVSTART retries are exhausted", async () => {
    let attempts = 0;
    const failure = { status: 1, output: "Lighthouse failed: NO_NAVSTART" };

    const result = await runLhciWithRetry(async () => {
      attempts += 1;
      return failure;
    });

    expect(attempts).toBe(3);
    expect(result).toBe(failure);
  });
});
