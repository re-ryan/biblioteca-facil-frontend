import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BooksProvider } from './BooksProvider'
import { useBooks } from './useBooks'

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

describe('BooksContext', () => {
  it('compartilha a lista e as operações do CRUD', () => {
    const { result } = renderHook(() => useBooks(), { wrapper: BooksProvider })

    expect(result.current.books).toHaveLength(4)

    act(() => result.current.addBook(formValues))
    expect(result.current.books).toHaveLength(5)

    const createdBook = result.current.books.at(-1)
    act(() =>
      result.current.editBook(createdBook.id, {
        ...formValues,
        titulo: 'Livro atualizado pelo contexto',
      }),
    )
    expect(result.current.books.at(-1).titulo).toBe('Livro atualizado pelo contexto')

    act(() => result.current.hideBook(createdBook.id))
    expect(result.current.books.at(-1).ativo).toBe(false)
  })
})
