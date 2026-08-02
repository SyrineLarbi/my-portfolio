'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type DemoVideoProps = {
  /** Path under /public, e.g. /demos/resume-builder.mp4 */
  src: string
  /** Project title — used for the modal heading and a11y labels. */
  title: string
  /** Optional link to the deployed app, shown alongside the player. */
  liveUrl?: string
  /** Optional poster image. */
  poster?: string
}

/**
 * Link-styled trigger that opens the demo recording in a lightbox.
 * Used on project cards in place of an outbound "Live demo" link.
 */
export function DemoVideoButton({ src, title, liveUrl, poster }: DemoVideoProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-accent-magenta hover:underline"
      >
        Watch demo →
      </button>
      {open && (
        <DemoVideoModal
          src={src}
          title={title}
          liveUrl={liveUrl}
          poster={poster}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

function DemoVideoModal({
  src,
  title,
  liveUrl,
  poster,
  onClose,
}: DemoVideoProps & { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    videoRef.current?.pause()
    onClose()
  }, [onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [close])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — demo video`}
      onClick={close}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in-up"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card w-full max-w-4xl overflow-hidden bg-bg-elev p-4 shadow-card"
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Demo</p>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close demo video"
            className="rounded-pill border border-border-translucent px-3 py-1 text-sm text-text-muted transition hover:text-text"
          >
            Close ✕
          </button>
        </div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="max-h-[70vh] w-full rounded-card bg-black"
        />
        {liveUrl && (
          <div className="mt-3 text-sm font-bold">
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent-blue hover:underline"
            >
              Open the live app →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Inline player for project detail pages.
 */
export function DemoVideoPlayer({ src, title, poster }: DemoVideoProps) {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      aria-label={`${title} — demo video`}
      className="my-6 w-full rounded-card border border-border-translucent bg-black"
    />
  )
}
