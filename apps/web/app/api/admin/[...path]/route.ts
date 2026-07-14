import { NextResponse, type NextRequest } from 'next/server'

import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

// Authed admin data reads (ported from the retired NestJS AdminService).
async function handle(path: string[]) {
  const resource = path[0]

  switch (resource) {
    case 'messages':
      return NextResponse.json(
        await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
      )
    case 'downloads':
      return NextResponse.json(
        await prisma.cvDownload.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
      )
    case 'views': {
      const since = new Date(Date.now() - 30 * 86_400_000)
      const rows = await prisma.pageView.groupBy({
        by: ['persona'],
        where: { createdAt: { gte: since } },
        _count: { _all: true },
      })
      return NextResponse.json(rows)
    }
    default:
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return handle((await ctx.params).path)
}
