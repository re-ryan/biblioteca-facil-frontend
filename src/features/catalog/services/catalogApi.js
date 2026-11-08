const catalogUrl = import.meta.env.VITE_CATALOG_API_URL || '/api/catalogo'

const readErrorMessage = async (response) => {
  try {
    const body = await response.json()
    return body.mensagem || body.message || 'Não foi possível consultar o catálogo.'
  } catch {
    return 'Não foi possível consultar o catálogo.'
  }
}

const buildCatalogUrl = (filters) => {
  const searchParams = new URLSearchParams()

  Object.entries(filters).forEach(([name, value]) => {
    const normalizedValue = value.trim()

    if (normalizedValue) {
      searchParams.set(name, normalizedValue)
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `${catalogUrl}?${queryString}` : catalogUrl
}

export const searchCatalog = async (filters, signal) => {
  const response = await fetch(buildCatalogUrl(filters), {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}
