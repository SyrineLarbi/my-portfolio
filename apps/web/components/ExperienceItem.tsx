export type ExperienceProps = {
  role: string
  company: string
  period: string
  location?: string
  bullets: string[]
}

export function ExperienceItem({ role, company, period, location, bullets }: ExperienceProps) {
  return (
    <article className="glass-card p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold">{role}</h3>
        <p className="text-sm text-text-muted">{period}</p>
      </div>
      <p className="text-sm text-text-muted">
        {company}
        {location ? ` · ${location}` : ''}
      </p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed">
        {bullets.map((b, i) => (
          <li key={i} className="pl-4 relative">
            <span aria-hidden className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-accent-magenta" />
            {b}
          </li>
        ))}
      </ul>
    </article>
  )
}