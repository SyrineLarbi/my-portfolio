import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { SectionHeader } from '@/components/SectionHeader'
import { Hero } from '@/components/Hero'
import { PersonaTabs } from '@/components/PersonaTabs'
import { PERSONAS, personaMeta, type Persona } from '@syrine/types'
type SearchParams = Promise<{ persona?: string }>


export async function generateMetadata({
  searchParams,
}: { searchParams: SearchParams }): Promise<Metadata> {
  const { persona: raw } = await searchParams
  const active: Persona = (PERSONAS as readonly string[]).includes(raw ?? '')
    ? (raw as Persona)
    : 'fullstack'
  const meta = personaMeta[active]
  const title = `Syrine Larbi — ${meta.label}`
  const description = `${meta.label}: ${meta.subtitle}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `/og?persona=${active}`, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og?persona=${active}`],
    },
    alternates: {
      canonical: `/?persona=${active}`,
    },
  }
}


export default function HomePage() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<div className="px-6 py-12 text-text-muted">Loading…</div>}>
        <PersonaTabs />
      </Suspense>
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
         <SectionHeader eyebrow="Get in touch" title="Send a message" />
        <p className="mb-6 text-text-muted">
          The form below saves your message to Postgres (Neon) and emails me through Resend,
          all on Next.js serverless functions. You'll get a reply within 24 hours.
        </p>
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </section>
    </main>
  )
}
