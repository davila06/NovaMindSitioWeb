import { NextResponse } from 'next/server'
import { captureServerError, parseMonitoringPayload } from '@/lib/monitoring'
import { enforceRateLimit, getClientIp } from '@/lib/security'
import { ApiRequestError, readJsonRequest } from '@/lib/http'

export async function POST(request: Request) {
  // Rate-limit: max 30 events per minute per IP
  const ip = getClientIp(request)
  try {
  const payload = await readJsonRequest(request, 16384)
  const rl = await enforceRateLimit({ key: `monitor:${ip}`, limit: 30, windowMs: 60_000 })
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, message: 'Demasiadas solicitudes.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rl.retryAfterSeconds) },
      },
    )
  }

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
  } catch (error) {
    if (error instanceof ApiRequestError) return NextResponse.json({ ok: false, message: error.message }, { status: error.status })
    return NextResponse.json(
      {
        ok: false,
        message: 'No se pudo procesar el evento de monitoreo.',
      },
      { status: 503 },
    )
  }
}
