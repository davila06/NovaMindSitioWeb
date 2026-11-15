import { ArrowUpRight, Boxes, ClipboardCheck, Workflow } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { differentiationPillars } from "@/data/site";

const icons = [Workflow, Boxes, ClipboardCheck, ArrowUpRight];

export function TrustBar() {
  return (
    <section
      aria-label="Capacidades y forma de trabajo"
      className="border-y border-white/10 bg-[#0b172a]"
    >
      <Container>
        <ul className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {differentiationPillars.map((pillar, index) => {
            const Icon = icons[index];
            return (
              <li
                key={pillar.title}
                className="flex min-h-[112px] items-start gap-3 border-b border-white/10 px-2 py-5 last:border-0 sm:px-5 sm:odd:border-r lg:border-b-0 lg:border-r lg:px-5 lg:last:border-r-0"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    {pillar.title}
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {pillar.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-end border-t border-white/10 py-3">
          <Link
            href="/servicios"
            className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-cyan-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            Conocer nuestros servicios
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
