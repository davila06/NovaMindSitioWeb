import { businessProducts } from "@/data/products";
import { contactInterests } from "@/data/site";
import { novaAssistServiceBySlug, novaAssistServices } from "@/data/nova-assist";
import { businessServiceBySlug } from "@/data/nova-assist-business";
import { homeSupportPlans, itManagedPlans } from "@/data/service-plans";

export type LeadSegment = "home" | "business";

export type RequestKind =
  | "residential_service"
  | "business_support"
  | "business_opportunity"
  | "assessment"
  | "consulting_project"
  | "general_inquiry";

export type NovaAssistIntent = {
  schemaVersion: string;
  segment: LeadSegment;
  requestKind: RequestKind;
  serviceId: string;
  source: string;
  urgencyCategory?: "standard" | "soon" | "urgent";
  preferredDelivery?: "remote" | "onsite" | "unsure";
  companySizeRange?: string;
  hasInternalIT?: "yes" | "no" | "shared" | "unknown";
  technologyAreas?: string[];
  consentVersion?: string;
};

type IntentInput = {
  plan?: string;
  interest?: string;
  urgency?: "baja" | "media" | "alta" | "critica";
  requestPreference?: "remote" | "visit" | "unsure";
};

export const NOVA_ASSIST_INTENT_SCHEMA_VERSION = "1.0.0";
export const NOVA_ASSIST_PRIVACY_POLICY_VERSION = "2026-01";

const technologyAreasByService: Record<string, string[]> = {
  "visita-express": ["device_support"],
  "visita-premium": ["device_support"],
  gamer: ["gaming", "device_support"],
  senior: ["digital_accessibility", "device_support"],
  "smart-home": ["smart_home"],
  "plan-familia": ["home_it_support"],
  "total-home": ["home_it_support"],
  "it-ondemand": ["it_support"],
  business: ["it_support"],
  "business-pro": ["it_management"],
  "microsoft-365": ["microsoft_365"],
  "azure-cloud": ["cloud"],
  cybersecurity: ["cybersecurity"],
  "backup-continuity": ["backup_continuity"],
  "business-networks": ["networking"],
  "power-platform": ["power_platform"],
  "ai-copilot": ["ai"],
  "technology-projects": ["technology_projects"],
  "it-health-check": ["assessment"],
};

function classifyBusinessService(serviceId: string): RequestKind {
  if (["it-ondemand", "business", "business-pro"].includes(serviceId)) {
    return "business_support";
  }
  if (serviceId === "it-health-check") return "assessment";
  if (serviceId === "technology-projects") return "consulting_project";
  return "business_opportunity";
}

