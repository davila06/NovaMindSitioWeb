type WaveDividerProps = {
  /** Invierte la ola verticalmente */
  flip?: boolean;
  /** Color de relleno (clase Tailwind de texto) */
  className?: string;
};

/** Divisor orgánico SVG entre secciones */
export function WaveDivider({
  flip = false,
  className = "text-brand-surface/20",
}: WaveDividerProps) {
  return (
    <div
      className={`overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="h-12 w-full"
      >
        <path
          d="M0 48C240 16 480 0 720 0C960 0 1200 16 1440 48H0Z"
          className={`fill-current ${className}`}
        />
      </svg>
    </div>
  );
}
