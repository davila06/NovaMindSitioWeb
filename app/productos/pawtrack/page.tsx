import type { Metadata } from "next";
import { ProductPageContent } from "@/components/products/ProductPageContent";
import { productBySlug } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "PawTrack CR / NALA | Identidad y recuperacion de mascotas",
  description:
    "PawTrack CR, inspirado por NALA: identidad digital por QR y herramientas de recuperacion y cuidado. Un producto de NovaMind Global.",
  path: "/productos/pawtrack",
});

export default function PawtrackPage() {
  return <ProductPageContent product={productBySlug.pawtrack} />;
}
