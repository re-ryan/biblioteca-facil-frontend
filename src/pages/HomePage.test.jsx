import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppProviders } from '../app/providers/AppProviders'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('apresenta a proposta principal da plataforma', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AppProviders>,
    )

    expect(
      screen.getByRole('heading', {
        name: /o livro que você procura pode estar mais perto do que imagina/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^leitor$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^administrador$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /acessar catálogo/i })).toHaveAttribute(
      'href',
      '/catalogo',
    )
    expect(screen.getByRole('link', { name: /acessar administração/i })).toHaveAttribute(
      'href',
      '/login',
    )
  })
})
