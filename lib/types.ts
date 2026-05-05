export type Metric = {
  label: string
  value: string
  suffix?: string
}

export type Product = {
  slug: string
  name: string
  shortDescription: string
  heroTitle: string
  heroSubtitle: string
  heroStats: Array<{ label: string; value: string }>
  problem: string[]
  solution: string[]
  benefits: string[]
  features: string[]
  audiences: string[]
  integrations: string[]
  differentiators: string[]
  showcase: Array<{ title: string; detail: string; accent: string }>
  faq: Array<{ question: string; answer: string }>
}

export type BlogPost = {
  slug: string
  title: string
  summary: string
  category: string
  date: string
  content: string[]
}
