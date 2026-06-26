export type Metric = {
  label: string;
  value: string;
  suffix?: string;
};

export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroStats?: Array<{ label: string; value: string }>;
  /** URL opcional de screenshot del producto — se muestra en marco de browser */
  screenshotUrl?: string;
  /** ID de video de YouTube para demo embed en página de producto */
  demoVideoId?: string;
  problem: string[];
  solution: string[];
  benefits: string[];
  features: string[];
  audiences: string[];
  integrations: string[];
  differentiators: string[];
  showcase: Array<{ title: string; detail: string; accent: string }>;
  faq: Array<{ question: string; answer: string }>;
};

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  tags?: string[];
  author?: string;
  readTime?: number;
  content: string[];
};
