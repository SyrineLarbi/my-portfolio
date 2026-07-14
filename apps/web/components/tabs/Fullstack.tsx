import { ExperienceItem } from '../ExperienceItem'
import { ProjectCard } from '../ProjectCard'
import { SectionHeader } from '../SectionHeader'
import { SkillChips } from '../SkillChips'
import { Reveal } from '../Reveal'

export function FullstackTab() {
  return (
    <div className="space-y-16 py-8">
      {/* Summary */}
      <Reveal>
        <section>
        <p className="max-w-3xl text-text-muted leading-relaxed">
          Full-Stack Software Developer at Jumia, rebuilding a legacy Retool app into a
          modern, scalable HR Management System with{' '}
          <strong className="text-text">TypeScript, NestJS, Next.js, Prisma, MariaDB</strong>,
          containerized with Docker. Comfortable across the stack — REST APIs,
          relational data modeling, component-driven UIs — with a pragmatic eye for
          performance and clean architecture.
        </p>
      </section>
      </Reveal>
      

      {/* Skills */}
      <Reveal>
        <section>
        <SectionHeader eyebrow="Stack" title="What I work with" />
        <SkillChips
          groups={[
            { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
            {
              label: 'Frontend',
              items: ['React', 'Next.js', 'Angular', 'Ant Design', 'Tailwind', 'TanStack Query', 'React Hook Form'],
            },
            { label: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'BullMQ', 'Passport', 'Nodemailer'] },
            {
              label: 'Data',
              items: ['PostgreSQL (Neon)', 'MariaDB', 'MongoDB', 'Prisma', 'Redis', 'Typesense'],
            },
            {
              label: 'DevOps',
              items: ['Docker', 'Docker Compose', 'Kubernetes', 'GitHub Actions', 'Traefik', 'AWS S3', 'Okta SSO'],
            },
            { label: 'Testing', items: ['Jest', 'Supertest', 'Playwright', 'Cucumber'] },
          ]}
        />
      </section>
      </Reveal>
      

      {/* Experience */}
      <Reveal>
        <section>
        <SectionHeader eyebrow="Where" title="Experience" />
        <ExperienceItem
          role="Full-Stack Software Developer"
          company="Jumia Porto Tech Center"
          location="Tunis · Remote"
          period="2024 / 01 — Present"
          bullets={[
            'Building Jumia\'s HR Management System — a full rebuild of a legacy Retool app into a modern Next.js 16 / NestJS 11 / Prisma / MariaDB architecture (Redis sessions, Traefik routing) spanning employee lifecycle, leave, performance (PPR), headcount, temp-staff, compliance, and exit-interview modules.',
            'Reduced leave-management response time 40% for 1,000+ users via N+1 fixes and composite indexes.',
            'Shipped an employee acknowledgment module with e-signature capture, S3 uploads, and reporting dashboards.',
            'Delivered features across PPR / bell-curve, headcount reporting, and exit-interview workflows — Okta SSO, BullMQ queues, Typesense search, ExcelJS / pdfkit pipelines.',
            'Maintained Playwright + Cucumber E2E coverage; Dockerized dev environment, GitHub Actions CI, Kubernetes deploys.',
            'Cut issue-resolution time 15% with centralized Confluence runbooks; active in Agile Scrum and code reviews.',
          ]}
        />
      </section>
      </Reveal>
      

      {/* Featured projects */}
      <Reveal>
        <section>
        <SectionHeader eyebrow="Build" title="Featured projects" />
        <div className="grid gap-6 md:grid-cols-2">
          <ProjectCard
            highlight
            slug="hr-insight-ai"
            title="HR Insight AI"
            blurb="3-service personal platform that predicts employee attrition and auto-generates executive reports for HR leaders. NestJS + Next.js + FastAPI + XGBoost + Claude API + Prisma/Postgres."
            stack={[
              'TypeScript', 'NestJS', 'Next.js', 'React 19', 'Ant Design',
              'FastAPI', 'Python', 'XGBoost', 'scikit-learn',
              'Prisma', 'PostgreSQL', 'Claude API', 'Socket.IO', 'JWT/RBAC',
            ]}
            links={{
              github: 'https://github.com/SyrineLarbi',
            }}
          />
          <ProjectCard
            slug="ai-talent-portfolio"
            title="AI Talent Portfolio Generator"
            blurb="Next.js + NestJS feature that turns a short wizard form into a published portfolio page in under 2 minutes. Now live in the real world — actress Ryme Bn Messaoud uses a generated portfolio as her public talent page and links it from her Instagram."
            stack={[
              'Next.js', 'NestJS', 'TypeScript', 'Tailwind', 'shadcn/ui',
              'MariaDB', 'Cloudinary', 'Groq / OpenAI / Claude', 'Vercel',
            ]}
            links={{
              github: 'https://github.com/SyrineLarbi/AI-powered-Digital-Talent-Portfolio-Platform',
              demo: 'https://ai-powered-digital-talent-portfolio.vercel.app',
              example: 'https://www.reacchy.com/rymebnmessaoud',
            }}
          />
          <ProjectCard
            slug="resume-builder"
            title="Resume Builder"
            blurb="Full-stack résumé builder — fill in a structured form and export a polished, print-ready PDF rendered server-side with Playwright. Next.js editorial UI + NestJS rendering service in a Turborepo."
            stack={[
              'Next.js', 'React', 'TypeScript', 'Tailwind', 'NestJS',
              'Playwright', 'Turborepo', 'Docker', 'Vercel',
            ]}
            links={{
              github: 'https://github.com/SyrineLarbi/resume_builder',
              demo: 'https://resume-builder-web-8qnv.vercel.app/dashboard',
            }}
          />
          <ProjectCard
            title="AI Image Generator"
            blurb="MERN web app that generates images from text prompts via OpenAI. Auth, dynamic UI, scalable Express backend."
            stack={['MongoDB', 'Express', 'React', 'Node.js', 'OpenAI API']}
          />
          <ProjectCard
            title="E-commerce Dashboard"
            blurb="NestJS + React admin for an e-commerce store. Auth, product management, image uploads (Multer)."
            stack={['NestJS', 'React', 'TypeScript', 'MongoDB', 'Multer']}
          />
        </div>
      </section>
      </Reveal>
      
    </div>
  )
}
