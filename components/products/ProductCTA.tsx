import { Button } from "@/components/shared/ui/Button";
import { PwaInstallActions } from "@/components/products/PwaInstallActions";

export function ProductCTA({ name }: { name: string }) {
  const isPawTrack = name === "PawTrack CR / NALA";
  const primaryHref = "/contacto";

  return (
    <section className="rounded-2xl bg-brand-deep p-8 text-white">
      <h2 className="font-display text-3xl">
        {isPawTrack
          ? "Accede a PawTrack CR / NALA"
          : `Quiero implementar ${name}`}
      </h2>
      <p className="mt-3 text-slate-200">
        {isPawTrack
          ? "Crea tu cuenta o inicia sesion en PawTrack CR. Consulta sus funciones, planes y condiciones en el portal del producto."
          : "Agenda una sesion y te mostramos una ruta de implementacion por etapas."}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {isPawTrack ? (
          <PwaInstallActions />
        ) : (
          <>
            <Button
              href={primaryHref}
              trackingContext={{
                page: `product/${name}`,
                section: "product_cta",
                ctaLabel: "quiero_demo",
                destination: primaryHref,
                product: name,
                intent: "demo",
              }}
            >
              Quiero una demo
            </Button>
            <Button
              href="/contacto"
              variant="ghost"
              className="border-white/30 bg-white/10 text-white"
              trackingContext={{
                page: `product/${name}`,
                section: "product_cta",
                ctaLabel: "hablar_con_experto",
                destination: "/contacto",
                product: name,
                intent: "consultation",
              }}
            >
              Hablar con experto
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
