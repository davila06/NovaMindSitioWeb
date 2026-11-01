import { NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { getPlatformBindings } from "@/lib/platform";

export async function GET(request: Request) {
  const headers = { "Cache-Control": "no-store, max-age=0" };
  if (new URL(request.url).searchParams.get("check") !== "ready") return NextResponse.json({ status: "ok" }, { headers });
  try {
    const config = getServerEnv();
    const platform = getPlatformBindings();
    const checks = {
      email_delivery: Boolean(platform.email || config.RESEND_API_KEY || (config.SMTP_HOST && config.SMTP_USER && config.SMTP_PASS)),
      contact_routing: Boolean(config.CONTACT_TO_EMAIL && config.CONTACT_FROM_EMAIL),
      rate_limiting: config.NODE_ENV !== "production" || Boolean(platform.rateLimiters?.contact && platform.rateLimiters?.newsletter && platform.rateLimiters?.monitor),
    };
    const ready = Object.values(checks).every(Boolean);
    return NextResponse.json({ status: ready ? "ready" : "not-ready", checks }, { status: ready ? 200 : 503, headers });
  } catch {
    return NextResponse.json({ status: "not-ready", reason: "configuration_invalid" }, { status: 503, headers });
  }
}
