import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sin conexión | Novamind Global',
  description: 'No hay conexión a Internet en este momento.',
}

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
