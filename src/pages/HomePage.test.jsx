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
    expect(screen.getByRole('heading', { name: /módulo leitor/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /módulo biblioteca/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /como funciona o acesso/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /preciso de uma conta para consultar o catálogo/i }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /acessar catálogo/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /conhecer área administrativa/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /entrar na plataforma/i })).toHaveAttribute(
      'href',
      '/login',
    )
  })
})
