import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 48,
        background:
          "radial-gradient(circle at 18% 10%, rgba(251,146,60,0.30), transparent 46%), radial-gradient(circle at 86% 84%, rgba(56,189,248,0.26), transparent 42%), linear-gradient(135deg, #081120, #12284A)",
        color: "#F8FAFC",
      }}
    >
      <div style={{ fontSize: 26, opacity: 0.92 }}>Novamind Global</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1 }}>
          IA aplicada a los negocios
        </div>
        <div style={{ fontSize: 30, opacity: 0.95 }}>
          Plataformas inteligentes para escalar operaciones
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
