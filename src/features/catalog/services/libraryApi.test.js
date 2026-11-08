import { afterEach, describe, expect, it, vi } from 'vitest'
import { getLibraryDetails } from './libraryApi'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('libraryApi', () => {
  it('consulta uma biblioteca pelo identificador', async () => {
    const library = {
      id: 2,
      nome: 'Biblioteca Central',
      email: 'central@biblioteca.local',
    }
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(library),
    })
    const controller = new AbortController()
    vi.stubGlobal('fetch', fetchMock)

    await expect(getLibraryDetails(2, controller.signal)).resolves.toEqual(library)
    expect(fetchMock).toHaveBeenCalledWith('/api/bibliotecas/2', {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
  })

  it('propaga a mensagem de erro da API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({ mensagem: 'Biblioteca não encontrada.' }),
      }),
    )

    await expect(getLibraryDetails(99)).rejects.toThrow('Biblioteca não encontrada.')
  })
})
