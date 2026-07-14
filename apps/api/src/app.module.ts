import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { AdminModule } from './admin/admin.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { ContactModule } from './contact/contact.module'
import { CvModule } from './cv/cv.module'
import { HealthModule } from './health/health.module'
import { PrismaModule } from './prisma/prisma.module'
import { QueuesModule } from './queues/queues.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    QueuesModule,
    ContactModule,
    CvModule,
    AnalyticsModule,
    AdminModule,
    ThrottlerModule.forRoot([
      { name: 'default', ttl: 60_000, limit: 60 },   // 60 req/min/IP global
    ]),
    HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
