import { useState } from 'react'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { CatalogBookCard } from '../features/catalog/components/CatalogBookCard'
import { CatalogSearchForm } from '../features/catalog/components/CatalogSearchForm'
import { LibraryDetailsDialog } from '../features/catalog/components/LibraryDetailsDialog'
import { useCatalog } from '../features/catalog/hooks/useCatalog'

const emptyFilters = {
  titulo: '',
  autor: '',
  categoria: '',
}

const normalizeFilters = (filters) =>
  Object.fromEntries(
    Object.entries(filters).map(([name, value]) => [name, value.trim()]),
  )

export const CatalogPage = () => {
  const [formValues, setFormValues] = useState(emptyFilters)
  const [filters, setFilters] = useState(emptyFilters)
  const [selectedLibrary, setSelectedLibrary] = useState(null)
  const { data: books = [], error, isFetching, isPending, refetch } = useCatalog(filters)
  const hasActiveFilters = Object.values(filters).some(Boolean)

  const handleChange = ({ target: { name, value } }) => {
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const normalizedFilters = normalizeFilters(formValues)

    if (JSON.stringify(normalizedFilters) === JSON.stringify(filters)) {
      refetch()
      return
    }

    setFilters(normalizedFilters)
  }

  const handleClear = () => {
    setFormValues(emptyFilters)
    setFilters(emptyFilters)
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
      <Stack spacing={1.5} sx={{ mb: 5, maxWidth: 760 }}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
          <AutoStoriesRoundedIcon color="primary" />
          <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
            Módulo Leitor
          </Typography>
        </Stack>
        <Typography
          component="h1"
          variant="h2"
          sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
        >
          Catálogo de livros
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
          Pesquise o acervo e confira em quais bibliotecas cada livro está disponível.
        </Typography>
      </Stack>

      <Card sx={{ mb: 5 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <CatalogSearchForm
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClear={handleClear}
            loading={isFetching}
          />
        </CardContent>
      </Card>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Tentar novamente
            </Button>
          }
        >
          {error.message}
        </Alert>
      )}

      {isPending ? (
        <Stack spacing={2} sx={{ minHeight: 260, alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress aria-label="Carregando catálogo" />
          <Typography color="text.secondary">Consultando o catálogo...</Typography>
        </Stack>
      ) : (
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
          >
            <Box>
              <Typography component="h2" variant="h4">
                {hasActiveFilters ? 'Resultados da busca' : 'Livros no catálogo'}
              </Typography>
              {hasActiveFilters && (
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  Filtros aplicados ao título, autor e categoria.
                </Typography>
              )}
            </Box>
            <Chip
              color="primary"
              variant="outlined"
              label={`${books.length} ${books.length === 1 ? 'livro' : 'livros'}`}
            />
          </Stack>

          {books.length === 0 ? (
            <Alert severity="info">
              {hasActiveFilters
                ? 'Nenhum livro corresponde aos filtros informados.'
                : 'Nenhum livro está disponível no catálogo.'}
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {books.map((book) => (
                <Grid key={book.id} size={{ xs: 12, md: 6 }}>
                  <CatalogBookCard book={book} onLibraryDetails={setSelectedLibrary} />
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      )}

      <LibraryDetailsDialog
        library={selectedLibrary}
        onClose={() => setSelectedLibrary(null)}
      />
    </Container>
  )
}
