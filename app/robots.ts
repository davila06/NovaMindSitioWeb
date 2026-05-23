import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/gracias',
          '/gracias/',
          '/offline',
          '/offline/',
          '/_next/',
        ],
      },
      // Block AI training scrapers explicitly
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'Omgilibot',
          'PerplexityBot',
          'Bytespider',
          'Diffbot',
          'AI2Bot',
          'CohereBot',
          'YouBot',
          'PetalBot',
          'Applebot-Extended',
          'omgili',
          'DataForSeoBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://novamindglobal.com/sitemap.xml',
    host: 'https://novamindglobal.com',
  }
}
