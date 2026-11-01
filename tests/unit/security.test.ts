import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { buildContentSecurityPolicy, checkRateLimit, getClientIp } from '@/lib/security'
import { POST as submitContact } from '@/app/api/contact/route'

describe('lib/security', () => {
  beforeEach(() => {
    globalThis.__novamindRateLimitStore = undefined
  })
  afterEach(() => vi.unstubAllEnvs())

  it('rechaza origen ajeno antes de procesar datos', async () => {
    const response = await submitContact(new Request('https://novamindglobalcr.com/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://attacker.example' }, body: '{}' }))
    expect(response.status).toBe(403)
  })

  it('limita el tamano de cuerpos JSON', async () => {
    const response = await submitContact(new Request('https://novamindglobalcr.com/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'x'.repeat(40000) }) }))
    expect(response.status).toBe(413)
  })

  it('devuelve 400 para JSON malformado', async () => {
    const response = await submitContact(new Request('https://novamindglobalcr.com/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' }))
    expect(response.status).toBe(400)
  })

  it('no usa limites locales en produccion sin binding', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('MONITORING_WEBHOOK_URL', undefined)
    const response = await submitContact(new Request('https://novamindglobalcr.com/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Audit', email: 'audit@example.com', interest: 'Consultoria', message: 'Mensaje de auditoria local.', consentPrivacy: true, website: 'honeypot' }) }))
    expect(response.status).toBe(503)
  })

  it('obtiene el client ip desde x-forwarded-for', () => {
    const request = new Request('https://novamindglobal.com', {
      headers: {
        'x-forwarded-for': '203.0.113.10, 198.51.100.4',
      },
    })

    expect(getClientIp(request)).toBe('203.0.113.10')
  })

  it('bloquea solicitudes cuando se supera el rate limit', () => {
    const first = checkRateLimit({ key: 'contact:203.0.113.10', limit: 2, windowMs: 30000 })
    const second = checkRateLimit({ key: 'contact:203.0.113.10', limit: 2, windowMs: 30000 })
    const third = checkRateLimit({ key: 'contact:203.0.113.10', limit: 2, windowMs: 30000 })

    expect(first.allowed).toBe(true)
    expect(second.allowed).toBe(true)
    expect(third.allowed).toBe(false)
    expect(third.retryAfterSeconds).toBeGreaterThan(0)
  })

  it('construye un CSP con directivas criticas', () => {
    const csp = buildContentSecurityPolicy()

    expect(csp).toContain("default-src 'self'")
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("object-src 'none'")
  })

  it('permite el beacon de Cloudflare solo en las directivas necesarias', () => {
    vi.stubEnv('NODE_ENV', 'production')
    const directives = buildContentSecurityPolicy().split('; ')
    const script = directives.find(value => value.startsWith('script-src '))
    const connect = directives.find(value => value.startsWith('connect-src '))

    expect(script?.split(' ')).toContain('https://static.cloudflareinsights.com')
    expect(connect?.split(' ')).toContain('https://cloudflareinsights.com')
    expect(script).not.toContain("'unsafe-eval'")
    expect(directives.some(value => value.includes('*'))).toBe(false)
    expect(directives.filter(value => value.includes('cloudflareinsights.com'))).toHaveLength(2)
  })
})
