import fs from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'

import type { Persona } from '@syrine/types'

export type ProjectMeta = {
  slug: string
  title: string
  blurb: string
  stack: string[]
  personas: Persona[]
  flagship?: boolean
  comingSoon?: boolean
  links?: { github?: string; demo?: string; nbviewer?: string }
}

const dir = path.join(process.cwd(), 'content', 'projects')

export async function listProjects(): Promise<ProjectMeta[]> {
  const files = await fs.readdir(dir)
  const all = await Promise.all(
    files.filter((f) => f.endsWith('.mdx')).map(async (f) => {
      const raw = await fs.readFile(path.join(dir, f), 'utf8')
      const { data } = matter(raw)
      return { slug: f.replace(/\.mdx$/, ''), ...(data as Omit<ProjectMeta, 'slug'>) }
    }),
  )
  return all.sort((a, b) => Number(!!b.flagship) - Number(!!a.flagship))
}

export async function getProject(slug: string) {
  const file = path.join(dir, `${slug}.mdx`)
  const raw = await fs.readFile(file, 'utf8')
  const { data, content } = matter(raw)
  return { meta: { slug, ...(data as Omit<ProjectMeta, 'slug'>) }, content }
}