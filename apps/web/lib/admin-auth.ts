import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

// Mirrors the retired NestJS admin auth (JWT in an httpOnly cookie).
export const ADMIN_COOKIE = 'portfolio_admin'
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60 // 7 days

function secret() {
  const s = process.env.JWT_SECRET
  if (!s || s.length < 32) throw new Error('JWT_SECRET is missing or too short')
  return new TextEncoder().encode(s)
}

export async function signToken(email: string): Promise<string> {
  return new SignJWT({ sub: email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret())
}

// Returns the admin email if the token is valid & unexpired, else null.
export async function verifyToken(token: string | undefined): Promise<string | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret())
    return typeof payload.sub === 'string' ? payload.sub : null
  } catch {
    return null
  }
}

// Reads the cookie from the current request (Server Component / Route Handler)
// and returns the admin email, or null if unauthenticated.
export async function requireAdmin(): Promise<string | null> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value
  return verifyToken(token)
}

// Cookie attributes shared by login (set) and logout (clear).
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE_SECONDS,
}
