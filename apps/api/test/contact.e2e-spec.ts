import { getQueueToken } from '@nestjs/bullmq'
import type { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { ContactController } from '../src/contact/contact.controller'
import { ContactService } from '../src/contact/contact.service'
import { PrismaService } from '../src/prisma/prisma.service'

describe('POST /api/contact (e2e)', () => {
  let app: INestApplication

  // We build a minimal test module instead of importing AppModule — AppModule
  // pulls in BullModule.forRoot which tries to actually connect to Redis at boot.
  const prismaMock = {
    contactMessage: { create: jest.fn().mockResolvedValue({ id: 'm1', status: 'queued' }) },
  }
  const queueMock = { add: jest.fn().mockResolvedValue({ id: 'j1' }) }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        ContactService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: getQueueToken('notifications'), useValue: queueMock },
      ],
    }).compile()

    app = module.createNestApplication()
    app.setGlobalPrefix('api')
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    )
    await app.init()
  })

  afterAll(async () => app.close())

  it('rejects payloads missing the message field', async () => {
    await request(app.getHttpServer())
      .post('/api/contact')
      .send({ name: 'X', email: 'x@y.com' })
      .expect(400)
  })

  it('rejects payloads with an invalid email', async () => {
    await request(app.getHttpServer())
      .post('/api/contact')
      .send({ name: 'Jane', email: 'not-an-email', message: 'A valid-length message.' })
      .expect(400)
  })

  it('accepts a valid payload and queues a job', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/contact')
      .send({ name: 'Jane', email: 'j@x.com', message: 'Hello there partner!' })
      .expect(201)

    expect(res.body).toEqual({ id: 'm1', status: 'queued' })
    expect(prismaMock.contactMessage.create).toHaveBeenCalled()
    expect(queueMock.add).toHaveBeenCalledWith(
      'send-contact-email',
      { messageId: 'm1' },
      { jobId: 'contact-m1' },
    )
  })
})
