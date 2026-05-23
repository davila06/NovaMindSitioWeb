import { Linkedin } from 'lucide-react'

type BlogAuthorBioProps = {
  postUrl: string
}

export function BlogAuthorBio({ postUrl }: BlogAuthorBioProps) {
  return (
    <div className="mt-10 rounded-2xl border border-brand-lavender/20 bg-brand-card/80 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-brand-iris text-lg font-bold text-white">
          N
        </div>
        <div className="flex-1">
          <p className="font-display text-base font-semibold text-[#f0f8ff]">Equipo Novamind Global</p>
          <p className="mt-0.5 text-xs text-text-muted">Investigación & Producto · San José, Costa Rica</p>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Novamind Global es una empresa de software empresarial IA-native especializada en operaciones
            críticas para América Latina. Nuestros artículos combinan experiencia de producto con perspectiva
            práctica de la industria.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://linkedin.com/company/novamindglobal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Novamind en LinkedIn"
              className="flex items-center gap-1.5 text-xs text-brand-lavender hover:text-brand-iris transition"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted hover:text-brand-lavender transition"
            >
              Compartir artículo →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
