import { ExperienceItem } from '../ExperienceItem'
import { NarrativeCard } from '../NarrativeCard'
import { ProjectCard } from '../ProjectCard'
import { SectionHeader } from '../SectionHeader'
import { SkillChips } from '../SkillChips'
import { Reveal } from '../Reveal'

export function ManagerTab() {
  return (
    <div className="space-y-16 py-8">
      <Reveal>
        <section>
        <p className="max-w-3xl text-text-muted leading-relaxed">
          <strong className="text-text">4 years 8 months as Manager at Jumia Group</strong>{' '}
          (2019 / 04 – 2023 / 12) — process automation, KPI-driven feedback loops,
          centralized SOP tooling, and team training that scaled output without scaling
          headcount. The pivot to software development was driven by automating my own team's grunt
          work.
        </p>
      </section>
      </Reveal>
      

      <Reveal>
        <section>
        <SectionHeader eyebrow="Stack" title="What I'm good at" />
        <SkillChips
          groups={[
            {
              label: 'People',
              items: ['Team leadership', 'Hiring & onboarding', 'Mentoring', 'Performance reviews'],
            },
            {
              label: 'Process',
              items: [
                'KPI design',
                'Workflow automation',
                'Root-cause analysis',
                'SOP authoring',
                'Training delivery',
              ],
            },
            {
              label: 'Tools',
              items: ['Retool', 'Confluence', 'Jira', 'GitHub', 'Excel / Google Sheets'],
            },
          ]}
        />
      </section>
      </Reveal>
      

      <Reveal>
        <section>
        <SectionHeader eyebrow="Where" title="Experience" />
        <ExperienceItem
          role="Manager"
          company="Jumia Group"
          location="Tunis, Tunisia"
          period="2019 / 04 — 2023 / 12"
          bullets={[
            'Built and maintained an internal QC guide web portal centralizing SOPs — cut new-agent onboarding time and made guidelines version-controlled.',
            'Established KPI dashboards and data-driven feedback loops; tracked performance and delivered regular feedback.',
            'Conducted training sessions to enhance team knowledge and problem-solving skills.',
            'Analyzed and optimized operational processes for greater efficiency.',
            'Provided team guidance, support, and training to ensure high levels of customer satisfaction.',
          ]}
        />
      </section>
      </Reveal>
      

     
      <Reveal>
        <section>
        <SectionHeader eyebrow="Build" title="Process & people artifacts" />
        <div className="grid gap-6 md:grid-cols-2">
          <ProjectCard
            title="QC Guide Portal"
            blurb="Internal Jumia tool centralizing quality-control guidelines; lowered onboarding time and gave the team a single source of truth for evolving SOPs."
            stack={['HTML', 'CSS', 'Internal CMS']}
          />
          <ProjectCard
            title="KPI Dashboard system"
            blurb="Sheet-based KPI tracking that surfaced under-performing workflows and enabled targeted training rather than blanket pressure."
            stack={['Excel / Sheets', 'Retool']}
          />
        </div>
      </section>
      </Reveal>

      <Reveal>
        <section>
        <SectionHeader eyebrow="Story" title="From Manager to Developer" />
        <NarrativeCard
          title="Why I made the switch"
          body={[
            'Five years of leading a QC team taught me that most of our daily friction came from manual, repeatable work — copy-paste between systems, hand-rolled reports, lookups that should have been one click. I started writing macros, then small Retool tools, then full-stack apps to automate them.',
            'In 2022 I enrolled in 3W Academy\'s Full-Stack Developer program (MEAN / MERN). In 2024 I joined Jumia\'s Porto Tech Center as a Full-Stack Developer, working on the same kind of internal tooling I used to wish for as a manager — except now I build it.',
            'The management years didn\'t go away — they show up in how I scope work, communicate with stakeholders, and design tools real humans want to use, not just clean code.',
          ]}
        />
      </section>
      </Reveal>
    </div>
  )
}