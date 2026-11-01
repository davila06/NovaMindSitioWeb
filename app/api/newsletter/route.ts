import { NextResponse } from "next/server";
import { z } from "zod";
import { enforceRateLimit, getClientIp } from "@/lib/security";
import { ApiRequestError, readJsonRequest } from "@/lib/http";
import { captureServerError } from "@/lib/monitoring";
import { escapeHtml, sendMail } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";

const subscribeSchema = z.object({
  email: z.string().trim().email("Correo electrónico inválido.").max(254),
  interest: z.string().trim().max(120).optional(),
  turnstileToken: z.string().max(2048).optional(),
  // Consentimiento explícito — obligatorio Ley 8968 Costa Rica
  consentPrivacy: z.literal(true, {
    message:
      "Se requiere consentimiento explícito para el tratamiento de datos.",
  }),
});

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  // Validate Content-Type
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      {
        ok: false,
        message: "Content-Type debe ser application/json.",
        requestId,
      },
      { status: 415 },
    );
  }

  // Rate limit: 5 subscriptions per IP per hour
  const ip = getClientIp(request);
  try {
    const body = await readJsonRequest(request, 8192);
    const rl = await enforceRateLimit({
      key: `newsletter:${ip}`,
      limit: 5,
      windowMs: 60 * 60_000,
    });
    if (!rl.allowed) {
      return NextResponse.json(
        {
          ok: false,
          message: "Demasiadas solicitudes. Intenta m\u00e1s tarde.",
          requestId,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rl.retryAfterSeconds),
            "X-Request-Id": requestId,
          },
        },
      );
    }

    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: parsed.error.issues[0]?.message ?? "Datos inválidos.",
          requestId,
        },
        { status: 400, headers: { "X-Request-Id": requestId } },
      );
    }

    const { email, interest } = parsed.data;
    await verifyTurnstile(parsed.data.turnstileToken, request, "newsletter");

    // Audit log del consentimiento (Ley 8968 CR)
    console.info(
      JSON.stringify({
        event: "newsletter_consent_recorded",
        requestId,
        ip,
        consentPrivacy: true,
        policyVersion: "2026-01",
        timestamp: new Date().toISOString(),
      }),
    );

    // ── Email forwarding ────────────────────────────────────────────
    // If RESEND_API_KEY is configured, forward subscription notification.
    // Otherwise log to server console (works without external dependencies).
    try {
      await sendMail({
        subject: "[Newsletter] Nueva solicitud de novedades",
        html: `<h2>Solicitud de novedades</h2><p>Email: ${escapeHtml(email)}</p><p>Interes: ${escapeHtml(interest ?? "general")}</p>`,
        text: `Email: ${email}\nInteres: ${interest ?? "general"}\nConsentimiento: politica 2026-01`,
        replyTo: email,
        requestId,
      });
    } catch {
      await captureServerError({
        source: "newsletter.delivery_unavailable",
        message: "No se pudo entregar la solicitud de novedades.",
        severity: "error",
        requestId,
      });
      return NextResponse.json(
        {
          ok: false,
          message: "No se pudo procesar la solicitud. Intenta nuevamente.",
          requestId,
        },
        { status: 503, headers: { "X-Request-Id": requestId } },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Solicitud de novedades recibida. Te contactaremos pronto.",
        requestId,
      },
      { headers: { "X-Request-Id": requestId } },
    );
  } catch (err) {
    if (err instanceof ApiRequestError)
      return NextResponse.json(
        { ok: false, message: err.message, requestId },
        { status: err.status, headers: { "X-Request-Id": requestId } },
      );
    const error = err instanceof Error ? err : new Error(String(err));
    await captureServerError({
      source: "newsletter_api",
      message: error.message,
      stack: error.stack,
      severity: "error",
    });
    return NextResponse.json(
      { ok: false, message: "Error interno. Intenta de nuevo.", requestId },
      { status: 503, headers: { "X-Request-Id": requestId } },
    );
  }
}
