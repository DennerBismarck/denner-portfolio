import { describe, it, expect } from 'vitest'
import { skills } from '@/lib/data/skills'
import { interests } from '@/lib/data/interests'

describe('skills & interests', () => {
  it('skills têm categorias com itens', () => {
    expect(skills.length).toBeGreaterThan(4)
    for (const c of skills) { expect(c.label.pt && c.label.en).toBeTruthy(); expect(c.items.length).toBeGreaterThan(0) }
  })
  it('interesses são bilíngues', () => {
    expect(interests.length).toBeGreaterThan(2)
    for (const i of interests) { expect(i.title.pt && i.title.en).toBeTruthy(); expect(i.items.pt.length).toBe(i.items.en.length) }
  })
})
