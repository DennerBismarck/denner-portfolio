'use client'
import { useLang } from '@/lib/i18n'
import { interests } from '@/lib/data/interests'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Music, Gamepad2, Bot } from 'lucide-react'

const icons = { Music, Gamepad2, Bot } as const

export function Interests() {
  const { t, lang } = useLang()
  return (
    <Section id="interests">
      <SectionTitle subtitle={t('interests.subtitle')}>{t('interests.title')}</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-3">
        {interests.map((it, i) => {
          const Icon = icons[it.icon as keyof typeof icons]
          return (
            <Reveal key={it.title.en} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-borderc bg-gradient-to-b from-surface-2/60 to-surface p-6">
                <Icon className="text-accent-soft" size={28} />
                <h3 className="mt-3 font-display text-lg font-bold text-text">{it.title[lang]}</h3>
                <ul className="mt-2 space-y-1 text-muted">
                  {it.items[lang].map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
