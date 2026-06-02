'use client'
import Image from 'next/image'
import { useLang } from '@/lib/i18n'
import { profile } from '@/lib/data/profile'
import { Download, ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

export function Hero() {
  const { t, lang } = useLang()
  return (
    <div id="top" className="bg-grid border-b border-borderc/60">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent-soft">{t('hero.eyebrow')}</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-text sm:text-5xl">{t('hero.title')}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-white transition-colors hover:bg-accent-bright">{t('hero.ctaProjects')} <ArrowDown size={16} /></a>
            <a href={profile.cv[lang]} download className="inline-flex items-center gap-2 rounded-full border border-borderc px-5 py-2.5 font-medium text-muted transition-colors hover:border-accent hover:text-accent-soft"><Download size={16} /> {t('hero.ctaCv')}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-borderc p-2.5 text-muted transition-colors hover:border-accent hover:text-accent-soft"><GithubIcon size={18} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-borderc p-2.5 text-muted transition-colors hover:border-accent hover:text-accent-soft"><LinkedinIcon size={18} /></a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {profile.metrics.map((m) => (
              <div key={m.value} className="rounded-xl border border-borderc bg-surface-2/50 p-3 text-center">
                <dt className="font-display text-xl font-bold text-accent-soft">{m.value}</dt>
                <dd className="mt-1 text-xs text-muted-2">{m.label[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto">
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-accent/40 shadow-[0_0_40px_-10px_rgba(147,51,234,.5)] sm:h-72 sm:w-72">
            <Image src={profile.photo} alt={profile.fullName} fill sizes="288px" className="object-cover" preload />
          </div>
        </div>
      </div>
    </div>
  )
}
