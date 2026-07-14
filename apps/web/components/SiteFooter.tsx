import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 mt-32 px-6 py-10 text-center text-sm text-text-muted">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Syrine Larbi · Built with Next.js · NestJS · Neon · BullMQ</p>
        <div className="flex gap-4">
          <Link href="https://github.com/SyrineLarbi" target="_blank" className="hover:text-text">
            <Github />
          </Link>
          <Link href="https://linkedin.com/in/syrine-larbi" target="_blank" className="hover:text-text">
            <Linkedin />
          </Link>
          <a href="mailto:syrinelarbi9@gmail.com" className="hover:text-text">
            <Mail />
          </a>
        </div>
      </div>
    </footer>
  )
}