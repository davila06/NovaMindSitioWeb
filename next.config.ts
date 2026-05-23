import type { NextConfig } from 'next'
import { getSecurityHeaders } from './lib/security'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /** Keep heavy Node.js-only packages out of the server component bundle */
  serverExternalPackages: ['nodemailer', 'resend'],
  experimental: {
    /** Tree-shake lucide-react — eliminates unused icon imports from the client bundle */
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: getSecurityHeaders(),
      },
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</img/novamind-brand.webp>; rel=preload; as=image, <https://fonts.googleapis.com>; rel=preconnect',
          },
        ],
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
