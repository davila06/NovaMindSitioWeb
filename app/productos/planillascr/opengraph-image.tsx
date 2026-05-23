import { generateProductOGImage, ogImageSize, ogImageContentType } from '@/lib/og-image'
export const size = ogImageSize
export const contentType = ogImageContentType
export default function OGImage() {
  return generateProductOGImage('PlanillasCR', 'Nómina en Costa Rica con IA: CCSS, INS, cálculos automáticos y reportes BCCR.')
}
