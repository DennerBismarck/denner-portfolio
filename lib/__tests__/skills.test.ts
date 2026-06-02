import { describe, it, expect } from 'vitest'
import { skills } from '@/lib/data/skills'

describe('skills', () => {
  it('skills têm categorias com itens', () => {
    expect(skills.length).toBeGreaterThan(4)
    for (const c of skills) { expect(c.label.pt && c.label.en).toBeTruthy(); expect(c.items.length).toBeGreaterThan(0) }
  })
})
