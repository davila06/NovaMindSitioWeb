import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import '@/styles/globals.css'
import { AppShell } from '@/components/layout/AppShell'
import { AnalyticsScripts } from '@/components/layout/AnalyticsScripts'
import { GlobalErrorListeners } from '@/components/layout/GlobalErrorListeners'
import { createPageMetadata, siteConfig } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

const homeMetadata = createPageMetadata({
  title: 'Novamind Global | IA aplicada a los negocios',
  description:
    'Soluciones SaaS e inteligencia artificial para nomina, ERP, seguros, contact center y comunidades.',
  path: '/',
})

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo-novamind.svg`,
        email: 'contacto@novamindglobal.com',
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: 'es-CR',
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
      },
    ],
  }

  return (
    <html lang="es">
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <AnalyticsScripts />
        <GlobalErrorListeners />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
