import { notFound } from 'next/navigation'

import { getProject, listProjects } from '@/lib/projects'

export async function generateStaticParams() {
  const list = await listProjects()
  return list.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { meta } = await getProject(slug)
    return { title: `${meta.title} — Syrine Larbi`, description: meta.blurb }
  } catch {
    return {}
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let mdx
  try {
    mdx = await import(`@/content/projects/${slug}.mdx`)
  } catch {
    notFound()
  }
  const Content = mdx.default
  const { meta } = await getProject(slug)

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 prose prose-invert">
      <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{meta.flagship ? 'Flagship' : 'Project'}</p>
      <h1 className="gradient-text">{meta.title}</h1>
      <p className="lead text-text-muted">{meta.blurb}</p>
      <Content />
    </main>
  )
}