'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react'
import { useFocusTrap } from '@/lib/useFocusTrap'
import { trackEvent } from '@/lib/analytics-client'

const DEMO_SLOTS = [
  { day: 'Lunes', times: ['9:00 AM', '11:00 AM', '3:00 PM'] },
  { day: 'Miércoles', times: ['10:00 AM', '2:00 PM', '4:00 PM'] },
  { day: 'Viernes', times: ['9:00 AM', '11:00 AM'] },
]

type DemoCalendarModalProps = {
  trigger?: React.ReactNode
  defaultOpen?: boolean
}

export function DemoCalendarModal({ trigger, defaultOpen = false }: DemoCalendarModalProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useFocusTrap(panelRef, isOpen, triggerRef)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  function open(e: React.MouseEvent) {
    triggerRef.current = e.currentTarget as HTMLElement
    setIsOpen(true)
    trackEvent('demo_calendar_open', {})
  }

  function handleBook() {
    if (!selectedSlot) return
    trackEvent('demo_calendar_book', { slot: selectedSlot })
    setBooked(true)
  }

  const defaultTrigger = (
    <button
      onClick={open}
      className="inline-flex items-center gap-2 rounded-2xl bg-brand-violet px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-iris"
    >
      <Calendar className="h-4 w-4" />
      Agendar demo
    </button>
  )

  return (
    <>
      {trigger ? (
        <span onClick={open} className="cursor-pointer">
          {trigger}
        </span>
      ) : defaultTrigger}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Agendar demo con Novamind"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-brand-void/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} aria-hidden="true" />

          <div ref={panelRef} className="relative w-full max-w-md rounded-3xl border border-brand-lavender/20 bg-brand-card/98 p-6 shadow-elevated backdrop-blur-xl">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Demo personalizada</p>
                <h2 className="mt-1 font-display text-xl font-bold text-[#f0f8ff]">Elige tu horario</h2>
                <p className="mt-1 text-sm text-text-muted">30 minutos · Sin compromiso · Zoom</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-brand-lavender/10 hover:text-[#f0f8ff]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {booked ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-emerald-400" />
                <p className="font-display text-lg font-bold text-[#f0f8ff]">¡Demo agendada!</p>
                <p className="mt-2 text-sm text-text-muted">
                  Horario seleccionado: <strong className="text-[#f0f8ff]">{selectedSlot}</strong>
                </p>
                <p className="mt-1 text-sm text-text-muted">Te contactaremos para confirmar los detalles.</p>
                <button
                  onClick={() => { setIsOpen(false); setBooked(false); setSelectedSlot(null) }}
                  className="mt-6 rounded-xl border border-brand-lavender/20 px-4 py-2 text-sm text-text-muted hover:text-[#f0f8ff]"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                {/* Benefits */}
                <div className="mb-5 grid grid-cols-3 gap-2">
                  {[
                    { icon: <Clock className="h-4 w-4" />, label: '30 min' },
                    { icon: <Users className="h-4 w-4" />, label: 'Tu industria' },
                    { icon: <CheckCircle2 className="h-4 w-4" />, label: 'Sin costo' },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1 rounded-xl border border-brand-lavender/10 bg-brand-void/40 py-2.5 text-xs text-text-muted">
                      <span className="text-brand-lavender">{b.icon}</span>
                      {b.label}
                    </div>
                  ))}
                </div>

                {/* Slot picker */}
                <div className="space-y-4">
                  {DEMO_SLOTS.map((daySlot) => (
                    <div key={daySlot.day}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-subtle">{daySlot.day}</p>
                      <div className="flex flex-wrap gap-2">
                        {daySlot.times.map((time) => {
                          const slotKey = `${daySlot.day} ${time}`
                          const isSelected = selectedSlot === slotKey
                          return (
                            <button
                              key={time}
                              onClick={() => setSelectedSlot(slotKey)}
                              className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition ${isSelected ? 'border-brand-violet bg-brand-violet text-white' : 'border-brand-lavender/20 text-text-muted hover:border-brand-lavender/40 hover:text-[#f0f8ff]'}`}
                            >
                              {time}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleBook}
                  disabled={!selectedSlot}
                  className="mt-6 w-full rounded-2xl bg-brand-violet py-3 text-sm font-semibold text-white transition hover:bg-brand-iris disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {selectedSlot ? `Confirmar: ${selectedSlot}` : 'Selecciona un horario'}
                </button>

                <p className="mt-3 text-center text-xs text-text-subtle">
                  O escríbenos a{' '}
                  <a href="mailto:contacto@novamindglobal.com" className="text-brand-lavender hover:underline">
                    contacto@novamindglobal.com
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
