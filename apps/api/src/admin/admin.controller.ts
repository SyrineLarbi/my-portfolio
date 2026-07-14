import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import type { Response } from 'express'

import { env } from '../config/env'

import { AdminService } from './admin.service'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './jwt-auth.guard'

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Post('login')
  @ApiOperation({ summary: 'Sign in (sets the portfolio_admin JWT cookie on success)' })
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { token } = await this.admin.login(dto.email, dto.password)

    res.cookie('portfolio_admin', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 86_400_000,
      path: '/',
    })
    return { ok: true }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Sign out (clears the portfolio_admin cookie)' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('portfolio_admin', { path: '/' })
    return { ok: true }
  }

  @Get('messages')
  @ApiCookieAuth('portfolio_admin')
  @ApiOperation({ summary: 'List recent contact submissions (newest first, default 50)' })
  @UseGuards(JwtAuthGuard)
  messages() {
    return this.admin.listMessages()
  }

  @Get('downloads')
  @ApiCookieAuth('portfolio_admin')
  @ApiOperation({ summary: 'List recent CV downloads (newest first, default 50)' })
  @UseGuards(JwtAuthGuard)
  downloads() {
    return this.admin.listDownloads()
  }

  @Get('views')
  @ApiCookieAuth('portfolio_admin')
  @ApiOperation({ summary: 'Persona breakdown — total page views per persona over the last 30 days' })
  @UseGuards(JwtAuthGuard)
  views() {
    return this.admin.personaBreakdown()
  }
}
