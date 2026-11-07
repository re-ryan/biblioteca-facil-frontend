import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createBook,
  hideBook as hideBookInApi,
  listBooks,
  updateBook,
} from '../services/bookApi'
import { BooksProvider } from './BooksProvider'
import { useBooks } from './useBooks'

vi.mock('../services/bookApi', () => ({
  listBooks: vi.fn(),
  createBook: vi.fn(),
  updateBook: vi.fn(),
  hideBook: vi.fn(),
}))

const formValues = {
  titulo: 'Livro pelo contexto',
  isbn10: '',
  isbn13: '9788532508126',
  editora: 'Editora Exemplo',
  anoPublicacao: '2026',
  edicao: '1',
  descricao: '',
  urlImagemCapa: '',
}

const existingBook = {
  id: 1,
  ...formValues,
  anoPublicacao: 2026,
  ativo: true,
}

describe('BooksContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    listBooks.mockResolvedValue([existingBook])
  })

  it('carrega a lista e executa as operações do CRUD pela API', async () => {
    const createdBook = { ...existingBook, id: 2 }
    const updatedBook = { ...createdBook, titulo: 'Livro atualizado pelo contexto' }
    createBook.mockResolvedValue(createdBook)
    updateBook.mockResolvedValue(updatedBook)
    hideBookInApi.mockResolvedValue(null)

    const { result } = renderHook(() => useBooks(), { wrapper: BooksProvider })

    await waitFor(() => expect(result.current.books).toHaveLength(1))
    expect(result.current.isLoading).toBe(false)

    await act(() => result.current.addBook(formValues))
    expect(createBook).toHaveBeenCalledWith(formValues)
    expect(result.current.books).toHaveLength(2)

    await act(() =>
      result.current.editBook(createdBook.id, {
        ...formValues,
        titulo: 'Livro atualizado pelo contexto',
      }),
    )
    expect(result.current.books.at(-1).titulo).toBe('Livro atualizado pelo contexto')

    await act(() => result.current.hideBook(createdBook.id))
    expect(hideBookInApi).toHaveBeenCalledWith(createdBook.id)
    expect(result.current.books).toEqual([existingBook])
  })

  it('informa quando o carregamento da API falha', async () => {
    listBooks.mockRejectedValueOnce(new Error('API de livros indisponível.'))

    const { result } = renderHook(() => useBooks(), { wrapper: BooksProvider })

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.books).toEqual([])
    expect(result.current.error).toBe('API de livros indisponível.')
  })
})
