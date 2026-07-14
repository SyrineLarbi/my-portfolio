import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import type { Job } from 'bullmq'

import { ContactMailer } from '../contact/contact.mailer'
import { ContactService } from '../contact/contact.service'

@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name)

  constructor(
    private readonly contact: ContactService,
    private readonly mailer: ContactMailer,
  ) {
    super()
  }

  async process(job: Job) {
    if (job.name === 'send-contact-email') {
      const { messageId } = job.data as { messageId: string }
      const row = await this.contact.findById(messageId)
      if (!row) throw new Error(`ContactMessage ${messageId} not found`)

      try {
        await this.mailer.send(row)
        await this.contact.markSent(messageId)
        return { ok: true }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        await this.contact.markFailed(messageId, msg)
        throw e // let BullMQ retry per defaultJobOptions
      }
    }

    throw new Error(`Unknown job: ${job.name}`)
  }
}