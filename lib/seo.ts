import type { Metadata } from "next";

export const siteConfig = {
  name: "Novamind Global",
  url: "https://novamindglobalcr.com",
  defaultOgImage: "/opengraph-image",
  defaultTwitterImage: "/twitter-image",
  locale: "es_CR",
};

export const keywords = [
  "IA para empresas Costa Rica",
  "SaaS Costa Rica",
  "ERP con IA",
  "Software de planillas",
  "Contact center IA",
];

export function createPageMetadata({
  title,
  description,
  path,
  extraKeywords = [],
}: {
  title: string;
  description: string;
  path: string;
  extraKeywords?: string[];
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const allKeywords = extraKeywords.length
    ? [...extraKeywords, ...keywords]
    : keywords;
  return {
    title,
    description,
    keywords: allKeywords,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} | IA aplicada a los negocios`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.defaultTwitterImage],
    },
    alternates: {
      canonical: path,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

/** Product-specific metadata with tailored keywords for Google Search rich results */
export function createProductMetadata({
  name,
  description,
  slug,
  extraKeywords = [],
}: {
  name: string;
  description: string;
  slug: string;
  extraKeywords?: string[];
}): Metadata {
  const productKeywords = [
    `${name} Costa Rica`,
    `${name} SaaS`,
    `software ${name.toLowerCase()} empresarial`,
    `automatización ${name.toLowerCase()} IA`,
    ...extraKeywords,
  ];
  return createPageMetadata({
    title: `${name} | Novamind Global`,
    description,
    path: `/productos/${slug}`,
    extraKeywords: productKeywords,
  });
}
