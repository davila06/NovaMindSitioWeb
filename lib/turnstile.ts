import { z } from "zod";
import { ApiRequestError } from "@/lib/http";

const verificationSchema = z.object({
  success: z.boolean(),
  hostname: z.string().optional(),
  action: z.string().optional(),
});

export async function verifyTurnstile(token: string | undefined, request: Request, action: "contact" | "newsletter") {
  if (process.env.TURNSTILE_ENABLED !== "true") return;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("Turnstile secret is not configured.");
  if (!token) throw new ApiRequestError(403, "Completa la verificacion de seguridad.");
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Turnstile verification returned ${response.status}.`);
  const result = verificationSchema.safeParse(await response.json());
  if (!result.success) throw new Error("Turnstile verification returned an invalid response.");
  if (!result.data.success || result.data.hostname !== new URL(request.url).hostname || result.data.action !== action) {
    throw new ApiRequestError(403, "Verificacion de seguridad invalida o vencida. Intenta nuevamente.");
  }
}
