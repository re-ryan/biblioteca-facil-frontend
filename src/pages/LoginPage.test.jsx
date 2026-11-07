import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('informa que a autenticação ainda será conectada ao backend', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText(/e-mail ou login/i), 'bibliotecario')
    await user.type(screen.getByLabelText(/^senha/i), 'senha-de-teste')
    await user.click(screen.getByRole('button', { name: /^entrar$/i }))

    expect(screen.queryByRole('link', { name: /continuar sem login/i })).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(/autenticação será conectada ao backend/i)
  })

  it('abre a demonstração local do CRUD', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/livros" element={<h1>CRUD de livros</h1>} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('link', { name: /ver demonstração do crud/i }))

    expect(screen.getByRole('heading', { name: /crud de livros/i })).toBeInTheDocument()
  })
})
