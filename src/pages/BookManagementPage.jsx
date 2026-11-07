import { useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { BookCard } from '../features/books/components/BookCard'
import { BookSearchForm } from '../features/books/components/BookSearchForm'
import { useBooks, useHideBook } from '../features/books/hooks/useBooks'

const LoadingBooks = () => (
  <Grid container spacing={3} aria-label="Carregando livros">
    {[1, 2, 3].map((item) => (
      <Grid key={item} size={{ xs: 12, sm: 6, lg: 4 }}>
        <Skeleton variant="rounded" height={440} />
      </Grid>
    ))}
  </Grid>
)

export const BookManagementPage = () => {
  const location = useLocation()
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [bookToHide, setBookToHide] = useState(null)
  const [message, setMessage] = useState(location.state?.message || '')
  const { data: books = [], isPending, isFetching, isError, error, refetch } = useBooks(searchTerm)
  const hideBook = useHideBook()

  const handleSearch = (event) => {
    event.preventDefault()
    setSearchTerm(searchInput.trim())
  }

  const handleClear = () => {
    setSearchInput('')
    setSearchTerm('')
  }

  const handleOpenHideDialog = (book) => {
    hideBook.reset()
    setBookToHide(book)
  }

  const handleCloseHideDialog = () => {
    if (!hideBook.isPending) {
      setBookToHide(null)
      hideBook.reset()
    }
  }

  const handleConfirmHide = async () => {
    try {
      await hideBook.mutateAsync(bookToHide.id)
      setMessage(`“${bookToHide.titulo}” foi ocultado do catálogo.`)
      setBookToHide(null)
    } catch {
      // O diálogo permanece aberto para apresentar a mensagem da API.
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
      <Button
        component={RouterLink}
        to="/biblioteca"
        startIcon={<ArrowBackRoundedIcon />}
        color="inherit"
        sx={{ mb: 3 }}
      >
        Voltar para a biblioteca
      </Button>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        sx={{ mb: 5, alignItems: { md: 'flex-end' }, justifyContent: 'space-between' }}
      >
        <Box>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
            Módulo Biblioteca
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ mt: 0.5, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            Gerenciar livros
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, fontSize: '1.05rem' }}>
            Cadastre, consulte, edite ou oculte livros do catálogo.
          </Typography>
        </Box>

        <Button
          component={RouterLink}
          to="/biblioteca/livros/novo"
          variant="contained"
          size="large"
          startIcon={<AddRoundedIcon />}
        >
          Cadastrar livro
        </Button>
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
            <Button color="inherit" onClick={() => refetch()}>
              Tentar novamente
            </Button>
          }
        >
          <AlertTitle>Não foi possível carregar os livros</AlertTitle>
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
              {searchTerm ? `Resultados para “${searchTerm}”` : 'Livros ativos'}
            </Typography>
            <Chip
              color="primary"
              variant="outlined"
              label={`${books.length} ${books.length === 1 ? 'livro' : 'livros'}`}
            />
          </Stack>

          {books.length === 0 ? (
            <Alert severity="info">
              {searchTerm
                ? 'Nenhum livro ativo corresponde à pesquisa.'
                : 'Nenhum livro ativo está cadastrado.'}
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {books.map((book) => (
                <Grid key={book.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <BookCard
                    book={book}
                    actions={
                      <>
                        <Button
                          component={RouterLink}
                          to={`/biblioteca/livros/${book.id}/editar`}
                          startIcon={<EditRoundedIcon />}
                        >
                          Editar
                        </Button>
                        <Button
                          color="error"
                          startIcon={<VisibilityOffRoundedIcon />}
                          onClick={() => handleOpenHideDialog(book)}
                        >
                          Ocultar
                        </Button>
                      </>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      )}

      <Dialog open={Boolean(bookToHide)} onClose={handleCloseHideDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Ocultar livro do catálogo?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {bookToHide &&
              `“${bookToHide.titulo}” deixará de aparecer nas listagens e pesquisas. O registro será mantido no banco de dados.`}
          </DialogContentText>
          {hideBook.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {hideBook.error.message}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button color="inherit" onClick={handleCloseHideDialog} disabled={hideBook.isPending}>
            Cancelar
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmHide}
            disabled={hideBook.isPending}
          >
            {hideBook.isPending ? 'Ocultando...' : 'Ocultar livro'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={5000}
        onClose={() => setMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setMessage('')}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  )
}
