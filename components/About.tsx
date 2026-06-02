'use client'
import { useLang } from '@/lib/i18n'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function About() {
  const { t } = useLang()
  return (
    <Section id="about">
      <SectionTitle>{t('about.title')}</SectionTitle>
      <Reveal>
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
        </div>
      </Reveal>
    </Section>
  )
}
