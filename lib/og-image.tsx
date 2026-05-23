import { ImageResponse } from 'next/og'

export const ogImageSize = { width: 1200, height: 630 }
export const ogImageContentType = 'image/png'

export function generateProductOGImage(productName: string, tagline: string) {
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
            'radial-gradient(circle at 15% 25%, rgba(249,115,22,0.30), transparent 45%), radial-gradient(circle at 85% 75%, rgba(56,189,248,0.22), transparent 40%), linear-gradient(135deg, #060b16, #0b1730)',
          color: '#eff6ff',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 18px',
            borderRadius: 999,
            border: '1px solid rgba(56,189,248,0.35)',
            fontSize: 20,
            color: '#7dd3fc',
            letterSpacing: 2,
            textTransform: 'uppercase',
            alignSelf: 'flex-start',
          }}
        >
          Novamind Global
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 860,
            }}
          >
            {productName}
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#9cb3d9',
              maxWidth: 720,
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 18, color: '#4c638d' }}>novamindglobal.com</div>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: 12,
              background: 'rgba(249,115,22,0.14)',
              border: '1px solid rgba(249,115,22,0.35)',
              fontSize: 18,
              color: '#fb923c',
            }}
          >
            IA aplicada a negocios
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
