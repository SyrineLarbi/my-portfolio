import { BullModule } from '@nestjs/bullmq'
import { Global, Module } from '@nestjs/common'

import { redisConnection } from '../config/redis'
import { ContactModule } from '../contact/contact.module'

import { NotificationsProcessor } from './notifications.processor'

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      connection: redisConnection,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
        removeOnComplete: { age: 60 * 60 * 24, count: 1000 },
        removeOnFail: { age: 60 * 60 * 24 * 7 },
      },
    }),
    BullModule.registerQueue({ name: 'notifications' }),
    ContactModule,
  ],
  providers: [NotificationsProcessor],
  exports: [BullModule],
})
export class QueuesModule {}
