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
        name: /um só lugar para descobrir livros e organizar acervos/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /explorar catálogo/i })).toHaveAttribute(
      'href',
      '/catalogo',
    )
    expect(screen.getByRole('link', { name: /ir para o login/i })).toHaveAttribute(
      'href',
      '/login',
    )
  })
})
