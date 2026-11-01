import { NextResponse } from "next/server";
import { escapeHtml, sendMail } from "@/lib/email";
import { z } from "zod";
import { captureServerError } from "@/lib/monitoring";
import { enforceRateLimit, getClientIp } from "@/lib/security";
import { ApiRequestError, readJsonRequest } from "@/lib/http";
import { getServerEnv } from "@/lib/env";
import { verifyTurnstile } from "@/lib/turnstile";

const leadVolumeOptions = ["<100", "100-500", "500-2000", "2000+"] as const;
const urgencyOptions = ["baja", "media", "alta", "critica"] as const;
const horizonOptions = ["0-30", "31-90", "91-180", "180+"] as const;

const utmSchema = z
  .object({
    source: z.string().max(120).optional(),
    medium: z.string().max(120).optional(),
    campaign: z.string().max(120).optional(),
    term: z.string().max(120).optional(),
    content: z.string().max(120).optional(),
    referrer: z.string().max(300).optional(),
    landingPage: z.string().max(300).optional(),
    capturedAt: z.string().max(40).optional(),
  })
  .optional();

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).optional(),
  plan: z.string().trim().max(80).optional(),
  interest: z.string().trim().min(2).max(120),
  leadVolume: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(leadVolumeOptions).optional(),
  ),
  urgency: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(urgencyOptions).optional(),
  ),
  implementationHorizon: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(horizonOptions).optional(),
  ),
  message: z.string().trim().min(10).max(4000),
  website: z.string().trim().max(200).optional(),
  turnstileToken: z.string().max(2048).optional(),
  utm: utmSchema,
  // Consentimiento explícito — obligatorio Ley 8968 Costa Rica
  consentPrivacy: z.literal(true, {
    message:
      "Se requiere consentimiento explícito para el tratamiento de datos.",
  }),
});

type ContactPayload = z.infer<typeof contactSchema>;

function buildEmailHtml(data: ContactPayload) {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeCompany = escapeHtml(data.company || "No indicada");
  const safeInterest = escapeHtml(data.interest);
  const safeLeadVolume = escapeHtml(data.leadVolume || "No indicado");
  const safeUrgency = escapeHtml(data.urgency || "No indicada");
  const safeHorizon = escapeHtml(data.implementationHorizon || "No indicado");
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br />");

  const utmBlock =
    data.utm && (data.utm.source || data.utm.medium || data.utm.campaign)
      ? `
    <hr/>
    <h3>Atribuci\u00f3n de Marketing</h3>
    <p><strong>Fuente:</strong> ${escapeHtml(data.utm.source || "\u2014")}</p>
    <p><strong>Medio:</strong> ${escapeHtml(data.utm.medium || "\u2014")}</p>
    <p><strong>Campa\u00f1a:</strong> ${escapeHtml(data.utm.campaign || "\u2014")}</p>
    ${data.utm.referrer ? `<p><strong>Referrer:</strong> ${escapeHtml(data.utm.referrer)}</p>` : ""}
    ${data.utm.landingPage ? `<p><strong>Landing page:</strong> ${escapeHtml(data.utm.landingPage)}</p>` : ""}
    `
      : "";

  return `
    <h2>Nueva solicitud desde Novamind Global</h2>
    <p><strong>Nombre:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Empresa:</strong> ${safeCompany}</p>
    <p><strong>Interes:</strong> ${safeInterest}</p>
    <p><strong>Plan:</strong> ${escapeHtml(data.plan || "No indicado")}</p>
    <p><strong>Volumen operativo:</strong> ${safeLeadVolume}</p>
    <p><strong>Urgencia:</strong> ${safeUrgency}</p>
    <p><strong>Horizonte de implementacion:</strong> ${safeHorizon}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${safeMessage}</p>
    <hr/>
    <h3>Consentimiento (Ley 8968 CR)</h3>
    <p><strong>Consentimiento explícito:</strong> Sí — versión política 2026-01</p>
    <p><strong>Timestamp ISO:</strong> ${new Date().toISOString()}</p>
    ${utmBlock}
  `;
}

