'use client'
import { useLang } from '@/lib/i18n'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-borderc/60 py-8 text-center text-sm text-muted-2">
      <p>{t('footer.built')}</p>
      <p className="mt-1">© 2026 Denner França. {t('footer.rights')}</p>
    </footer>
  )
}
