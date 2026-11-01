import {
  generateProductOGImage,
  ogImageSize,
  ogImageContentType,
} from "@/lib/og-image";
export const size = ogImageSize;
export const contentType = ogImageContentType;
export default function OGImage() {
  return generateProductOGImage(
    "PawTrack CR / NALA",
    "Identidad, recuperacion y cuidado. Inspirado por NALA.",
  );
}
