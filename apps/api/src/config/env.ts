import { z } from 'zod'

const Env = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url(),
  DATABASE_URL_DIRECT: z.string().url(),
  REDIS_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM: z.string().min(1),
  CONTACT_INBOX_TO: z.string().email(),
  JWT_SECRET: z.string().min(32),
  ADMIN_EMAIL: z.string().email(),
  CV_PATH: z.string().default('../web/public/cv/Syrine_Larbi_EN.pdf'),
  ADMIN_PASSWORD_HASH: z.string().min(1),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),
})

const parsed = Env.safeParse(process.env)
if (!parsed.success) {
  console.error('❌ Invalid environment variables:')
  console.error(parsed.error.flatten().fieldErrors)
  process.exit(1)

}


export const env = parsed.data
