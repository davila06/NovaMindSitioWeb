type RateLimitEntry = {
  count: number
  resetAt: number
}

type SecurityHeaders = Array<{ key: string; value: string }>

type RateLimitOptions = {
  key: string
  limit: number
  windowMs: number
}

declare global {
  var __novamindRateLimitStore: Map<string, RateLimitEntry> | undefined
}

function getRateLimitStore() {
  if (!globalThis.__novamindRateLimitStore) {
    globalThis.__novamindRateLimitStore = new Map<string, RateLimitEntry>()
  }

  return globalThis.__novamindRateLimitStore
}

function pruneExpiredEntries(now: number) {
  const store = getRateLimitStore()

  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key)
    }
  }
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  const cfIp = request.headers.get('cf-connecting-ip')
  if (cfIp) {
    return cfIp.trim()
  }

  return 'unknown'
}

export function checkRateLimit({ key, limit, windowMs }: RateLimitOptions) {
  const now = Date.now()
  pruneExpiredEntries(now)

  const store = getRateLimitStore()
  const current = store.get(key)

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })

    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    }
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    }
  }

  current.count += 1
  store.set(key, current)

  return {
    allowed: true,
    remaining: Math.max(0, limit - current.count),
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  }
}

export function buildContentSecurityPolicy() {
  const isDev = process.env.NODE_ENV === 'development'
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    // 'unsafe-eval' is required by webpack HMR in development only
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://www.google-analytics.com https://www.clarity.ms https://i.ytimg.com https://img.youtube.com",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.clarity.ms https://www.googletagmanager.com",
    // Allow YouTube/Loom iframes for product video demos
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.loom.com https://player.vimeo.com",
    "media-src 'self' blob: https://www.youtube.com",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    'upgrade-insecure-requests',
  ].join('; ')
}

export function getSecurityHeaders(): SecurityHeaders {
  return [
    { key: 'Content-Security-Policy', value: buildContentSecurityPolicy() },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
    { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    // Prevent MIME sniffing for SW
    { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  ]
}
