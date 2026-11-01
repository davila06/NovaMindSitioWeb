import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/security";
import { captureServerError } from "@/lib/monitoring";

const subscribeSchema = z.object({
  email: z.string().trim().email("Correo electrónico inválido.").max(254),
  interest: z.string().trim().max(120).optional(),
  // Consentimiento explícito — obligatorio Ley 8968 Costa Rica
  consentPrivacy: z.literal(true, {
    errorMap: () => ({
      message:
        "Se requiere consentimiento explícito para el tratamiento de datos.",
    }),
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
  const rl = checkRateLimit({
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

  try {
    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: parsed.error.errors[0]?.message ?? "Datos inválidos.",
          requestId,
        },
        { status: 400, headers: { "X-Request-Id": requestId } },
      );
    }

    const { email, interest } = parsed.data;

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
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.CONTACT_TO_EMAIL ??
      process.env.CONTACT_EMAIL ??
      "novamindglobalcr@gmail.com";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ??
      process.env.FROM_EMAIL ??
      "info@novamindglobalcr.com";

    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          subject: `[Newsletter] Nueva suscripción: ${email}`,
          html: `
            <h2>Nueva suscripción al newsletter</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Interés:</strong> ${interest ?? "—"}</p>
            <p><strong>Fecha:</strong> ${new Date().toISOString()}</p>
          `,
        }),
      });
    } else {
      // Fallback: log to server stdout (captured by hosting platform logs)
      console.log(
        `[newsletter] new subscriber: ${email} | interest: ${interest ?? "general"} | ip: ${ip}`,
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "\u00a1Suscripci\u00f3n exitosa! Te contactaremos pronto.",
        requestId,
      },
      { headers: { "X-Request-Id": requestId } },
    );
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    await captureServerError({
      source: "newsletter_api",
      message: error.message,
      stack: error.stack,
      severity: "error",
    });
    return NextResponse.json(
      { ok: false, message: "Error interno. Intenta de nuevo.", requestId },
      { status: 500, headers: { "X-Request-Id": requestId } },
    );
  }
}
