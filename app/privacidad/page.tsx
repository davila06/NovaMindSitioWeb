import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Política de Privacidad | Novamind Global',
    description: 'Política de privacidad y tratamiento de datos personales de Novamind Global, conforme a la Ley 8968 de Costa Rica y el RGPD.',
    path: '/privacidad',
  }),
  robots: { index: false, follow: true },
}

const sections = [
  {
    title: '1. Responsable del tratamiento',
    content: 'Novamind Global S.A., con domicilio en San José, Costa Rica. Correo electrónico de contacto: privacidad@novamindglobal.com.',
  },
  {
    title: '2. Datos que recopilamos',
    content: 'Recopilamos únicamente los datos que usted nos proporciona voluntariamente: nombre, correo electrónico, empresa, cargo y descripción de su necesidad a través de nuestro formulario de contacto. No recopilamos datos sensibles.',
  },
  {
    title: '3. Finalidad del tratamiento',
    content: 'Los datos se usan exclusivamente para: responder su consulta comercial, enviar información relevante sobre nuestros productos (solo con su consentimiento) y mejorar nuestros servicios. No vendemos ni cedemos datos a terceros.',
  },
  {
    title: '4. Base legal',
    content: 'El tratamiento se realiza con base en su consentimiento explícito al enviar el formulario, y en el interés legítimo de Novamind Global para atender solicitudes comerciales.',
  },
  {
    title: '5. Retención de datos',
    content: 'Sus datos se conservan por un máximo de 24 meses desde el último contacto. Transcurrido ese plazo, los eliminamos de manera segura salvo obligación legal.',
  },
  {
    title: '6. Cookies',
    content: 'Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas (Google Analytics, Microsoft Clarity) con su consentimiento. Puede gestionarlas desde el banner de cookies o su navegador.',
  },
  {
    title: '7. Sus derechos',
    content: 'Conforme a la Ley 8968 (Costa Rica) y el RGPD (si aplica), usted puede: acceder, rectificar, suprimir, oponerse y portar sus datos. Envíe su solicitud a privacidad@novamindglobal.com y responderemos en un plazo de 30 días.',
  },
  {
    title: '8. Seguridad',
    content: 'Aplicamos medidas técnicas y organizativas para proteger sus datos: transmisión cifrada (HTTPS/TLS), acceso restringido a personal autorizado y auditorías periódicas de seguridad.',
  },
  {
    title: '9. Cambios en esta política',
    content: 'Podemos actualizar esta política. La fecha de última actualización aparece al pie. Cambios sustanciales serán notificados por correo a los usuarios registrados.',
  },
]

export default function PrivacidadPage() {
  return (
    <SectionWrapper className="pt-12">
      <Container className="max-w-3xl">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-gold">Legal</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-[-0.03em] text-[#f0f8ff]">
            Política de Privacidad
          </h1>
          <p className="mt-4 text-text-muted">
            Última actualización: enero 2026 · Aplicable a usuarios del sitio <strong className="text-[#f0f8ff]">novamindglobal.com</strong>
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title} className="rounded-2xl border border-brand-lavender/15 bg-brand-card/60 p-6">
              <h2 className="font-display text-lg font-semibold text-[#f0f8ff]">{s.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-muted">{s.content}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-text-subtle">
          Para consultas: <a href="mailto:privacidad@novamindglobal.com" className="text-brand-lavender hover:underline">privacidad@novamindglobal.com</a>
        </p>
      </Container>
    </SectionWrapper>
  )
}
