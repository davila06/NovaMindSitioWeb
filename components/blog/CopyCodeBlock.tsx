'use client'

import { useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'

type Props = { children: ReactNode; className?: string }

/**
 * Wraps `<pre>` blocks in MDX with a copy-to-clipboard button.
 * Passed as a custom component to MDXRemote.
 */
export function CopyCodeBlock({ children, className }: Props) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    // Extract text from the children tree
    const text = extractText(children)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => { /* clipboard access denied */ })
  }

  return (
    <div className="group relative">
      <pre className={className}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Copiado' : 'Copiar código'}
        title={copied ? 'Copiado' : 'Copiar código'}
        className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg border border-brand-lavender/20 bg-brand-void/80 text-text-subtle backdrop-blur transition ${copied ? 'border-emerald-500/40 text-emerald-400' : 'opacity-0 group-hover:opacity-100 hover:border-brand-lavender/40 hover:text-[#f0f8ff]'}`}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}

/** Recursively extract text content from React children. */
function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    const element = node as React.ReactElement<{ children?: ReactNode }>
    return extractText(element.props.children)
  }
  return ''
}
