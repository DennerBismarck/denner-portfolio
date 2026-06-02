'use client'
import Image from 'next/image'
import { useLang } from '@/lib/i18n'
import { profile } from '@/lib/data/profile'
import { Download, ArrowDown } from 'lucide-react'

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

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
