"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Toast } from "@/components/shared/ui/Toast";
import { trackEvent, trackFormProgress } from "@/lib/analytics-client";
import { getStoredUTM } from "@/lib/useUTM";
import { ChevronRight, CheckCircle2 } from "lucide-react";

const serviceInterestOptions = [
  "Consultoría",
  "NovaClick — ClickFix (Residencial)",
  "NovaClick — ITOn-Demand (Empresarial)",
  "Suscripción SaaS",
];

const productInterestOptions = products.map((product) => product.name);

const allInterestOptions = [
  ...serviceInterestOptions,
  ...productInterestOptions,
];

type FormState = {
  name: string;
  email: string;
  company: string;
  interest: string;
  leadVolume: string;
  urgency: string;
  implementationHorizon: string;
  website: string;
  message: string;
  consentPrivacy: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  interest: allInterestOptions[0] || "",
  leadVolume: "",
  urgency: "",
  implementationHorizon: "",
  website: "",
  message: "",
  consentPrivacy: false,
};

const requiredFields: Array<keyof FormState> = [
  "name",
  "email",
  "interest",
  "message",
  "consentPrivacy",
];

const STEPS = [
  { number: 1, label: "¿Quién eres?" },
  { number: 2, label: "¿Qué necesitas?" },
  { number: 3, label: "Tu mensaje" },
];

const STEP_REQUIRED: Record<number, Array<keyof FormState>> = {
  1: ["name", "email"],
  2: ["interest"],
  3: ["message", "consentPrivacy"],
};

