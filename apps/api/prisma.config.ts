import 'dotenv/config'

import path from 'node:path'

import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    path: path.join('prisma', 'migrations'),
  },
  // The CLI uses the DIRECT URL because PgBouncer (Neon's pooler) doesn't
  // support pg_advisory_lock, which `prisma migrate` requires.
  datasource: {
    url: process.env.DATABASE_URL_DIRECT,
  },
})
