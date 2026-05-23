'use client'

import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { testimonials } from '@/data/site'
import { Play } from 'lucide-react'
import { useScrollReveal } from '@/lib/useScrollReveal'

const SITE_URL = 'https://novamindglobal.com'

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#software`,
  name: 'Novamind Global',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Contactar para cotización personalizada',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: String(testimonials.length),
    reviewCount: String(testimonials.length),
  },
  review: testimonials.map((t) => {
    const parts = t.author.split(', ')
    return {
      '@type': 'Review',
      author: { '@type': 'Person', name: parts[0] ?? t.author },
      reviewBody: t.quote,
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    }
  }),
}

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

type TestimonialCardProps = {
  quote: string
  author: string
  large?: boolean
}

function TestimonialCard({ quote, author, large = false }: TestimonialCardProps) {
  const parts = author.split(', ')
  const name = parts[0]
  const company = parts.slice(1).join(', ')
  const wrapClass = `relative overflow-hidden rounded-2xl border border-brand-lavender/18 bg-brand-card/80 backdrop-blur ${large ? 'p-8' : 'p-6'}`
  const quoteClass = `relative mt-4 font-serif italic leading-7 text-[#f0f8ff] ${large ? 'text-lg' : 'text-base'}`
  return (
    <div className={wrapClass}>
      <span aria-hidden="true" className="pointer-events-none absolute right-5 top-2 select-none font-serif text-[7rem] leading-none text-brand-lavender opacity-[0.07]">&ldquo;</span>
      <StarRating />
      <p className={quoteClass}>&ldquo;{quote}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 border-t border-brand-lavender/12 pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-violet/30 text-sm font-semibold text-brand-lavender">
          {name?.charAt(0) ?? 'N'}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#f0f8ff]">{name}</p>
          {company && <p className="text-xs text-text-muted">{company}</p>}
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  return (
    <SectionWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <Container>
        <div ref={headingRef} className="mb-8 max-w-2xl reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Casos de impacto</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Lo que dicen quienes ya operan con Novamind
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          {testimonials[0] && (
            <TestimonialCard quote={testimonials[0].quote} author={testimonials[0].author} large />
          )}
          <div className="flex flex-col gap-4">
            {testimonials.slice(1).map((item) => (
              <TestimonialCard key={item.author} quote={item.quote} author={item.author} />
            ))}
            {/* Video testimonial placeholder */}
            <div className="relative overflow-hidden rounded-2xl border border-brand-violet/30 bg-brand-card/80 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-violet/20">
                  <Play className="h-6 w-6 fill-brand-lavender text-brand-lavender" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">Video</p>
                  <p className="font-display text-base font-semibold text-[#f0f8ff]">Historia de éxito real</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-text-muted">Cómo automatizamos la nómina de 340 empleados en menos de 6 semanas.</p>
              <button className="mt-4 text-sm font-semibold text-brand-lavender hover:text-[#f0f8ff] transition" aria-label="Ver video de caso de éxito">
                Ver video →
              </button>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}