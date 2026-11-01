import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Node.js runtime needed because getBlogPostBySlug uses fs/path

type Props = { params: Promise<{ slug: string }> };

export default async function BlogOGImage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  const title = post?.title ?? "Blog — Novamind Global";
  const category = post?.category ?? "IA Aplicada";
  const summary =
    post?.summary ??
    "Insights sobre IA empresarial y transformación digital para LATAM.";

  // Truncate title to prevent overflow
  const displayTitle = title.length > 72 ? title.slice(0, 69) + "…" : title;
  const displaySummary =
    summary.length > 130 ? summary.slice(0, 127) + "…" : summary;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "52px 60px",
        background:
          "radial-gradient(circle at 10% 20%, rgba(56,189,248,0.20), transparent 40%), radial-gradient(circle at 90% 85%, rgba(251,146,60,0.18), transparent 38%), linear-gradient(145deg, #030812 0%, #05102c 50%, #0a1840 100%)",
        color: "#f0f8ff",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top row: brand + category */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 1,
            color: "#38bdf8",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "rgba(14,165,233,0.25)",
              border: "1.5px solid rgba(56,189,248,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            N
          </div>
          Novamind Global
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#f97316",
            border: "1.5px solid rgba(249,115,22,0.35)",
            borderRadius: 999,
            padding: "6px 18px",
          }}
        >
          {category}
        </div>
      </div>

      {/* Main title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: displayTitle.length > 50 ? 52 : 64,
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#f0f8ff",
            letterSpacing: -1.5,
            maxWidth: 1000,
          }}
        >
          {displayTitle}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "rgba(240,248,255,0.60)",
            lineHeight: 1.45,
            maxWidth: 900,
            fontWeight: 400,
          }}
        >
          {displaySummary}
        </div>
      </div>

      {/* Bottom: blog badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            fontSize: 18,
            color: "rgba(240,248,255,0.45)",
            borderTop: "1px solid rgba(56,189,248,0.15)",
            paddingTop: 16,
          }}
        >
          novamindglobalcr.com/blog
        </div>
        <div
          style={{
            marginLeft: "auto",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#38bdf8",
            boxShadow: "0 0 16px 4px rgba(56,189,248,0.5)",
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
