import { NextResponse } from 'next/server'
import { captureServerError, parseMonitoringPayload } from '@/lib/monitoring'

export async function POST(request: Request) {
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
