"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function StickyCTABar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isNovaAssist = pathname.startsWith("/nova-assist");
  const isRequestPage =
    isNovaAssist && pathname.endsWith("/solicitar");
  const shouldShow = visible && !isRequestPage;

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
      aria-hidden={!shouldShow}
      className={`fixed inset-x-0 bottom-[calc(5rem_+_env(safe-area-inset-bottom))] z-40 flex justify-center px-4 transition-[transform,opacity] duration-300 md:hidden ${shouldShow ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
    >
      <Link
        href={isNovaAssist ? "/nova-assist/solicitar" : "/contacto"}
        className="w-full max-w-sm rounded-2xl bg-brand-violet py-3.5 text-center text-sm font-bold text-white shadow-[0_4px_24px_rgba(249,115,22,0.38)] transition hover:bg-brand-iris active:scale-95"
      >
        {isNovaAssist ? "Solicitar ayuda →" : "Consultar una demostración →"}
      </Link>
    </div>
  );
}
