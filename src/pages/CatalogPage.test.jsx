import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useBooks } from '../features/books/hooks/useBooks'
import { CatalogPage } from './CatalogPage'

vi.mock('../features/books/hooks/useBooks', () => ({
  useBooks: vi.fn(),
}))

const books = [
  {
    id: 1,
    titulo: 'Clean Architecture',
    isbn10: null,
    isbn13: '9780134494166',
    editora: 'Prentice Hall',
    anoPublicacao: 2017,
    edicao: '1',
    urlImagemCapa: null,
  },
]

describe('CatalogPage', () => {
  beforeEach(() => {
    useBooks.mockReturnValue({
      data: books,
      isPending: false,
      isFetching: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    })
  })

  it('lista os livros e pesquisa pelo título informado', async () => {
    const user = userEvent.setup()

    render(<CatalogPage />)

    expect(screen.getByRole('heading', { name: /clean architecture/i })).toBeInTheDocument()
    expect(screen.getByText(/isbn 9780134494166/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText(/título do livro/i), 'Clean')
    await user.click(screen.getByRole('button', { name: /pesquisar/i }))

    expect(useBooks).toHaveBeenLastCalledWith('Clean')
  })
})
