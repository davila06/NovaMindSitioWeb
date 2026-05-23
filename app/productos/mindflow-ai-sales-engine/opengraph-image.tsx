import { generateProductOGImage, ogImageSize, ogImageContentType } from '@/lib/og-image'
export const size = ogImageSize
export const contentType = ogImageContentType
export default function OGImage() {
  return generateProductOGImage('MindFlow AI Sales Engine', 'Motor de ventas con IA: scoring, secuencias y conversión automática.')
}
