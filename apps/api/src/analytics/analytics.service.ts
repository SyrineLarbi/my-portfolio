import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

import type { TrackDto } from './dto/track.dto'

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async record(dto: TrackDto) {
    await this.prisma.pageView.create({ data: dto })
  }

  // Total views per persona (raw count, includes returning visitors).
  async topPersonas(days = 30) {
    const since = new Date(Date.now() - days * 86_400_000)
    return this.prisma.pageView.groupBy({
      by: ['persona'],
      where: { createdAt: { gte: since } },
      _count: { _all: true },
      orderBy: { _count: { persona: 'desc' } },
    })
  }

  // ── Unique-visitor metrics ──────────────────────────────────────────────
  // Use $queryRaw because Prisma's groupBy can't COUNT(DISTINCT another_column).

  // "How many unique people visited my portfolio in the last N days?"
  async uniqueVisitors(days = 30): Promise<number> {
    const since = new Date(Date.now() - days * 86_400_000)
    const rows = await this.prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(DISTINCT "visitorId")::bigint AS count
      FROM "PageView"
      WHERE "createdAt" >= ${since} AND "visitorId" IS NOT NULL
    `
    return Number(rows[0]?.count ?? 0)
  }

  // "How many unique people clicked each persona tab?"
  // Alice clicking Manager + Data → counts as 1 in 'manager', 1 in 'data', and 1 overall.
  async uniqueByPersona(days = 30) {
    const since = new Date(Date.now() - days * 86_400_000)
    return this.prisma.$queryRaw<{ persona: string | null; uniqueVisitors: bigint }[]>`
      SELECT persona, COUNT(DISTINCT "visitorId")::bigint AS "uniqueVisitors"
      FROM "PageView"
      WHERE "createdAt" >= ${since} AND "visitorId" IS NOT NULL
      GROUP BY persona
      ORDER BY "uniqueVisitors" DESC
    `
  }

  // "Of this period's visitors, how many are first-timers vs returning?"
  // Returns the metric the user requested — e.g. { new: 14, returning: 6, returnRate: 0.3 }
  // → "30% of my visitors come back."
  async newVsReturning(days = 30) {
    const since = new Date(Date.now() - days * 86_400_000)
    const rows = await this.prisma.$queryRaw<{ new_visitors: bigint; returning_visitors: bigint }[]>`
      WITH first_seen AS (
        SELECT "visitorId", MIN("createdAt") AS first_at
        FROM "PageView"
        WHERE "visitorId" IS NOT NULL
        GROUP BY "visitorId"
      ),
      recent_visitors AS (
        SELECT DISTINCT "visitorId"
        FROM "PageView"
        WHERE "createdAt" >= ${since} AND "visitorId" IS NOT NULL
      )
      SELECT
        COUNT(*) FILTER (WHERE fs.first_at >= ${since})::bigint AS new_visitors,
        COUNT(*) FILTER (WHERE fs.first_at <  ${since})::bigint AS returning_visitors
      FROM first_seen fs
      JOIN recent_visitors rv ON fs."visitorId" = rv."visitorId"
    `
    const newCount = Number(rows[0]?.new_visitors ?? 0)
    const returningCount = Number(rows[0]?.returning_visitors ?? 0)
    const total = newCount + returningCount
    return {
      new: newCount,
      returning: returningCount,
      returnRate: total === 0 ? 0 : returningCount / total,
    }
  }
}