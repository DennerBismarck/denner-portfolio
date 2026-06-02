'use client'
import { useState } from 'react'
import { useLang } from '@/lib/i18n'
import { projects, moreProjects, type Project } from '@/lib/data/projects'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectModal } from '@/components/ProjectModal'
import { GithubIcon } from '@/components/ui/icons'
import { ArrowUpRight } from 'lucide-react'

export function Projects() {
  const { t, lang } = useLang()
  const [active, setActive] = useState<Project | null>(null)
  return (
    <Section id="projects">
      <SectionTitle subtitle={t('projects.subtitle')}>{t('projects.title')}</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <button
              onClick={() => setActive(p)}
              className="group flex h-full w-full flex-col rounded-2xl border border-borderc bg-surface-2/40 p-5 text-left transition-all hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_30px_-12px_rgba(147,51,234,.6)]"
            >
              {p.featured && <span className="mb-2 self-start rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent-soft">★ {t('projects.featured')}</span>}
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-soft">{p.category[lang]}</p>
              <h3 className="mt-1 font-display text-lg font-bold text-text">{p.name}</h3>
              <p className="mt-1 flex-1 text-sm text-muted">{p.tagline[lang]}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => <span key={s} className="rounded bg-surface px-2 py-0.5 text-xs text-muted-2">{s}</span>)}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent-soft opacity-0 transition-opacity group-hover:opacity-100">
                {t('projects.viewCase')} <ArrowUpRight size={14} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-2">{t('projects.moreOnGithub')}</h3>
        <div className="mt-3 flex flex-wrap gap-3">
          {moreProjects.map((m) => (
            <a key={m.name} href={m.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-borderc px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent-soft">
              <GithubIcon size={14} /> {m.name}
            </a>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </Section>
  )
}
