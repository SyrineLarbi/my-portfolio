import { NextResponse, type NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const persona = req.nextUrl.searchParams.get('persona') ?? 'fullstack'
  const ua = req.headers.get('user-agent') ?? ''
  const country = req.headers.get('x-vercel-ip-country') ?? ''

  // Best-effort: log the download for the public counter. Never block or fail
  // the download if the DB happens to be unavailable.
  try {
    await prisma.cvDownload.create({ data: { ua, country, persona } })
  } catch {
    // ignore — the counter is nice-to-have, the download is not
  }

  // Redirect to the CV static asset in public/cv. This is the file that ships
  // with every web deploy, so replacing the PDF in public/cv and redeploying
  // is all that's ever needed. Using the request's own origin means this works
  // on preview and production without depending on any env var.
  return NextResponse.redirect(new URL('/cv/Syrine_Larbi_EN.pdf', req.nextUrl.origin))
}