function identifyService(plan?: string, interest?: string) {
  const businessPrefix = "nova-assist-business-";
  if (plan?.startsWith(businessPrefix)) {
    const serviceId = plan.slice(businessPrefix.length);
    if (businessServiceBySlug[serviceId]) {
      return {
        segment: "business" as const,
        requestKind: classifyBusinessService(serviceId),
        serviceId,
        source: "nova_assist_business",
      };
    }
  }

  const novaPrefix = "nova-assist-";
  if (plan?.startsWith(novaPrefix)) {
    const serviceId = plan.slice(novaPrefix.length);
    if (novaAssistServiceBySlug[serviceId]) {
      const business = serviceId === "it-ondemand";
      return {
        segment: business ? "business" as const : "home" as const,
        requestKind: business ? "business_support" as const : "residential_service" as const,
        serviceId,
        source: business ? "nova_assist_business" : "nova_assist_home",
      };
    }
  }

  const legacyHomePlan = homeSupportPlans.find(
    (item) => item.ctaHref === `/contacto?plan=${plan}`,
  );
  if (legacyHomePlan) {
    const service = novaAssistServices.find((item) => item.name === legacyHomePlan.name);
    if (service) {
      return {
        segment: "home" as const,
        requestKind: "residential_service" as const,
        serviceId: service.slug,
        source: "nova_assist_home",
      };
    }
  }

  if (itManagedPlans.some((item) => item.ctaHref === `/contacto?plan=${plan}`)) {
    return {
      segment: "business" as const,
      requestKind: "business_support" as const,
      serviceId: "business",
      source: "contact_form",
    };
  }

  const product = businessProducts.find((item) => plan === `saas-${item.slug}`);
  if (product) {
    return {
      segment: "business" as const,
      requestKind: "business_opportunity" as const,
      serviceId: product.slug,
      source: "product_inquiry",
    };
  }

  if (plan === "novaclick-web" || plan === "novaclick-commerce") {
    return {
      segment: "business" as const,
      requestKind: "consulting_project" as const,
      serviceId: "web-commerce",
      source: "contact_form",
    };
  }
  if (plan === "cloud-security") {
    return {
      segment: "business" as const,
      requestKind: "business_opportunity" as const,
      serviceId: "cybersecurity",
      source: "contact_form",
    };
  }
  if (plan === "saas-implementation") {
    return {
      segment: "business" as const,
      requestKind: "consulting_project" as const,
      serviceId: "technology-projects",
      source: "contact_form",
    };
  }

  if (interest === contactInterests[1]) {
    return {
      segment: "home" as const,
      requestKind: "residential_service" as const,
      serviceId: "residential-support",
      source: "contact_form",
    };
  }
  if (interest === contactInterests[2]) {
    return {
      segment: "business" as const,
      requestKind: "business_support" as const,
      serviceId: "business",
      source: "contact_form",
    };
  }
  if (interest === contactInterests[3]) {
    return {
      segment: "business" as const,
      requestKind: "business_opportunity" as const,
      serviceId: "saas",
      source: "contact_form",
    };
  }
  if (interest === contactInterests[4]) {
    return {
      segment: "business" as const,
      requestKind: "consulting_project" as const,
      serviceId: "web-commerce",
      source: "contact_form",
    };
  }
  if (interest === contactInterests[5]) {
    return {
      segment: "business" as const,
      requestKind: "business_opportunity" as const,
      serviceId: "cloud-security",
      source: "contact_form",
    };
  }
  if (interest === contactInterests[6]) {
    return {
      segment: "business" as const,
      requestKind: "consulting_project" as const,
      serviceId: "technology-projects",
      source: "contact_form",
    };
  }
  const knownProduct = businessProducts.find((item) => item.name === interest);
  if (knownProduct) {
    return {
      segment: "business" as const,
      requestKind: "business_opportunity" as const,
      serviceId: knownProduct.slug,
      source: "product_inquiry",
    };
  }
  if (interest === contactInterests[0]) {
    return {
      segment: "business" as const,
      requestKind: "general_inquiry" as const,
      serviceId: "general-inquiry",
      source: "contact_form",
    };
  }

  return {
    segment: "business" as const,
    requestKind: "general_inquiry" as const,
    serviceId: "general-inquiry",
    source: "contact_form",
  };
}

export function createNovaAssistIntent(input: IntentInput): NovaAssistIntent {
  const classification = identifyService(input.plan, input.interest);
  const urgencyCategories: Record<
    NonNullable<IntentInput["urgency"]>,
    NonNullable<NovaAssistIntent["urgencyCategory"]>
  > = {
    baja: "standard",
    media: "soon",
    alta: "urgent",
    critica: "urgent",
  };
  const urgencyCategory = input.urgency
    ? urgencyCategories[input.urgency]
    : undefined;
  const preferredDelivery = input.requestPreference === "visit"
    ? "onsite"
    : input.requestPreference;
  const technologyAreas = technologyAreasByService[classification.serviceId];

  return {
    schemaVersion: NOVA_ASSIST_INTENT_SCHEMA_VERSION,
    ...classification,
    ...(urgencyCategory ? { urgencyCategory } : {}),
    ...(preferredDelivery ? { preferredDelivery } : {}),
    ...(technologyAreas ? { technologyAreas } : {}),
    consentVersion: NOVA_ASSIST_PRIVACY_POLICY_VERSION,
  };
}
