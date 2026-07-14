'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [showPw, setShowPw] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(fd)),
    })
    setBusy(false)
    if (res.ok) router.push('/admin')
    else setError('Invalid credentials')
  }

  return (
    <main className="mx-auto max-w-md px-6 py-24">
      <h1 className="text-2xl font-bold">Admin login</h1>
      <form onSubmit={onSubmit} className="glass-card mt-6 grid gap-3 p-6">
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="username"
          required
          className="rounded-md bg-surface-translucent border border-border-translucent px-3 py-2"
        />
        <div className="relative">
          <input
            name="password"
            type={showPw ? 'text' : 'password'}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full rounded-md bg-surface-translucent border border-border-translucent px-3 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-text-muted hover:text-text"
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {error && <p className="text-sm text-accent-magenta">{error}</p>}
        <button
          disabled={busy}
          className="rounded-pill bg-gradient-primary px-5 py-2 font-bold disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}