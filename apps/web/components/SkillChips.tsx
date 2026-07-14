import { cn } from '@/lib/cn'

export type SkillGroup = { label: string; items: string[] }

export function SkillChips({ groups }: { groups: SkillGroup[] }) {
  return (
    <ul className="space-y-4">
      {groups.map((g) => (
        <li key={g.label}>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-text-muted">{g.label}</p>
          <div className="flex flex-wrap gap-2">
            {g.items.map((item) => (
              <span
                key={item}
                className={cn(
                  'rounded-pill border border-border-translucent bg-surface-translucent',
                  'px-3 py-1 text-xs font-bold',
                )}
              >
                {item}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}