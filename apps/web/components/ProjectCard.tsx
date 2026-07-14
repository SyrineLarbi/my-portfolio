import type { Route } from 'next'
import Link from 'next/link'

export type ProjectProps = {
  title: string
  blurb: string
  stack: string[]
  links?: { github?: string; demo?: string; nbviewer?: string; example?: string }
  highlight?: boolean
  comingSoon?: boolean
  /** When set, the card title links to the /projects/<slug> detail page. */
  slug?: string
}

export function ProjectCard({ title, blurb, stack, links, highlight, comingSoon, slug }: ProjectProps) {
  const detailHref = slug ? (`/projects/${slug}` as Route) : null

  return (
    <article
      className={`glass-card p-6 ${highlight ? 'ring-1 ring-accent-magenta/40 shadow-card' : ''} ${
        comingSoon ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          {highlight && (
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-accent-magenta">Flagship</p>
          )}
          <h3 className="text-lg font-bold">
            {detailHref ? (
              <Link href={detailHref} className="hover:underline">
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
        </div>
        {comingSoon && (
          <span className="rounded-pill border border-accent-cyan/40 bg-accent-cyan/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-cyan">
            Coming soon
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-text-muted">{blurb}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5 text-xs text-text-muted">
        {stack.map((s) => (
          <li key={s} className="rounded-pill border border-border-translucent px-2 py-0.5">
            {s}
          </li>
        ))}
      </ul>
      {!comingSoon && (links || detailHref) && (
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
          {detailHref && (
            <Link href={detailHref} className="text-text hover:underline">
              Details →
            </Link>
          )}
          {links?.github && (
            <a href={links.github} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline">
              GitHub →
            </a>
          )}
          {links?.demo && (
            <a href={links.demo} target="_blank" rel="noreferrer" className="text-accent-magenta hover:underline">
              Live demo →
            </a>
          )}
          {links?.example && (
            <a href={links.example} target="_blank" rel="noreferrer" className="text-accent-magenta hover:underline">
              Live example →
            </a>
          )}
          {links?.nbviewer && (
            <a href={links.nbviewer} target="_blank" rel="noreferrer" className="text-accent-cyan hover:underline">
              Notebook →
            </a>
          )}
        </div>
      )}
    </article>
  )
}
