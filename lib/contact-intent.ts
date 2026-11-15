import { homeSupportPlans, itManagedPlans } from "@/data/service-plans";
import { businessProducts } from "@/data/products";
import { contactInterests } from "@/data/site";
import { novaAssistServiceBySlug } from "@/data/nova-assist";
import { businessServiceBySlug } from "@/data/nova-assist-business";
import type { LeadMarketSegment } from "@/lib/leads/contract";

export function resolveContactIntent(plan?: string) {
  const businessSlug = plan?.startsWith("nova-assist-business-")
    ? plan.slice("nova-assist-business-".length)
    : undefined;
  const businessService = businessSlug ? businessServiceBySlug[businessSlug] : undefined;
  if (businessService) {
    return { plan: `nova-assist-business-${businessService.slug}`, interest: businessService.name };
  }
  const novaAssistSlug = plan?.replace(/^nova-assist-/, "");
  const novaAssistService = novaAssistSlug
    ? novaAssistServiceBySlug[novaAssistSlug]
    : undefined;
  if (novaAssistService) {
    const isBusiness = novaAssistService.slug === "it-ondemand";
    return {
      plan: `nova-assist-${novaAssistService.slug}`,
      interest: contactInterests[isBusiness ? 2 : 1],
    };
  }
  if (homeSupportPlans.some(item => item.ctaHref === `/contacto?plan=${plan}`)) return { plan: plan!, interest: contactInterests[1] };
  if (itManagedPlans.some(item => item.ctaHref === `/contacto?plan=${plan}`)) return { plan: plan!, interest: contactInterests[2] };
  const product = businessProducts.find(item => plan === `saas-${item.slug}`);
  if (product) return { plan: plan!, interest: product.name };
  if (plan === "novaclick-web" || plan === "novaclick-commerce") {
    return { plan, interest: contactInterests[4] };
  }
  if (plan === "cloud-security") return { plan, interest: contactInterests[5] };
  if (plan === "saas-implementation") return { plan, interest: contactInterests[6] };
  return { plan: "", interest: contactInterests[0] };
}

export function resolveContactMarketSegment(
  plan?: string,
): LeadMarketSegment | undefined {
  if (!plan) return undefined;
  if (plan.startsWith("nova-assist-business-")) {
    const slug = plan.slice("nova-assist-business-".length);
    return businessServiceBySlug[slug] ? "b2b" : undefined;
  }

  const novaAssistSlug = plan.replace(/^nova-assist-/, "");
  const novaAssistService = novaAssistServiceBySlug[novaAssistSlug];
  if (novaAssistService) {
    return novaAssistService.slug === "it-ondemand" ? "b2b" : "b2c";
  }
  if (homeSupportPlans.some((item) => item.ctaHref === `/contacto?plan=${plan}`)) {
    return "b2c";
  }
  if (itManagedPlans.some((item) => item.ctaHref === `/contacto?plan=${plan}`)) {
    return "b2b";
  }
  if (businessProducts.some((item) => plan === `saas-${item.slug}`)) {
    return "b2b";
  }
  if (
    plan === "novaclick-web" ||
    plan === "novaclick-commerce" ||
    plan === "cloud-security" ||
    plan === "saas-implementation"
  ) {
    return "b2b";
  }
  return undefined;
}