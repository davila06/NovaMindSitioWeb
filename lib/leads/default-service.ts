import { EmailLeadDestination } from "@/lib/leads/email-destination";
import { LeadSubmissionService } from "@/lib/leads/application-service";

export const leadSubmissionService = new LeadSubmissionService(
  new EmailLeadDestination(),
);
