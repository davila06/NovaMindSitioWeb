"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { metrics } from "@/data/site";
import { Card } from "@/components/shared/ui/Card";
import { useCountUp } from "@/hooks/useCountUp";

function AnimatedMetric({
  value,
  suffix,
  label,
  role,
}: {
  value: string;
  suffix?: string;
  label: string;
  role?: string;
}) {
  const numericValue = parseInt(value, 10);
  const isNumeric = !isNaN(numericValue);
  const { count, ref } = useCountUp(isNumeric ? numericValue : 0, 1800);

  return (
    <div role={role}>
    <Card variant="metric">
      <div ref={ref}>
        <span
          aria-live="polite"
          aria-atomic="true"
          className="bg-gradient-to-r from-brand-violet via-brand-iris to-brand-lavender bg-clip-text font-display text-5xl font-bold text-transparent"
        >
          {isNumeric ? count : value}
          {suffix}
        </span>
      </div>
      <p className="mt-3 text-sm text-text-muted">{label}</p>
    </Card>
    </div>
  );
}

export function MetricsCounters() {
  return (
    <SectionWrapper>
      <Container>
        <div
          className="grid gap-4 md:grid-cols-3"
          role="list"
          aria-label="Métricas de impacto de Novamind Global"
        >
          {metrics.map((metric) => (
            <AnimatedMetric
              role="listitem"
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
