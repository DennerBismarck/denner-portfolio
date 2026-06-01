'use client'
import { useEffect, useState, useCallback } from 'react'
import { LangContext, dict, type Lang, type DictKey } from '@/lib/i18n'

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt')

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('lang')) as Lang | null
    if (saved === 'pt' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', l)
      document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en'
    }
  }, [])

  const t = useCallback((k: DictKey) => dict[lang][k], [lang])

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}
