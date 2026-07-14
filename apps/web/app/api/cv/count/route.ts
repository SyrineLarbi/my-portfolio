import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const count = await prisma.cvDownload.count()
    return NextResponse.json(
      { count },
      { headers: { 'Cache-Control': 'public, max-age=15' } },
    )
  } catch {
    return NextResponse.json({ count: 0 }, { status: 200 })
  }
}
