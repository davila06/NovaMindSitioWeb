import { AudienceRoutesSection } from '@/components/home/AudienceRoutesSection'
import { FAQSection } from '@/components/home/FAQSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { HeroSection } from '@/components/home/HeroSection'
import { ProductGrid } from '@/components/home/ProductGrid'
import { TrustBar } from '@/components/home/TrustBar'
import { ImplementationSection } from '@/components/home/ImplementationSection'
import { SectionErrorBoundary } from '@/components/shared/SectionErrorBoundary'
import { ProductCatalogSchema } from '@/components/home/ProductCatalogSchema'
import { PawTrackCommunitySection } from '@/components/home/PawTrackCommunitySection'

export default function HomePage() {
  return (
    <>
      <ProductCatalogSchema />
      <SectionErrorBoundary section="HeroSection"><HeroSection /></SectionErrorBoundary>
      <AudienceRoutesSection />
      <TrustBar />
      <SectionErrorBoundary section="ProductGrid"><ProductGrid /></SectionErrorBoundary>
      <PawTrackCommunitySection />
      <ImplementationSection />
      <FAQSection />
      <FinalCTA />
    </>
  )
}
