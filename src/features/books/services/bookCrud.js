const normalizeText = (value) => value.trim()

const prepareBook = ({
  titulo,
  isbn10,
  isbn13,
  editora,
  anoPublicacao,
  edicao,
  descricao,
  urlImagemCapa,
}) => ({
  titulo: normalizeText(titulo),
  isbn10: normalizeText(isbn10),
  isbn13: normalizeText(isbn13),
  editora: normalizeText(editora),
  anoPublicacao: anoPublicacao ? Number(anoPublicacao) : null,
  edicao: normalizeText(edicao),
  descricao: normalizeText(descricao),
  urlImagemCapa: normalizeText(urlImagemCapa),
})

export const createBook = (books, formValues) => {
  const nextId = Math.max(0, ...books.map(({ id }) => id)) + 1
  const newBook = { id: nextId, ...prepareBook(formValues), ativo: true }

  return [...books, newBook]
}

export const updateBook = (books, bookId, formValues) =>
  books.map((book) =>
    book.id === bookId ? { ...book, ...prepareBook(formValues) } : book,
  )

export const hideBook = (books, bookId) =>
  books.map((book) => (book.id === bookId ? { ...book, ativo: false } : book))

export const listActiveBooks = (books, title = '') => {
  const normalizedTitle = title.trim().toLocaleLowerCase('pt-BR')

  return books.filter(
    ({ ativo, titulo }) =>
      ativo && (!normalizedTitle || titulo.toLocaleLowerCase('pt-BR').includes(normalizedTitle)),
  )
}
