import { Product } from "@/lib/types";

export function ScreenshotShowcase({ product }: { product: Product }) {
  return (
    <section>
      <h2 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">
        Vista de producto y experiencia operativa
      </h2>
      {/* Isometric browser frame — whole mockup tilted for depth */}
      <div className="mt-5 [perspective:1000px]">
        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-elevated [transform:rotateX(-6deg)_rotateY(2deg)] [transform-style:preserve-3d] transition-all duration-500 hover:[transform:rotateX(-2deg)_rotateY(0deg)] hover:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.7)]">
          {/* Browser chrome */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {/* Traffic light dots — float above the chrome bar */}
              <span className="h-3 w-3 rounded-full bg-orange-400 [transform:translateZ(4px)] shadow-[0_0_6px_rgba(249,115,22,0.6)]" />
              <span className="h-3 w-3 rounded-full bg-amber-300 [transform:translateZ(4px)] shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
              <span className="h-3 w-3 rounded-full bg-sky-400 [transform:translateZ(4px)] shadow-[0_0_6px_rgba(56,189,248,0.5)]" />
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
              {product.name}
            </span>
          </div>
          {/* Panel grid */}
          <div className="grid gap-4 md:grid-cols-3 [perspective:600px]">
            {product.showcase.map((panel, i) => (
              <div
                key={panel.title}
                className={`rounded-xl border border-white/10 bg-white/5 p-4 [transform-style:preserve-3d] transition-all duration-300 hover:[transform:translateZ(10px)_translateY(-2px)] hover:border-white/20`}
              >
                <span
                  className={`mb-4 block h-2 w-16 rounded-full ${panel.accent} [transform:translateZ(4px)]`}
                />
                <h3 className="font-display text-xl text-white [transform:translateZ(3px)]">
                  {panel.title}
                </h3>
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
      </div>
    </section>
  );
}
