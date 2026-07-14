import { CvDownloadButton } from './CvDownloadButton'
import { RotatingTagline } from './RotatingTagline'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pt-16 pb-24 md:pt-24 md:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-text-muted animate-fade-in-up">
          Tunis, Tunisia
        </p>
        <h1 className="mt-4 text-hero font-black leading-[1.05] animate-fade-in-up">
          Hello, I&apos;m <span className="gradient-text">Syrine Larbi</span>
        </h1>
        <p className="mt-6 text-2xl md:text-3xl font-light text-text-muted animate-fade-in-up">
          I&apos;m a <RotatingTagline />.
        </p>

        <p className="mt-6 max-w-2xl text-text-muted animate-fade-in-up">
          I build production-grade web platforms and data-driven systems — TypeScript on the
          frontend, NestJS + Prisma + Postgres on the backend, Python + XGBoost when the
          problem calls for ML. Previously 4y8m as a Manager, now a Full-Stack Developer at Jumia.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up">
          <CvDownloadButton />
        </div>
      </div>
    </section>
  )
}