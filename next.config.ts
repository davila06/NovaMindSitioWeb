import type { NextConfig } from 'next'
import { getSecurityHeaders } from './lib/security'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: getSecurityHeaders(),
      },
    ]
  },
}

export default nextConfig
