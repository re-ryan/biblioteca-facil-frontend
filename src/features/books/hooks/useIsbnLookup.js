import { useQuery } from '@tanstack/react-query'
import { lookupBookByIsbn } from '../services/isbnApi'

export const useIsbnLookup = (isbn) =>
  useQuery({
    queryKey: ['book-metadata', isbn],
    queryFn: ({ signal }) => lookupBookByIsbn(isbn, { signal }),
    enabled: Boolean(isbn),
  })
