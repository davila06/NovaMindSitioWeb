import { NextResponse } from "next/server";

const START_TIME = Date.now();

export async function GET() {
  const uptimeMs = Date.now() - START_TIME;
  const uptimeSec = Math.floor(uptimeMs / 1000);

  /** Readiness checks — surfaces misconfiguration early */
  const checks = {
    email_delivery: !!(process.env.RESEND_API_KEY || (process.env.SMTP_HOST && process.env.SMTP_USER)),
    contact_routing: !!(process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL),
    monitoring_webhook: !!process.env.MONITORING_WEBHOOK_URL,
    environment_set: !!process.env.NODE_ENV,
  }
  const allHealthy = Object.values(checks).every(Boolean)

  return NextResponse.json(
    {
      status: allHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime_seconds: uptimeSec,
      version: process.env.NEXT_PUBLIC_APP_VERSION ?? "unknown",
      build_id: process.env.NEXT_PUBLIC_BUILD_ID ?? "local",
      environment: process.env.NODE_ENV ?? "unknown",
      region: process.env.VERCEL_REGION ?? process.env.FLY_REGION ?? "unknown",
      checks,
    },
    {
      status: allHealthy ? 200 : 206,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
