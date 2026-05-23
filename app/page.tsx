import dynamic from 'next/dynamic'
import { BenefitCards } from '@/components/home/BenefitCards'
import { CommercialProofSection } from '@/components/home/CommercialProofSection'
import { FAQSection } from '@/components/home/FAQSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { HeroSection } from '@/components/home/HeroSection'
import { MetricsCounters } from '@/components/home/MetricsCounters'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { PlatformConstellationSection } from '@/components/home/PlatformConstellationSection'
import { PricingTeaser } from '@/components/home/PricingTeaser'
import { ProblemSolutionSplit } from '@/components/home/ProblemSolutionSplit'
import { ProductGrid } from '@/components/home/ProductGrid'
import { TrustBar } from '@/components/home/TrustBar'
import { WhyNovamindSection } from '@/components/home/WhyNovamindSection'
import { WaveDivider } from '@/components/layout/WaveDivider'
import { SectionErrorBoundary } from '@/components/shared/SectionErrorBoundary'
import { ProductCatalogSchema } from '@/components/home/ProductCatalogSchema'

// Heavy interactive components loaded lazily (below-the-fold code-splitting)
const ComparativeBattleSection = dynamic(
  () => import('@/components/home/ComparativeBattleSection').then((m) => ({ default: m.ComparativeBattleSection })),
  { loading: () => <div className="h-96" /> }
)
const ROICalculator = dynamic(
  () => import('@/components/home/ROICalculator').then((m) => ({ default: m.ROICalculator })),
  { loading: () => <div className="h-64" /> }
)
const ImplementationSection = dynamic(
  () => import('@/components/home/ImplementationSection').then((m) => ({ default: m.ImplementationSection })),
  { loading: () => <div className="h-80" /> }
)
const UseCasesSection = dynamic(
  () => import('@/components/home/UseCasesSection').then((m) => ({ default: m.UseCasesSection })),
  { loading: () => <div className="h-72" /> }
)
const TrustCenterSection = dynamic(
  () => import('@/components/home/TrustCenterSection').then((m) => ({ default: m.TrustCenterSection })),
  { loading: () => <div className="h-64" /> }
)
const TestimonialsSection = dynamic(
  () => import('@/components/home/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <div className="h-80" /> }
)
const ManifestoSection = dynamic(
  () => import('@/components/home/ManifestoSection').then((m) => ({ default: m.ManifestoSection })),
  { loading: () => <div className="h-72" /> }
)
const SolutionFinderSection = dynamic(
  () => import('@/components/home/SolutionFinderSection').then((m) => ({ default: m.SolutionFinderSection })),
  { loading: () => <div className="h-64" /> }
)

export default function HomePage() {
  return (
    <>
      <ProductCatalogSchema />
      <SectionErrorBoundary section="HeroSection"><HeroSection /></SectionErrorBoundary>
      <TrustBar />
      <SectionErrorBoundary section="BenefitCards"><BenefitCards /></SectionErrorBoundary>
      <SectionErrorBoundary section="WhyNovamindSection"><WhyNovamindSection /></SectionErrorBoundary>
      <SectionErrorBoundary section="CommercialProofSection"><CommercialProofSection /></SectionErrorBoundary>
      <SectionErrorBoundary section="ProductGrid"><ProductGrid /></SectionErrorBoundary>
      <WaveDivider className="text-brand-surface/15" />
      <SectionErrorBoundary section="PlatformConstellationSection"><PlatformConstellationSection /></SectionErrorBoundary>
      <SectionErrorBoundary section="SolutionFinderSection"><SolutionFinderSection /></SectionErrorBoundary>
      <ManifestoSection />
      <WaveDivider flip className="text-brand-card/20" />
      <SectionErrorBoundary section="ComparativeBattleSection"><ComparativeBattleSection /></SectionErrorBoundary>
      <SectionErrorBoundary section="ProblemSolutionSplit"><ProblemSolutionSplit /></SectionErrorBoundary>
      <SectionErrorBoundary section="ROICalculator"><ROICalculator /></SectionErrorBoundary>
      <SectionErrorBoundary section="PricingTeaser"><PricingTeaser /></SectionErrorBoundary>
      <ImplementationSection />
      <SectionErrorBoundary section="UseCasesSection"><UseCasesSection /></SectionErrorBoundary>
      <TrustCenterSection />
      <SectionErrorBoundary section="MetricsCounters"><MetricsCounters /></SectionErrorBoundary>
      <SectionErrorBoundary section="TestimonialsSection"><TestimonialsSection /></SectionErrorBoundary>
      <NewsletterSection />
      <FAQSection />
      <FinalCTA />
    </>
  )
}
