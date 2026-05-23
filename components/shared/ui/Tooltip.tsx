'use client'

import { ReactNode, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type TooltipProps = {
  content: string
  children: ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

/** Tooltip accesible con posicionamiento CSS puro */
export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const positionClass = {
    top:    '-top-9 left-1/2 -translate-x-1/2',
    bottom: '-bottom-9 left-1/2 -translate-x-1/2',
    left:   'top-1/2 -left-[calc(100%+8px)] -translate-y-1/2',
    right:  'top-1/2 -right-[calc(100%+8px)] -translate-y-1/2',
  }[side]

  return (
    <span
      ref={ref}
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-brand-lavender/20',
            'bg-brand-elevated px-3 py-1.5 text-xs font-medium text-[#f0f8ff] shadow-elevated',
            positionClass,
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}
