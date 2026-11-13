import { novaAssistServices } from "@/data/nova-assist";

export type CoverageZone = {
  name: string;
  surcharge: number;
  label: string;
  examples: string[];
};

// Coverage and any related fee remain unpublished until the service areas are confirmed.
export const coverageZones: CoverageZone[] = [];

const legacyHomePlanRoutes = [
  { slug: "express", service: "visita-express", route: "clickfix-express" },
  { slug: "premium", service: "visita-premium", route: "clickfix-premium" },
  { slug: "familiar", service: "plan-familia", route: "clickfix-familiar" },
  { slug: "gamer", service: "gamer", route: "clickfix-gamer" },
  { slug: "senior", service: "senior", route: "clickfix-senior" },
  { slug: "smarthome", service: "smart-home", route: "clickfix-smarthome" },
  { slug: "total", service: "total-home", route: "clickfix-total" },
] as const;

const legacyBusinessPlanRoutes = [
  { slug: "basico", name: "Básico", route: "iton-basico" },
  { slug: "avanzado", name: "Avanzado", route: "iton-avanzado" },
  { slug: "total-empresarial", name: "Total", route: "iton-total" },
  { slug: "startup", name: "Startup", route: "iton-startup" },
  { slug: "compliance", name: "Compliance", route: "iton-compliance" },
  { slug: "cloudfirst", name: "CloudFirst", route: "iton-cloudfirst" },
  { slug: "enterprise", name: "Enterprise", route: "iton-enterprise" },
] as const;

// Backward-compatible contact URLs only. Scope, limits and exclusions live in data/nova-assist.ts.
export const homeSupportPlans = legacyHomePlanRoutes.map((legacy) => {
  const service = novaAssistServices.find(
    (item) => item.slug === legacy.service,
  );
  if (!service) throw new Error(`Unknown Nova Assist service: ${legacy.service}`);
  return {
    slug: legacy.slug,
    name: service.name,
    cta: `Solicitar ${service.name}`,
    ctaHref: `/contacto?plan=${legacy.route}`,
  };
});

// Keep existing business inquiry links working without publishing draft prices or SLAs.
export const itManagedPlans = legacyBusinessPlanRoutes.map((legacy) => ({
  slug: legacy.slug,
  name: legacy.name,
  cta: `Consultar ${legacy.name}`,
  ctaHref: `/contacto?plan=${legacy.route}`,
}));

export const homeSupportConditions = {
  coverageMessage: "Consulta disponibilidad en tu zona.",
  paymentMethods: [] as string[],
  commercialConditionsMessage:
    "Alcance, costos y condiciones se confirman antes de coordinar.",
  privacy: "Consulta la política de privacidad de Nova Assist.",
};

export const homeSupportBySlug = Object.fromEntries(
  homeSupportPlans.map((plan) => [plan.slug, plan]),
);

export const itManagedBySlug = Object.fromEntries(
  itManagedPlans.map((plan) => [plan.slug, plan]),
);
