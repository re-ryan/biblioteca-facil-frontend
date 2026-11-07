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
import { initialBooks } from '../features/books/data/initialBooks'
import { useBookForm } from '../features/books/hooks/useBookForm'
import {
  createBook,
  hideBook,
  listActiveBooks,
  updateBook,
} from '../features/books/services/bookCrud'

export const BookManagementPage = () => {
  const [books, setBooks] = useState(initialBooks)
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

  const handleSave = (event) => {
    event.preventDefault()

    if (!bookForm.validate()) {
      return
    }

    if (bookForm.isEditing) {
      setBooks((currentBooks) =>
        updateBook(currentBooks, bookForm.editingBookId, bookForm.values),
      )
      setMessage(`“${bookForm.values.titulo.trim()}” foi atualizado com sucesso.`)
    } else {
      setBooks((currentBooks) => createBook(currentBooks, bookForm.values))
      setMessage(`“${bookForm.values.titulo.trim()}” foi cadastrado com sucesso.`)
    }

    bookForm.close()
  }

  const handleConfirmHide = () => {
    setBooks((currentBooks) => hideBook(currentBooks, bookToHide.id))
    setMessage(`“${bookToHide.titulo}” foi ocultado da lista.`)
    setBookToHide(null)
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
            Feature II — Parte 1
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ mt: 0.5, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            CRUD de livros
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, fontSize: '1.05rem' }}>
            Estado do formulário organizado em um Hook personalizado.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddRoundedIcon />}
          onClick={bookForm.openCreate}
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
            loading={false}
          />
        </CardContent>
      </Card>

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
                        onClick={() => bookForm.openEdit(book)}
                      >
                        Editar
                      </BookActionButton>
                      <BookActionButton
                        color="error"
                        startIcon={<VisibilityOffRoundedIcon />}
                        onClick={() => setBookToHide(book)}
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

      <Dialog open={bookForm.isOpen} onClose={bookForm.close} maxWidth="md" fullWidth>
        <DialogTitle>{bookForm.isEditing ? 'Editar livro' : 'Cadastrar livro'}</DialogTitle>
        <DialogContent dividers>
          <BookForm
            values={bookForm.values}
            errors={bookForm.errors}
            submitLabel={bookForm.isEditing ? 'Salvar alterações' : 'Cadastrar livro'}
            onChange={bookForm.changeField}
            onSubmit={handleSave}
            onCancel={bookForm.close}
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
          <Button color="inherit" onClick={() => setBookToHide(null)}>
            Cancelar
          </Button>
          <Button color="error" variant="contained" onClick={handleConfirmHide}>
            Ocultar livro
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
