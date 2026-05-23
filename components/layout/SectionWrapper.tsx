import { ReactNode } from 'react'

export function SectionWrapper({
  id,
  children,
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: {
  id?: string
  children: ReactNode
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 ${className}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  )
}
