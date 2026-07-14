'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { cn } from '@/lib/cn'

import { useCvCount } from '../lib/use-cv-count'

type Size = 'sm' | 'md'

function CvButton({
  size,
  persona,
  count,
}: {
  size: Size
  persona: string
  count: number | null
}) {
  const sizeClass = size === 'sm' ? 'px-5 py-2 text-sm' : 'px-7 py-3 text-sm'

  return (
    <a
      href={`/api/cv?persona=${persona}`}
      className={cn(
        'inline-flex items-center gap-2 rounded-pill bg-gradient-primary font-bold shadow-glow hover:-translate-y-0.5 transition',
        sizeClass,
      )}
    >
      <span>Download CV</span>
      {count !== null && (
        <span
          aria-label={`${count} downloads so far`}
          className="rounded-pill bg-black/20 px-2 py-0.5 text-[10px] font-bold tabular-nums"
        >
          {count.toLocaleString()}
        </span>
      )}
    </a>
  )
}

function CvDownloadButtonInner({ size }: { size: Size }) {
  const params = useSearchParams()
  const persona = params.get('persona') ?? 'fullstack'
  const { count } = useCvCount()

  return <CvButton size={size} persona={persona} count={count} />
}

export function CvDownloadButton({ size = 'md' }: { size?: Size }) {
  // useSearchParams() must sit under a Suspense boundary or it bails static
  // generation of every page that renders this button. Self-wrapping keeps
  // each call site (SiteNav, Hero, …) safe without its own boundary.
  return (
    <Suspense fallback={<CvButton size={size} persona="fullstack" count={null} />}>
      <CvDownloadButtonInner size={size} />
    </Suspense>
  )
}
