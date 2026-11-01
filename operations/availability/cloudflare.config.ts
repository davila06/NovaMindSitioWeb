import { bindings, defineConfig, triggers } from "cf/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  accountId: "107c02d258c4e14855594fdfbdc7d903",
  worker: {
    name: "novamind-availability",
    entrypoint: fileURLToPath(new URL("./worker.ts", import.meta.url)),
    compatibilityDate: "2026-10-30",
    workersDev: false,
    previewUrls: false,
    triggers: [triggers.scheduled({ schedule: "*/15 * * * *" })],
    observability: {
      enabled: true,
      logs: { enabled: true },
      traces: { enabled: true, headSamplingRate: 1 },
    },
    env: {
      MONITOR_STATE: bindings.kv({ id: "cfd11cccbd3f40c5a94eb88d78a641a4" }),
      EMAIL: bindings.sendEmail({
        allowedDestinationAddresses: ["novamindglobalcr@gmail.com"],
        allowedSenderAddresses: ["info@novamindglobalcr.com"],
      }),
    },
  },
});
