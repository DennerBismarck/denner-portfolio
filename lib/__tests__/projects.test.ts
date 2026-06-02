import { describe, it, expect } from 'vitest'
import { projects } from '@/lib/data/projects'

describe('projects', () => {
  it('tem 6 projetos detalhados', () => { expect(projects).toHaveLength(6) })
  it('cada projeto é completo e bilíngue', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.tagline.pt && p.tagline.en).toBeTruthy()
      expect(p.context.pt && p.context.en).toBeTruthy()
      expect(p.role.pt && p.role.en).toBeTruthy()
      expect(p.architecture.pt && p.architecture.en).toBeTruthy()
      expect(p.highlights.pt.length).toBe(p.highlights.en.length)
      expect(p.highlights.pt.length).toBeGreaterThan(0)
      expect(p.stack.length).toBeGreaterThan(0)
    }
  })
  it('Freela não tem link de código (proprietário)', () => {
    const freela = projects.find(p => p.slug === 'freela')!
    expect(freela.github).toBeNull()
  })
})
