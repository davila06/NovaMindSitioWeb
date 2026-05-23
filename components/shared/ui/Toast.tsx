type ToastProps = {
  title: string;
  message: string;
  variant?: "success" | "error" | "info";
};

export function Toast({ title, message, variant = "info" }: ToastProps) {
  const styles =
    variant === "success"
      ? "border-brand-violet/25 bg-brand-violet/10 text-brand-violet"
      : variant === "error"
        ? "border-rose-200 bg-rose-50 text-rose-700"
        : "border-sky-200 bg-sky-50 text-sky-700";

  const role = variant === "error" ? "alert" : "status";

  return (
    <div
      role={role}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={`rounded-xl border px-4 py-3 text-sm ${styles}`}
    >
      <strong className="block font-semibold">{title}</strong>
      <span>{message}</span>
    </div>
  );
}
