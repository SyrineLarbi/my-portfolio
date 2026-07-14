import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

import { PERSONAS, personaMeta, type Persona } from '@syrine/types'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('persona') ?? 'fullstack'
  const persona: Persona = (PERSONAS as readonly string[]).includes(raw)
    ? (raw as Persona)
    : 'fullstack'
  const m = personaMeta[persona]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'radial-gradient(ellipse at top right, rgba(64,150,238,0.45), transparent 60%), #1a1a1a',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 22, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
            Syrine Larbi
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              backgroundImage: 'linear-gradient(135deg, #4096ee 0%, #d6399f 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.05,
            }}
          >
            {m.label}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.85)' }}>{m.subtitle}</span>
          <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>syrine.dev</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}