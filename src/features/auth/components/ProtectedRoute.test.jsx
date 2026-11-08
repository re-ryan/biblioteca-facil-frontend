import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
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
})
