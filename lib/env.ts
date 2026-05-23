import { z } from 'zod'

/**
 * Environment variable validation — validated at module import time.
 * Build will fail fast if required vars are missing or malformed.
 */
const envSchema = z.object({
  // Email transport (at least one must be set at runtime, but we allow optional at build time)
  RESEND_API_KEY: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),

  // Contact routing
  CONTACT_TO_EMAIL: z.string().email().optional(),
  CONTACT_FROM_EMAIL: z.string().email().optional(),

  // Rate limiting tunables
  CONTACT_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().optional(),
  CONTACT_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().optional(),

  // Site
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

function validateEnv() {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n')
    throw new Error(`Invalid environment variables:\n${issues}`)
  }

  return parsed.data
}

export const env = validateEnv()
