import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useBooks, useHideBook } from '../features/books/hooks/useBooks'
import { BookManagementPage } from './BookManagementPage'

vi.mock('../features/books/hooks/useBooks', () => ({
  useBooks: vi.fn(),
  useHideBook: vi.fn(),
}))

const hideBook = vi.fn()

describe('BookManagementPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useBooks.mockReturnValue({
      data: [
        {
          id: 2,
          titulo: 'Clean Architecture',
          isbn10: null,
          isbn13: '9780134494166',
          editora: 'Prentice Hall',
          anoPublicacao: 2017,
          edicao: '1',
          urlImagemCapa: null,
        },
      ],
      isPending: false,
      isFetching: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    })
    useHideBook.mockReturnValue({
      mutateAsync: hideBook,
      reset: vi.fn(),
      isPending: false,
      isError: false,
      error: null,
    })
  })

  it('oferece edição e confirma a ocultação lógica', async () => {
    const user = userEvent.setup()
    hideBook.mockResolvedValue(null)

    render(
      <MemoryRouter>
        <BookManagementPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /editar/i })).toHaveAttribute(
      'href',
      '/biblioteca/livros/2/editar',
    )

    await user.click(screen.getByRole('button', { name: /^ocultar$/i }))

    expect(screen.getByRole('dialog')).toHaveTextContent(/registro será mantido no banco de dados/i)
    await user.click(screen.getByRole('button', { name: /ocultar livro/i }))

    expect(hideBook).toHaveBeenCalledWith(2)
    expect(await screen.findByText(/foi ocultado do catálogo/i)).toBeInTheDocument()
  })
})
