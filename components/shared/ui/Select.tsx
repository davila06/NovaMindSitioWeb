type SelectProps = {
  label: string
  name: string
  options: string[]
}

export function Select({ label, name, options }: SelectProps) {
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-200">
      <span>{label}</span>
      <select name={name} className="w-full rounded-xl border border-brand-interactive/22 bg-slate-950/72 px-4 py-2.5 text-sm text-slate-100 outline-none ring-brand-interactive transition focus:ring-2">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}
