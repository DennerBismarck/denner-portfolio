import { describe, it, expect } from 'vitest'
import { experience } from '@/lib/data/experience'

describe('experience', () => {
  it('tem 7 cargos, todos bilíngues', () => {
    expect(experience).toHaveLength(7)
    for (const e of experience) {
      expect(e.role.pt && e.role.en).toBeTruthy()
      expect(e.bullets.pt.length).toBeGreaterThan(0)
      expect(e.bullets.en.length).toBe(e.bullets.pt.length)
      expect(e.tech.length).toBeGreaterThan(0)
    }
  })
})
