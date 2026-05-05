import { z } from 'zod'

const alertSeverities = ['info', 'warning', 'error', 'critical'] as const
const webhookFormats = ['generic', 'slack', 'teams'] as const

const severitySchema = z.enum(alertSeverities)
const webhookFormatSchema = z.enum(webhookFormats)

const monitoringPayloadSchema = z.object({
  source: z.string().min(2).max(80),
  message: z.string().min(1).max(4000),
  severity: severitySchema.optional(),
  stack: z.string().max(12000).optional(),
  route: z.string().max(500).optional(),
  requestId: z.string().max(120).optional(),
  context: z.record(z.string(), z.unknown()).optional(),
})

export type MonitoringPayload = z.infer<typeof monitoringPayloadSchema>

export function parseMonitoringPayload(payload: unknown) {
  return monitoringPayloadSchema.safeParse(payload)
}

function buildLogRecord(payload: MonitoringPayload) {
  return {
    timestamp: new Date().toISOString(),
    service: process.env.MONITORING_ALERT_SERVICE || 'novamind-web',
    severity: payload.severity || 'error',
    ...payload,
  }
}

function getSeverityRank(severity: (typeof alertSeverities)[number]) {
  const order = {
    info: 0,
    warning: 1,
    error: 2,
    critical: 3,
  } as const

  return order[severity]
}

function getMinAlertSeverity() {
  const parsed = severitySchema.safeParse(process.env.MONITORING_ALERT_MIN_SEVERITY)
  return parsed.success ? parsed.data : 'error'
}

function getWebhookFormat() {
  const parsed = webhookFormatSchema.safeParse(process.env.MONITORING_WEBHOOK_FORMAT)
  return parsed.success ? parsed.data : 'generic'
}

function shouldSendAlert(record: ReturnType<typeof buildLogRecord>) {
  return getSeverityRank(record.severity) >= getSeverityRank(getMinAlertSeverity())
}

function getSeverityColor(severity: (typeof alertSeverities)[number]) {
  if (severity === 'critical') return '#B91C1C'
  if (severity === 'error') return '#DC2626'
  if (severity === 'warning') return '#F59E0B'
  return '#0284C7'
}

function buildWebhookBody(record: ReturnType<typeof buildLogRecord>) {
  const format = getWebhookFormat()

  if (format === 'slack') {
    const title = `${record.severity.toUpperCase()} · ${record.service}`
    const requestId = record.requestId || 'n/a'
    const route = record.route || 'n/a'

    return {
      text: `${title} :: ${record.source}`,
      attachments: [
        {
          color: getSeverityColor(record.severity),
          title,
          text: record.message,
          fields: [
            { title: 'Source', value: record.source, short: true },
            { title: 'Route', value: route, short: true },
            { title: 'Request ID', value: requestId, short: true },
            { title: 'Timestamp', value: record.timestamp, short: true },
          ],
        },
      ],
    }
  }

  if (format === 'teams') {
    return {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: `[${record.severity.toUpperCase()}] ${record.source}`,
      themeColor: getSeverityColor(record.severity).replace('#', ''),
      title: `${record.service} · ${record.severity.toUpperCase()}`,
      text: record.message,
      sections: [
        {
          facts: [
            { name: 'Source', value: record.source },
            { name: 'Route', value: record.route || 'n/a' },
            { name: 'Request ID', value: record.requestId || 'n/a' },
            { name: 'Timestamp', value: record.timestamp },
          ],
        },
      ],
    }
  }

  return record
}

async function dispatchWebhook(record: ReturnType<typeof buildLogRecord>) {
  const webhookUrl = process.env.MONITORING_WEBHOOK_URL
  if (!webhookUrl || !shouldSendAlert(record)) return

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildWebhookBody(record)),
    })
  } catch (error) {
    console.error('[monitoring:webhook_failed]', {
      error: error instanceof Error ? error.message : 'unknown_error',
      source: record.source,
      requestId: record.requestId,
    })
  }
}

export async function captureServerError(payload: MonitoringPayload) {
  const record = buildLogRecord(payload)
  console.error('[app_error]', record)
  await dispatchWebhook(record)
}
