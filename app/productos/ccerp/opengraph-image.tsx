import { generateProductOGImage, ogImageSize, ogImageContentType } from '@/lib/og-image'
export const size = ogImageSize
export const contentType = ogImageContentType
export default function OGImage() {
  return generateProductOGImage('CCERP', 'ERP multi-empresa con IA para pymes y grupos empresariales de Costa Rica.')
}
