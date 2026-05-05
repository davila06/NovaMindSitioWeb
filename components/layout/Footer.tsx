import Link from 'next/link'
import { Button } from '@/components/shared/ui/Button'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-brand-interactive/22 bg-slate-950/72">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <h4 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-lg text-transparent">Novamind Global</h4>
          <p className="mt-3 text-sm text-slate-300">Somos expertos en IA aplicada a los negocios.</p>
        </div>
        <div>
          <h5 className="font-semibold text-slate-100">Links rapidos</h5>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/#productos">Productos</Link></li>
            <li><Link href="/industrias">Industrias</Link></li>
            <li><Link href="/roles">Roles</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold text-slate-100">Productos</h5>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><Link href="/productos/voicebot">VoiceBot</Link></li>
            <li><Link href="/productos/planillascr">PlanillasCR</Link></li>
            <li><Link href="/productos/ccerp">CCERP</Link></li>
            <li><Link href="/productos/mindflow">MindFlow</Link></li>
            <li><Link href="/productos/mindflow-ai-sales-engine">MindFlow AI Sales Engine</Link></li>
            <li><Link href="/productos/iads">IAsistente Digital de Servicios - IADS</Link></li>
            <li><Link href="/productos/pawtrack">Mi Mascotica</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold text-slate-100">Contacto</h5>
          <p className="mt-3 text-sm text-slate-300">contacto@novamindglobal.com</p>
          <p className="text-sm text-slate-300">+506 0000-0000</p>
          <p className="text-sm text-slate-300">Costa Rica</p>
          <Button
            href="/contacto"
            className="mt-4"
            trackingContext={{
              page: 'global',
              section: 'footer',
              ctaLabel: 'solicitar_demo',
              destination: '/contacto',
              intent: 'demo',
            }}
          >
            Solicitar demo
          </Button>
        </div>
      </div>
      <div className="border-t border-brand-interactive/18 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Novamind Global. Todos los derechos reservados.
      </div>
    </footer>
  )
}