function withRequestId(response: NextResponse, requestId: string) {
  response.headers.set("X-Request-Id", requestId);
  return response;
}

function buildErrorResponse(
  status: number,
  message: string,
  requestId: string,
  extra?: Record<string, unknown>,
) {
  return withRequestId(
    NextResponse.json(
      {
        ok: false,
        message,
        requestId,
        ...extra,
      },
      { status },
    ),
    requestId,
  );
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const clientIp = getClientIp(request);

  // Validate Content-Type to prevent CSRF and parser confusion
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return withRequestId(
      NextResponse.json(
        { ok: false, message: "Content-Type debe ser application/json." },
        { status: 415 },
      ),
      requestId,
    );
  }

  try {
    const payload = await readJsonRequest(request);
    const config = getServerEnv();
    const rateLimit = await enforceRateLimit({
      key: `contact:${clientIp}`,
      limit: config.CONTACT_RATE_LIMIT_MAX_REQUESTS,
      windowMs: config.CONTACT_RATE_LIMIT_WINDOW_MS,
    });

    if (!rateLimit.allowed) {
      return withRequestId(
        NextResponse.json(
          {
            ok: false,
            message:
              "Has alcanzado el limite temporal de solicitudes. Intenta nuevamente en unos minutos.",
            requestId,
          },
          {
            status: 429,
            headers: {
              "Retry-After": String(rateLimit.retryAfterSeconds),
            },
          },
        ),
        requestId,
      );
    }

    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      await captureServerError({
        source: "api.contact.validation_failed",
        message: "Payload invalido en endpoint de contacto.",
        severity: "warning",
        requestId,
        route: "/api/contact",
        context: {
          clientIp,
          issues: parsed.error.issues,
        },
      });

      return buildErrorResponse(400, "Payload invalido.", requestId, {
        issues: parsed.error.flatten(),
      });
    }

    const data = parsed.data;

    // Audit log del consentimiento (Ley 8968 CR)
    console.info(
      JSON.stringify({
        event: "consent_recorded",
        requestId,
        clientIp,
        consentPrivacy: data.consentPrivacy,
        policyVersion: "2026-01",
        timestamp: new Date().toISOString(),
      }),
    );

    if (data.website && data.website.trim().length > 0) {
      return withRequestId(
        NextResponse.json({ ok: true, channel: "protected", requestId }),
        requestId,
      );
    }

    await verifyTurnstile(data.turnstileToken, request, "contact");

    try {
      const delivery = await sendMail({
        subject: `[Novamind] Nuevo lead: ${data.interest}`,
        html: buildEmailHtml(data),
        text: `Nombre: ${data.name}\nEmail: ${data.email}\nEmpresa: ${data.company || "No indicada"}\nInteres: ${data.interest}\nMensaje: ${data.message}`,
        replyTo: data.email,
        requestId,
      });
      return withRequestId(
        NextResponse.json({ ok: true, ...delivery, requestId }),
        requestId,
      );
    } catch {
      await captureServerError({
        source: "api.contact.delivery_unavailable",
        message: "No se pudo entregar la solicitud.",
        severity: "critical",
        requestId,
        route: "/api/contact",
      });
      return buildErrorResponse(
        503,
        "No se pudo entregar tu solicitud. Intenta nuevamente o contactanos por WhatsApp.",
        requestId,
      );
    }
  } catch (error) {
    if (error instanceof ApiRequestError)
      return buildErrorResponse(error.status, error.message, requestId);
    await captureServerError({
      source: "api.contact.unhandled_exception",
      message:
        error instanceof Error
          ? error.message
          : "No se pudo procesar la solicitud.",
      severity: "critical",
      stack: error instanceof Error ? error.stack : undefined,
      requestId,
      route: "/api/contact",
      context: {
        clientIp,
      },
    });

    return buildErrorResponse(
      503,
      "No se pudo procesar la solicitud.",
      requestId,
    );
  }
}
