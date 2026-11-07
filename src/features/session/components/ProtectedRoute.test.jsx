import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { AppProviders } from '../../../app/providers/AppProviders'
import { ProtectedRoute } from './ProtectedRoute'

describe('ProtectedRoute', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('direciona uma sessão não identificada para o login', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/biblioteca']}>
          <Routes>
            <Route path="/login" element={<h1>Entrar na conta</h1>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/biblioteca" element={<h1>Área restrita</h1>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AppProviders>,
    )

    expect(screen.getByRole('heading', { name: /entrar na conta/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /área restrita/i })).not.toBeInTheDocument()
  })
})
