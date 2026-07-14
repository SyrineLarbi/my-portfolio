export function NarrativeCard({ title, body }: { title: string; body: string[] }) {
  return (
    <article className="glass-card p-6 md:p-8">
      <h3 className="text-lg font-bold gradient-text">{title}</h3>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted">
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  )
}