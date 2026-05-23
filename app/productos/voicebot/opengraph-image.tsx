import { generateProductOGImage, ogImageSize, ogImageContentType } from '@/lib/og-image'
export const size = ogImageSize
export const contentType = ogImageContentType
export default function OGImage() {
  return generateProductOGImage('VoiceBot Multi-Tenant', 'Omnicanalidad, automatización y atención inteligente para contact centers.')
}
