import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

type Step = {
  label: string
  description?: string
}

type ProgressStepsProps = {
  steps: Step[]
  currentStep: number // 0-based index
  className?: string
}

/** Indicador de progreso numerado — multi-step forms, implementación, onboarding */
export function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  return (
    <nav aria-label="Progreso" className={cn('flex items-center gap-0', className)}>
      {steps.map((step, i) => {
        const isCompleted = i < currentStep
        const isActive    = i === currentStep
        const isLast      = i === steps.length - 1

        return (
          <div key={step.label} className="flex flex-1 items-center">
            {/* Step node */}
            <div className="flex flex-col items-center">
              <div
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all',
                  isCompleted && 'border-brand-violet bg-brand-violet text-white',
                  isActive    && 'border-brand-iris bg-brand-violet/20 text-brand-lavender',
                  !isCompleted && !isActive && 'border-brand-lavender/25 bg-brand-card text-text-subtle',
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
              </div>
              <span className={cn('mt-1 text-[10px] font-medium leading-tight text-center max-w-[72px]',
                isActive ? 'text-brand-lavender' : 'text-text-subtle',
              )}>
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {!isLast && (
              <div className={cn(
                'mx-2 h-px flex-1 transition-all',
                i < currentStep ? 'bg-brand-violet' : 'bg-brand-lavender/20',
              )} />
            )}
          </div>
        )
      })}
    </nav>
  )
}
