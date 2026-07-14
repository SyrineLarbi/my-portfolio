// Runs BEFORE any test file's top-level imports — must populate process.env
// before src/config/env.ts validates it (zod safeParse on module load).
import 'reflect-metadata'

import { hashSync } from 'bcryptjs'

process.env.NODE_ENV = 'test'
process.env.PORT = '0' // ephemeral port; tests don't actually listen
process.env.DATABASE_URL = 'postgres://test:test@localhost:5432/test?sslmode=disable'
process.env.DATABASE_URL_DIRECT = 'postgres://test:test@localhost:5432/test?sslmode=disable'
process.env.REDIS_URL = 'redis://localhost:6379'
process.env.RESEND_API_KEY = 'test-api-key'
process.env.RESEND_FROM = 'Test <test@example.com>'
process.env.CONTACT_INBOX_TO = 'inbox@example.com'
process.env.JWT_SECRET = 'a'.repeat(64) // ≥32 chars per env schema
process.env.ADMIN_EMAIL = 'admin@example.com'
process.env.ADMIN_PASSWORD_HASH = hashSync('correct horse battery staple', 4) // cost=4 keeps tests fast
process.env.ALLOWED_ORIGINS = 'http://localhost:3000'
