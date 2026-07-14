import { Injectable, Logger } from '@nestjs/common'
import { Resend } from 'resend'

import { env } from '../config/env'

@Injectable()
export class ContactMailer {
  private readonly logger = new Logger(ContactMailer.name)
  private readonly resend = new Resend(env.RESEND_API_KEY)

  async send(payload: { name: string; email: string; message: string; persona?: string | null }) {
    const subject = `[Portfolio] New message from ${payload.name}`
    const html = `
      <h2>New contact</h2>
      <p><strong>Name:</strong> ${escape(payload.name)}</p>
      <p><strong>Email:</strong> ${escape(payload.email)}</p>
      <p><strong>Persona:</strong> ${escape(payload.persona ?? '—')}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${escape(payload.message)}</pre>
    `
    const { data, error } = await this.resend.emails.send({
      from: env.RESEND_FROM,
      to: env.CONTACT_INBOX_TO,
      replyTo: payload.email,
      subject,
      html,
    })

    if (error) {
      this.logger.error(`Resend error: ${error.message}`)
      throw new Error(error.message)
    }

    return data?.id
  }
}

function escape(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}