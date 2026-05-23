import { NextResponse } from 'next/server'
import { captureServerError, parseMonitoringPayload } from '@/lib/monitoring'
import { checkRateLimit, getClientIp } from '@/lib/security'

export async function POST(request: Request) {
  // Rate-limit: max 30 events per minute per IP
  const ip = getClientIp(request)
  const rl = checkRateLimit({ key: `monitor:${ip}`, limit: 30, windowMs: 60_000 })
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, message: 'Demasiadas solicitudes.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rl.retryAfterSeconds) },
      },
    )
  }

  try {
    const payload = await request.json()
    const parsed = parseMonitoringPayload(payload)

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Payload de monitoreo invalido.',
          issues: parsed.error.flatten(),
        },
        { status: 400 },
      )
    }

    await captureServerError(parsed.data)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: 'No se pudo procesar el evento de monitoreo.',
      },
      { status: 500 },
    )
  }
}
