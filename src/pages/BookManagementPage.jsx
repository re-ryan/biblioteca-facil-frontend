import { useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material'
import { BookActionButton } from '../features/books/components/BookActionButton'
import { BookCard } from '../features/books/components/BookCard'
import { BookForm } from '../features/books/components/BookForm'
import { BookSearchForm } from '../features/books/components/BookSearchForm'
import { useBooks } from '../features/books/context/useBooks'
import { useBookForm } from '../features/books/hooks/useBookForm'
import { listActiveBooks } from '../features/books/services/bookSelectors'

export const BookManagementPage = () => {
  const {
    books,
    isLoading,
    isSaving,
    error,
    addBook,
    editBook,
    hideBook,
    loadBooks,
    clearError,
  } = useBooks()
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [bookToHide, setBookToHide] = useState(null)
  const [message, setMessage] = useState('')
  const bookForm = useBookForm()
  const visibleBooks = listActiveBooks(books, searchTerm)

  const handleSearch = (event) => {
    event.preventDefault()
    setSearchTerm(searchInput.trim())
  }

  const handleClearSearch = () => {
    setSearchInput('')
    setSearchTerm('')
  }

  const handleOpenCreate = () => {
    clearError()
    bookForm.openCreate()
  }

  const handleOpenEdit = (book) => {
    clearError()
    bookForm.openEdit(book)
  }

  const handleSave = async (event) => {
    event.preventDefault()
    const formValues = bookForm.isEditing
      ? bookForm.values
      : Object.fromEntries(new FormData(event.currentTarget).entries())

    if (!bookForm.validate(formValues)) {
      return
    }

    try {
      if (bookForm.isEditing) {
        await editBook(bookForm.editingBookId, formValues)
        setMessage(`“${formValues.titulo.trim()}” foi atualizado com sucesso.`)
      } else {
        await addBook(formValues)
        setMessage(`“${formValues.titulo.trim()}” foi cadastrado com sucesso.`)
      }

      bookForm.close()
    } catch {
      return
    }
  }

  const handleConfirmHide = async () => {
    try {
      await hideBook(bookToHide.id)
      setMessage(`“${bookToHide.titulo}” foi ocultado da lista.`)
      setBookToHide(null)
    } catch {
      return
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        sx={{ mb: 5, alignItems: { md: 'flex-end' }, justifyContent: 'space-between' }}
      >
        <Box>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
            Feature II — Parte 4
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ mt: 0.5, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            CRUD de livros
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, fontSize: '1.05rem' }}>
            Cadastro não controlado e edição controlada.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddRoundedIcon />}
          onClick={handleOpenCreate}
          disabled={isLoading || isSaving}
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
            onClear={handleClearSearch}
            loading={isLoading}
          />
        </CardContent>
      </Card>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            books.length === 0 ? (
              <Button color="inherit" size="small" onClick={loadBooks}>
                Tentar novamente
              </Button>
            ) : null
          }
        >
          {error}
        </Alert>
      )}

      {isLoading ? (
        <Stack spacing={2} sx={{ minHeight: 240, alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress aria-label="Carregando livros" />
          <Typography color="text.secondary">Carregando livros da biblioteca...</Typography>
        </Stack>
      ) : (
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
              label={`${visibleBooks.length} ${visibleBooks.length === 1 ? 'livro' : 'livros'}`}
            />
          </Stack>

          {visibleBooks.length === 0 ? (
            <Alert severity="info">
              {searchTerm
                ? 'Nenhum livro ativo corresponde à pesquisa.'
                : 'Nenhum livro ativo está cadastrado.'}
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {visibleBooks.map((book) => (
                <Grid key={book.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <BookCard
                    book={book}
                    actions={
                      <>
                        <BookActionButton
                          startIcon={<EditRoundedIcon />}
                          onClick={() => handleOpenEdit(book)}
                          disabled={isSaving}
                        >
                          Editar
                        </BookActionButton>
                        <BookActionButton
                          color="error"
                          startIcon={<VisibilityOffRoundedIcon />}
                          onClick={() => setBookToHide(book)}
                          disabled={isSaving}
                        >
                          Ocultar
                        </BookActionButton>
                      </>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      )}

      <Dialog open={bookForm.isOpen} onClose={bookForm.close} maxWidth="md" fullWidth>
        <DialogTitle>{bookForm.isEditing ? 'Editar livro' : 'Cadastrar livro'}</DialogTitle>
        <DialogContent dividers>
          <BookForm
            key={bookForm.isEditing ? `edit-${bookForm.editingBookId}` : 'create'}
            values={bookForm.values}
            errors={bookForm.errors}
            submitLabel={bookForm.isEditing ? 'Salvar alterações' : 'Cadastrar livro'}
            controlled={bookForm.isEditing}
            onChange={bookForm.changeField}
            onFieldChange={bookForm.clearFieldError}
            onSubmit={handleSave}
            onCancel={bookForm.close}
            loading={isSaving}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(bookToHide)}
        onClose={() => setBookToHide(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Ocultar livro da lista?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {bookToHide &&
              `“${bookToHide.titulo}” deixará de aparecer na consulta, mas continuará preservado como registro inativo.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button color="inherit" onClick={() => setBookToHide(null)} disabled={isSaving}>
            Cancelar
          </Button>
          <Button color="error" variant="contained" onClick={handleConfirmHide} disabled={isSaving}>
            {isSaving ? 'Ocultando...' : 'Ocultar livro'}
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
