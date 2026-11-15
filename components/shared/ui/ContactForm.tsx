"use client";

import Link from "next/link";
import { businessProducts } from "@/data/products";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Toast } from "@/components/shared/ui/Toast";
import {
  trackEvent,
  trackFormProgress,
  trackLeadConversion,
} from "@/lib/analytics-client";
import { contactInterests } from "@/data/site";
import {
  novaAssistServiceBySlug,
  novaAssistServices,
} from "@/data/nova-assist";
import { businessServices } from "@/data/nova-assist-business";
import {
  resolveContactIntent,
  resolveContactMarketSegment,
} from "@/lib/contact-intent";
import type {
  LeadMarketSegment,
  PreferredContactMethod,
} from "@/lib/leads/contract";
import { getStoredUTM } from "@/lib/useUTM";
import { containsCredentialLikeText } from "@/lib/contact-input";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Turnstile, turnstileSiteKey } from "@/components/shared/ui/Turnstile";
import { trackNovaEvent, type NovaEvent } from "@/lib/nova-analytics";

const serviceInterestOptions = contactInterests;

const productInterestOptions = businessProducts.map((product) => product.name);

const UNSURE_INTEREST = "No estoy seguro, necesito orientación";

type FormState = {
  marketSegment: LeadMarketSegment | "";
  preferredContactMethod: PreferredContactMethod | "";
  phone: string;
  name: string;
  email: string;
  company: string;
  interest: string;
  leadVolume: string;
  urgency: string;
  implementationHorizon: string;
  website: string;
  message: string;
  customerStatus: string;
  deviceType: string;
  requestPreference: string;
  serviceArea: string;
  consentPrivacy: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const contactResponseSchema = z.object({
  ok: z.boolean(),
  message: z.string().optional(),
  channel: z.string().optional(),
  requestId: z.string().optional(),
});

const initialState: FormState = {
  marketSegment: "",
  preferredContactMethod: "",
  phone: "",
  name: "",
  email: "",
  company: "",
  interest: "",
  leadVolume: "",
  urgency: "",
  implementationHorizon: "",
  website: "",
  message: "",
  customerStatus: "",
  deviceType: "",
  requestPreference: "",
  serviceArea: "",
  consentPrivacy: false,
};

const STEPS = [
  { number: 1, label: "Tipo de solicitud" },
  { number: 2, label: "Tus datos" },
  { number: 3, label: "¿Qué necesitas?" },
  { number: 4, label: "Mensaje y contacto" },
];

const BUSINESS_STEPS = [
  { number: 1, label: "Tu empresa" },
  { number: 2, label: "¿Qué necesitas?" },
  { number: 3, label: "Mensaje y contacto" },
];

const SERVICE_REQUEST_STEPS = [
  { number: 1, label: "Cliente actual" },
  { number: 2, label: "Servicio y dispositivo" },
  { number: 3, label: "Descripción y atención" },
  { number: 4, label: "Contacto y confirmación" },
];

const contactMethodLabels: Record<PreferredContactMethod, string> = {
  email: "Correo electrónico",
  phone: "Llamada",
  whatsapp: "WhatsApp",
};

function interestOptionsForSegment(segment: LeadMarketSegment | "") {
  if (segment === "b2c") {
    return [contactInterests[1], UNSURE_INTEREST];
  }
  if (segment === "b2b") {
    return [
      ...serviceInterestOptions.filter((interest) => interest !== contactInterests[1]),
      ...productInterestOptions,
      UNSURE_INTEREST,
    ];
  }
  return [];
}

function defaultInterestForSegment(segment: LeadMarketSegment | "") {
  return segment === "b2c" ? contactInterests[1] : contactInterests[0];
}

type ValidationContext = {
  serviceRequest: boolean;
  marketSegment: FormState["marketSegment"];
  preferredContactMethod: FormState["preferredContactMethod"];
};

function validateField(
  field: keyof FormState,
  value: string,
  context: ValidationContext,
): string {
  if (containsCredentialLikeText(value)) {
    return "No incluyas contraseñas, PIN, códigos privados ni datos de tarjeta.";
  }
  if (field === "name") {
    return value.trim().length >= 2
      ? ""
      : "Ingresa un nombre valido (minimo 2 caracteres).";
  }
  if (field === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value.trim())
      ? ""
      : "Ingresa un correo electrónico válido.";
  }
  if (field === "marketSegment") {
    return value === "b2c" || value === "b2b"
      ? ""
      : "Selecciona si tu solicitud es personal o empresarial.";
  }
  if (field === "company" && context.marketSegment === "b2b") {
    return value.trim().length >= 2
      ? ""
      : "Indica el nombre de la empresa.";
  }
  if (field === "preferredContactMethod") {
    return value === "email" || value === "phone" || value === "whatsapp"
      ? ""
      : "Selecciona cómo prefieres que te contacten.";
  }
  if (field === "phone" && context.preferredContactMethod !== "email") {
    const digits = value.replace(/\D/g, "").length;
    return /^\+?[0-9\s().-]+$/.test(value.trim()) && digits >= 8 && digits <= 15
      ? ""
      : "Ingresa un teléfono válido de 8 a 15 dígitos.";
  }
  if (field === "interest") {
    return value.trim().length >= 2 ? "" : "Selecciona un interes principal.";
  }
  if (context.serviceRequest && field === "customerStatus") {
    return value === "existing" || value === "new"
      ? ""
      : "Indica si ya eres cliente de Nova Assist.";
  }
  if (context.serviceRequest && field === "deviceType") {
    return value.trim().length > 0 ? "" : "Selecciona el tipo de dispositivo.";
  }
  if (context.serviceRequest && field === "urgency") {
    return ["baja", "media", "alta", "critica"].includes(value)
      ? ""
      : "Selecciona la urgencia de tu solicitud.";
  }
  if (context.serviceRequest && field === "requestPreference") {
    return ["remote", "visit", "unsure"].includes(value)
      ? ""
      : "Indica tu preferencia de atención.";
  }
  if (field === "message") {
    return value.trim().length >= 10
      ? ""
      : "El mensaje debe tener al menos 10 caracteres.";
  }
  if (field === "consentPrivacy") {
    return value === "true"
      ? ""
      : "Debes aceptar la política de privacidad para continuar.";
  }

  return "";
}

