const API_URL = import.meta.env.VITE_API_URL || '/api'

const readErrorMessage = async (response) => {
  try {
    const body = await response.json()
    return body.mensagem || body.detail || body.message || body.title
  } catch {
    return null
  }
}

const request = async (path, { signal, method = 'GET', body } = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  if (!response.ok) {
    const message = await readErrorMessage(response)
    throw new Error(message || `Não foi possível concluir a consulta (${response.status}).`)
  }

  return response.status === 204 ? null : response.json()
}

export const fetchBooks = ({ title = '', signal } = {}) => {
  const normalizedTitle = title.trim()
  const path = normalizedTitle
    ? `/livros/busca?titulo=${encodeURIComponent(normalizedTitle)}`
    : '/livros'

  return request(path, { signal })
}

export const fetchBookById = ({ id, signal }) => request(`/livros/${id}`, { signal })

export const createBook = (book) => request('/livros', { method: 'POST', body: book })

export const updateBook = ({ id, book }) =>
  request(`/livros/${id}`, { method: 'PUT', body: book })

export const hideBook = (id) => request(`/livros/${id}`, { method: 'DELETE' })
