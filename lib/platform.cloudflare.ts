import { env } from "cloudflare:workers";
import type { PlatformBindings } from "./platform";

export function getPlatformBindings(): PlatformBindings {
  return {
    runtime: "cloudflare",
    turnstile: {
      enabled: env.TURNSTILE_ENABLED === "true",
      secret: env.TURNSTILE_SECRET_KEY,
      siteKey: env.TURNSTILE_SITE_KEY,
    },
    email: {
      send: async (message) => {
        const result = await env.EMAIL.send({
          from: message.from,
          to: message.to.map(({ email }) => email),
          subject: message.subject,
          html: message.html,
          text: message.text,
          replyTo: message.replyTo,
        });
        return { messageId: result.messageId };
      },
    },
    rateLimiters: {
      contact: env.CONTACT_LIMITER,
      newsletter: env.NEWSLETTER_LIMITER,
      monitor: env.MONITOR_LIMITER,
    },
  };
}
