import { useQuery } from '@tanstack/react-query'
import { fetchBooks } from '../api/booksApi'

export const booksQueryKeys = {
  all: ['books'],
  list: (title) => [...booksQueryKeys.all, 'list', title],
}

export const useBooks = (title = '') =>
  useQuery({
    queryKey: booksQueryKeys.list(title),
    queryFn: ({ signal }) => fetchBooks({ title, signal }),
  })
