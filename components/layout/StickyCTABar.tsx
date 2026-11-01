"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      // Show after 400px, hide in last 300px near footer
      const nearFooter = scrollY + windowHeight > docHeight - 300;
      setVisible(scrollY > 400 && !nearFooter);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-14 z-40 flex justify-center px-4 transition-[transform,opacity] duration-300 md:hidden ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
    >
      <Link
        href="/contacto"
        className="w-full max-w-sm rounded-2xl bg-brand-violet py-3.5 text-center text-sm font-bold text-white shadow-[0_4px_24px_rgba(249,115,22,0.38)] transition hover:bg-brand-iris active:scale-95"
      >
        Consultar una demostración →
      </Link>
    </div>
  );
}
