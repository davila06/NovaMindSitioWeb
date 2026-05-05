import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 56,
          background:
            'radial-gradient(circle at 16% 10%, rgba(91,192,235,0.35), transparent 44%), radial-gradient(circle at 85% 80%, rgba(249,115,22,0.30), transparent 38%), linear-gradient(135deg, #0F172A, #1E293B)',
          color: '#F8FAFC',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 20px',
            borderRadius: 999,
            border: '1px solid rgba(56,189,248,0.45)',
            fontSize: 28,
            letterSpacing: 0.8,
          }}
        >
          IA aplicada a negocios
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 0.95 }}>Novamind Global</div>
          <div style={{ fontSize: 34, opacity: 0.95, lineHeight: 1.3, maxWidth: 980 }}>
            Soluciones SaaS e inteligencia artificial para operaciones enterprise
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
