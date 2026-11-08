const librariesUrl = import.meta.env.VITE_LIBRARIES_API_URL || '/api/bibliotecas'

const readErrorMessage = async (response) => {
  try {
    const body = await response.json()
    return body.mensagem || body.message || 'Não foi possível consultar a biblioteca.'
  } catch {
    return 'Não foi possível consultar a biblioteca.'
  }
}

export const getLibraryDetails = async (libraryId, signal) => {
  const response = await fetch(`${librariesUrl}/${libraryId}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}
