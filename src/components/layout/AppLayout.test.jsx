import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ProtectedRoute } from '../../features/auth/components/ProtectedRoute'
import { DEMO_CREDENTIALS } from '../../features/auth/authentication'
import { AuthProvider } from '../../features/auth/context/AuthProvider'
import { LoginPage } from '../../pages/LoginPage'
import { AppLayout } from './AppLayout'

describe('AppLayout', () => {
  it('oferece a saída e volta a proteger a biblioteca', async () => {
    const user = userEvent.setup()

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/livros"
                element={
                  <ProtectedRoute>
                    <h1>Gerenciamento de livros</h1>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    )

    await user.type(screen.getByLabelText(/e-mail ou login/i), DEMO_CREDENTIALS.login)
    await user.type(screen.getByLabelText(/^senha/i), DEMO_CREDENTIALS.password)
    await user.click(screen.getByRole('button', { name: /^entrar$/i }))

    expect(
      await screen.findByRole('heading', { name: /gerenciamento de livros/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^livros$/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^sair$/i }))

    expect(await screen.findByRole('heading', { name: /entrar na conta/i })).toBeInTheDocument()
  })
})
