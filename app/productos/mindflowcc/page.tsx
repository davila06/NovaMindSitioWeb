import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function MindflowCcPage() {
  permanentRedirect('/productos/mindflow-ai-sales-engine')
}
