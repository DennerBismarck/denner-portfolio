import { describe, it, expect } from 'vitest'
import { dict } from '@/lib/i18n'

describe('i18n', () => {
  it('pt e en têm exatamente as mesmas chaves', () => {
    const pt = Object.keys(dict.pt).sort()
    const en = Object.keys(dict.en).sort()
    expect(pt).toEqual(en)
  })
  it('nenhum valor está vazio', () => {
    for (const lang of ['pt','en'] as const)
      for (const [k, v] of Object.entries(dict[lang]))
        expect(v, `${lang}.${k}`).toBeTruthy()
  })
})
