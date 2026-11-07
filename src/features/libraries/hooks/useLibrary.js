import { useQuery } from '@tanstack/react-query'
import { fetchLibraryById } from '../api/librariesApi'

export const libraryQueryKeys = {
  all: ['libraries'],
  detail: (id) => [...libraryQueryKeys.all, 'detail', id],
}

export const useLibrary = (id) =>
  useQuery({
    queryKey: libraryQueryKeys.detail(id),
    queryFn: ({ signal }) => fetchLibraryById({ id, signal }),
    enabled: Boolean(id),
  })
