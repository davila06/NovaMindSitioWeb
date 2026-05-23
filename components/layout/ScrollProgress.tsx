'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      if (barRef.current) barRef.current.style.width = `${progress}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 h-[2px] w-full"
    >
      <div
        ref={barRef}
        className="h-full w-0 bg-gradient-to-r from-brand-violet via-brand-iris to-brand-gold transition-[width] duration-100 ease-out"
      />
    </div>
  )
}