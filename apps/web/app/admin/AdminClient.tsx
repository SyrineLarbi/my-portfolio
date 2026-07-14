'use client'

type Message = {
  id: string
  name: string
  email: string
  message: string
  persona: string | null
  status: string
  createdAt: string
}
type Download = { id: string; ua: string | null; country: string | null; persona: string | null; createdAt: string }
type View = { persona: string | null; _count: { _all: number } }

export function AdminClient({ messages, downloads, views }: { messages: Message[]; downloads: Download[]; views: View[] }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin</h1>
        <form action="/api/admin/logout" method="POST">
          <button className="text-sm text-text-muted hover:text-text">Sign out</button>
        </form>
      </header>

      <section>
        <h2 className="text-lg font-bold mb-3">Persona views (last 30 days)</h2>
        <ul className="grid grid-cols-3 gap-4">
          {views.map((v) => (
            <li key={v.persona ?? 'none'} className="glass-card p-4 text-center">
              <p className="text-3xl font-black gradient-text">{v._count._all}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                {v.persona ?? 'unknown'}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">Recent contact messages</h2>
        <div className="glass-card divide-y divide-white/5 overflow-hidden">
          {messages.map((m) => (
            <article key={m.id} className="grid gap-1 p-4">
              <div className="flex items-baseline justify-between">
                <p className="font-bold">{m.name} · <span className="text-text-muted">{m.email}</span></p>
                <p className="text-xs text-text-muted">
                  {new Date(m.createdAt).toLocaleString()} · {m.persona ?? '—'} · {m.status}
                </p>
              </div>
              <p className="text-sm text-text-muted whitespace-pre-wrap">{m.message}</p>
            </article>
          ))}
          {messages.length === 0 && <p className="p-6 text-text-muted">No messages yet.</p>}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">Recent CV downloads</h2>
        <div className="glass-card divide-y divide-white/5 overflow-hidden">
          {downloads.map((d) => (
            <p key={d.id} className="p-4 text-sm">
              {new Date(d.createdAt).toLocaleString()} · {d.country ?? '?'} · {d.persona ?? '?'} · {d.ua?.slice(0, 60) ?? ''}
            </p>
          ))}
        </div>
      </section>
    </main>
  )
}