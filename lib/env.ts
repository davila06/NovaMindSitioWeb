import { z } from 'zod'

const optionalString = z.preprocess(value => value === '' ? undefined : value, z.string().optional())
const optionalEmail = z.preprocess(value => value === '' ? undefined : value, z.string().email().optional())

const envSchema = z.object({
  // Email transport (at least one must be set at runtime, but we allow optional at build time)
  RESEND_API_KEY: optionalString,
  SMTP_HOST: optionalString,
  SMTP_PORT: z.preprocess(value => value === '' ? undefined : value, z.coerce.number().int().min(1).max(65535).default(587)),
  SMTP_USER: optionalString,
  SMTP_PASS: optionalString,
  MAIL_PROVIDER: z.enum(['auto', 'resend', 'smtp', 'cloudflare']).default('auto'),

  // Contact routing
  CONTACT_TO_EMAIL: optionalEmail,
  CONTACT_FROM_EMAIL: optionalEmail,

  // Rate limiting tunables
  CONTACT_RATE_LIMIT_MAX_REQUESTS: z.preprocess(value => value === '' ? undefined : value, z.coerce.number().int().positive().default(5)),
  CONTACT_RATE_LIMIT_WINDOW_MS: z.preprocess(value => value === '' ? undefined : value, z.coerce.number().int().positive().default(600000)),

  // Site
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

export function getServerEnv() {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n')
    throw new Error(`Invalid environment variables:\n${issues}`)
  }

  return parsed.data
}
