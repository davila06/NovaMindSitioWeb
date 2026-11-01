import { getServerEnv } from "@/lib/env";
import { getPlatformBindings } from "#platform";

export type MailMessage = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  requestId: string;
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendMail(
  message: MailMessage,
): Promise<{ channel: string; deliveryId: string }> {
  const config = getServerEnv();
  const to = config.CONTACT_TO_EMAIL;
  const from = config.CONTACT_FROM_EMAIL;
  if (!to || !from) throw new Error("Email routing is not configured.");
  const platform = getPlatformBindings();
  if (
    platform.email &&
    (config.MAIL_PROVIDER === "auto" || config.MAIL_PROVIDER === "cloudflare")
  ) {
    const result = await platform.email.send({
      from: { email: from, name: "Novamind Global" },
      to: [{ email: to }],
      subject: message.subject,
      html: message.html,
      text: message.text,
      replyTo: message.replyTo,
    });
    if (!result.messageId)
      throw new Error("Native email provider returned no delivery identifier.");
    return { channel: "cloudflare", deliveryId: result.messageId };
  }

  if (
    config.RESEND_API_KEY &&
    (config.MAIL_PROVIDER === "auto" || config.MAIL_PROVIDER === "resend")
  ) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": message.requestId,
        },
        body: JSON.stringify({
          from,
          to,
          subject: message.subject,
          html: message.html,
          text: message.text,
          reply_to: message.replyTo,
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok)
        throw new Error(`Email provider returned ${response.status}.`);
      const result = (await response.json()) as { id?: string };
      if (!result.id)
        throw new Error("Email provider returned no delivery identifier.");
      return { channel: "resend", deliveryId: result.id };
    } catch {
      console.warn(
        JSON.stringify({
          event: "email_provider_failed",
          provider: "resend",
          requestId: message.requestId,
        }),
      );
    }
  }

  if (
    config.SMTP_HOST &&
    config.SMTP_USER &&
    config.SMTP_PASS &&
    (config.MAIL_PROVIDER === "auto" || config.MAIL_PROVIDER === "smtp")
  ) {
    try {
      const { default: nodemailer } = await import("nodemailer");
      const port = config.SMTP_PORT;
      const transport = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });
      const result = await transport.sendMail({
        from,
        to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        replyTo: message.replyTo,
      });
      if (!result.messageId || result.rejected?.length)
        throw new Error("SMTP did not accept the recipient.");
      return { channel: "smtp", deliveryId: result.messageId };
    } catch {
      console.warn(
        JSON.stringify({
          event: "email_provider_failed",
          provider: "smtp",
          requestId: message.requestId,
        }),
      );
    }
  }
  throw new Error("No email provider accepted the message.");
}
