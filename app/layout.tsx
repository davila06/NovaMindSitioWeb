import type { Metadata, Viewport } from "next";
import { Inter, Sora, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { GlobalErrorListeners } from "@/components/layout/GlobalErrorListeners";
import { CookieConsent } from "@/components/shared/ui/CookieConsent";
import { createPageMetadata, siteConfig } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic", "normal"],
  display: "optional",
});

const homeMetadata = createPageMetadata({
  title: "Novamind Global | IA aplicada a los negocios",
  description:
    "Soluciones SaaS e inteligencia artificial para nomina, ERP, seguros, contact center y comunidades.",
  path: "/",
});

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

/** Viewport export — Next.js 15 best practice: separate from metadata */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030812" },
    { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/logo-novamind.svg`,
          width: 240,
          height: 60,
        },
        email: "info@novamindglobalcr.com",
        foundingDate: "2022",
        numberOfEmployees: { "@type": "QuantitativeValue", value: 20 },
        knowsAbout: [
          "Inteligencia Artificial",
          "SaaS Empresarial",
          "Nómina Digital",
          "Contact Center IA",
          "ERP",
        ],
        sameAs: [
          "https://www.linkedin.com/company/novamind-global",
          "https://www.instagram.com/novamindglobal",
          "https://twitter.com/novamindglobal",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "info@novamindglobalcr.com",
          availableLanguage: ["Spanish", "English"],
          areaServed: ["CR", "LATAM"],
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: "info@novamindglobalcr.com",
        address: {
          "@type": "PostalAddress",
          addressCountry: "CR",
          addressLocality: "San José",
          addressRegion: "San José",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 9.9281,
          longitude: -84.0907,
        },
        description:
          "Empresa costarricense de software empresarial IA-native: nómina, ERP, contact center, ventas y más.",
        priceRange: "$$$",
        currenciesAccepted: "CRC, USD",
        paymentAccepted: "Transferencia bancaria, Tarjeta",
        areaServed: ["CR", "LATAM"],
        openingHours: "Mo-Fr 08:00-18:00",
        sameAs: ["https://www.linkedin.com/company/novamind-global"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "es-CR",
        publisher: { "@id": `${siteConfig.url}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="es-CR">
      <head>
        {/* Prevent iOS/Android from linkifying non-phone content */}
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        {/* DNS prefetch for analytics — non-blocking */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preload critical fonts */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500;600&display=swap"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* Hreflang — regional SEO for Costa Rica / LATAM */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${siteConfig.url}/`}
        />
        <link rel="alternate" hrefLang="es" href={`${siteConfig.url}/`} />
        <link rel="alternate" hrefLang="es-CR" href={`${siteConfig.url}/`} />
        {/* RSS autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Novamind Global Blog RSS"
          href="/blog/feed.xml"
        />
        {/* DNS prefetch para terceros */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Preconnect for YouTube embeds (ProductVideoSection) */}
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        {/* Critical CSS: above-fold background to prevent flash */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html,body{background-color:#030812;color:#f0f8ff;margin:0;padding:0}
          *{box-sizing:border-box}
          @view-transition{navigation:auto}
        `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} ${playfair.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AnalyticsScripts />
        <GlobalErrorListeners />
        <AppShell>{children}</AppShell>
        <CookieConsent />
      </body>
    </html>
  );
}
