/**
 * Novamind Global — Service Worker
 * Strategy: Cache-first for static assets, network-first for pages.
 * Serves /offline when a navigation fails.
 */

const CACHE_VERSION = 'nm-v1'
const STATIC_CACHE = `${CACHE_VERSION}-static`
const PAGE_CACHE   = `${CACHE_VERSION}-pages`

const STATIC_PRECACHE = [
  '/offline',
  '/manifest.webmanifest',
  '/img/novamind-brand.webp',
]

// ── Install ──────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(STATIC_PRECACHE).catch(() => {
        // Ignore individual failures so SW still installs
      })
    )
  )
  self.skipWaiting()
})

// ── Activate ─────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith('nm-') && k !== STATIC_CACHE && k !== PAGE_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

// ── Fetch ────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET, non-same-origin, API routes, and Next.js internals
  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/webpack-hmr') ||
    url.pathname.includes('__next')
  ) {
    return
  }

  // Static assets (images, fonts, css, js) — cache-first
  if (
    request.destination === 'image' ||
    request.destination === 'font' ||
    request.destination === 'style' ||
    (request.destination === 'script' && url.pathname.startsWith('/_next/static/'))
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          if (response.ok) {
            const responseToCache = response.clone()
            caches.open(STATIC_CACHE).then((c) => c.put(request, responseToCache))
          }
          return response
        })
      })
    )
    return
  }

  // HTML navigation — network-first, fall back to /offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseToCache = response.clone()
            caches.open(PAGE_CACHE).then((c) => c.put(request, responseToCache))
          }
          return response
        })
        .catch(() =>
          caches.match(request).then(
            (cached) => cached ?? caches.match('/offline')
          )
        )
    )
  }
})
