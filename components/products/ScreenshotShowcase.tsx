import { Product } from "@/lib/types";

export function ScreenshotShowcase({ product }: { product: Product }) {
  return (
    <section>
      <h2 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">
        Vista de producto y experiencia operativa
      </h2>
      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-elevated">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-sky-400" />
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
            {product.name}
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {product.showcase.map((panel) => (
            <div
              key={panel.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <span
                className={`mb-4 block h-2 w-16 rounded-full ${panel.accent}`}
              />
              <h3 className="font-display text-xl text-white">{panel.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {panel.detail}
              </p>
              <div className="mt-5 space-y-2">
                <div className="h-2 rounded-full bg-white/10">
                  <div className={`h-2 w-4/5 rounded-full ${panel.accent}`} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-10 rounded-lg bg-white/10" />
                  <div className="h-10 rounded-lg bg-white/10" />
                  <div className="h-10 rounded-lg bg-white/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
