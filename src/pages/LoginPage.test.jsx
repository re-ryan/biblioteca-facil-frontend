import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { AppProviders } from '../app/providers/AppProviders'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('informa que a autenticação ainda será conectada ao backend', async () => {
    const user = userEvent.setup()

    render(
      <AppProviders>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AppProviders>,
    )

    await user.type(screen.getByLabelText(/e-mail ou login/i), 'bibliotecario')
    await user.type(screen.getByLabelText(/^senha/i), 'senha-de-teste')
    await user.click(screen.getByRole('button', { name: /^entrar$/i }))

    expect(screen.queryByRole('link', { name: /continuar sem login/i })).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(/autenticação será conectada ao backend/i)
  })

  it('inicia a sessão demonstrativa da biblioteca', async () => {
    const user = userEvent.setup()

    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/biblioteca" element={<h1>Módulo Biblioteca</h1>} />
          </Routes>
        </MemoryRouter>
      </AppProviders>,
    )

    await user.click(screen.getByRole('button', { name: /acessar biblioteca linux/i }))

    expect(screen.getByRole('heading', { name: /módulo biblioteca/i })).toBeInTheDocument()
  })
})
