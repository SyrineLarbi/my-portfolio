import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'

import { AnalyticsService } from './analytics.service'
import { TrackDto } from './dto/track.dto'

@ApiTags('track')
@Controller('track')
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Post()
  @HttpCode(204)
  @ApiOperation({ summary: 'Record a page view (path + persona + visitorId for unique-visitor metrics)' })
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  async track(@Body() dto: TrackDto) {
    await this.analytics.record(dto)
  }
}