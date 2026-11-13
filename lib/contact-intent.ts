import { homeSupportPlans, itManagedPlans } from "@/data/service-plans";
import { businessProducts } from "@/data/products";
import { contactInterests } from "@/data/site";
import { novaAssistServiceBySlug } from "@/data/nova-assist";

export function resolveContactIntent(plan?: string) {
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