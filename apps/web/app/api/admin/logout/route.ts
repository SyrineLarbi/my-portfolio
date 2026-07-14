import { NextResponse, type NextRequest } from 'next/server'

import { ADMIN_COOKIE } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // Native form POST from AdminClient → clear the cookie and redirect to login.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin
  const res = NextResponse.redirect(new URL('/admin/login', siteUrl), { status: 303 })
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 })
  return res
}
