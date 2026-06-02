'use client'
import { useLang } from '@/lib/i18n'
import { skills } from '@/lib/data/skills'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function Skills() {
  const { t, lang } = useLang()
  return (
    <Section id="skills" className="bg-surface/40">
      <SectionTitle>{t('skills.title')}</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((c, i) => (
          <Reveal key={c.label.en} delay={i * 0.03}>
            <div className="rounded-2xl border border-borderc bg-surface-2/40 p-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-accent-soft">{c.label[lang]}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.items.map((it) => <span key={it} className="rounded-full border border-borderc bg-surface px-3 py-1 text-sm text-muted">{it}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
