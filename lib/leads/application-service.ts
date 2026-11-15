import type {
  LeadDestination,
  LeadSubmissionResult,
  SubmitLeadCommand,
} from "@/lib/leads/contract";

export class LeadSubmissionService {
  constructor(private readonly destination: LeadDestination) {}

  submit(command: SubmitLeadCommand): Promise<LeadSubmissionResult> {
    return this.destination.submit(command);
  }
}
