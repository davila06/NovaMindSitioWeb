import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Gamepad2,
  HeartHandshake,
  House,
  Home,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";
import type { NovaAssistService } from "@/data/nova-assist";

const icons = {
  wrench: Wrench,
  sparkles: Sparkles,
  gamepad: Gamepad2,
  heart: HeartHandshake,
  home: Home,
  users: UsersRound,
  house: House,
  briefcase: BriefcaseBusiness,
};

export function ServiceCard({ service }: { service: NovaAssistService }) {
  const Icon = icons[service.icon];

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#0b1730]/80 p-6 transition hover:-translate-y-1 hover:border-orange-300/40 hover:bg-[#102242]">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-300/10 text-orange-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-text-subtle">
          {service.category}
        </span>
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold text-[#f0f8ff]">
        {service.name}
      </h3>
      <p className="mt-2 text-sm leading-6 text-text-muted">{service.tagline}</p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {service.cardFeatures.map((feature) => (
          <li key={feature} className="flex gap-2 text-sm text-text-muted">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-text-subtle">
        {service.duration}
      </p>
      <Link
        href={`/nova-assist/${service.slug}`}
        className="mt-5 inline-flex min-h-11 items-center justify-between rounded-xl border border-orange-300/25 px-4 py-3 text-sm font-semibold text-orange-100 transition hover:bg-orange-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
      >
        Ver {service.name}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
