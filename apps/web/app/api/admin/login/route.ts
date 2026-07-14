import { NextResponse, type NextRequest } from 'next/server'
import { compareSync } from 'bcryptjs'

import { ADMIN_COOKIE, cookieOptions, signToken } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const email = typeof body?.email === 'string' ? body.email : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  const ok =
    email === process.env.ADMIN_EMAIL &&
    !!process.env.ADMIN_PASSWORD_HASH &&
    compareSync(password, process.env.ADMIN_PASSWORD_HASH)

  if (!ok) {
    return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await signToken(email)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, token, cookieOptions)
  return res
}
