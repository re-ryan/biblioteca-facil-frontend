import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useBook, useCreateBook, useUpdateBook } from '../features/books/hooks/useBooks'
import { useIsbnLookup } from '../features/books/hooks/useIsbnLookup'
import { BookFormPage } from './BookFormPage'

vi.mock('../features/books/hooks/useBooks', () => ({
  useBook: vi.fn(),
  useCreateBook: vi.fn(),
  useUpdateBook: vi.fn(),
}))

vi.mock('../features/books/hooks/useIsbnLookup', () => ({
  useIsbnLookup: vi.fn(),
}))

const createBook = vi.fn()
const updateBook = vi.fn()
const lookupIsbn = vi.fn()

const mutationState = (mutateAsync) => ({
  mutateAsync,
  isPending: false,
  isError: false,
  error: null,
})

const renderPage = (route, path) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={<BookFormPage />} />
        <Route path="/biblioteca/livros" element={<h1>Lista de livros</h1>} />
      </Routes>
    </MemoryRouter>,
  )

describe('BookFormPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useBook.mockReturnValue({
      data: null,
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    })
    useCreateBook.mockReturnValue(mutationState(createBook))
    useUpdateBook.mockReturnValue(mutationState(updateBook))
    useIsbnLookup.mockReturnValue(mutationState(lookupIsbn))
  })

  it('consulta o ISBN e cadastra um livro', async () => {
    const user = userEvent.setup()
    lookupIsbn.mockResolvedValue({
      isbn: '9788532508126',
      titulo: 'A HORA DA ESTRELA',
      editora: 'Rocco',
      descricao: null,
      anoPublicacao: null,
      urlImagemCapa: null,
    })
    createBook.mockResolvedValue({ id: 5 })

    renderPage('/biblioteca/livros/novo', '/biblioteca/livros/novo')

    await user.type(screen.getByLabelText(/isbn-13/i), '9788532508126')
    await user.click(screen.getByRole('button', { name: /consultar isbn/i }))

    expect(await screen.findByDisplayValue('A HORA DA ESTRELA')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Rocco')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /salvar livro/i }))

    expect(createBook).toHaveBeenCalledWith({
      titulo: 'A HORA DA ESTRELA',
      isbn10: null,
      isbn13: '9788532508126',
      editora: 'Rocco',
      anoPublicacao: null,
      edicao: null,
      descricao: null,
      urlImagemCapa: null,
    })
    expect(await screen.findByRole('heading', { name: /lista de livros/i })).toBeInTheDocument()
  })

  it('carrega e atualiza um livro existente', async () => {
    const user = userEvent.setup()
    useBook.mockReturnValue({
      data: {
        id: 2,
        titulo: 'Clean Architecture',
        isbn10: null,
        isbn13: '9780134494166',
        editora: 'Prentice Hall',
        anoPublicacao: 2017,
        edicao: '1',
        descricao: null,
        urlImagemCapa: null,
      },
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    })
    updateBook.mockResolvedValue({ id: 2 })

    renderPage('/biblioteca/livros/2/editar', '/biblioteca/livros/:bookId/editar')

    const title = screen.getByLabelText(/^título/i)
    await user.clear(title)
    await user.type(title, 'Clean Architecture - edição revisada')
    await user.click(screen.getByRole('button', { name: /salvar livro/i }))

    expect(updateBook).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 2,
        book: expect.objectContaining({ titulo: 'Clean Architecture - edição revisada' }),
      }),
    )
  })
})
