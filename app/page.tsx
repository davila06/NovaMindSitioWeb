import { getBlogPostSummaries } from "@/lib/content";
import { SectionErrorBoundary } from "@/components/shared/SectionErrorBoundary";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { ImplementationSection } from "@/components/home/ImplementationSection";
import { PawTrackCommunitySection } from "@/components/home/PawTrackCommunitySection";
import { ProductCatalogSchema } from "@/components/home/ProductCatalogSchema";
import { TrustBar } from "@/components/home/TrustBar";
import {
  HomeInsightsSection,
  NovaAssistServicesSection,
  ProductHighlights,
  ProblemsSection,
  SecurityTrustSection,
  SolutionAreasSection,
  TechnologyEcosystemSection,
} from "@/components/home/EnterpriseSections";

export default async function HomePage() {
  const blogPosts = await getBlogPostSummaries();

  return (
    <>
      <ProductCatalogSchema />
      <SectionErrorBoundary section="HeroSection">
        <HeroSection />
      </SectionErrorBoundary>
      <TrustBar />
      <ProblemsSection />
      <SolutionAreasSection />
      <NovaAssistServicesSection />
      <ImplementationSection />
      <SectionErrorBoundary section="ProductHighlights">
        <ProductHighlights />
      </SectionErrorBoundary>
      <TechnologyEcosystemSection />
      <SecurityTrustSection />
      <HomeInsightsSection posts={blogPosts.slice(0, 3)} />
      <PawTrackCommunitySection />
      <FinalCTA />
    </>
  );
}
