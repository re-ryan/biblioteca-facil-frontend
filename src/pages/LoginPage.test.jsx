import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute'
import { DEMO_CREDENTIALS } from '../features/auth/authentication'
import { AuthProvider } from '../features/auth/context/AuthProvider'
import { LoginPage } from './LoginPage'

const renderAuthenticationFlow = (initialEntries = ['/login']) =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/livros"
            element={
              <ProtectedRoute>
                <h1>Gerenciamento de livros</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  )

describe('LoginPage', () => {
  it('informa quando as credenciais são inválidas', async () => {
    const user = userEvent.setup()

    renderAuthenticationFlow()

    await user.type(screen.getByLabelText(/e-mail ou login/i), 'usuario-invalido')
    await user.type(screen.getByLabelText(/^senha/i), 'senha-invalida')
    await user.click(screen.getByRole('button', { name: /^entrar$/i }))

    expect(screen.getByText(/login ou senha inválidos/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /entrar na conta/i })).toBeInTheDocument()
  })

  it('autentica e abre a rota originalmente solicitada', async () => {
    const user = userEvent.setup()

    renderAuthenticationFlow(['/livros'])

    expect(await screen.findByRole('heading', { name: /entrar na conta/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /acessar biblioteca linux/i })).not.toBeInTheDocument()

    await user.type(screen.getByLabelText(/e-mail ou login/i), DEMO_CREDENTIALS.login)
    await user.type(screen.getByLabelText(/^senha/i), DEMO_CREDENTIALS.password)
    await user.click(screen.getByRole('button', { name: /^entrar$/i }))

    expect(
      await screen.findByRole('heading', { name: /gerenciamento de livros/i }),
    ).toBeInTheDocument()
  })
})
