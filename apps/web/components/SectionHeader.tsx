export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-6">
      <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold">{title}</h2>
    </header>
  )
}