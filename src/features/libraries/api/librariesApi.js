const API_URL = import.meta.env.VITE_API_URL || '/api'

const readErrorMessage = async (response) => {
  try {
    const body = await response.json()
    return body.detail || body.message || body.title
  } catch {
    return null
  }
}

export const fetchLibraryById = async ({ id, signal }) => {
  const response = await fetch(`${API_URL}/bibliotecas/${id}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    const message = await readErrorMessage(response)
    throw new Error(message || `Não foi possível carregar a biblioteca (${response.status}).`)
  }

  return response.json()
}
