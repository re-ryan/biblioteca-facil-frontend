import { afterEach, describe, expect, it, vi } from 'vitest'
import { createBook, listBooks } from './bookApi'

const formValues = {
  titulo: ' Livro integrado ',
  isbn10: '',
  isbn13: '9788532508126',
  editora: ' Editora Exemplo ',
  anoPublicacao: '2026',
  edicao: '1',
  descricao: '',
  urlImagemCapa: '',
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('bookApi', () => {
  it('carrega os livros da API', async () => {
    const books = [{ id: 1, titulo: 'Domain-Driven Design' }]
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(books),
    })
    vi.stubGlobal('fetch', fetchMock)

    await expect(listBooks()).resolves.toEqual(books)
    expect(fetchMock).toHaveBeenCalledWith('/api/livros', {
      headers: { Accept: 'application/json' },
    })
  })

  it('envia os dados normalizados no cadastro', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: vi.fn().mockResolvedValue({ id: 5, titulo: 'Livro integrado' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await createBook(formValues)

    expect(fetchMock).toHaveBeenCalledWith('/api/livros', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: 'Livro integrado',
        isbn10: null,
        isbn13: '9788532508126',
        editora: 'Editora Exemplo',
        anoPublicacao: 2026,
        edicao: '1',
        descricao: null,
        urlImagemCapa: null,
      }),
    })
  })

  it('propaga a mensagem de erro retornada pela API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: vi.fn().mockResolvedValue({ mensagem: 'O ISBN-13 informado é inválido.' }),
      }),
    )

    await expect(createBook(formValues)).rejects.toThrow('O ISBN-13 informado é inválido.')
  })
})
