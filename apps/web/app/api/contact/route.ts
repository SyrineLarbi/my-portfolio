import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'

import { ContactSchema } from '@syrine/types'

import { prisma } from '@/lib/prisma'

// Serverless: send the email inline (the old BullMQ/Redis worker is gone).
export const runtime = 'nodejs'

function escape(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  // Persist first (status "queued"), then email, then mark sent/failed — mirrors
  // the retired ContactService + notifications worker, minus the queue.
  const row = await prisma.contactMessage.create({
    data: { ...parsed.data, status: 'queued' },
  })

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const p = parsed.data
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.CONTACT_INBOX_TO!,
      replyTo: p.email,
      subject: `[Portfolio] New message from ${p.name}`,
      html: `
        <h2>New contact</h2>
        <p><strong>Name:</strong> ${escape(p.name)}</p>
        <p><strong>Email:</strong> ${escape(p.email)}</p>
        <p><strong>Persona:</strong> ${escape(p.persona ?? '—')}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit">${escape(p.message)}</pre>
      `,
    })
    if (error) throw new Error(error.message)

    await prisma.contactMessage.update({
      where: { id: row.id },
      data: { status: 'sent' },
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    await prisma.contactMessage.update({
      where: { id: row.id },
      data: { status: 'failed', errorMsg: msg },
    })
    return NextResponse.json(
      { ok: false, errors: { _: ['Could not send your message right now. Please try again in a minute.'] } },
      { status: 502 },
    )
  }
}
