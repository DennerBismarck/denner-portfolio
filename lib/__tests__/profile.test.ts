import { describe, it, expect } from 'vitest'
import { profile } from '@/lib/data/profile'

describe('profile', () => {
  it('tem contatos essenciais', () => {
    expect(profile.email).toContain('@')
    expect(profile.github).toMatch(/github\.com/)
    expect(profile.linkedin).toMatch(/linkedin\.com/)
    expect(profile.whatsapp).toMatch(/^\+?\d/)
    expect(profile.cv.pt).toMatch(/\.pdf$/)
    expect(profile.cv.en).toMatch(/\.pdf$/)
  })
  it('tem 3 métricas', () => { expect(profile.metrics).toHaveLength(3) })
})
