'use client'

import { ChevronDown } from 'lucide-react'
import { KeyboardEvent, useId, useState } from 'react'

type AccordionItem = {
  question: string
  answer: string
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [active, setActive] = useState<number | null>(0)
  const baseId = useId()

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = (index + 1) % items.length
      const nextButton = document.getElementById(`${baseId}-trigger-${nextIndex}`) as HTMLButtonElement | null
      nextButton?.focus()
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const prevIndex = (index - 1 + items.length) % items.length
      const prevButton = document.getElementById(`${baseId}-trigger-${prevIndex}`) as HTMLButtonElement | null
      prevButton?.focus()
    }

    if (event.key === 'Home') {
      event.preventDefault()
      const firstButton = document.getElementById(`${baseId}-trigger-0`) as HTMLButtonElement | null
      firstButton?.focus()
    }

    if (event.key === 'End') {
      event.preventDefault()
      const lastButton = document.getElementById(`${baseId}-trigger-${items.length - 1}`) as HTMLButtonElement | null
      lastButton?.focus()
    }
  }

  return (
    <div className="space-y-3" role="region" aria-label="Preguntas frecuentes">
      {items.map((item, index) => {
        const open = active === index
        const triggerId = `${baseId}-trigger-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div key={item.question} className="rounded-2xl border border-brand-interactive/20 bg-slate-900/72">
            <button
              id={triggerId}
              type="button"
              className="flex w-full items-center justify-between px-4 py-3 text-left font-medium"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setActive(open ? null : index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {item.question}
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <p id={panelId} role="region" aria-labelledby={triggerId} className="px-4 pb-4 text-sm text-slate-300">
                {item.answer}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