export function ContactForm({
  plan,
  service,
  initialMessage = "",
  variant = "contact",
  initialSegment,
  healthCheck = false,
}: {
  plan?: string;
  service?: string;
  initialMessage?: string;
  variant?: "contact" | "service-request" | "business";
  initialSegment?: LeadMarketSegment;
  healthCheck?: boolean;
} = {}) {
  const serviceRequest = variant === "service-request";
  const businessRequest = variant === "business";
  const intent = resolveContactIntent(
    service ? `nova-assist-${service}` : plan,
  );
  const intentSegment = resolveContactMarketSegment(plan);
  const resolvedInitialSegment = serviceRequest
    ? "b2c"
    : businessRequest
      ? "b2b"
      : initialSegment ?? intentSegment ?? "";
  const selectedService =
    service && novaAssistServiceBySlug[service]
      ? novaAssistServiceBySlug[service]
      : undefined;
  const initialInterestOptions = businessRequest
    ? businessServices.map((item) => item.name)
    : interestOptionsForSegment(resolvedInitialSegment);
  const initialInterest =
    serviceRequest
      ? selectedService?.name || UNSURE_INTEREST
      : businessRequest
        ? intent.plan && businessServices.some((item) => item.name === intent.interest)
          ? intent.interest
          : businessServices[0].name
        : intentSegment === resolvedInitialSegment &&
            initialInterestOptions.includes(intent.interest)
          ? intent.interest
          : resolvedInitialSegment
            ? defaultInterestForSegment(resolvedInitialSegment)
            : "";
  const [form, setForm] = useState<FormState>(() => ({
    ...initialState,
    marketSegment: resolvedInitialSegment,
    message: initialMessage,
    interest: initialInterest,
  }));
  const [selectedContactPlan, setSelectedContactPlan] = useState(
    intent.plan && intentSegment === resolvedInitialSegment ? intent.plan : "",
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState("");
  const [submittedServiceName, setSubmittedServiceName] = useState("");
  const [submittedDeviceType, setSubmittedDeviceType] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [verificationAttempt, setVerificationAttempt] = useState(0);
  const [interactive, setInteractive] = useState(false);
  const [isPending, startTransition] = useTransition();
  const focusedFieldsRef = useRef<Set<keyof FormState>>(new Set());
  const hasSubmittedRef = useRef(false);
  const [currentStep, setCurrentStep] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const progressRef = useRef({ started: false, completionRate: 0 });
  const requestStartedRef = useRef(false);
  const submittingRef = useRef(false);
  const requestedServiceSlug =
    novaAssistServices.find((item) => item.name === form.interest)?.slug ??
    (service && form.interest === selectedService?.name ? service : undefined);
  const businessServiceSlug = businessServices.find(
    (item) => item.name === form.interest,
  )?.slug;
  const steps = serviceRequest
    ? SERVICE_REQUEST_STEPS
    : businessRequest
      ? BUSINESS_STEPS
      : STEPS;
  const requiredFields = useMemo(() => {
    const fields: Array<keyof FormState> = [
      "name",
      "email",
      "interest",
      "message",
      "preferredContactMethod",
      "consentPrivacy",
    ];
    if (serviceRequest) {
      fields.push(
        "customerStatus",
        "deviceType",
        "urgency",
        "requestPreference",
      );
    } else if (!businessRequest) {
      fields.push("marketSegment");
    }
    if (
      businessRequest ||
      (!serviceRequest && form.marketSegment === "b2b")
    ) {
      fields.push("company");
    }
    if (
      form.preferredContactMethod === "phone" ||
      form.preferredContactMethod === "whatsapp"
    ) {
      fields.push("phone");
    }
    return fields;
  }, [
    businessRequest,
    form.marketSegment,
    form.preferredContactMethod,
    serviceRequest,
  ]);
  const stepRequired: Record<number, Array<keyof FormState>> = serviceRequest
    ? {
        1: ["customerStatus"],
        2: ["interest", "deviceType"],
        3: ["message", "urgency", "requestPreference"],
        4: ["name", "email", "preferredContactMethod", "consentPrivacy"],
      }
    : businessRequest
      ? {
          1: ["name", "email", "company"],
          2: ["interest"],
          3: ["message", "preferredContactMethod", "consentPrivacy"],
        }
      : {
          1: ["marketSegment"],
          2: ["name", "email"],
          3: ["interest"],
          4: ["message", "preferredContactMethod", "consentPrivacy"],
        };

  useEffect(() => {
    setInteractive(true);
  }, []);

  useEffect(() => {
    try {
      localStorage.removeItem("nm-contact-draft");
    } catch {
      /* ignore */
    }
  }, []);

  function novaEvent(event: NovaEvent, extra: Record<string, string | number> = {}) {
    if (!serviceRequest && !businessRequest) return;
    trackNovaEvent(event, {
      segment: businessRequest ? "business" : "home",
      service_id: (businessRequest ? businessServiceSlug : requestedServiceSlug) ?? "",
      ...extra,
    });
  }

  useEffect(() => {
    if (!interactive) return;
    formRef.current
      ?.querySelector<HTMLElement>(
        "input:not([tabindex='-1']),select,textarea,button[aria-pressed]",
      )
      ?.focus();
  }, [currentStep, interactive]);

  useEffect(() => {
    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus();
  }, [errors]);

  useEffect(() => {
    let reported = false;
    const report = () => {
      if (reported || hasSubmittedRef.current || !progressRef.current.started)
        return;
      reported = true;
      if (!serviceRequest && !businessRequest) trackFormProgress({
        form: serviceRequest ? "nova_assist_request" : "contact_request",
        step: "abandon",
        completionRate: progressRef.current.completionRate,
      });
    };
    window.addEventListener("pagehide", report);
    return () => {
      window.removeEventListener("pagehide", report);
      report();
    };
  }, [serviceRequest, businessRequest]);

  const completionRate = useMemo(() => {
    const total = requiredFields.length;
    const completed = requiredFields.filter((field) => {
      const v = form[field];
      return typeof v === "boolean" ? v : (v as string).trim().length > 0;
    }).length;
    return Math.round((completed / total) * 100);
  }, [form, requiredFields]);
  useEffect(() => {
    progressRef.current.completionRate = completionRate;
  }, [completionRate]);

  const validationContext: ValidationContext = {
    serviceRequest,
    marketSegment: form.marketSegment,
    preferredContactMethod: form.preferredContactMethod,
  };

  function getStepFields(step: number) {
    const fields = [...(stepRequired[step] ?? [])];
    if (
      !serviceRequest &&
      !businessRequest &&
      step === 2 &&
      form.marketSegment === "b2b"
    ) {
      fields.push("company");
    }
    if (
      step === steps.length &&
      (form.preferredContactMethod === "phone" ||
        form.preferredContactMethod === "whatsapp")
    ) {
      fields.push("phone");
    }
    return fields;
  }

  function buildSuccessMessage(channel: string | undefined) {
    if (!channel || channel === "protected") {
      return "Recibimos tu solicitud. Revisaremos la información y te contactaremos para confirmar los siguientes pasos.";
    }

    if (channel === "resend" || channel === "smtp") {
      return `Solicitud enviada por ${channel}.`;
    }

    return "Tu solicitud fue enviada correctamente.";
  }

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    if ((serviceRequest || businessRequest) && !requestStartedRef.current) {
      requestStartedRef.current = true;
      novaEvent("service_request_started");
    }
    progressRef.current.started = true;
    hasSubmittedRef.current = false;
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      const fieldError = validateField(field, String(value), validationContext);
      setErrors((current) => ({
        ...current,
        [field]: fieldError || undefined,
      }));
    }
  }

  function updateMarketSegment(segment: LeadMarketSegment) {
    if (form.marketSegment === segment) return;
    const options = interestOptionsForSegment(segment);
    progressRef.current.started = true;
    hasSubmittedRef.current = false;
    setForm((current) => ({
      ...current,
      marketSegment: segment,
      interest: options.includes(current.interest)
        ? current.interest
        : defaultInterestForSegment(segment),
      company: segment === "b2c" ? "" : current.company,
      leadVolume: segment === "b2c" ? "" : current.leadVolume,
      urgency: segment === "b2c" ? "" : current.urgency,
      implementationHorizon:
        segment === "b2c" ? "" : current.implementationHorizon,
    }));
    setSelectedContactPlan("");
    setErrors((current) => ({
      ...current,
      marketSegment: undefined,
      company: segment === "b2c" ? undefined : current.company,
      interest: undefined,
    }));
  }

  function updatePreferredContactMethod(method: PreferredContactMethod) {
    updateField("preferredContactMethod", method);
    if (method === "email") {
      setForm((current) => ({ ...current, phone: "" }));
      setErrors((current) => ({ ...current, phone: undefined }));
    }
  }

  function handleFieldFocus(field: keyof FormState) {
    if (!focusedFieldsRef.current.has(field)) {
      focusedFieldsRef.current.add(field);
      if (!serviceRequest && !businessRequest) trackFormProgress({
        form: serviceRequest ? "nova_assist_request" : "contact_request",
        step: "field_focus",
        field,
        completionRate,
      });
    }
  }

  function handleFieldBlur(field: keyof FormState) {
    const fieldError = validateField(
      field,
      String(form[field]),
      validationContext,
    );
    setErrors((current) => ({ ...current, [field]: fieldError || undefined }));
    if (!serviceRequest && !businessRequest) trackFormProgress({
      form: serviceRequest ? "nova_assist_request" : "contact_request",
      step: "field_blur",
      field,
      completionRate,
      valid: !fieldError,
    });
  }

  function handleNextStep() {
    const stepFields = getStepFields(currentStep);
    const nextErrors: FormErrors = {};
    for (const field of stepFields) {
      const fieldError = validateField(
        field,
        String(form[field]),
        validationContext,
      );
      if (fieldError) nextErrors[field] = fieldError;
    }
    if (Object.keys(nextErrors).length > 0) {
      novaEvent("service_request_validation_failed", { error_category: "validation", step_number: currentStep });
      setErrors((prev) => ({ ...prev, ...nextErrors }));
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, steps.length));
    if (!serviceRequest && !businessRequest) trackFormProgress({
      form: serviceRequest ? "nova_assist_request" : "contact_request",
      step: "step_" + String(currentStep) + "_complete",
      completionRate,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    setSubmitted(false);
    setError("");
    setServerMessage("");

    const nextErrors: FormErrors = {};
    for (const field of requiredFields) {
      const fieldError = validateField(
        field,
        String(form[field]),
        validationContext,
      );
      if (fieldError) {
        nextErrors[field] = fieldError;
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      novaEvent("service_request_validation_failed", { error_category: "validation", step_number: currentStep });
      setErrors(nextErrors);
      if (!serviceRequest && !businessRequest) trackFormProgress({
        form: serviceRequest ? "nova_assist_request" : "contact_request",
        step: "submit_blocked_validation",
        completionRate,
        valid: false,
      });
      setError("Revisa los campos marcados para continuar.");
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      novaEvent("service_request_validation_failed", { error_category: "verification", step_number: currentStep });
      setError("Completa la verificacion de seguridad para enviar.");
      return;
    }

    if (!serviceRequest && !businessRequest) trackFormProgress({
      form: serviceRequest ? "nova_assist_request" : "contact_request",
      step: "submit_attempt",
      completionRate,
      valid: true,
    });

    submittingRef.current = true;
    novaEvent("service_request_submitted");
    if (healthCheck) novaEvent("health_check_submitted");
    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            plan: businessRequest
              ? businessServiceSlug
                ? `nova-assist-business-${businessServiceSlug}`
                : undefined
              : serviceRequest
              ? requestedServiceSlug
                ? `nova-assist-${requestedServiceSlug}`
                : undefined
              : selectedContactPlan || undefined,
            marketSegment: form.marketSegment || resolvedInitialSegment,
            preferredContactMethod: form.preferredContactMethod,
            phone: form.phone.trim() || undefined,
            company:
              form.marketSegment === "b2b" ? form.company.trim() : undefined,
            consentPrivacy: true,
            turnstileToken: turnstileToken || undefined,
            utm: getStoredUTM() ?? undefined,
          }),
        });

        const parsedResult = contactResponseSchema.safeParse(
          await response.json(),
        );
        if (!parsedResult.success) {
          novaEvent("service_request_failed", { error_category: "invalid_response" });
          if (healthCheck) novaEvent("health_check_failed", { error_category: "invalid_response" });
          if (!serviceRequest && !businessRequest) trackEvent("contact_submit_error", { reason: "invalid_response" });
          if (!serviceRequest && !businessRequest) trackFormProgress({
            form: "contact_request",
            step: "submit_error",
            completionRate,
            valid: false,
          });
          setError("No se pudo interpretar la respuesta. Intenta nuevamente.");
          return;
        }
        const result = parsedResult.data;

        if (!response.ok || !result.ok) {
          if (serviceRequest || businessRequest) {
            novaEvent("service_request_failed", { error_category: "server" });
            if (healthCheck) novaEvent("health_check_failed", { error_category: "server" });
          } else trackEvent("contact_submit_error", { reason: "api_error" });
          if (!serviceRequest && !businessRequest) trackFormProgress({
            form: "contact_request",
            step: "submit_error",
            completionRate,
            valid: false,
          });
          setError(
            result.message ||
              "No se pudo enviar la solicitud. Intenta nuevamente.",
          );
          return;
        }

        hasSubmittedRef.current = true;
        setSubmitted(true);
        setSubmittedRequestId(result.requestId || "");
        if (serviceRequest) {
          setSubmittedServiceName(form.interest);
          setSubmittedDeviceType(form.deviceType);
        }
        setServerMessage(buildSuccessMessage(result.channel));
        if (!serviceRequest && !businessRequest && result.channel !== "protected" && result.requestId)
          trackLeadConversion(result.requestId, {
            source: serviceRequest ? "nova_assist_request" : "contact_form",
            product: serviceRequest ? service ?? "nova_assist" : form.interest,
            ...(businessRequest && businessServiceSlug
              ? { plan: `nova-assist-business-${businessServiceSlug}` }
              : selectedContactPlan
                ? { plan: selectedContactPlan }
                : {}),
          });
        if (result.channel !== "protected") {
          novaEvent("service_request_succeeded", { outcome: "success" });
          if (healthCheck) novaEvent("health_check_succeeded", { outcome: "success" });
        }
        if (!serviceRequest && !businessRequest) trackEvent("contact_submit_success", {
          channel: result.channel || "unknown",
          market_segment: form.marketSegment,
          preferred_contact_method: form.preferredContactMethod,
            ...(serviceRequest
              ? {
                  service:
                    novaAssistServices.find((item) => item.name === form.interest)
                      ?.slug ?? "unspecified",
                }
              : { interest: form.interest }),
        });
        if (!serviceRequest && !businessRequest) trackFormProgress({
          form: "contact_request",
          step: "submit_success",
          completionRate: 100,
          valid: true,
        });
        setForm({
          ...initialState,
          marketSegment: resolvedInitialSegment,
          interest: serviceRequest
            ? UNSURE_INTEREST
            : initialInterest,
        });
        setErrors({});
        setCurrentStep(1);
        try {
          localStorage.removeItem("nm-contact-draft");
        } catch {
          /* ignore */
        }
      } catch {
        if (serviceRequest || businessRequest) {
          novaEvent("service_request_failed", { error_category: "network" });
          if (healthCheck) novaEvent("health_check_failed", { error_category: "network" });
        } else trackEvent("contact_submit_error", { reason: "network_error" });
        if (!serviceRequest && !businessRequest) trackFormProgress({
          form: "contact_request",
          step: "submit_network_error",
          completionRate,
          valid: false,
        });
        setError(
          "No se pudo conectar con el servidor. Intenta nuevamente en unos minutos.",
        );
      } finally {
        submittingRef.current = false;
        setTurnstileToken("");
        setVerificationAttempt(attempt => attempt + 1);
      }
    });
  }

  const inputCls =
    "w-full rounded-xl border border-brand-lavender/20 bg-brand-void/60 px-4 py-2.5 text-sm text-[#f0f8ff] outline-none ring-brand-violet transition focus:ring-2";

  function renderPreferredContactFields(idPrefix: string) {
    return (
      <>
        <fieldset
          aria-describedby={
            errors.preferredContactMethod
              ? `${idPrefix}-method-error`
              : undefined
          }
        >
          <legend className="text-sm font-semibold text-white">
            ¿Cómo prefieres que te contacten?{" "}
            <span className="text-rose-300">*</span>
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {(
              [
                ["email", "Correo electrónico"],
                ["phone", "Llamada"],
                ["whatsapp", "WhatsApp"],
              ] as const
            ).map(([method, label]) => (
              <button
                key={method}
                type="button"
                aria-pressed={form.preferredContactMethod === method}
                aria-invalid={Boolean(errors.preferredContactMethod)}
                aria-describedby={
                  errors.preferredContactMethod
                    ? `${idPrefix}-method-error`
                    : undefined
                }
                onClick={() => updatePreferredContactMethod(method)}
                className={`min-h-12 rounded-xl border px-3 py-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lavender ${
                  form.preferredContactMethod === method
                    ? "border-brand-lavender/60 bg-brand-violet/15 text-white"
                    : "border-brand-lavender/15 bg-brand-void/30 text-text-muted hover:border-brand-lavender/35"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {errors.preferredContactMethod && (
            <span
              id={`${idPrefix}-method-error`}
              role="alert"
              className="mt-2 block text-xs text-rose-300"
            >
              {errors.preferredContactMethod}
            </span>
          )}
          {form.preferredContactMethod === "email" && (
            <p className="mt-2 text-xs leading-5 text-text-subtle">
              Usaremos el correo electrónico que compartiste.
            </p>
          )}
        </fieldset>
        {(form.preferredContactMethod === "phone" ||
          form.preferredContactMethod === "whatsapp") && (
          <label className="block space-y-2 text-sm font-medium text-text-muted">
            <span>
              Teléfono de contacto <span className="text-rose-300">*</span>
            </span>
            <input
              type="tel"
              inputMode="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              onFocus={() => handleFieldFocus("phone")}
              onBlur={() => handleFieldBlur("phone")}
              placeholder="+506 8888 8888"
              autoComplete="tel"
              maxLength={30}
              aria-label="Teléfono de contacto"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined}
              required
              className={inputCls}
            />
            {errors.phone && (
              <span
                id={`${idPrefix}-phone-error`}
                role="alert"
                className="text-xs text-rose-300"
              >
                {errors.phone}
              </span>
            )}
          </label>
        )}
      </>
    );
  }

  return (
    <div>
      {/* Stepper header */}
      <nav
        aria-label="Pasos del formulario"
        className="mb-6"
        hidden={serviceRequest && submitted}
      >
        {/* ARIA live: announce step change to screen readers */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          Paso {currentStep} de {steps.length}: {steps[currentStep - 1]?.label}
        </div>
        <ol className="flex items-center">
          {steps.map((step, i) => {
            const isDone = currentStep > step.number;
            const isActive = currentStep === step.number;
            return (
              <li key={step.number} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${isDone ? "bg-brand-violet text-white" : isActive ? "border-2 border-brand-violet bg-brand-card text-brand-lavender" : "border border-brand-lavender/20 bg-brand-card text-text-subtle"}`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`hidden text-[10px] font-semibold uppercase tracking-wider sm:block ${isActive ? "text-brand-lavender" : isDone ? "text-text-muted" : "text-text-subtle"}`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`mx-2 h-px flex-1 transition-colors ${currentStep > step.number ? "bg-brand-violet/50" : "bg-brand-lavender/15"}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {serviceRequest && submitted && (
        <section
          role="status"
          aria-live="polite"
          className="mb-6 rounded-2xl border border-emerald-200/20 bg-emerald-950/15 p-5"
        >
          <h2 className="font-display text-xl font-bold text-white">
            Recibimos tu solicitud.
          </h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Revisaremos la información y te contactaremos para confirmar el
            alcance, la zona y los siguientes pasos. La recepción no significa
            que el problema ya esté resuelto ni confirma una cita.
          </p>
          <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
            <div>
              <dt className="text-text-subtle">Servicio</dt>
              <dd className="mt-1 text-slate-100">{submittedServiceName}</dd>
            </div>
            <div>
              <dt className="text-text-subtle">Dispositivo</dt>
              <dd className="mt-1 text-slate-100">{submittedDeviceType}</dd>
            </div>
            {submittedRequestId && (
              <div>
                <dt className="text-text-subtle">Identificador de solicitud</dt>
                <dd className="mt-1 font-mono text-slate-100">
                  {submittedRequestId}
                </dd>
              </div>
            )}
          </dl>
        </section>
      )}

      <form
        ref={formRef}
        aria-label={
          serviceRequest
            ? "Solicitud de ayuda de Nova Assist"
            : businessRequest
              ? "Solicitud empresarial"
              : "Solicitud comercial"
        }
        hidden={serviceRequest && submitted}
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset disabled={!interactive} className="min-w-0 disabled:opacity-70">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        </div>

        {!serviceRequest && !businessRequest && currentStep === 1 && (
          <div className="space-y-4 reveal-slide-up">
            <fieldset
              aria-describedby={errors.marketSegment ? "contact-segment-error" : undefined}
            >
              <legend className="text-sm font-semibold text-white">
                ¿Para quién es esta solicitud? <span className="text-rose-300">*</span>
              </legend>
              <p className="mt-1 text-xs leading-5 text-text-subtle">
                Así dirigimos tu consulta al equipo adecuado.
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {([
                  ["b2c", "Persona u hogar", "Soporte y servicios para uso personal."],
                  ["b2b", "Empresa u organización", "Productos, servicios y soluciones para organizaciones."],
                ] as const).map(([segment, label, description]) => (
                  <button
                    key={segment}
                    type="button"
                    aria-pressed={form.marketSegment === segment}
                    aria-invalid={Boolean(errors.marketSegment)}
                    aria-describedby={
                      errors.marketSegment ? "contact-segment-error" : undefined
                    }
                    onClick={() => updateMarketSegment(segment)}
                    className={`min-h-24 rounded-xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lavender ${
                      form.marketSegment === segment
                        ? "border-brand-lavender/60 bg-brand-violet/15 text-white"
                        : "border-brand-lavender/15 bg-brand-void/30 text-text-muted hover:border-brand-lavender/35"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className="mt-1 block text-xs leading-5 text-text-subtle">
                      {description}
                    </span>
                  </button>
                ))}
              </div>
              {errors.marketSegment && (
                <span
                  id="contact-segment-error"
                  role="alert"
                  className="mt-2 block text-xs text-rose-300"
                >
                  {errors.marketSegment}
                </span>
              )}
            </fieldset>
          </div>
        )}

        {/* Contact details */}
        {serviceRequest && currentStep === 1 && (
          <div className="space-y-4 reveal-slide-up">
            <fieldset aria-describedby={errors.customerStatus ? "request-customer-error" : undefined}>
              <legend className="text-sm font-semibold text-white">¿Ya eres cliente de Nova Assist?</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  ["existing", "Sí, ya soy cliente"],
                  ["new", "No, es mi primera solicitud"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={form.customerStatus === value}
                    onClick={() => updateField("customerStatus", value)}
                    className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200 ${
                      form.customerStatus === value
                        ? "border-orange-200/50 bg-orange-300/10 text-white"
                        : "border-white/10 text-text-muted hover:border-white/25"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {errors.customerStatus && <p id="request-customer-error" role="alert" className="mt-2 text-xs text-rose-300">{errors.customerStatus}</p>}
            </fieldset>
          </div>
        )}

        {serviceRequest && currentStep === 2 && (
          <div className="space-y-4 reveal-slide-up">
            <label className="block space-y-2 text-sm font-medium text-text-muted">
              <span>¿Qué servicio necesitas?</span>
              <select
                value={form.interest}
                onChange={(event) => updateField("interest", event.target.value)}
                onFocus={() => handleFieldFocus("interest")}
                onBlur={() => handleFieldBlur("interest")}
                aria-label="Servicio de Nova Assist"
                aria-invalid={Boolean(errors.interest)}
                aria-describedby={errors.interest ? "request-service-error" : undefined}
                className={inputCls}
              >
                <option>No estoy seguro, necesito orientación</option>
                {novaAssistServices.map((item) => <option key={item.slug}>{item.name}</option>)}
              </select>
              {errors.interest && <span id="request-service-error" className="text-xs text-rose-300">{errors.interest}</span>}
            </label>
            <label className="block space-y-2 text-sm font-medium text-text-muted">
              <span>¿Qué dispositivo o sistema presenta la necesidad?</span>
              <select
                value={form.deviceType}
                onChange={(event) => updateField("deviceType", event.target.value)}
                onFocus={() => handleFieldFocus("deviceType")}
                onBlur={() => handleFieldBlur("deviceType")}
                aria-label="Tipo de dispositivo"
                aria-invalid={Boolean(errors.deviceType)}
                aria-describedby={errors.deviceType ? "request-device-error" : undefined}
                className={inputCls}
              >
                <option value="">Selecciona una opción</option>
                <option value="Computadora Windows">Computadora Windows</option>
                <option value="Computadora macOS">Computadora macOS</option>
                <option value="Teléfono o tableta">Teléfono o tableta</option>
                <option value="Wi-Fi o red doméstica">Wi-Fi o red doméstica</option>
                <option value="Dispositivos inteligentes">Dispositivos inteligentes</option>
                <option value="Otro o no estoy seguro">Otro o no estoy seguro</option>
              </select>
              {errors.deviceType && <span id="request-device-error" className="text-xs text-rose-300">{errors.deviceType}</span>}
            </label>
          </div>
        )}

        {serviceRequest && currentStep === 3 && (
          <div className="space-y-4 reveal-slide-up">
            <label className="block space-y-2 text-sm font-medium text-text-muted">
              <span>Describe brevemente el problema</span>
              <textarea
                rows={4}
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                onFocus={() => handleFieldFocus("message")}
                onBlur={() => handleFieldBlur("message")}
                placeholder="Qué sucede, cuándo empezó y qué has intentado. No incluyas contraseñas ni códigos privados."
                aria-label="Descripción del problema"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "request-message-error" : "request-message-hint"}
                className={inputCls}
              />
              <span id="request-message-hint" className="block text-xs leading-5 text-text-subtle">Comparte solo información necesaria. No envíes contraseñas, PIN, códigos MFA ni datos de tarjeta.</span>
              {errors.message && <span id="request-message-error" className="text-xs text-rose-300">{errors.message}</span>}
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2 text-sm font-medium text-text-muted">
                <span>Urgencia percibida</span>
                <select value={form.urgency} onChange={(event) => updateField("urgency", event.target.value)} onFocus={() => handleFieldFocus("urgency")} onBlur={() => handleFieldBlur("urgency")} aria-label="Urgencia de la solicitud" aria-invalid={Boolean(errors.urgency)} aria-describedby={errors.urgency ? "request-urgency-error" : undefined} className={inputCls}>
                  <option value="">Selecciona una opción</option>
                  <option value="baja">Puedo esperar</option>
                  <option value="media">Me gustaría resolverlo pronto</option>
                  <option value="alta">Afecta una tarea importante</option>
                  <option value="critica">No puedo usar el equipo o servicio</option>
                </select>
                {errors.urgency && <span id="request-urgency-error" role="alert" className="text-xs text-rose-300">{errors.urgency}</span>}
              </label>
              <label className="block space-y-2 text-sm font-medium text-text-muted">
                <span>¿Cómo prefieres recibir ayuda?</span>
                <select value={form.requestPreference} onChange={(event) => updateField("requestPreference", event.target.value)} onFocus={() => handleFieldFocus("requestPreference")} onBlur={() => handleFieldBlur("requestPreference")} aria-label="Preferencia de atención" aria-invalid={Boolean(errors.requestPreference)} aria-describedby={errors.requestPreference ? "request-preference-error" : undefined} className={inputCls}>
                  <option value="">Selecciona una opción</option>
                  <option value="remote">Remoto</option>
                  <option value="visit">Visita</option>
                  <option value="unsure">No estoy seguro</option>
                </select>
                {errors.requestPreference && <span id="request-preference-error" role="alert" className="text-xs text-rose-300">{errors.requestPreference}</span>}
              </label>
            </div>
            <label className="block space-y-2 text-sm font-medium text-text-muted">
              <span>Zona o localidad (opcional)</span>
              <input value={form.serviceArea} onChange={(event) => updateField("serviceArea", event.target.value)} onFocus={() => handleFieldFocus("serviceArea")} onBlur={() => handleFieldBlur("serviceArea")} placeholder="Provincia, cantón o zona aproximada" maxLength={120} className={inputCls} />
            </label>
          </div>
        )}

        {serviceRequest && currentStep === 4 && (
          <div className="space-y-4 reveal-slide-up">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2 text-sm font-medium text-text-muted">
                <span>Nombre</span>
                <input value={form.name} onChange={(event) => updateField("name", event.target.value)} onFocus={() => handleFieldFocus("name")} onBlur={() => handleFieldBlur("name")} placeholder="Tu nombre" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "request-name-error" : undefined} required className={inputCls} />
                {errors.name && <span id="request-name-error" className="text-xs text-rose-300">{errors.name}</span>}
              </label>
              <label className="block space-y-2 text-sm font-medium text-text-muted">
                <span>Correo electrónico</span>
                <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} onFocus={() => handleFieldFocus("email")} onBlur={() => handleFieldBlur("email")} placeholder="correo@ejemplo.com" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "request-email-error" : undefined} required className={inputCls} />
                {errors.email && <span id="request-email-error" className="text-xs text-rose-300">{errors.email}</span>}
              </label>
            </div>
            {renderPreferredContactFields("request")}
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
              <h3 className="text-sm font-semibold text-white">Revisa tu solicitud</h3>
              <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                <div><dt className="text-text-subtle">Cliente</dt><dd className="mt-0.5 text-text-muted">{form.customerStatus === "existing" ? "Actual" : "Nuevo"}</dd></div>
                <div><dt className="text-text-subtle">Servicio</dt><dd className="mt-0.5 text-text-muted">{form.interest}</dd></div>
                <div><dt className="text-text-subtle">Dispositivo</dt><dd className="mt-0.5 text-text-muted">{form.deviceType}</dd></div>
                <div><dt className="text-text-subtle">Atención</dt><dd className="mt-0.5 text-text-muted">{form.requestPreference === "remote" ? "Remota" : form.requestPreference === "visit" ? "Visita" : "Por definir"}</dd></div>
                <div><dt className="text-text-subtle">Canal de contacto</dt><dd className="mt-0.5 text-text-muted">{form.preferredContactMethod ? contactMethodLabels[form.preferredContactMethod] : "Por definir"}</dd></div>
                {form.serviceArea && <div><dt className="text-text-subtle">Zona</dt><dd className="mt-0.5 text-text-muted">{form.serviceArea}</dd></div>}
              </dl>
            </div>
            <div className="rounded-xl border border-brand-lavender/15 bg-brand-card/40 px-4 py-3 text-xs leading-5 text-text-muted">
              Usaremos estos datos para revisar tu solicitud y coordinar el siguiente paso. Consulta la <Link href="/nova-assist/privacidad" className="text-brand-lavender underline underline-offset-2">información de privacidad de Nova Assist</Link> y la <Link href="/privacidad" className="text-brand-lavender underline underline-offset-2" target="_blank">política general de privacidad</Link>.
            </div>
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={form.consentPrivacy} onChange={(event) => updateField("consentPrivacy", event.target.checked)} aria-describedby={errors.consentPrivacy ? "request-consent-error" : undefined} className="mt-0.5 h-4 w-4 shrink-0 accent-brand-violet" />
              <span className="text-xs leading-5 text-text-muted">He leído la información de privacidad y acepto el tratamiento de mis datos para atender esta solicitud. <span className="text-rose-300">*</span></span>
            </label>
            {errors.consentPrivacy && <span id="request-consent-error" role="alert" className="text-xs text-rose-300">{errors.consentPrivacy}</span>}
            <Turnstile key={verificationAttempt} action="contact" onToken={setTurnstileToken} />
            {error && <div role="alert" aria-live="assertive" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</div>}
          </div>
        )}

        {!serviceRequest &&
          currentStep === (businessRequest ? 1 : 2) && (
          <div className="space-y-4 reveal-slide-up">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2 text-sm font-medium text-text-muted">
                <span>Nombre</span>
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  onFocus={() => handleFieldFocus("name")}
                  onBlur={() => handleFieldBlur("name")}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  aria-label="Nombre"
                  aria-invalid={Boolean(errors.name)}
                  required
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  className={inputCls}
                />
                {errors.name && (
                  <span
                    id="contact-name-error"
                    className="text-xs text-rose-300"
                  >
                    {errors.name}
                  </span>
                )}
              </label>
              <label className="block space-y-2 text-sm font-medium text-text-muted">
                <span>{businessRequest ? "Correo de trabajo" : "Correo electrónico"}</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onFocus={() => handleFieldFocus("email")}
                  onBlur={() => handleFieldBlur("email")}
                  placeholder="correo@ejemplo.com"
                  autoComplete="email"
                  aria-label={businessRequest ? "Correo de trabajo" : "Correo electrónico"}
                  aria-invalid={Boolean(errors.email)}
                  required
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  className={inputCls}
                />
                {errors.email && (
                  <span
                    id="contact-email-error"
                    className="text-xs text-rose-300"
                  >
                    {errors.email}
                  </span>
                )}
              </label>
            </div>
            {(businessRequest || form.marketSegment === "b2b") && (
              <label className="block space-y-2 text-sm font-medium text-text-muted">
                <span>Empresa <span className="text-rose-300">*</span></span>
                <input
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  onFocus={() => handleFieldFocus("company")}
                  onBlur={() => handleFieldBlur("company")}
                  placeholder="Nombre de la organización"
                  autoComplete="organization"
                  aria-label="Empresa"
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? "contact-company-error" : undefined}
                  required
                  className={inputCls}
                />
                {errors.company && (
                  <span id="contact-company-error" role="alert" className="text-xs text-rose-300">
                    {errors.company}
                  </span>
                )}
              </label>
            )}
          </div>
        )}

        {/* Service selection and business qualification */}
        {!serviceRequest &&
          currentStep === (businessRequest ? 2 : 3) && (
          <div className="space-y-4 reveal-slide-up">
            <label className="block space-y-2 text-sm font-medium text-text-muted">
              <span>Interés principal</span>
              <select
                value={form.interest}
                aria-label="Interés principal"
                aria-invalid={Boolean(errors.interest)}
                onChange={(e) => {
                  updateField("interest", e.target.value);
                  if (e.target.value !== intent.interest) {
                    setSelectedContactPlan("");
                  }
                }}
                onFocus={() => handleFieldFocus("interest")}
                onBlur={() => handleFieldBlur("interest")}
                required
                aria-describedby={
                  errors.interest ? "contact-interest-error" : undefined
                }
                className={inputCls}
              >
                {(businessRequest
                  ? businessServices.map((item) => item.name)
                  : interestOptionsForSegment(form.marketSegment)
                ).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              {errors.interest && (
                <span
                  id="contact-interest-error"
                  className="text-xs text-rose-300"
                >
                  {errors.interest}
                </span>
              )}
            </label>
            {(businessRequest || form.marketSegment === "b2b") && (
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block space-y-2 text-sm font-medium text-text-muted">
                <span>Volumen estimado</span>
                <select
                  value={form.leadVolume}
                  onChange={(e) => updateField("leadVolume", e.target.value)}
                  onFocus={() => handleFieldFocus("leadVolume")}
                  onBlur={() => handleFieldBlur("leadVolume")}
                  className={inputCls}
                >
                  <option value="">Seleccionar</option>
                  <option value="<100">Menos de 100</option>
                  <option value="100-500">100 a 500</option>
                  <option value="500-2000">500 a 2000</option>
                  <option value="2000+">Más de 2000</option>
                </select>
              </label>
              <label className="block space-y-2 text-sm font-medium text-text-muted">
                <span>Urgencia</span>
                <select
                  value={form.urgency}
                  onChange={(e) => updateField("urgency", e.target.value)}
                  onFocus={() => handleFieldFocus("urgency")}
                  onBlur={() => handleFieldBlur("urgency")}
                  className={inputCls}
                >
                  <option value="">Seleccionar</option>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </label>
              <label className="block space-y-2 text-sm font-medium text-text-muted">
                <span>Horizonte</span>
                <select
                  value={form.implementationHorizon}
                  onChange={(e) =>
                    updateField("implementationHorizon", e.target.value)
                  }
                  onFocus={() => handleFieldFocus("implementationHorizon")}
                  onBlur={() => handleFieldBlur("implementationHorizon")}
                  className={inputCls}
                >
                  <option value="">Seleccionar</option>
                  <option value="0-30">0 a 30 días</option>
                  <option value="31-90">31 a 90 días</option>
                  <option value="91-180">91 a 180 días</option>
                  <option value="180+">Más de 180 días</option>
                </select>
              </label>
            </div>
            )}
          </div>
        )}

        {/* Final step — message and contact preference */}
        {!serviceRequest &&
          currentStep === (businessRequest ? 3 : 4) && (
          <div className="space-y-4 reveal-slide-up">
            <label className="block space-y-2 text-sm font-medium text-text-muted">
              <span>Mensaje</span>
              <textarea
                rows={5}
                aria-label="Mensaje"
                aria-invalid={Boolean(errors.message)}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                onFocus={() => handleFieldFocus("message")}
                onBlur={() => handleFieldBlur("message")}
                placeholder={
                  form.marketSegment === "b2b"
                    ? "Cuéntanos sobre tu operación, objetivos y el resultado que buscas."
                    : "Cuéntanos qué necesitas resolver y cualquier detalle que nos ayude a orientarte."
                }
                autoComplete="off"
                required
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                className={inputCls}
              />
              {errors.message && (
                <span
                  id="contact-message-error"
                  className="text-xs text-rose-300"
                >
                  {errors.message}
                </span>
              )}
            </label>

            {renderPreferredContactFields("contact")}

            {/* Aviso de privacidad — obligatorio Ley 8968 Costa Rica */}
            <div className="rounded-xl border border-brand-lavender/15 bg-brand-card/40 px-4 py-3 text-xs text-text-muted leading-5">
              <p>
                <strong className="text-[#f0f8ff]">
                  Aviso de privacidad (Ley 8968 CR):
                </strong>{" "}
                Novamind Global S.A. tratará los datos que proporciones
                (incluyendo nombre, correo, teléfono, organización y canal de
                contacto cuando correspondan) para atender esta solicitud. Los
                campos marcados con * son obligatorios. Puedes ejercer tus
                derechos de acceso, rectificación y supresión escribiendo a{" "}
                <a
                  href="mailto:privacidad@novamindglobalcr.com"
                  className="text-brand-lavender hover:underline"
                >
                  privacidad@novamindglobalcr.com
                </a>
                . Consulte nuestra{" "}
                <Link
                  href="/privacidad"
                  className="text-brand-lavender hover:underline"
                >
                  política de privacidad completa
                </Link>
                .
              </p>
            </div>

            {/* Consentimiento explícito — obligatorio Ley 8968 */}
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.consentPrivacy}
                onChange={(e) => {
                  updateField("consentPrivacy", e.target.checked);
                  if (errors.consentPrivacy) {
                    setErrors((prev) => ({
                      ...prev,
                      consentPrivacy: undefined,
                    }));
                  }
                }}
                aria-describedby={
                  errors.consentPrivacy ? "contact-consent-error" : undefined
                }
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand-violet"
              />
              <span className="text-xs leading-5 text-text-muted">
                He leído y acepto el tratamiento de mis datos conforme a la{" "}
                <Link
                  href="/privacidad"
                  className="text-brand-lavender hover:underline"
                  target="_blank"
                >
                  política de privacidad
                </Link>{" "}
                de Novamind Global. <span className="text-rose-300">*</span>
              </span>
            </label>
            {errors.consentPrivacy && (
              <span
                id="contact-consent-error"
                role="alert"
                className="text-xs text-rose-300"
              >
                {errors.consentPrivacy}
              </span>
            )}
            <Turnstile key={verificationAttempt} action="contact" onToken={setTurnstileToken} />
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
              >
                {error}
              </div>
            )}
          </div>
        )}

        {submitted && (
          <Toast
            title="Solicitud recibida"
            message={serverMessage || "Tu mensaje fue enviado correctamente."}
            variant="success"
          />
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="rounded-xl border border-brand-lavender/20 px-4 py-2.5 text-sm font-medium text-text-muted transition hover:border-brand-lavender/40 hover:text-[#f0f8ff]"
            >
              ← Anterior
            </button>
          ) : (
            <span />
          )}
          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-violet px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-iris"
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-2xl bg-brand-cta px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-medium disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? "Enviando..." : "Enviar solicitud"}
            </button>
          )}
        </div>
        </fieldset>
      </form>
    </div>
  );
}
