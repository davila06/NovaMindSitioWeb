import { bindings, defineConfig } from "cf/config";
import { fileURLToPath } from "node:url";

const runtimeCompatibilityDate = "2026-10-30";

export default defineConfig(({ mode }) => ({
  worker: {
    name: mode === "staging" ? "novamind-web-staging" : "novamind-web",
    entrypoint: fileURLToPath(
      import.meta.resolve("vinext/server/app-router-entry"),
    ),
    compatibilityDate: runtimeCompatibilityDate,
    compatibilityFlags: ["nodejs_compat"],
    domains: mode === "staging" ? [] : ["novamindglobalcr.com"],
    assets: { notFoundHandling: "none" },
    observability: {
      enabled: true,
      redactQueryString: true,
      logs: { enabled: true },
      traces: { enabled: true, headSamplingRate: 0.1 },
    },
    env: {
      ASSETS: bindings.assets(),
      NODE_ENV: bindings.text("production"),
      MAIL_PROVIDER: bindings.text("cloudflare"),
      CONTACT_FROM_EMAIL: bindings.text("info@novamindglobalcr.com"),
      CONTACT_TO_EMAIL: bindings.text("novamindglobalcr@gmail.com"),
      CONTACT_LIMITER: bindings.rateLimit({
        namespace: "1001",
        simple: { limit: 5, period: 60 },
      }),
      NEWSLETTER_LIMITER: bindings.rateLimit({
        namespace: "1002",
        simple: { limit: 5, period: 60 },
      }),
      MONITOR_LIMITER: bindings.rateLimit({
        namespace: "1003",
        simple: { limit: 30, period: 60 },
      }),
      EMAIL: bindings.sendEmail({
        allowedDestinationAddresses: ["novamindglobalcr@gmail.com"],
        allowedSenderAddresses: ["info@novamindglobalcr.com"],
      }),
    },
  },
}));
