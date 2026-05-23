'use client'

import { useEffect, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card } from '@/components/shared/ui/Card'
import { differentiationPillars } from '@/data/site'
import { useScrollReveal } from '@/lib/useScrollReveal'

const CYCLING_WORDS = ['escalable', 'inteligente', 'medible', 'enterprise-ready', 'conectado']

export function WhyNovamindSection() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const [wordIndex, setWordIndex] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = setInterval(() => {
      setWordVisible(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % CYCLING_WORDS.length)
        setWordVisible(true)
      }, 250)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <SectionWrapper>
      <Container>
        <div ref={headingRef} className="max-w-3xl reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Por qué Novamind</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#f0f8ff] sm:text-4xl">
            Software empresarial{' '}
            <span
              className={`text-gradient-animated inline-block transition-opacity duration-200 ${wordVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              {CYCLING_WORDS[wordIndex]}
            </span>{' '}
            para operaciones críticas
          </h2>
          <p className="mt-4 text-text-muted">
            La diferencia no está en sumar features. Está en convertir procesos complejos en plataformas claras, escalables y listas para generar valor medible.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {differentiationPillars.map((pillar, i) => (
            <Card key={pillar.title} variant="featured" ordinal={String(i + 1).padStart(2, '0')} className="transition hover:-translate-y-1 hover:shadow-medium">
              <h3 className="font-display text-xl text-[#f0f8ff]">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-muted">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
