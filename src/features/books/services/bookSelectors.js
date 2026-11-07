export const listActiveBooks = (books, title = '') => {
  const normalizedTitle = title.trim().toLocaleLowerCase('pt-BR')

  return books.filter(
    ({ ativo, titulo }) =>
      ativo && (!normalizedTitle || titulo.toLocaleLowerCase('pt-BR').includes(normalizedTitle)),
  )
}
