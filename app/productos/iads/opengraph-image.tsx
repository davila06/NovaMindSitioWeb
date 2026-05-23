import { generateProductOGImage, ogImageSize, ogImageContentType } from '@/lib/og-image'
export const size = ogImageSize
export const contentType = ogImageContentType
export default function OGImage() {
  return generateProductOGImage('IADS', 'Plataforma de análisis de datos empresariales con IA y dashboards en tiempo real.')
}
