import { useState } from 'react'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { BookCard } from '../features/books/components/BookCard'
import { BookSearchForm } from '../features/books/components/BookSearchForm'
import { useBooks } from '../features/books/hooks/useBooks'

const LoadingBooks = () => (
  <Grid container spacing={3} aria-label="Carregando livros">
    {[1, 2, 3].map((item) => (
      <Grid key={item} size={{ xs: 12, sm: 6, lg: 4 }}>
        <Card sx={{ height: '100%' }}>
          <Skeleton variant="rectangular" height={180} />
          <CardContent sx={{ p: 3 }}>
            <Skeleton width="35%" />
            <Skeleton height={40} sx={{ my: 1 }} />
            <Skeleton width="75%" />
            <Skeleton width="60%" />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)

export const CatalogPage = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { data: books = [], isPending, isFetching, isError, error, refetch } = useBooks(searchTerm)

  const handleSearch = (event) => {
    event.preventDefault()
    setSearchTerm(searchInput.trim())
  }

  const handleClear = () => {
    setSearchInput('')
    setSearchTerm('')
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
      <Stack spacing={1} sx={{ mb: 5 }}>
        <Typography
          component="h1"
          variant="h2"
          sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
        >
          Catálogo de livros
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
          Pesquise pelo título e consulte os dados bibliográficos cadastrados.
        </Typography>
      </Stack>

      <Card sx={{ mb: 5 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <BookSearchForm
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleSearch}
            onClear={handleClear}
            loading={isFetching}
          />
        </CardContent>
      </Card>

      {isPending && <LoadingBooks />}

      {isError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" startIcon={<RefreshRoundedIcon />} onClick={() => refetch()}>
              Tentar novamente
            </Button>
          }
        >
          <AlertTitle>Não foi possível carregar o catálogo</AlertTitle>
          {error.message}
        </Alert>
      )}

      {!isPending && !isError && (
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
          >
            <Typography component="h2" variant="h4">
              {searchTerm ? `Resultados para “${searchTerm}”` : 'Livros cadastrados'}
            </Typography>
            <Chip
              color="primary"
              variant="outlined"
              label={`${books.length} ${books.length === 1 ? 'livro' : 'livros'}`}
            />
          </Stack>

          {books.length === 0 ? (
            <Box
              sx={{
                minHeight: 280,
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center',
                border: '1px dashed',
                borderColor: 'primary.light',
                borderRadius: 4,
                bgcolor: 'background.paper',
                px: 3,
              }}
            >
              <Stack spacing={2} sx={{ alignItems: 'center', maxWidth: 460 }}>
                <AutoStoriesRoundedIcon color="primary" sx={{ fontSize: 56 }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Nenhum livro encontrado
                </Typography>
                <Typography color="text.secondary">
                  {searchTerm
                    ? 'Tente pesquisar outro título ou limpe o campo para visualizar todo o catálogo.'
                    : 'Ainda não existem livros cadastrados no catálogo.'}
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {books.map((book) => (
                <Grid key={book.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <BookCard book={book} />
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      )}
    </Container>
  )
}
