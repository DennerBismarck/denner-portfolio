'use client'
import { useLang } from '@/lib/i18n'
import { profile } from '@/lib/data/profile'
import { Download } from 'lucide-react'

const links: { href: string; key: 'nav.about' | 'nav.experience' | 'nav.projects' | 'nav.skills' | 'nav.contact' }[] = [
  { href: '#about', key: 'nav.about' },
  { href: '#experience', key: 'nav.experience' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#skills', key: 'nav.skills' },
  { href: '#contact', key: 'nav.contact' },
]

export function Header() {
  const { t, lang, setLang } = useLang()
  return (
    <header className="sticky top-0 z-40 border-b border-borderc/60 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-lg font-extrabold text-text">Denner França</a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-accent-soft">{t(l.key)}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex overflow-hidden rounded-full border border-borderc text-xs">
            <button onClick={() => setLang('pt')} className={`px-2.5 py-1 ${lang === 'pt' ? 'bg-accent text-white' : 'text-muted-2'}`}>PT</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 ${lang === 'en' ? 'bg-accent text-white' : 'text-muted-2'}`}>EN</button>
          </div>
          <a href={profile.cv[lang]} download className="hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-bright sm:inline-flex">
            <Download size={15} /> {t('nav.downloadCv')}
          </a>
        </div>
      </nav>
    </header>
  )
}
