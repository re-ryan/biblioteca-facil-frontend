import { afterEach, describe, expect, it, vi } from 'vitest'
import { lookupBookByIsbn } from './isbnApi'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('isbnApi', () => {
  it('consulta os metadados pelo ISBN normalizado', async () => {
    const metadata = {
      isbn: '9788535902778',
      titulo: 'Livro consultado',
      editora: 'Editora Exemplo',
    }
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(metadata),
    })
    vi.stubGlobal('fetch', fetchMock)

    await expect(lookupBookByIsbn('978-85-359-0277-8')).resolves.toEqual(metadata)
    expect(fetchMock).toHaveBeenCalledWith('/isbn-api/9788535902778', {
      headers: { Accept: 'application/json' },
      signal: expect.any(AbortSignal),
    })
  })

  it('propaga a mensagem retornada pela API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: vi.fn().mockResolvedValue({ mensagem: 'ISBN não encontrado.' }),
      }),
    )

    await expect(lookupBookByIsbn('9788535902778')).rejects.toThrow('ISBN não encontrado.')
  })

  it('interrompe a requisição quando o tempo limite vence', async () => {
    vi.useFakeTimers()
    let requestSignal

    vi.stubGlobal(
      'fetch',
      vi.fn((_, { signal }) => {
        requestSignal = signal
        return new Promise((_, reject) => {
          signal.addEventListener('abort', () => {
            reject(new DOMException('Consulta cancelada.', 'AbortError'))
          })
        })
      }),
    )

    const request = lookupBookByIsbn('9788535902778', { timeoutMs: 100 })
    const expectation = expect(request).rejects.toThrow(
      'A consulta de ISBN excedeu o tempo limite.',
    )

    await vi.advanceTimersByTimeAsync(100)
    await expectation
    expect(requestSignal.aborted).toBe(true)
  })

  it('encaminha o cancelamento externo para a requisição', async () => {
    const queryController = new AbortController()
    let requestSignal

    vi.stubGlobal(
      'fetch',
      vi.fn((_, { signal }) => {
        requestSignal = signal
        return new Promise((_, reject) => {
          signal.addEventListener('abort', () => {
            reject(new DOMException('Consulta cancelada.', 'AbortError'))
          })
        })
      }),
    )

    const request = lookupBookByIsbn('9788535902778', {
      signal: queryController.signal,
    })
    queryController.abort()

    await expect(request).rejects.toMatchObject({ name: 'AbortError' })
    expect(requestSignal.aborted).toBe(true)
  })
})
