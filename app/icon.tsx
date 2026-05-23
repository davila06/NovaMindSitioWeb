import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 120,
        background:
          "radial-gradient(circle at 22% 18%, rgba(251,146,60,0.35), transparent 40%), radial-gradient(circle at 84% 82%, rgba(56,189,248,0.30), transparent 45%), linear-gradient(135deg, #081120, #12284A)",
        color: "#F8FAFC",
        fontSize: 180,
        fontWeight: 800,
        letterSpacing: -12,
      }}
    >
      NG
    </div>,
    {
      ...size,
    },
  );
}
