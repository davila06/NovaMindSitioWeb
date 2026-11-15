import type { NovaAssistIntent } from "@/lib/nova-assist-intent";

// Domain contracts only; identifiers do not grant access and are not storage keys.
export type ServiceRequest = {
  id: string;
  intent: NovaAssistIntent;
  customerId: string;
  consentRecordId: string;
  receivedAt: string;
};

export type ServiceOrder = {
  id: string;
  requestId: string;
  customerId: string;
  modality: ServiceModality;
  locationId?: string;
  deviceIds: string[];
  technicianId?: string;
  checklistExecutionIds: string[];
  outcomeId?: string;
};

export type Customer = {
  id: string;
  displayName: string;
};

export type Location = {
  id: string;
  customerId: string;
  description: string;
};

export type Device = {
  id: string;
  customerId: string;
  description: string;
};

export type ServiceModality = {
  segment: NovaAssistIntent["segment"];
  serviceId: NovaAssistIntent["serviceId"];
};

export type ChecklistTemplate = {
  id: string;
  version: string;
  modality: ServiceModality;
  items: Array<{
    id: string;
    description: string;
  }>;
};

export type ChecklistExecution = {
  id: string;
  orderId: string;
  templateId: string;
  templateVersion: string;
  items: Array<{
    templateItemId: string;
    result: "completed" | "not_completed" | "not_applicable";
    note?: string;
  }>;
};

export type Finding = {
  id: string;
  orderId: string;
  description: string;
  deviceId?: string;
};

export type ActionPerformed = {
  id: string;
  orderId: string;
  description: string;
  deviceId?: string;
};

export type Recommendation = {
  id: string;
  orderId: string;
  description: string;
  deviceId?: string;
};

export type ServiceOutcome = {
  id: string;
  orderId: string;
  summary: string;
  findingIds: string[];
  actionPerformedIds: string[];
  recommendationIds: string[];
};

export type ServiceReport = {
  id: string;
  orderId: string;
  outcomeId: string;
  attachmentIds: string[];
  createdAt: string;
};

export type ConsentRecord = {
  id: string;
  customerId: string;
  policyVersion: string;
  acceptedAt: string;
};

export type AttachmentReference = {
  id: string;
  orderId: string;
  fileName: string;
  mediaType: string;
};

export type TechnicianReference = {
  id: string;
};
