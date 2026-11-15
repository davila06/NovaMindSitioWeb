// @vitest-environment node
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("deployment readiness", () => {
  const checks = {
    email_delivery: true,
    contact_routing: true,
    rate_limiting: true,
    turnstile: true,
  };

  it("requires each named readiness check to be explicitly true", () => {
    const workflow = readFileSync(".github/workflows/deploy.yml", "utf8");
    const command = workflow.match(/node -e '([^']*r\.status[^']*)'/)?.[1];
    expect(command).toBeDefined();
    const passes = (payload: unknown) =>
      spawnSync(process.execPath, ["-e", command!], { input: JSON.stringify(payload) }).status === 0;
    expect(passes({ status: "ready", checks })).toBe(true);
    expect(passes({ status: "ready", checks: {} })).toBe(false);
    expect(passes({ status: "ready", checks: {
      email_delivery: true, contact_routing: true, rate_limiting: true,
    } })).toBe(false);
    expect(passes({ status: "ready", checks: { ...checks, turnstile: false } })).toBe(false);
    expect(passes({ status: "not-ready", checks })).toBe(false);
  });
});