function validateField(field: keyof FormState, value: string): string {
  if (field === "name") {
    return value.trim().length >= 2
      ? ""
      : "Ingresa un nombre valido (minimo 2 caracteres).";
  }
  if (field === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value.trim())
      ? ""
      : "Ingresa un correo empresarial valido.";
  }
  if (field === "interest") {
    return value.trim().length >= 2 ? "" : "Selecciona un interes principal.";
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

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const focusedFieldsRef = useRef<Set<keyof FormState>>(new Set());
  const hasSubmittedRef = useRef(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Auto-save form progress to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nm-contact-draft");
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormState>;
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (hasSubmittedRef.current) return;
    try {
      const hasData = Object.values(form).some((v) =>
        typeof v === "string" ? v.trim().length > 0 : v === true,
      );
      if (hasData)
        localStorage.setItem("nm-contact-draft", JSON.stringify(form));
    } catch {
      /* ignore */
    }
  }, [form]);

  const completionRate = useMemo(() => {
    const total = requiredFields.length;
    const completed = requiredFields.filter((field) => {
      const v = form[field];
      return typeof v === "boolean" ? v : (v as string).trim().length > 0;
    }).length;
    return Math.round((completed / total) * 100);
  }, [form]);

  function buildSuccessMessage(channel: string | undefined) {
    if (!channel || channel === "protected") {
      return "Tu solicitud fue recibida correctamente.";
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
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      const fieldError = validateField(field, String(value));
      setErrors((current) => ({
        ...current,
        [field]: fieldError || undefined,
      }));
    }
  }

  function handleFieldFocus(field: keyof FormState) {
    if (!focusedFieldsRef.current.has(field)) {
      focusedFieldsRef.current.add(field);
      trackFormProgress({
        form: "contact_request",
        step: "field_focus",
        field,
        completionRate,
      });
    }
  }

  function handleFieldBlur(field: keyof FormState) {
    const fieldError = validateField(field, String(form[field]));
    setErrors((current) => ({ ...current, [field]: fieldError || undefined }));
    trackFormProgress({
      form: "contact_request",
      step: "field_blur",
      field,
      completionRate,
      valid: !fieldError,
    });
  }

  useEffect(() => {
    return () => {
      if (hasSubmittedRef.current) return;
      const hasProgress = Object.values(form).some((value) =>
        typeof value === "string" ? value.trim().length > 0 : value === true,
      );
      if (!hasProgress) return;

      trackFormProgress({
        form: "contact_request",
        step: "abandon",
        completionRate,
      });
    };
  }, [completionRate, form]);

  function handleNextStep() {
    const stepFields = STEP_REQUIRED[currentStep] ?? [];
    const nextErrors: FormErrors = {};
    for (const field of stepFields) {
      const fieldError = validateField(field, String(form[field]));
      if (fieldError) nextErrors[field] = fieldError;
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...nextErrors }));
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, 3));
    trackFormProgress({
      form: "contact_request",
      step: "step_" + String(currentStep) + "_complete",
      completionRate,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setError("");
    setServerMessage("");

    const nextErrors: FormErrors = {};
    for (const field of requiredFields) {
      const fieldError = validateField(
        field,
        field === "consentPrivacy" ? String(form[field]) : String(form[field]),
      );
      if (fieldError) {
        nextErrors[field] = fieldError;
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      trackFormProgress({
        form: "contact_request",
        step: "submit_blocked_validation",
        completionRate,
        valid: false,
      });
      setError("Revisa los campos marcados para continuar.");
      return;
    }

    trackFormProgress({
      form: "contact_request",
      step: "submit_attempt",
      completionRate,
      valid: true,
    });

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            consentPrivacy: true,
            utm: getStoredUTM() ?? undefined,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
          trackEvent("contact_submit_error", {
            reason: result.message || "api_error",
          });
          trackFormProgress({
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
        setServerMessage(buildSuccessMessage(result.channel));
        trackEvent("contact_submit_success", {
          channel: result.channel || "unknown",
          interest: form.interest,
        });
        trackFormProgress({
          form: "contact_request",
          step: "submit_success",
          completionRate: 100,
          valid: true,
        });
        setForm(initialState);
        setErrors({});
        setCurrentStep(1);
        try {
          localStorage.removeItem("nm-contact-draft");
        } catch {
          /* ignore */
        }
      } catch {
        trackEvent("contact_submit_error", { reason: "network_error" });
        trackFormProgress({
          form: "contact_request",
          step: "submit_network_error",
          completionRate,
          valid: false,
        });
        setError(
          "No se pudo conectar con el servidor. Intenta nuevamente en unos minutos.",
        );
      }
    });
  }

  const inputCls =
    "w-full rounded-xl border border-brand-lavender/20 bg-brand-void/60 px-4 py-2.5 text-sm text-[#f0f8ff] outline-none ring-brand-violet transition focus:ring-2";

  return (
    <div>
      {/* Stepper header */}
      <nav aria-label="Pasos del formulario" className="mb-6">
        {/* ARIA live: announce step change to screen readers */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          Paso {currentStep} de {STEPS.length}: {STEPS[currentStep - 1]?.label}
        </div>
        <ol className="flex items-center">
          {STEPS.map((step, i) => {
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
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-px flex-1 transition-colors ${currentStep > step.number ? "bg-brand-violet/50" : "bg-brand-lavender/15"}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <form onSubmit={handleSubmit} noValidate>
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

        {/* Step 1 — ¿Quién eres? */}
        {currentStep === 1 && (
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
                <span>Correo empresarial</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onFocus={() => handleFieldFocus("email")}
                  onBlur={() => handleFieldBlur("email")}
                  placeholder="nombre@empresa.com"
                  autoComplete="email"
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
            <label className="block space-y-2 text-sm font-medium text-text-muted">
              <span>Empresa</span>
              <input
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                onFocus={() => handleFieldFocus("company")}
                onBlur={() => handleFieldBlur("company")}
                placeholder="Nombre de empresa"
                autoComplete="organization"
                className={inputCls}
              />
            </label>
          </div>
        )}

        {/* Step 2 — ¿Qué necesitas? */}
        {currentStep === 2 && (
          <div className="space-y-4 reveal-slide-up">
            <label className="block space-y-2 text-sm font-medium text-text-muted">
              <span>Interés principal</span>
              <select
                value={form.interest}
                onChange={(e) => updateField("interest", e.target.value)}
                onFocus={() => handleFieldFocus("interest")}
                onBlur={() => handleFieldBlur("interest")}
                required
                aria-describedby={
                  errors.interest ? "contact-interest-error" : undefined
                }
                className={inputCls}
              >
                {allInterestOptions.map((option) => (
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
          </div>
        )}

        {/* Step 3 — Tu mensaje */}
        {currentStep === 3 && (
          <div className="space-y-4 reveal-slide-up">
            <label className="block space-y-2 text-sm font-medium text-text-muted">
              <span>Mensaje</span>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                onFocus={() => handleFieldFocus("message")}
                onBlur={() => handleFieldBlur("message")}
                placeholder="Cuéntanos sobre tu operación, volumen y objetivos."
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

            {/* Aviso de privacidad — obligatorio Ley 8968 Costa Rica */}
            <div className="rounded-xl border border-brand-lavender/15 bg-brand-card/40 px-4 py-3 text-xs text-text-muted leading-5">
              <p>
                <strong className="text-[#f0f8ff]">
                  Aviso de privacidad (Ley 8968 CR):
                </strong>{" "}
                Novamind Global S.A. tratará sus datos (nombre, correo, empresa,
                mensaje) con la finalidad de atender su solicitud comercial. Los
                campos marcados con * son obligatorios. Puede ejercer sus
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
          {currentStep < 3 ? (
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
      </form>
    </div>
  );
}
