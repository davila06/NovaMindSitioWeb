import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Badge } from '@/components/shared/ui/Badge'
import { Button } from '@/components/shared/ui/Button'

export function HeroSection() {
  return (
    <SectionWrapper className="pb-8 pt-10 sm:pt-14">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="enter-fade-up">
            <Badge>Apps empresariales IA-native</Badge>
            <h1 className="mt-4 bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-4xl leading-tight text-transparent sm:text-5xl">
              Transformamos operaciones criticas en plataformas inteligentes listas para escalar
            </h1>
            <p className="mt-5 max-w-xl text-slate-300">
              Combinamos software empresarial, automatizacion e inteligencia artificial para nomina, ERP, seguros, atencion al cliente y ecosistemas digitales con foco en valor medible.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href="/contacto"
                trackingContext={{
                  page: 'home',
                  section: 'hero',
                  ctaLabel: 'solicitar_demo',
                  destination: '/contacto',
                  intent: 'demo',
                }}
              >
                Solicitar demo
              </Button>
              <Button
                href="/#productos"
                variant="ghost"
                trackingContext={{
                  page: 'home',
                  section: 'hero',
                  ctaLabel: 'ver_productos',
                  destination: '/#productos',
                  intent: 'explore',
                }}
              >
                Ver productos
              </Button>
            </div>
            <div className="mt-6 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
              <div className="rounded-xl border border-brand-interactive/20 bg-slate-900/72 px-4 py-3">Time-to-value acelerado</div>
              <div className="rounded-xl border border-brand-interactive/20 bg-slate-900/72 px-4 py-3">Procesos trazables y auditables</div>
              <div className="rounded-xl border border-brand-interactive/20 bg-slate-900/72 px-4 py-3">Arquitectura enterprise sobre Azure</div>
            </div>
          </div>

          <div className="enter-scale-in rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-elevated">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-slate-300">Control room operativo</p>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                IA activa
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-slate-300">Procesos automatizados</p>
                <p className="mt-1 text-2xl font-semibold">+1,280</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-slate-300">SLA cumplido</p>
                <p className="mt-1 text-2xl font-semibold">98.4%</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 sm:col-span-2">
                <p className="text-xs text-slate-300">Escalabilidad multi-tenant sobre Azure</p>
                <div className="mt-3 h-2 rounded-full bg-white/20">
                  <div className="h-2 w-4/5 rounded-full bg-brand-cta" />
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Alertas operativas resueltas</span>
                  <span>96%</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
                    <span>Nomina validada</span>
                    <span className="text-emerald-300">Completado</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
                    <span>Escalado de caso prioritario</span>
                    <span className="text-amber-300">En curso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
