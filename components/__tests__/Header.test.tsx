import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '@/components/Header'
import { LangProvider } from '@/components/LangProvider'

describe('Header', () => {
  it('renderiza nome e nav', () => {
    render(<LangProvider><Header /></LangProvider>)
    expect(screen.getByText('Denner França')).toBeInTheDocument()
    expect(screen.getByText('Projetos')).toBeInTheDocument()
  })
})
