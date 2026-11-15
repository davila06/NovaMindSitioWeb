import { escapeHtml, sendMail } from "@/lib/email";
import {
  type LeadDestination,
  type LeadSubmissionResult,
  type SubmitLeadCommand,
} from "@/lib/leads/contract";
import { NOVA_ASSIST_INTENT_SCHEMA_VERSION } from "@/lib/nova-assist-intent";
import type { MailMessage } from "@/lib/email";

type MailSender = (message: MailMessage) => Promise<LeadSubmissionResult>;

function buildEmailHtml(command: SubmitLeadCommand) {
  const { contact, consent, intent } = command;
  const safeName = escapeHtml(contact.name);
  const safeEmail = escapeHtml(contact.email);
  const safeCompany = escapeHtml(contact.company || "No indicada");
  const safeInterest = escapeHtml(contact.interest);
  const safeCustomerStatus = escapeHtml(
    contact.customerStatus === "existing"
      ? "Cliente actual"
      : contact.customerStatus === "new"
        ? "Cliente nuevo"
        : "No indicado",
  );
  const safeDeviceType = escapeHtml(contact.deviceType || "No indicado");
  const safeRequestPreference = escapeHtml(
    contact.requestPreference === "remote"
      ? "Remoto"
      : contact.requestPreference === "visit"
        ? "Visita"
        : contact.requestPreference === "unsure"
          ? "Por definir"
          : "No indicada",
  );
  const safeServiceArea = escapeHtml(contact.serviceArea || "No indicada");
  const safeLeadVolume = escapeHtml(contact.leadVolume || "No indicado");
  const safeUrgency = escapeHtml(contact.urgency || "No indicada");
  const safeHorizon = escapeHtml(
    contact.implementationHorizon || "No indicado",
  );
  const safeMessage = escapeHtml(contact.message).replace(/\n/g, "<br />");
  const safeIntent = escapeHtml(JSON.stringify(intent, null, 2));
  const attribution = contact.attribution;

  const attributionBlock =
    attribution &&
    (attribution.source || attribution.medium || attribution.campaign)
      ? `
    <hr/>
    <h3>Atribución de Marketing</h3>
    <p><strong>Fuente:</strong> ${escapeHtml(attribution.source || "—")}</p>
    <p><strong>Medio:</strong> ${escapeHtml(attribution.medium || "—")}</p>
    <p><strong>Campaña:</strong> ${escapeHtml(attribution.campaign || "—")}</p>
    ${attribution.referrer ? `<p><strong>Referrer:</strong> ${escapeHtml(attribution.referrer)}</p>` : ""}
    ${attribution.landingPage ? `<p><strong>Landing page:</strong> ${escapeHtml(attribution.landingPage)}</p>` : ""}
    `
      : "";

  return `
    <h2>Nueva solicitud desde Novamind Global</h2>
    <p><strong>Nombre:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Empresa:</strong> ${safeCompany}</p>
    <p><strong>Interes:</strong> ${safeInterest}</p>
    <p><strong>Plan:</strong> ${escapeHtml(contact.plan || "No indicado")}</p>
    ${contact.customerStatus ? `<p><strong>Cliente:</strong> ${safeCustomerStatus}</p>` : ""}
    ${contact.deviceType ? `<p><strong>Dispositivo:</strong> ${safeDeviceType}</p>` : ""}
    ${contact.requestPreference ? `<p><strong>Preferencia de atención:</strong> ${safeRequestPreference}</p>` : ""}
    ${contact.serviceArea ? `<p><strong>Zona o localidad:</strong> ${safeServiceArea}</p>` : ""}
    <p><strong>Volumen operativo:</strong> ${safeLeadVolume}</p>
    <p><strong>Urgencia:</strong> ${safeUrgency}</p>
    <p><strong>Horizonte de implementacion:</strong> ${safeHorizon}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${safeMessage}</p>
    <hr/>
    <h3>Consentimiento (Ley 8968 CR)</h3>
    <p><strong>Consentimiento explícito:</strong> Sí — versión política ${escapeHtml(consent.policyVersion)}</p>
    <p><strong>Timestamp ISO:</strong> ${escapeHtml(consent.recordedAt)}</p>
    <hr/>
    <h3>Clasificación interna (${NOVA_ASSIST_INTENT_SCHEMA_VERSION})</h3>
    <pre>${safeIntent}</pre>
    ${attributionBlock}
  `;
}

function buildEmailText(command: SubmitLeadCommand) {
  const { contact, intent } = command;
  return `Nombre: ${contact.name}\nEmail: ${contact.email}\nEmpresa: ${contact.company || "No indicada"}\nInteres: ${contact.interest}\nCliente: ${contact.customerStatus || "No indicado"}\nDispositivo: ${contact.deviceType || "No indicado"}\nPreferencia de atención: ${contact.requestPreference || "No indicada"}\nZona o localidad: ${contact.serviceArea || "No indicada"}\nMensaje: ${contact.message}\n\nClasificación interna (${NOVA_ASSIST_INTENT_SCHEMA_VERSION}): ${JSON.stringify(intent)}`;
}

export class EmailLeadDestination implements LeadDestination {
  constructor(private readonly mailSender: MailSender = sendMail) {}

  submit(command: SubmitLeadCommand): Promise<LeadSubmissionResult> {
    return this.mailSender({
      subject: `[Novamind] Nuevo lead: ${command.contact.interest}`,
      html: buildEmailHtml(command),
      text: buildEmailText(command),
      replyTo: command.contact.email,
      requestId: command.requestId,
    });
  }
}
