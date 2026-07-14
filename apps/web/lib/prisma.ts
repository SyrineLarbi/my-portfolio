import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// Prisma 7 requires a driver adapter. Runtime queries hit the POOLED URL
// (DATABASE_URL); migrations (CLI) use DATABASE_URL_DIRECT.
//
// On Vercel serverless each warm invocation reuses the module scope, and Next
// dev hot-reload re-imports this file — both would otherwise leak a new client
// (and pg Pool) per reload. Cache a single instance on globalThis to avoid that.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
