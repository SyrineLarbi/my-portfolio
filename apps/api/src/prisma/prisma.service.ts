import { Injectable, Logger, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

import { env } from '../config/env'

// Prisma 7: PrismaClient requires a driver adapter.
// Runtime queries hit the POOLED URL (DATABASE_URL); migrations (CLI) use the DIRECT URL.
const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
    this.logger.log('Prisma connected')
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
