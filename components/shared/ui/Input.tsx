type InputProps = {
  label: string
  name: string
  type?: string
  placeholder?: string
}

export function Input({ label, name, type = 'text', placeholder }: InputProps) {
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-200">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-brand-interactive/22 bg-slate-950/72 px-4 py-2.5 text-sm text-slate-100 outline-none ring-brand-interactive transition focus:ring-2"
      />
    </label>
  )
}
