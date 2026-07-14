'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { ContactSchema } from '@syrine/types'

import { cn } from '@/lib/cn'

type Values = z.infer<typeof ContactSchema>

export function ContactForm() {
  const params = useSearchParams()
  const persona = params.get('persona') ?? undefined

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Values>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { persona: persona as Values['persona'] | undefined },
  })

  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function onSubmit(values: Values) {
    setServerError(null)
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (res.ok) {
      setSuccess(true)
      reset()
    } else {
      const err = await res.json().catch(() => ({}))
      setServerError(err?.errors?._?.[0] ?? 'Something went wrong. Please try again in a minute.')
    }
  }

  if (success) {
    return (
      <div className="glass-card p-8 text-center">
        <h3 className="text-xl font-bold gradient-text">Message sent ✓</h3>
        <p className="mt-2 text-text-muted">
          Thanks — your message is on its way and I'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 rounded-pill border border-border-translucent px-5 py-2 text-sm font-bold hover:border-white/40"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-card grid gap-4 p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-1">
        <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-text-muted">
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          className={cn(
            'rounded-md bg-surface-translucent border border-border-translucent px-3 py-2 outline-none',
            'focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30',
          )}
        />
        {errors.name && <p className="text-xs text-accent-magenta">{errors.name.message}</p>}
      </div>

      <div className="grid gap-1">
        <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={cn(
            'rounded-md bg-surface-translucent border border-border-translucent px-3 py-2 outline-none',
            'focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30',
          )}
        />
        {errors.email && <p className="text-xs text-accent-magenta">{errors.email.message}</p>}
      </div>

      <div className="grid gap-1">
        <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-text-muted">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={cn(
            'rounded-md bg-surface-translucent border border-border-translucent px-3 py-2 outline-none',
            'focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30',
          )}
        />
        {errors.message && <p className="text-xs text-accent-magenta">{errors.message.message}</p>}
      </div>

      {/* Coerce "" (no persona in the URL) to undefined so the optional enum
          in ContactSchema validates — otherwise the form fails silently. */}
      <input
        type="hidden"
        {...register('persona', { setValueAs: (v) => (v ? v : undefined) })}
      />

      {serverError && (
        <p className="rounded-md border border-accent-magenta/40 bg-accent-magenta/10 px-3 py-2 text-sm text-accent-magenta">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'mt-2 rounded-pill bg-gradient-primary px-7 py-3 text-sm font-bold shadow-glow transition',
          isSubmitting ? 'opacity-60' : 'hover:-translate-y-0.5',
        )}
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
