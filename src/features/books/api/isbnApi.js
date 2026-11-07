const ISBN_API_URL = import.meta.env.VITE_ISBN_API_URL || '/isbn-api'
const REQUEST_TIMEOUT = 6000

const readErrorMessage = async (response) => {
  try {
    const body = await response.json()
    return body.mensagem || body.detail || body.message
  } catch {
    return null
  }
}

export const fetchBookMetadataByIsbn = async (isbn) => {
  const normalizedIsbn = isbn.replace(/[-\s]/g, '')
  const controller = new AbortController()
  let timeoutId

  const request = fetch(`${ISBN_API_URL}/${encodeURIComponent(normalizedIsbn)}`, {
    headers: { Accept: 'application/json' },
    signal: controller.signal,
  }).then(async (response) => {
    if (!response.ok) {
      const message = await readErrorMessage(response)
      throw new Error(message || `Não foi possível consultar o ISBN (${response.status}).`)
    }

    return response.json()
  })

  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      controller.abort()
      reject(new Error('A consulta de ISBN excedeu o tempo de espera.'))
    }, REQUEST_TIMEOUT)
  })

  try {
    return await Promise.race([request, timeout])
  } finally {
    window.clearTimeout(timeoutId)
  }
}
