import { NextResponse } from "next/server";
import { z } from "zod";
import { captureServerError } from "@/lib/monitoring";
import { enforceRateLimit, getClientIp } from "@/lib/security";
import { ApiRequestError, readJsonRequest } from "@/lib/http";
import { getServerEnv } from "@/lib/env";
import { verifyTurnstile } from "@/lib/turnstile";
import { containsCredentialLikeText } from "@/lib/contact-input";
import {
  createNovaAssistIntent,
  NOVA_ASSIST_PRIVACY_POLICY_VERSION,
} from "@/lib/nova-assist-intent";
import { leadSubmissionService } from "@/lib/leads/default-service";
import {
  LEAD_SUBMISSION_SCHEMA_VERSION,
  type SubmitLeadCommand,
} from "@/lib/leads/contract";

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
  customerStatus: z.enum(["new", "existing"]).optional(),
  deviceType: z.string().trim().max(80).optional(),
  requestPreference: z.enum(["remote", "visit", "unsure"]).optional(),
  serviceArea: z.string().trim().max(120).optional(),
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
}).superRefine((data, context) => {
  const textFields = [
    "name",
    "email",
    "company",
    "plan",
    "interest",
    "deviceType",
    "serviceArea",
    "message",
  ] as const;
  for (const field of textFields) {
    const value = data[field];
    if (value && containsCredentialLikeText(value)) {
      context.addIssue({
        code: "custom",
        path: [field],
        message:
          "Elimina contraseñas, PIN, códigos privados o datos de tarjeta antes de enviar.",
      });
    }
  }
});

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
          invalidFields: [
            ...new Set(parsed.error.issues.map((issue) => issue.path.join("."))),
          ],
        },
      });

      return buildErrorResponse(400, "Payload invalido.", requestId, {
        issues: parsed.error.flatten(),
      });
    }

    const data = parsed.data;
    const consentRecordedAt = new Date().toISOString();

    // Audit log del consentimiento (Ley 8968 CR)
    console.info(
      JSON.stringify({
        event: "consent_recorded",
        requestId,
        consentPrivacy: data.consentPrivacy,
        policyVersion: NOVA_ASSIST_PRIVACY_POLICY_VERSION,
        timestamp: consentRecordedAt,
      }),
    );

    if (data.website && data.website.trim().length > 0) {
      return withRequestId(
        NextResponse.json({ ok: true, channel: "protected", requestId }),
        requestId,
      );
    }

    await verifyTurnstile(data.turnstileToken, request, "contact");
    const intent = createNovaAssistIntent({
      plan: data.plan,
      interest: data.interest,
      urgency: data.urgency,
      requestPreference: data.requestPreference,
    });
    const command: SubmitLeadCommand = {
      schemaVersion: LEAD_SUBMISSION_SCHEMA_VERSION,
      requestId,
      intent,
      contact: {
        name: data.name,
        email: data.email,
        company: data.company,
        plan: data.plan,
        interest: data.interest,
        customerStatus: data.customerStatus,
        deviceType: data.deviceType,
        requestPreference: data.requestPreference,
        serviceArea: data.serviceArea,
        leadVolume: data.leadVolume,
        urgency: data.urgency,
        implementationHorizon: data.implementationHorizon,
        message: data.message,
        attribution: data.utm
          ? {
              source: data.utm.source,
              medium: data.utm.medium,
              campaign: data.utm.campaign,
              referrer: data.utm.referrer,
              landingPage: data.utm.landingPage,
            }
          : undefined,
      },
      consent: {
        privacyAccepted: data.consentPrivacy,
        policyVersion: NOVA_ASSIST_PRIVACY_POLICY_VERSION,
        recordedAt: consentRecordedAt,
      },
    };

    try {
      const delivery = await leadSubmissionService.submit(command);
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
    });

    return buildErrorResponse(
      503,
      "No se pudo procesar la solicitud.",
      requestId,
    );
  }
}
