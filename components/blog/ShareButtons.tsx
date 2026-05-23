"use client";

import { useState } from "react";
import { Link2, Linkedin, Twitter, Check } from "lucide-react";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-muted">Compartir:</span>

      <button
        onClick={copyLink}
        aria-label="Copiar enlace"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-lavender/20 text-text-muted transition hover:border-brand-lavender/50 hover:text-brand-lavender"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-brand-violet" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
      </button>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en LinkedIn"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-lavender/20 text-text-muted transition hover:border-brand-lavender/50 hover:text-brand-lavender"
      >
        <Linkedin className="h-3.5 w-3.5" />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en X (Twitter)"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-lavender/20 text-text-muted transition hover:border-brand-lavender/50 hover:text-brand-lavender"
      >
        <Twitter className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
