import { z } from "zod";
import { ApiRequestError } from "@/lib/http";
import { getPlatformBindings } from "#platform";

const verificationSchema = z.object({
  success: z.boolean(),
  hostname: z.string().optional(),
  action: z.string().optional(),
});

export async function verifyTurnstile(token: string | undefined, request: Request, action: "contact" | "newsletter") {
  if (
    process.env.NODE_ENV === "test" &&
    process.env.TURNSTILE_TEST_BYPASS === "true"
  ) {
    return;
  }

  const config = getPlatformBindings().turnstile;
  if (!config.enabled) {
    if (
      process.env.NODE_ENV === "production" ||
      getPlatformBindings().runtime === "cloudflare"
    ) {
      throw new Error("Turnstile must be enabled in production.");
    }
    return;
  }

  const secret = config.secret;
  if (!secret) throw new Error("Turnstile secret is not configured.");
  if (!token) throw new ApiRequestError(403, "Completa la verificacion de seguridad.");
  let result: z.infer<typeof verificationSchema>;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Siteverify returned a non-success status.");
    const parsed = verificationSchema.safeParse(await response.json());
    if (!parsed.success) throw new Error("Siteverify returned an invalid response.");
    result = parsed.data;
  } catch {
    console.error("[turnstile:siteverify_unavailable]", { action });
    throw new ApiRequestError(
      503,
      "No se pudo verificar la seguridad. Intenta nuevamente.",
    );
  }

  if (!result.success || result.hostname !== new URL(request.url).hostname || result.action !== action) {
    throw new ApiRequestError(403, "Verificacion de seguridad invalida o vencida. Intenta nuevamente.");
  }
}
