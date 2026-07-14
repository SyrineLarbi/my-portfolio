import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

import { PERSONAS } from '@syrine/types'

import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

// Mirrors the retired NestJS TrackDto. Lenient on failure — analytics must
// never surface an error to the visitor.
const TrackSchema = z.object({
  path: z.string().max(200),
  persona: z.enum(PERSONAS).optional(),
  visitorId: z.string().uuid().optional(),
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = TrackSchema.safeParse(body)
  if (!parsed.success) {
    // Bad payload — silently drop, still 204 so the beacon never errors.
    return new NextResponse(null, { status: 204 })
  }

  try {
    await prisma.pageView.create({ data: parsed.data })
  } catch {
    // ignore — best-effort analytics
  }
  return new NextResponse(null, { status: 204 })
}
