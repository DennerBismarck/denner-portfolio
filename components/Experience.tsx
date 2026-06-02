'use client'
import { useLang } from '@/lib/i18n'
import { experience } from '@/lib/data/experience'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Pill } from '@/components/ui/Pill'

export function Experience() {
  const { t, lang } = useLang()
  return (
    <Section id="experience" className="bg-surface/40">
      <SectionTitle>{t('experience.title')}</SectionTitle>
      <div className="relative border-l border-borderc pl-6">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.04}>
            <div className="mb-10 last:mb-0">
              <div className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
              <p className="text-sm text-muted-2">{e.period[lang]}</p>
              <h3 className="font-display text-xl font-bold text-text">{e.role[lang]}</h3>
              <p className="text-accent-soft">{e.company}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                {e.bullets[lang].map((b) => <li key={b}>{b}</li>)}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {e.tech.map((tch) => <Pill key={tch}>{tch}</Pill>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
