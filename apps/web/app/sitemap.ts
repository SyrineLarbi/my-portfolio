import type { MetadataRoute } from 'next'

import { PERSONAS } from '@syrine/types'
import { listProjects } from '@/lib/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://syrine.dev'
  const today = new Date()

  const personaRoutes: MetadataRoute.Sitemap = PERSONAS.map((p) => ({
    url: `${base}/?persona=${p}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: p === 'fullstack' ? 1 : 0.8,
  }))

  let projectRoutes: MetadataRoute.Sitemap = []
  try {
    const projects = await listProjects()
    projectRoutes = projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: today,
      changeFrequency: 'yearly' as const,
      priority: p.flagship ? 0.9 : 0.6,
    }))
  } catch {
    // listProjects might not exist if Step 9 was skipped
  }

  return [{ url: base, lastModified: today, priority: 1 }, ...personaRoutes, ...projectRoutes]
}