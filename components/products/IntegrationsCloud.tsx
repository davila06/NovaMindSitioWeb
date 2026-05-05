export function IntegrationsCloud({ items }: { items: string[] }) {
  return (
    <section className="rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-6 shadow-soft">
      <h2 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-3xl text-transparent">Integraciones y ecosistema</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
        Cada producto de Novamind está pensado para convivir con el stack actual del cliente y amplificarlo, no para obligar una ruptura operacional innecesaria.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-brand-interactive/20 bg-slate-950/72 px-4 py-2 text-sm font-medium text-slate-200">
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
