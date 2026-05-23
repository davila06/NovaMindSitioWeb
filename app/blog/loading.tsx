import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-brand-card/60 ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export default function BlogLoading() {
  return (
    <SectionWrapper className="pt-12">
      <Container>
        {/* Header skeleton */}
        <div className="max-w-2xl space-y-3">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-10 w-48" />
          <SkeletonBlock className="h-4 w-80" />
        </div>

        {/* Filters skeleton */}
        <div className="mt-8 flex gap-2">
          {[48, 64, 56, 72, 60].map((w, i) => (
            <SkeletonBlock
              key={i}
              className={`h-7 w-${w === 48 ? "12" : w === 64 ? "16" : w === 56 ? "14" : w === 72 ? "18" : "14"} rounded-full`}
            />
          ))}
        </div>

        {/* Featured card skeleton */}
        <SkeletonBlock className="mt-10 h-52 w-full rounded-2xl" />

        {/* Grid skeleton */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-brand-lavender/10 bg-brand-card/50 p-6 space-y-3"
            >
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-4 w-4/5" />
              <SkeletonBlock className="h-4 w-3/5" />
              <SkeletonBlock className="mt-2 h-3 w-16" />
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
