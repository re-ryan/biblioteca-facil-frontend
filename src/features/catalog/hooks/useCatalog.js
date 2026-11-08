import { useQuery } from '@tanstack/react-query'
import { searchCatalog } from '../services/catalogApi'

export const useCatalog = (filters) =>
  useQuery({
    queryKey: ['catalogo', filters.titulo, filters.autor, filters.categoria],
    queryFn: ({ signal }) => searchCatalog(filters, signal),
  })
