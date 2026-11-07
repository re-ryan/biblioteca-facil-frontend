const isbnApiUrl = import.meta.env.VITE_ISBN_API_URL || '/isbn-api'
const defaultTimeoutMs = 5_000

const readErrorMessage = async (response) => {
  try {
    const body = await response.json()
    return body.mensagem || body.message || 'Não foi possível consultar o ISBN.'
  } catch {
    return 'Não foi possível consultar o ISBN.'
  }
}

export const normalizeIsbn = (isbn) => isbn.replace(/[-\s]/g, '')

export const lookupBookByIsbn = async (
  isbn,
  { signal, timeoutMs = defaultTimeoutMs } = {},
) => {
  const controller = new AbortController()
  const abortRequest = () => controller.abort()
  let timedOut = false
  let timeoutId

  if (signal?.aborted) {
    abortRequest()
  } else {
    signal?.addEventListener('abort', abortRequest, { once: true })
  }

  const requestPromise = fetch(`${isbnApiUrl}/${normalizeIsbn(isbn)}`, {
    headers: { Accept: 'application/json' },
    signal: controller.signal,
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(await readErrorMessage(response))
    }

    return response.json()
  })

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      timedOut = true
      controller.abort()
      reject(new Error('A consulta de ISBN excedeu o tempo limite.'))
    }, timeoutMs)
  })

  try {
    return await Promise.race([requestPromise, timeoutPromise])
  } catch (requestError) {
    if (timedOut) {
      throw new Error('A consulta de ISBN excedeu o tempo limite.', {
        cause: requestError,
      })
    }

    throw requestError
  } finally {
    clearTimeout(timeoutId)
    signal?.removeEventListener('abort', abortRequest)
  }
}
