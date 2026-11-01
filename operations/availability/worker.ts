import type { InferEnv } from "cf/config";
import type config from "./cloudflare.config";
import { z } from "zod";

type AvailabilityEnv = InferEnv<typeof config.worker>;
const stateSchema = z.object({
  healthy: z.boolean(),
  checkedAt: z.iso.datetime(),
  incidentStartedAt: z.iso.datetime().nullable(),
  failures: z.array(z.string()),
});
const healthSchema = z.object({ status: z.literal("ready") });
const site = "https://novamindglobalcr.com";

async function checkEndpoint(path: string, checkReadiness: boolean) {
  const url = `${site}${path}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    let response: Response | undefined;
    try {
      response = await fetch(url, {
        signal: AbortSignal.timeout(10_000),
        redirect: "manual",
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (checkReadiness) healthSchema.parse(await response.json());
      return null;
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      console.error(JSON.stringify({ event: "availability_probe_failed", url, attempt, reason }));
      if (attempt === 1) return `${url}: ${reason}`;
    } finally {
      if (response?.body && !response.bodyUsed) await response.body.cancel();
    }
  }
  throw new Error("Availability probe did not complete.");
}

export async function runAvailabilityCheck(env: {
  MONITOR_STATE: Pick<AvailabilityEnv["MONITOR_STATE"], "get" | "put">;
  EMAIL: Pick<AvailabilityEnv["EMAIL"], "send">;
}) {
  const raw = await env.MONITOR_STATE.get("status");
  const previous = raw === null ? null : stateSchema.parse(JSON.parse(raw));
  const results = await Promise.all([
    checkEndpoint("/", false),
    checkEndpoint("/api/health?check=ready", true),
  ]);
  const failures = results.filter((result): result is string => result !== null);
  const healthy = failures.length === 0;
  const checkedAt = new Date().toISOString();
  const incidentStartedAt = healthy ? null : previous?.incidentStartedAt ?? checkedAt;
  const shouldNotify = healthy ? previous?.healthy === false : previous?.healthy !== false;

  if (shouldNotify) {
    const result = await env.EMAIL.send({
      from: "info@novamindglobalcr.com",
      to: ["novamindglobalcr@gmail.com"],
      subject: healthy ? "[Novamind] Disponibilidad recuperada" : "[Novamind] Alerta de disponibilidad",
      text: [
        healthy ? "Las comprobaciones del sitio se recuperaron." : "El sitio no supera las comprobaciones de disponibilidad.",
        `Sitio: ${site}`,
        `Comprobacion UTC: ${checkedAt}`,
        `Inicio del incidente UTC: ${previous?.incidentStartedAt ?? incidentStartedAt}`,
        ...failures,
        "Monitor independiente en Cloudflare; revisa los logs de novamind-availability.",
      ].join("\n"),
    });
    console.log(JSON.stringify({ event: "availability_notification_accepted", healthy, deliveryId: result.messageId }));
  }

  const state = { healthy, checkedAt, incidentStartedAt, failures };
  // Persist only after delivery acceptance, so a failed notification is retried.
  await env.MONITOR_STATE.put("status", JSON.stringify(state));
  console.log(JSON.stringify({ event: "availability_checked", ...state }));
  return state;
}

export default {
  async scheduled(_controller, env) {
    try {
      await runAvailabilityCheck(env);
    } catch (error) {
      console.error(JSON.stringify({
        event: "availability_monitor_failed",
        reason: error instanceof Error ? error.message : String(error),
      }));
      throw error;
    }
  },
} satisfies ExportedHandler<AvailabilityEnv>;
