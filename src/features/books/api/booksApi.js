const API_URL = import.meta.env.VITE_API_URL || '/api'

const readErrorMessage = async (response) => {
  try {
    const body = await response.json()
    return body.detail || body.message || body.title
  } catch {
    return null
  }
}

const request = async (path, { signal } = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    const message = await readErrorMessage(response)
    throw new Error(message || `Não foi possível concluir a consulta (${response.status}).`)
  }

  return response.json()
}

export const fetchBooks = ({ title = '', signal } = {}) => {
  const normalizedTitle = title.trim()
  const path = normalizedTitle
    ? `/livros/busca?titulo=${encodeURIComponent(normalizedTitle)}`
    : '/livros'

  return request(path, { signal })
}
