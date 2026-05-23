"use client";

import { useState } from "react";
import { Play, X, ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics-client";

type Props = {
  /** YouTube video ID or full URL */
  videoId: string;
  /** Poster image URL shown before play */
  posterUrl?: string;
  title?: string;
  description?: string;
  /** 'youtube' | 'loom' | 'vimeo' — defaults to youtube */
  provider?: "youtube" | "loom" | "vimeo";
};

function getEmbedUrl(videoId: string, provider: string): string {
  const cleanId =
    videoId.replace(/^https?:\/\/.*[?&v=]/, "").split("&")[0] ?? videoId;
  switch (provider) {
    case "loom":
      return `https://www.loom.com/embed/${cleanId}?autoplay=1&hide_owner=true&hide_share=true`;
    case "vimeo":
      return `https://player.vimeo.com/video/${cleanId}?autoplay=1&color=0ea5e9&title=0&byline=0`;
    default: // youtube
      return `https://www.youtube-nocookie.com/embed/${cleanId}?autoplay=1&rel=0&modestbranding=1&color=white`;
  }
}

export function ProductVideoSection({
  videoId,
  posterUrl,
  title,
  description,
  provider = "youtube",
}: Props) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = getEmbedUrl(videoId, provider);

  function handlePlay() {
    setPlaying(true);
    trackEvent("product_video_play", { videoId, provider });
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-brand-lavender/18 bg-brand-card/60 backdrop-blur-sm">
      {/* Header */}
      {(title || description) && (
        <div className="px-6 pb-0 pt-6 sm:px-8">
          {title && (
            <p className="font-display text-xl font-bold text-[#f0f8ff] sm:text-2xl">
              {title}
            </p>
          )}
          {description && (
            <p className="mt-1.5 text-sm text-text-muted">{description}</p>
          )}
        </div>
      )}

      {/* Video area */}
      <div className="relative mx-6 mb-6 mt-4 overflow-hidden rounded-2xl sm:mx-8">
        {/* 16:9 aspect ratio */}
        <div className="relative aspect-video w-full bg-brand-void">
          {playing ? (
            <div className="absolute inset-0">
              <iframe
                src={embedUrl}
                title={title ?? "Demo del producto"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="h-full w-full border-0"
              />
              <button
                onClick={() => setPlaying(false)}
                aria-label="Cerrar video"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-void/70 text-text-muted backdrop-blur hover:text-[#f0f8ff]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            /* Poster / play button */
            <button
              onClick={handlePlay}
              aria-label={`Reproducir demo: ${title ?? "video del producto"}`}
              className="group absolute inset-0 flex items-center justify-center"
            >
              {/* Poster image overlay */}
              {posterUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={posterUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-brand-void via-brand-surface to-brand-card"
                />
              )}

              {/* Dark overlay on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-brand-void/40 transition group-hover:bg-brand-void/55"
              />

              {/* Play button */}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-white/15 backdrop-blur-md transition-transform group-hover:scale-110">
                <Play className="ml-1 h-8 w-8 fill-white text-white" />
              </div>

              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-void/70 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm">
                Ver demo
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Footer link */}
      <div className="flex justify-end border-t border-brand-lavender/10 px-6 py-3 sm:px-8">
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-text-subtle hover:text-text-muted transition"
          onClick={() => trackEvent("product_video_external", { videoId })}
        >
          Abrir en YouTube
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </section>
  );
}
