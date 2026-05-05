'use client'

import { products } from '@/data/products'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { Toast } from '@/components/shared/ui/Toast'
import { trackEvent, trackFormProgress } from '@/lib/analytics-client'

const productInterestOptions = products.map((product) => product.name)

type FormState = {
  name: string
  email: string
  company: string
  interest: string
  leadVolume: string
  urgency: string
  implementationHorizon: string
  website: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  interest: productInterestOptions[0] || '',
  leadVolume: '',
  urgency: '',
  implementationHorizon: '',
  website: '',
  message: '',
}

const requiredFields: Array<keyof FormState> = ['name', 'email', 'interest', 'message']

function validateField(field: keyof FormState, value: string): string {
  if (field === 'name') {
    return value.trim().length >= 2 ? '' : 'Ingresa un nombre valido (minimo 2 caracteres).'
  }
  if (field === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(value.trim()) ? '' : 'Ingresa un correo empresarial valido.'
  }
  if (field === 'interest') {
    return value.trim().length >= 2 ? '' : 'Selecciona un interes principal.'
  }
  if (field === 'message') {
    return value.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.'
  }

  return ''
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [serverMessage, setServerMessage] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const focusedFieldsRef = useRef<Set<keyof FormState>>(new Set())
  const hasSubmittedRef = useRef(false)
  const errorSummaryId = 'contact-form-error-summary'

  const completionRate = useMemo(() => {
    const total = requiredFields.length
    const completed = requiredFields.filter((field) => form[field].trim().length > 0).length
    return Math.round((completed / total) * 100)
  }, [form])

  function buildSuccessMessage(channel: string | undefined) {
    if (!channel || channel === 'protected') {
      return 'Tu solicitud fue recibida correctamente.'
    }

    if (channel === 'resend' || channel === 'smtp') {
      return `Solicitud enviada por ${channel}.`
    }

    return 'Tu solicitud fue enviada correctamente.'
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      const fieldError = validateField(field, String(value))
      setErrors((current) => ({ ...current, [field]: fieldError || undefined }))
    }
  }

  function handleFieldFocus(field: keyof FormState) {
    if (!focusedFieldsRef.current.has(field)) {
      focusedFieldsRef.current.add(field)
      trackFormProgress({
        form: 'contact_request',
        step: 'field_focus',
        field,
        completionRate,
      })
    }
  }

  function handleFieldBlur(field: keyof FormState) {
    const fieldError = validateField(field, form[field])
    setErrors((current) => ({ ...current, [field]: fieldError || undefined }))
    trackFormProgress({
      form: 'contact_request',
      step: 'field_blur',
      field,
      completionRate,
      valid: !fieldError,
    })
  }

  useEffect(() => {
    return () => {
      if (hasSubmittedRef.current) return
      const hasProgress = Object.values(form).some((value) => value.trim().length > 0)
      if (!hasProgress) return

      trackFormProgress({
        form: 'contact_request',
        step: 'abandon',
        completionRate,
      })
    }
  }, [completionRate, form])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(false)
    setError('')
    setServerMessage('')

    const nextErrors: FormErrors = {}
    for (const field of requiredFields) {
      const fieldError = validateField(field, form[field])
      if (fieldError) {
        nextErrors[field] = fieldError
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      trackFormProgress({
        form: 'contact_request',
        step: 'submit_blocked_validation',
        completionRate,
        valid: false,
      })
      setError('Revisa los campos marcados para continuar.')
      return
    }

    trackFormProgress({
      form: 'contact_request',
      step: 'submit_attempt',
      completionRate,
      valid: true,
    })

    startTransition(async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })

        const result = await response.json()

        if (!response.ok || !result.ok) {
          trackEvent('contact_submit_error', { reason: result.message || 'api_error' })
          trackFormProgress({
            form: 'contact_request',
            step: 'submit_error',
            completionRate,
            valid: false,
          })
          setError(result.message || 'No se pudo enviar la solicitud. Intenta nuevamente.')
          return
        }

        hasSubmittedRef.current = true
        setSubmitted(true)
        setServerMessage(buildSuccessMessage(result.channel))
        trackEvent('contact_submit_success', { channel: result.channel || 'unknown', interest: form.interest })
        trackFormProgress({
          form: 'contact_request',
          step: 'submit_success',
          completionRate: 100,
          valid: true,
        })
        setForm(initialState)
        setErrors({})
      } catch {
        trackEvent('contact_submit_error', { reason: 'network_error' })
        trackFormProgress({
          form: 'contact_request',
          step: 'submit_network_error',
          completionRate,
          valid: false,
        })
        setError('No se pudo conectar con el servidor. Intenta nuevamente en unos minutos.')
      }
    })
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => updateField('website', event.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm font-medium text-slate-200">
          <span>Nombre</span>
          <input
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            onFocus={() => handleFieldFocus('name')}
            onBlur={() => handleFieldBlur('name')}
            placeholder="Tu nombre"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className="w-full rounded-xl border border-brand-interactive/22 bg-slate-950/72 px-4 py-2.5 text-sm text-slate-100 outline-none ring-brand-interactive transition focus:ring-2"
          />
          {errors.name && <span id="contact-name-error" className="text-xs text-rose-300">{errors.name}</span>}
        </label>
        <label className="block space-y-2 text-sm font-medium text-slate-200">
          <span>Correo empresarial</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            onFocus={() => handleFieldFocus('email')}
            onBlur={() => handleFieldBlur('email')}
            placeholder="nombre@empresa.com"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className="w-full rounded-xl border border-brand-interactive/22 bg-slate-950/72 px-4 py-2.5 text-sm text-slate-100 outline-none ring-brand-interactive transition focus:ring-2"
          />
          {errors.email && <span id="contact-email-error" className="text-xs text-rose-300">{errors.email}</span>}
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm font-medium text-slate-200">
          <span>Empresa</span>
          <input
            value={form.company}
            onChange={(event) => updateField('company', event.target.value)}
            onFocus={() => handleFieldFocus('company')}
            onBlur={() => handleFieldBlur('company')}
            placeholder="Nombre de empresa"
            autoComplete="organization"
            className="w-full rounded-xl border border-brand-interactive/22 bg-slate-950/72 px-4 py-2.5 text-sm text-slate-100 outline-none ring-brand-interactive transition focus:ring-2"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium text-slate-200">
          <span>Interes principal</span>
          <select
            value={form.interest}
            onChange={(event) => updateField('interest', event.target.value)}
            onFocus={() => handleFieldFocus('interest')}
            onBlur={() => handleFieldBlur('interest')}
            required
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={errors.interest ? 'contact-interest-error' : undefined}
            className="w-full rounded-xl border border-brand-interactive/22 bg-slate-950/72 px-4 py-2.5 text-sm text-slate-100 outline-none ring-brand-interactive transition focus:ring-2"
          >
            {productInterestOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {errors.interest && <span id="contact-interest-error" className="text-xs text-rose-300">{errors.interest}</span>}
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block space-y-2 text-sm font-medium text-slate-200">
          <span>Volumen estimado</span>
          <select
            value={form.leadVolume}
            onChange={(event) => updateField('leadVolume', event.target.value)}
            onFocus={() => handleFieldFocus('leadVolume')}
            onBlur={() => handleFieldBlur('leadVolume')}
            className="w-full rounded-xl border border-brand-interactive/22 bg-slate-950/72 px-4 py-2.5 text-sm text-slate-100 outline-none ring-brand-interactive transition focus:ring-2"
          >
            <option value="">Seleccionar</option>
            <option value="<100">Menos de 100</option>
            <option value="100-500">100 a 500</option>
            <option value="500-2000">500 a 2000</option>
            <option value="2000+">Mas de 2000</option>
          </select>
        </label>
        <label className="block space-y-2 text-sm font-medium text-slate-200">
          <span>Urgencia</span>
          <select
            value={form.urgency}
            onChange={(event) => updateField('urgency', event.target.value)}
            onFocus={() => handleFieldFocus('urgency')}
            onBlur={() => handleFieldBlur('urgency')}
            className="w-full rounded-xl border border-brand-interactive/22 bg-slate-950/72 px-4 py-2.5 text-sm text-slate-100 outline-none ring-brand-interactive transition focus:ring-2"
          >
            <option value="">Seleccionar</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Critica</option>
          </select>
        </label>
        <label className="block space-y-2 text-sm font-medium text-slate-200">
          <span>Horizonte</span>
          <select
            value={form.implementationHorizon}
            onChange={(event) => updateField('implementationHorizon', event.target.value)}
            onFocus={() => handleFieldFocus('implementationHorizon')}
            onBlur={() => handleFieldBlur('implementationHorizon')}
            className="w-full rounded-xl border border-brand-interactive/22 bg-slate-950/72 px-4 py-2.5 text-sm text-slate-100 outline-none ring-brand-interactive transition focus:ring-2"
          >
            <option value="">Seleccionar</option>
            <option value="0-30">0 a 30 dias</option>
            <option value="31-90">31 a 90 dias</option>
            <option value="91-180">91 a 180 dias</option>
            <option value="180+">Mas de 180 dias</option>
          </select>
        </label>
      </div>
      <label className="block space-y-2 text-sm font-medium text-slate-200">
        <span>Mensaje</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          onFocus={() => handleFieldFocus('message')}
          onBlur={() => handleFieldBlur('message')}
          placeholder="Cuéntanos sobre tu operación, volumen y objetivos."
          autoComplete="off"
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className="w-full rounded-xl border border-brand-interactive/22 bg-slate-950/72 px-4 py-2.5 text-sm text-slate-100 outline-none ring-brand-interactive transition focus:ring-2"
        />
        {errors.message && <span id="contact-message-error" className="text-xs text-rose-300">{errors.message}</span>}
      </label>
      {error && (
        <>
          <div id={errorSummaryId} role="alert" aria-live="assertive" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
          <Toast title="Falta informacion" message={error} variant="error" />
        </>
      )}
      {submitted && <Toast title="Solicitud recibida" message={serverMessage || 'Tu mensaje fue enviado correctamente.'} variant="success" />}
      <div className="rounded-xl border border-brand-interactive/18 bg-slate-950/72 px-4 py-3 text-xs text-slate-300" aria-live="polite">
        Progreso del formulario: {completionRate}%
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-2xl bg-brand-cta px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? 'Enviando...' : 'Enviar solicitud'}
        </button>
        <span className="text-xs text-slate-400">Respuesta objetivo: menos de 24 horas hábiles.</span>
      </div>
    </form>
  )
}
