import Image, { type ImageProps } from 'next/image'

type BlurImageProps = Omit<ImageProps, 'placeholder'> & {
  /** Optional pre-computed base64 blur placeholder. Falls back to 'empty' with a CSS gradient shimmer. */
  blurDataURL?: string
}

/**
 * Drop-in `next/image` wrapper that always enables blur-up placeholders.
 * - If `blurDataURL` is supplied: uses the provided value directly.
 * - Otherwise: uses a lightweight inline SVG gradient shimmer as the placeholder.
 *
 * Usage:
 *   <BlurImage src="/img/hero.webp" alt="Hero" width={1200} height={630} />
 */
export function BlurImage({ blurDataURL, alt, ...props }: BlurImageProps) {
  const placeholder = blurDataURL
    ? 'blur'
    : 'blur' // use fallback SVG below

  const fallbackBlur =
    'data:image/svg+xml;base64,' +
    btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${props.width ?? 100}" height="${props.height ?? 100}">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#05102c"/>
            <stop offset="100%" stop-color="#0a1840"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
      </svg>`,
    )

  return (
    <Image
      {...props}
      alt={alt}
      placeholder={placeholder}
      blurDataURL={blurDataURL ?? fallbackBlur}
    />
  )
}
