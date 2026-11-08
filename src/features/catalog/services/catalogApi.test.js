import { afterEach, describe, expect, it, vi } from 'vitest'
import { searchCatalog } from './catalogApi'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('catalogApi', () => {
  it('consulta o catálogo com os filtros preenchidos', async () => {
    const books = [{ id: 1, titulo: 'Dom Casmurro' }]
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(books),
    })
    const controller = new AbortController()
    vi.stubGlobal('fetch', fetchMock)

    await expect(
      searchCatalog(
        {
          titulo: ' Dom Casmurro ',
          autor: ' Machado de Assis ',
          categoria: '',
        },
        controller.signal,
      ),
    ).resolves.toEqual(books)

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/catalogo?titulo=Dom+Casmurro&autor=Machado+de+Assis',
      {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      },
    )
  })

  it('propaga a mensagem de erro da API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({ mensagem: 'Catálogo indisponível.' }),
      }),
    )

    await expect(
      searchCatalog({ titulo: '', autor: '', categoria: '' }),
    ).rejects.toThrow('Catálogo indisponível.')
  })
})
