export function IntegrationsCloud({ items }: { items: string[] }) {
  // Assign alternating Z-depths to create an orbital tag cloud illusion
  const depthClasses = [
    "[transform:translateZ(12px)] shadow-[0_4px_12px_-4px_rgba(139,92,246,0.35)]",
    "[transform:translateZ(4px)]",
    "[transform:translateZ(8px)] shadow-[0_3px_10px_-3px_rgba(139,92,246,0.2)]",
    "[transform:translateZ(0px)]",
    "[transform:translateZ(10px)] shadow-[0_4px_12px_-4px_rgba(139,92,246,0.3)]",
    "[transform:translateZ(2px)]",
  ];

  return (
    <section className="rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-6 shadow-soft">
      <h2 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">
        Integraciones y ecosistema
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
        Cada producto de Novamind está pensado para convivir con el stack actual
        del cliente y amplificarlo, no para obligar una ruptura operacional
        innecesaria.
      </p>
      {/* Tag cloud with depth perspective */}
      <div className="mt-6 flex flex-wrap gap-3 [perspective:600px]">
        {items.map((item, i) => (
          <span
            key={item}
            className={`rounded-full border border-brand-interactive/20 bg-slate-950/72 px-4 py-2 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-brand-lavender/40 hover:text-[#f0f8ff] hover:[transform:translateZ(18px)_scale(1.06)] ${depthClasses[i % depthClasses.length]}`}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
