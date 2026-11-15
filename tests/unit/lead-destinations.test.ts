import { describe, expect, it, vi } from "vitest";
import { LeadSubmissionService } from "@/lib/leads/application-service";
import { EmailLeadDestination } from "@/lib/leads/email-destination";
import {
  LEAD_SUBMISSION_SCHEMA_VERSION,
  type SubmitLeadCommand,
} from "@/lib/leads/contract";

const command: SubmitLeadCommand = {
  schemaVersion: LEAD_SUBMISSION_SCHEMA_VERSION,
  requestId: "request-123",
  intent: {
    schemaVersion: "1.0.0",
    segment: "business",
    requestKind: "assessment",
    serviceId: "it-health-check",
    source: "nova_assist_business",
    consentVersion: "2026-01",
  },
  contact: {
    name: "<Customer>",
    email: "customer@example.com",
    interest: "IT Health Check",
    message: "<script>alert(1)</script>",
  },
  consent: {
    privacyAccepted: true,
    policyVersion: "2026-01",
    recordedAt: "2026-11-14T20:00:00.000Z",
  },
};

describe("lead submission destinations", () => {
  it("delegates the normalized command and returns the destination result", async () => {
    const result = { channel: "dataverse", deliveryId: "record-123" };
    const destination = { submit: vi.fn().mockResolvedValue(result) };
    const service = new LeadSubmissionService(destination);

    await expect(service.submit(command)).resolves.toEqual(result);
    expect(destination.submit).toHaveBeenCalledOnce();
    expect(destination.submit).toHaveBeenCalledWith(command);
  });

  it("propagates destination failures instead of reporting success", async () => {
    const destination = {
      submit: vi.fn().mockRejectedValue(new Error("destination unavailable")),
    };
    const service = new LeadSubmissionService(destination);

    await expect(service.submit(command)).rejects.toThrow(
      "destination unavailable",
    );
  });

  it("adapts the command to the existing email delivery without forwarding request secrets", async () => {
    const send = vi.fn().mockResolvedValue({
      channel: "resend",
      deliveryId: "email-123",
    });
    const destination = new EmailLeadDestination(send);

    await expect(destination.submit(command)).resolves.toEqual({
      channel: "resend",
      deliveryId: "email-123",
    });
    expect(send).toHaveBeenCalledOnce();
    const email = send.mock.calls[0][0];
    expect(email.requestId).toBe(command.requestId);
    expect(email.replyTo).toBe(command.contact.email);
    expect(email.html).toContain("&lt;Customer&gt;");
    expect(email.html).not.toContain("<script>");
    expect(email.text).toContain("Clasificación interna (1.0.0)");
    expect(email).not.toHaveProperty("turnstileToken");
    expect(email).not.toHaveProperty("clientIp");
  });
});
