import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'

import { ContactController } from './contact.controller'
import { ContactMailer } from './contact.mailer'
import { ContactService } from './contact.service'

@Module({
  imports: [BullModule.registerQueue({ name: 'notifications' })],
  controllers: [ContactController],
  providers: [ContactService, ContactMailer],
  exports: [ContactService, ContactMailer],
})
export class ContactModule {}