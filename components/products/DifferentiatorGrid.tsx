import { Card } from "@/components/shared/ui/Card";

export function DifferentiatorGrid({ items }: { items: string[] }) {
  return (
    <section>
      <h2 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">
        Lo que hace diferente a esta solución
      </h2>
      {/* Floating feature cubes — each card is a 3D slab with a glowing top face */}
      <div className="mt-5 grid gap-4 md:grid-cols-3 [perspective:900px]">
        {items.map((item, i) => {
          // Alternate tilt direction for visual rhythm
          const tilt =
            i % 3 === 0
              ? "hover:[transform:rotateX(-4deg)_rotateY(5deg)_translateZ(10px)]"
              : i % 3 === 1
                ? "hover:[transform:rotateX(-3deg)_rotateY(-4deg)_translateZ(10px)]"
                : "hover:[transform:rotateX(-4deg)_translateZ(10px)]";
          return (
            <div
              key={item}
              className={`group relative rounded-2xl border border-brand-interactive/24 bg-brand-interactive/10 p-5 text-sm text-slate-200 [transform-style:preserve-3d] transition-all duration-300 ${tilt} hover:shadow-[0_12px_36px_-10px_rgba(139,92,246,0.3)]`}
            >
              {/* Top shimmer */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-lavender/30 to-transparent"
                aria-hidden="true"
              />
              {/* Ordinal floating above surface */}
              <div
                className="mb-3 font-display text-3xl font-bold text-brand-lavender/20 [transform:translateZ(6px)] select-none"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              {item}
            </div>
          );
        })}
      </div>
    </section>
  );
}
