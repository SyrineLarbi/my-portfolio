// Must come before any module that reads process.env at import time (e.g. ./config/env, ./prisma/prisma.service).
import 'dotenv/config'
import 'reflect-metadata'
import cookieParser from 'cookie-parser'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { writeFileSync } from 'node:fs'

import { AppModule } from './app.module'
import { env } from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: env.NODE_ENV === 'production'
      ? ['log', 'warn', 'error']
      : ['log', 'warn', 'error', 'debug', 'verbose'],
  })

  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.enableCors({
    origin: env.ALLOWED_ORIGINS.split(','),
    credentials: true,
  })

  // Swagger / OpenAPI — dev only, to avoid leaking the route map in prod
  if (env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Syrine Portfolio API')
      .setDescription('Backend for the portfolio site (contact, CV, analytics, admin)')
      .setVersion('0.1.0')
      .addCookieAuth('portfolio_admin', { type: 'apiKey', in: 'cookie', name: 'portfolio_admin' })
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { withCredentials: true, persistAuthorization: true },
    })

    writeFileSync('./openapi.json', JSON.stringify(document, null, 2))
  }

  await app.listen(env.PORT)
  console.log(`API listening on http://localhost:${env.PORT}/api`)
}

bootstrap()
