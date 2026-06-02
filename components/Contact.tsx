'use client'
import { useLang } from '@/lib/i18n'
import { profile } from '@/lib/data/profile'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Mail, MessageCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

export function Contact() {
  const { t, lang } = useLang()
  const wa = `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`
  const items = [
    { icon: Mail, label: t('contact.email'), value: profile.email, href: `mailto:${profile.email}` },
    { icon: MessageCircle, label: t('contact.whatsapp'), value: '+55 84 99697-3162', href: wa },
    { icon: LinkedinIcon, label: 'LinkedIn', value: '/denner-bismarck', href: profile.linkedin },
    { icon: GithubIcon, label: 'GitHub', value: '/DennerBismarck', href: profile.github },
  ]
  return (
    <Section id="contact" className="bg-surface/40">
      <SectionTitle subtitle={t('contact.subtitle')}>{t('contact.title')}</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <a key={it.label} href={it.href} target="_blank" rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-borderc bg-surface-2/40 p-5 transition-all hover:-translate-y-0.5 hover:border-accent">
            <span className="rounded-xl bg-accent/15 p-3 text-accent-soft"><it.icon size={22} /></span>
            <span>
              <span className="block text-xs uppercase tracking-wide text-muted-2">{it.label}</span>
              <span className="block text-text">{it.value}</span>
            </span>
          </a>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-2">{profile.location[lang]}</p>
    </Section>
  )
}
