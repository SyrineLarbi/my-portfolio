import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcryptjs'

import { env } from '../config/env'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AdminService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(email: string, password: string) {
    if (email !== env.ADMIN_EMAIL || !compareSync(password, env.ADMIN_PASSWORD_HASH)) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const token = await this.jwt.signAsync({ sub: email }, { expiresIn: '7d' })
    return { token }
  }

  async listMessages(limit = 50) {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
  }

  async listDownloads(limit = 50) {
    return this.prisma.cvDownload.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
  }

  async personaBreakdown(days = 30) {
    const since = new Date(Date.now() - days * 86_400_000)
    return this.prisma.pageView.groupBy({
      by: ['persona'],
      where: { createdAt: { gte: since } },
      _count: { _all: true },
    })
  }
}