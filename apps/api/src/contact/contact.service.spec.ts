import { getQueueToken } from '@nestjs/bullmq'
import { Test } from '@nestjs/testing'

import { PrismaService } from '../prisma/prisma.service'

import { ContactService } from './contact.service'

describe('ContactService.submit', () => {
  let service: ContactService
  let prismaCreate: jest.Mock
  let queueAdd: jest.Mock

  beforeEach(async () => {
    prismaCreate = jest.fn().mockResolvedValue({ id: 'm1', status: 'queued' })
    queueAdd = jest.fn().mockResolvedValue({ id: 'j1' })

    const module = await Test.createTestingModule({
      providers: [
        ContactService,
        { provide: PrismaService, useValue: { contactMessage: { create: prismaCreate } } },
        { provide: getQueueToken('notifications'), useValue: { add: queueAdd } },
      ],
    }).compile()

    service = module.get(ContactService)
  })

  it('persists the row before enqueuing the job', async () => {
    const dto = { name: 'Jane', email: 'j@x.com', message: 'Hello there!' }
    const result = await service.submit(dto as never)

    expect(prismaCreate).toHaveBeenCalledWith({ data: { ...dto, status: 'queued' } })
    // jobId uses `-` (not `:`) because BullMQ 5.76+ rejects colons in custom job IDs
    expect(queueAdd).toHaveBeenCalledWith(
      'send-contact-email',
      { messageId: 'm1' },
      { jobId: 'contact-m1' },
    )

    // critical invariant: prisma.create runs BEFORE queue.add — no orphan jobs
    const createOrder = prismaCreate.mock.invocationCallOrder[0]!
    const enqueueOrder = queueAdd.mock.invocationCallOrder[0]!
    expect(createOrder).toBeLessThan(enqueueOrder)

    expect(result).toEqual({ id: 'm1', status: 'queued' })
  })
})
