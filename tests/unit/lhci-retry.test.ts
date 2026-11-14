// @vitest-environment node

import { createServer } from "node:http";
import { once } from "node:events";
import { describe, expect, it } from "vitest";
import {
  collectLhciUrlsWithRetry,
  runLhciWithRetry,
  warmLhciServer,
} from "../../scripts/lhci-retry.mjs";

describe("Lighthouse preview readiness", () => {
  it("waits for the initial page response to finish before collection", async () => {
    let responseFinished = false;
    const server = createServer((_request, response) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write("<html>");
      setTimeout(() => {
        responseFinished = true;
        response.end("</html>");
      }, 20);
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("No test port");

    try {
      await warmLhciServer(`http://127.0.0.1:${address.port}/`);
      expect(responseFinished).toBe(true);
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  it("fails explicitly when the preview returns an unsuccessful response", async () => {
    const server = createServer((_request, response) => {
      response.writeHead(503);
      response.end("Unavailable");
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("No test port");

    try {
      await expect(
        warmLhciServer(`http://127.0.0.1:${address.port}/`),
      ).rejects.toThrow("HTTP 503");
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});

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
