import { useMutation } from '@tanstack/react-query'
import { fetchBookMetadataByIsbn } from '../api/isbnApi'

export const useIsbnLookup = () =>
  useMutation({
    mutationFn: fetchBookMetadataByIsbn,
  })
