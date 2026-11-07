const booksUrl = import.meta.env.VITE_BOOKS_API_URL || '/api/livros'

const readErrorMessage = async (response) => {
  try {
    const body = await response.json()
    return body.mensagem || body.message || 'Não foi possível concluir a operação.'
  } catch {
    return 'Não foi possível concluir a operação.'
  }
}

const request = async (url, options = {}) => {
  const { headers, ...requestOptions } = options
  const response = await fetch(url, {
    ...requestOptions,
    headers: { Accept: 'application/json', ...headers },
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

const prepareBookPayload = ({
  titulo,
  isbn10,
  isbn13,
  editora,
  anoPublicacao,
  edicao,
  descricao,
  urlImagemCapa,
}) => ({
  titulo: titulo.trim(),
  isbn10: isbn10.trim() || null,
  isbn13: isbn13.trim() || null,
  editora: editora.trim() || null,
  anoPublicacao: anoPublicacao ? Number(anoPublicacao) : null,
  edicao: edicao.trim() || null,
  descricao: descricao.trim() || null,
  urlImagemCapa: urlImagemCapa.trim() || null,
})

const writeOptions = (method, formValues) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(prepareBookPayload(formValues)),
})

export const listBooks = () => request(booksUrl)

export const createBook = (formValues) =>
  request(booksUrl, writeOptions('POST', formValues))

export const updateBook = (bookId, formValues) =>
  request(`${booksUrl}/${bookId}`, writeOptions('PUT', formValues))

export const hideBook = (bookId) =>
  request(`${booksUrl}/${bookId}`, { method: 'DELETE' })
