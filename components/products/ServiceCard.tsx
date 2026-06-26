import Link from "next/link";
import { Check } from "lucide-react";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  href?: string;
  accent?: "violet" | "orange" | "sky";
};

const accentMap = {
  violet:
    "border-brand-lavender/30 hover:border-brand-lavender/60 hover:shadow-[0_8px_32px_-8px_rgba(139,92,246,0.35)]",
  orange:
    "border-orange-500/30 hover:border-orange-400/60 hover:shadow-[0_8px_32px_-8px_rgba(249,115,22,0.35)]",
  sky: "border-sky-500/30 hover:border-sky-400/60 hover:shadow-[0_8px_32px_-8px_rgba(14,165,233,0.35)]",
};

const accentIconBg = {
  violet: "bg-brand-violet/20 shadow-[0_4px_12px_rgba(139,92,246,0.3)]",
  orange: "bg-orange-500/20 shadow-[0_4px_12px_rgba(249,115,22,0.3)]",
  sky: "bg-sky-500/20 shadow-[0_4px_12px_rgba(14,165,233,0.3)]",
};

const accentIconMap = {
  violet: "text-brand-lavender",
  orange: "text-orange-400",
  sky: "text-sky-400",
};

// Cube face colours per accent
const accentCubeTop = {
  violet: "bg-gradient-to-br from-brand-iris/40 to-brand-violet/60",
  orange: "bg-gradient-to-br from-orange-300/40 to-orange-500/60",
  sky: "bg-gradient-to-br from-sky-300/40 to-sky-500/60",
};

const accentCubeSide = {
  violet: "bg-gradient-to-b from-brand-violet/60 to-brand-violet/30",
  orange: "bg-gradient-to-b from-orange-500/60 to-orange-600/30",
  sky: "bg-gradient-to-b from-sky-500/60 to-sky-600/30",
};

export function ServiceCard({
  icon,
  title,
  description,
  features,
  href,
  accent = "violet",
}: ServiceCardProps) {
  const card = (
    <div
      className={`group relative flex h-full flex-col rounded-2xl border bg-brand-card/80 p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 [transform-style:preserve-3d] ${accentMap[accent]}`}
    >
      {/* Ambient glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-b from-white/3 to-transparent"
        aria-hidden="true"
      />

      {/* 3D icon cube */}
      <div className="mb-5 [perspective:120px]">
        <div className="relative h-12 w-12 [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateX(-20deg)_rotateY(20deg)]">
          {/* Front face */}
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-xl ${accentIconBg[accent]} ${accentIconMap[accent]} [backface-visibility:hidden]`}
          >
            {icon}
          </div>
          {/* Top face */}
          <div
            className={`absolute inset-x-0 h-3 rounded-t-xl ${accentCubeTop[accent]} [backface-visibility:hidden] [transform:rotateX(90deg)_translateZ(6px)_translateY(-6px)]`}
            aria-hidden="true"
          />
          {/* Right face */}
          <div
            className={`absolute inset-y-0 right-0 w-3 rounded-r-xl ${accentCubeSide[accent]} [backface-visibility:hidden] [transform:rotateY(-90deg)_translateZ(6px)_translateX(6px)]`}
            aria-hidden="true"
          />
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold text-[#f0f8ff]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {description}
      </p>
      {features && features.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {features.map((feat) => (
            <li
              key={feat}
              className="flex items-start gap-2 text-sm text-text-muted"
            >
              <Check
                className={`mt-0.5 h-4 w-4 shrink-0 ${accentIconMap[accent]}`}
                aria-hidden="true"
              />
              {feat}
            </li>
          ))}
        </ul>
      )}
      {href && (
        <span
          className={`mt-auto pt-5 text-sm font-semibold ${accentIconMap[accent]} group-hover:underline`}
        >
          Saber más →
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender rounded-2xl"
      >
        {card}
      </Link>
    );
  }

  return card;
}

