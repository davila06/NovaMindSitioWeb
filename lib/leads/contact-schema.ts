import { z } from "zod";
import { containsCredentialLikeText } from "@/lib/contact-input";

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

export const contactSchema = z
  .object({
    marketSegment: z.enum(["b2c", "b2b"]),
    preferredContactMethod: z.enum(["email", "phone", "whatsapp"]),
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    phone: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z
        .string()
        .trim()
        .max(30)
        .regex(/^\+?[0-9\s().-]+$/, "Ingresa un teléfono válido.")
        .optional(),
    ),
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
    consentPrivacy: z.literal(true, {
      message:
        "Se requiere consentimiento explícito para el tratamiento de datos.",
    }),
  })
  .superRefine((data, context) => {
    if (
      data.marketSegment === "b2b" &&
      (!data.company || data.company.length < 2)
    ) {
      context.addIssue({
        code: "custom",
        path: ["company"],
        message: "Indica el nombre de la empresa.",
      });
    }
    if (data.preferredContactMethod !== "email" && !data.phone) {
      context.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Se requiere un teléfono para llamada o WhatsApp.",
      });
    }
    if (data.phone) {
      const digits = data.phone.replace(/\D/g, "").length;
      if (digits < 8 || digits > 15) {
        context.addIssue({
          code: "custom",
          path: ["phone"],
          message: "El teléfono debe contener entre 8 y 15 dígitos.",
        });
      }
    }

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
