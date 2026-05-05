'use client'

import { KeyboardEvent, useId, useState } from 'react'

type Tab = {
  label: string
  content: string
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0)
  const baseId = useId()

  function moveFocus(index: number) {
    const tab = document.getElementById(`${baseId}-tab-${index}`) as HTMLButtonElement | null
    tab?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      const next = (index + 1) % tabs.length
      setActive(next)
      moveFocus(next)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      const prev = (index - 1 + tabs.length) % tabs.length
      setActive(prev)
      moveFocus(prev)
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setActive(0)
      moveFocus(0)
    }

    if (event.key === 'End') {
      event.preventDefault()
      const last = tabs.length - 1
      setActive(last)
      moveFocus(last)
    }
  }

  if (!tabs.length) {
    return null
  }

  return (
    <div className="rounded-2xl border border-brand-interactive/20 bg-slate-900/72 p-4 shadow-soft">
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Pestañas de contenido">
        {tabs.map((tab, index) => (
          <button
            id={`${baseId}-tab-${index}`}
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${baseId}-panel-${index}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${index === active ? 'bg-brand-interactive/24 text-slate-50' : 'bg-slate-950/72 text-slate-300'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`${baseId}-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="text-sm text-slate-300"
      >
        {tabs[active].content}
      </div>
    </div>
  )
}
