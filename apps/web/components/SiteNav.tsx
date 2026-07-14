'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CvDownloadButton } from './CvDownloadButton'
import { cn } from '@/lib/cn'

const links = [
  { href: '#about', label: 'About' },
  { href: '#tabs', label: 'What I do' },
  { href: '#contact', label: 'Contact' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors duration-300',
        scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="gradient-text">Syrine</span>
          <span className="text-text-muted">.dev</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-text transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <CvDownloadButton size="sm" />
      </nav>
    </header>
  )
}