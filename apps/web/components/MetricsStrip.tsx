export type Metric = { value: string; label: string }

export function MetricsStrip({ items }: { items: Metric[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((m) => (
        <li key={m.label} className="glass-card p-5 text-center">
          <p className="text-3xl font-black gradient-text">{m.value}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-text-muted">{m.label}</p>
        </li>
      ))}
    </ul>
  )
}