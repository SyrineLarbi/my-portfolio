import 'dotenv/config'

import path from 'node:path'

import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  // The CLI uses the DIRECT URL because PgBouncer (Neon's pooler) doesn't
  // support pg_advisory_lock, which `prisma migrate` requires. Runtime queries
  // use the pooled DATABASE_URL via the PrismaPg adapter in lib/prisma.ts.
  datasource: {
    url: process.env.DATABASE_URL_DIRECT,
  },
})
