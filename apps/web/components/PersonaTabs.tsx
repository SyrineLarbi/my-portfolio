'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { PERSONAS, personaMeta, type Persona } from '@syrine/types'

import { cn } from '@/lib/cn'

import { DataScientistTab } from './tabs/DataScientist'
import { FullstackTab } from './tabs/Fullstack'
import { ManagerTab } from './tabs/Manager'

const tabComponents: Record<Persona, () => React.JSX.Element> = {
  fullstack: FullstackTab,
  data: DataScientistTab,
  manager: ManagerTab,
}

export function PersonaTabs() {
  const router = useRouter()
  const params = useSearchParams()
  const raw = params.get('persona')
  const active: Persona = (PERSONAS as readonly string[]).includes(raw ?? '')
    ? (raw as Persona)
    : 'fullstack'

  // Beacon page-view (Phase 2.6 endpoint)
  useEffect(() => {
    const body = JSON.stringify({ path: '/', persona: active })
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon('/api/track', blob)
    }
  }, [active])

  const setActive = useCallback(
    (p: Persona) => {
      const next = new URLSearchParams(params)
      next.set('persona', p)
      router.replace(`?${next.toString()}`, { scroll: false })
    },
    [params, router],
  )

  const Active = tabComponents[active]

  return (
    <section id="tabs" className="mx-auto max-w-6xl px-6">
      <div className="sticky top-[60px] z-40 -mx-6 border-y border-border-translucent bg-bg/80 px-6 py-3 backdrop-blur-md">
        <div role="tablist" aria-label="What I do" className="flex flex-wrap gap-2">
          {PERSONAS.map((p) => (
            <button
              key={p}
              role="tab"
              aria-selected={active === p}
              onClick={() => setActive(p)}
              className={cn(
                'relative rounded-pill px-5 py-2 text-sm font-bold transition',
                active === p
                  ? 'text-text'
                  : 'text-text-muted hover:text-text',
              )}
            >
              {active === p && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-0 -z-10 rounded-pill bg-gradient-primary shadow-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span>{personaMeta[p].label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="tabpanel"
        >
          <div className="mt-8 mb-2 text-sm uppercase tracking-[0.3em] text-text-muted">
            {personaMeta[active].subtitle}
          </div>
          <Active />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
