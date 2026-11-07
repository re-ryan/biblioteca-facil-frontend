import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { useLibrary } from '../features/libraries/hooks/useLibrary'
import { LibraryPage } from './LibraryPage'

vi.mock('../features/session/context/sessionContext', () => ({
  useSession: () => ({ session: { libraryId: 1 } }),
}))

vi.mock('../features/libraries/hooks/useLibrary', () => ({
  useLibrary: vi.fn(),
}))

describe('LibraryPage', () => {
  it('apresenta os dados da biblioteca vinculada à sessão', () => {
    useLibrary.mockReturnValue({
      data: {
        id: 1,
        nome: 'Biblioteca Linux',
        cpfCnpj: '11222333000181',
        email: 'linux-etapa4@biblioteca.local',
        telefone: '21999990000',
        endereco: null,
        ativa: true,
      },
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    })

    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /biblioteca linux/i })).toBeInTheDocument()
    expect(screen.getByText('11.222.333/0001-81')).toBeInTheDocument()
    expect(screen.getByText(/biblioteca ativa/i)).toBeInTheDocument()
    expect(screen.getByText(/endereço ainda não cadastrado/i)).toBeInTheDocument()
  })
})
