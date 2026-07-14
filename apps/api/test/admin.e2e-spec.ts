import type { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test } from '@nestjs/testing'
import cookieParser from 'cookie-parser'
import request from 'supertest'

import { AdminController } from '../src/admin/admin.controller'
import { AdminService } from '../src/admin/admin.service'
import { JwtStrategy } from '../src/admin/jwt.strategy'
import { PrismaService } from '../src/prisma/prisma.service'

// setup-env.ts sets ADMIN_EMAIL='admin@example.com' and
// ADMIN_PASSWORD_HASH=bcrypt('correct horse battery staple', cost=4)

describe('POST /api/admin/login (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      controllers: [AdminController],
      providers: [
        AdminService,
        JwtStrategy,
        { provide: PrismaService, useValue: {} }, // unused on login path
      ],
    }).compile()

    app = module.createNestApplication()
    app.setGlobalPrefix('api')
    app.use(cookieParser())
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    )
    await app.init()
  })

  afterAll(async () => app.close())

  it('rejects bad password', async () => {
    await request(app.getHttpServer())
      .post('/api/admin/login')
      .send({ email: 'admin@example.com', password: 'wrong-password-123' })
      .expect(401)
  })

  it('rejects unknown email', async () => {
    await request(app.getHttpServer())
      .post('/api/admin/login')
      .send({ email: 'someone-else@example.com', password: 'correct horse battery staple' })
      .expect(401)
  })

  it('rejects DTO validation failure (short password)', async () => {
    await request(app.getHttpServer())
      .post('/api/admin/login')
      .send({ email: 'admin@example.com', password: 'short' })
      .expect(400)
  })

  it('issues a cookie on success', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/admin/login')
      .send({ email: 'admin@example.com', password: 'correct horse battery staple' })
      .expect(201)

    const raw = res.headers['set-cookie']
    const cookies = Array.isArray(raw) ? raw : raw ? [raw] : []
    expect(cookies.some((c) => c.startsWith('portfolio_admin='))).toBe(true)
    // sanity: cookie is HttpOnly
    expect(cookies.some((c) => c.includes('HttpOnly'))).toBe(true)
  })
})
