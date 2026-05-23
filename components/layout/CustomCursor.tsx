'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on non-touch pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    document.addEventListener('mousemove', onMove)

    const animate = () => {
      // Dot follows cursor exactly
      if (dotRef.current) {
        dotRef.current.style.left = mouseX - 4 + 'px'
        dotRef.current.style.top = mouseY - 4 + 'px'
      }
      // Ring lags with lerp
      ringX += (mouseX - ringX) * 0.14
      ringY += (mouseY - ringY) * 0.14
      if (ringRef.current) {
        ringRef.current.style.left = ringX - 18 + 'px'
        ringRef.current.style.top = ringY - 18 + 'px'
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    // Hide cursor on links/buttons — enlarge ring
    const onEnter = () => ringRef.current?.classList.add('cursor-hover')
    const onLeave = () => ringRef.current?.classList.remove('cursor-hover')
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-brand-violet hidden md:block"
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] h-9 w-9 rounded-full border border-brand-lavender/60 transition-[width,height,border-color] duration-200 hidden md:block [&.cursor-hover]:h-12 [&.cursor-hover]:w-12 [&.cursor-hover]:border-brand-iris/80"
      />
    </>
  )
}
