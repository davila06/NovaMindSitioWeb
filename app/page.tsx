import { BenefitCards } from '@/components/home/BenefitCards'
import { CommercialProofSection } from '@/components/home/CommercialProofSection'
import { ComparativeBattleSection } from '@/components/home/ComparativeBattleSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { HeroSection } from '@/components/home/HeroSection'
import { ImplementationSection } from '@/components/home/ImplementationSection'
import { MetricsCounters } from '@/components/home/MetricsCounters'
import { ProblemSolutionSplit } from '@/components/home/ProblemSolutionSplit'
import { ProductGrid } from '@/components/home/ProductGrid'
import { PlatformConstellationSection } from '@/components/home/PlatformConstellationSection'
import { SolutionFinderSection } from '@/components/home/SolutionFinderSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { TrustBar } from '@/components/home/TrustBar'
import { TrustCenterSection } from '@/components/home/TrustCenterSection'
import { UseCasesSection } from '@/components/home/UseCasesSection'
import { WhyNovamindSection } from '@/components/home/WhyNovamindSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <BenefitCards />
      <WhyNovamindSection />
      <CommercialProofSection />
      <ProductGrid />
      <PlatformConstellationSection />
      <SolutionFinderSection />
      <ComparativeBattleSection />
      <ProblemSolutionSplit />
      <ImplementationSection />
      <UseCasesSection />
      <TrustCenterSection />
      <MetricsCounters />
      <TestimonialsSection />
      <FinalCTA />
    </>
  )
}
