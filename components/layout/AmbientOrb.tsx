"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientOrb — a large, slow-moving gradient blob that follows the cursor
 * across the entire site with heavy lerp (0.04), creating the "breathing page"
 * effect seen on Linear.app, Vercel, and top-tier SaaS products.
 *
 * Only visible on non-touch devices. GPU-accelerated via `transform`.
 * Z-index: 0 — behind all content, above background.
 */
export function AmbientOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch/mobile — skip entirely (performance + irrelevant without cursor)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      // Lerp 0.04 = very slow lag — the orb lags behind the cursor like a shadow
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      if (orbRef.current) {
        // transform is GPU-accelerated; much better than left/top
        orbRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      className={[
        "pointer-events-none fixed left-0 top-0 z-0",
        "hidden md:block",
        // Size — large enough to fill a viewport quadrant
        "h-[720px] w-[720px] rounded-full",
        // Radial gradient: brand-violet core → brand-iris mid → transparent edge
        "bg-[radial-gradient(circle,rgba(139,92,246,0.09)_0%,rgba(99,102,241,0.05)_38%,transparent_70%)]",
        // Heavy blur to keep it ambient, not distracting
        "blur-3xl",
        // GPU hint
        "will-change-transform",
      ].join(" ")}
    />
  );
}
