import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createBook,
  fetchBookById,
  fetchBooks,
  hideBook,
  updateBook,
} from '../api/booksApi'

export const booksQueryKeys = {
  all: ['books'],
  list: (title) => [...booksQueryKeys.all, 'list', title],
  detail: (id) => [...booksQueryKeys.all, 'detail', id],
}

export const useBooks = (title = '') =>
  useQuery({
    queryKey: booksQueryKeys.list(title),
    queryFn: ({ signal }) => fetchBooks({ title, signal }),
  })

export const useBook = (id) =>
  useQuery({
    queryKey: booksQueryKeys.detail(id),
    queryFn: ({ signal }) => fetchBookById({ id, signal }),
    enabled: Boolean(id),
  })

export const useCreateBook = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: booksQueryKeys.all }),
  })
}

export const useUpdateBook = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateBook,
    onSuccess: (book) => {
      queryClient.setQueryData(booksQueryKeys.detail(book.id), book)
      return queryClient.invalidateQueries({ queryKey: booksQueryKeys.all })
    },
  })
}

export const useHideBook = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: hideBook,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: booksQueryKeys.detail(id) })
      return queryClient.invalidateQueries({ queryKey: booksQueryKeys.all })
    },
  })
}
