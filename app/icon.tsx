import { ImageResponse } from 'next/og'

export const size = {
  width: 512,
  height: 512,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 120,
          background:
            'radial-gradient(circle at 22% 18%, rgba(91,192,235,0.35), transparent 40%), radial-gradient(circle at 84% 82%, rgba(249,115,22,0.35), transparent 45%), linear-gradient(135deg, #0F172A, #1E293B)',
          color: '#F8FAFC',
          fontSize: 180,
          fontWeight: 800,
          letterSpacing: -12,
        }}
      >
        NG
      </div>
    ),
    {
      ...size,
    },
  )
}
