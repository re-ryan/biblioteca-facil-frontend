import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppProviders } from '../app/providers/AppProviders'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
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

    expect(screen.getByRole('alert')).toHaveTextContent(/autenticação será conectada ao backend/i)
  })
})
