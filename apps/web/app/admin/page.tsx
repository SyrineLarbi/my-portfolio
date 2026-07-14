import { redirect } from 'next/navigation'

import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

import { AdminClient } from './AdminClient'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const admin = await requireAdmin()
  if (!admin) redirect('/admin/login')

  const since = new Date(Date.now() - 30 * 86_400_000)
  const [messagesRaw, downloadsRaw, views] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
    prisma.cvDownload.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
    prisma.pageView.groupBy({
      by: ['persona'],
      where: { createdAt: { gte: since } },
      _count: { _all: true },
    }),
  ])

  // AdminClient types createdAt as a string (it came from res.json() before);
  // serialize the Date columns so the contract and types stay unchanged.
  const messages = messagesRaw.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() }))
  const downloads = downloadsRaw.map((d) => ({ ...d, createdAt: d.createdAt.toISOString() }))

  return <AdminClient messages={messages} downloads={downloads} views={views} />
}
