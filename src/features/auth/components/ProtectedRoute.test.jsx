import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { READER_DEMO_USER, USER_ROLES } from '../authentication'
import { AuthContext } from '../context/AuthContext'
import { AuthProvider } from '../context/AuthProvider'
import { ProtectedRoute } from './ProtectedRoute'

describe('ProtectedRoute', () => {
  it('redireciona visitantes para o login', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/livros']}>
          <Routes>
            <Route path="/login" element={<h1>Entrar na conta</h1>} />
            <Route
              path="/livros"
              element={
                <ProtectedRoute>
                  <h1>Conteúdo privado</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    )

    expect(await screen.findByRole('heading', { name: /entrar na conta/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /conteúdo privado/i })).not.toBeInTheDocument()
  })

  it('redireciona o leitor quando ele tenta acessar a rota administrativa', async () => {
    render(
      <AuthContext.Provider
        value={{
          user: READER_DEMO_USER,
          isAuthenticated: true,
          login: () => null,
          logout: () => {},
        }}
      >
        <MemoryRouter initialEntries={['/livros']}>
          <Routes>
            <Route path="/catalogo" element={<h1>Catálogo de livros</h1>} />
            <Route
              path="/livros"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.ADMINISTRATOR]}>
                  <h1>Gerenciamento de livros</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    )

    expect(await screen.findByRole('heading', { name: /catálogo de livros/i })).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /gerenciamento de livros/i }),
    ).not.toBeInTheDocument()
  })
})
