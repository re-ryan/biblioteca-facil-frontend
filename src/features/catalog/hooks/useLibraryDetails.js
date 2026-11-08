import { useQuery } from '@tanstack/react-query'
import { getLibraryDetails } from '../services/libraryApi'

export const useLibraryDetails = (libraryId) =>
  useQuery({
    queryKey: ['biblioteca', libraryId],
    queryFn: ({ signal }) => getLibraryDetails(libraryId, signal),
    enabled: Boolean(libraryId),
  })
