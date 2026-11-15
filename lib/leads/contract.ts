import type { NovaAssistIntent } from "@/lib/nova-assist-intent";

export const LEAD_SUBMISSION_SCHEMA_VERSION = "1.1.0" as const;

export type LeadMarketSegment = "b2c" | "b2b";
export type PreferredContactMethod = "email" | "phone" | "whatsapp";

export type LeadContactDetails = {
  marketSegment: LeadMarketSegment;
  preferredContactMethod: PreferredContactMethod;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  plan?: string;
  interest: string;
  customerStatus?: "new" | "existing";
  deviceType?: string;
  requestPreference?: "remote" | "visit" | "unsure";
  serviceArea?: string;
  leadVolume?: "<100" | "100-500" | "500-2000" | "2000+";
  urgency?: "baja" | "media" | "alta" | "critica";
  implementationHorizon?: "0-30" | "31-90" | "91-180" | "180+";
  message: string;
  attribution?: {
    source?: string;
    medium?: string;
    campaign?: string;
    referrer?: string;
    landingPage?: string;
  };
};

export type SubmitLeadCommand = {
  schemaVersion: typeof LEAD_SUBMISSION_SCHEMA_VERSION;
  requestId: string;
  intent: NovaAssistIntent;
  contact: LeadContactDetails;
  consent: {
    privacyAccepted: true;
    policyVersion: string;
    recordedAt: string;
  };
};

export type LeadSubmissionResult = {
  channel: string;
  deliveryId: string;
};

export interface LeadDestination {
  submit(command: SubmitLeadCommand): Promise<LeadSubmissionResult>;
}
