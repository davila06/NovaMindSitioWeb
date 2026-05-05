import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <h1 className="bg-gradient-to-r from-brand-accent via-brand-interactive to-brand-surface bg-clip-text font-display text-4xl text-transparent">Pagina no encontrada</h1>
      <p className="mt-3 text-slate-300">La ruta que buscas no existe o fue movida.</p>
      <Link href="/" className="mt-6 rounded-xl bg-brand-cta px-5 py-3 text-sm font-semibold text-white">
        Volver al inicio
      </Link>
    </div>
  )
}
