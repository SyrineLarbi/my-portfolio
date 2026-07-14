import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'

import { BackgroundGlow } from '@/components/BackgroundGlow'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteNav } from '@/components/SiteNav'

import './globals.css'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-raleway',
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'Syrine Larbi — Full-Stack · Data · Management',
  description:
    "Syrine Larbi's portfolio — Full-Stack Developer (NestJS / Next.js / Prisma), Data Scientist (Python / XGBoost / pandas), and Manager.",
  metadataBase: new URL('https://syrine.dev'),
  openGraph: {
    title: 'Syrine Larbi — Portfolio',
    description: 'Full-Stack · Data · Manager',
    type: 'website',
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   <html lang="en" className={raleway.variable}>
      <body className="min-h-screen bg-bg text-text antialiased">
        <BackgroundGlow />
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}