import { beforeEach, describe, expect, it } from 'vitest'
import { buildContentSecurityPolicy, checkRateLimit, getClientIp } from '@/lib/security'

describe('lib/security', () => {
  beforeEach(() => {
    globalThis.__novamindRateLimitStore = undefined
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
})
