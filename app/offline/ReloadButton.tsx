"use client";

export function ReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="inline-flex items-center gap-2 rounded-2xl bg-brand-violet px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-iris"
    >
      Reintentar
    </button>
  );
}
