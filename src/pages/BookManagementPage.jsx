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
import { BookCard } from '../features/books/components/BookCard'
import { BookForm } from '../features/books/components/BookForm'
import { BookSearchForm } from '../features/books/components/BookSearchForm'
import { initialBooks } from '../features/books/data/initialBooks'
import {
  createBook,
  hideBook,
  listActiveBooks,
  updateBook,
} from '../features/books/services/bookCrud'

const emptyForm = {
  titulo: '',
  isbn10: '',
  isbn13: '',
  editora: '',
  anoPublicacao: '',
  edicao: '',
  descricao: '',
  urlImagemCapa: '',
}

const bookToForm = ({
  titulo,
  isbn10,
  isbn13,
  editora,
  anoPublicacao,
  edicao,
  descricao,
  urlImagemCapa,
}) => ({
  titulo,
  isbn10: isbn10 || '',
  isbn13: isbn13 || '',
  editora: editora || '',
  anoPublicacao: anoPublicacao ? String(anoPublicacao) : '',
  edicao: edicao || '',
  descricao: descricao || '',
  urlImagemCapa: urlImagemCapa || '',
})

const validateBook = ({ titulo, isbn10, isbn13, anoPublicacao }) => {
  const errors = {}
  const normalizedIsbn10 = isbn10.replace(/[-\s]/g, '')
  const normalizedIsbn13 = isbn13.replace(/[-\s]/g, '')

  if (!titulo.trim()) {
    errors.titulo = 'Informe o título do livro.'
  }

  if (!normalizedIsbn10 && !normalizedIsbn13) {
    errors.isbn = 'Informe o ISBN-10 ou o ISBN-13.'
  } else if (normalizedIsbn10 && normalizedIsbn10.length !== 10) {
    errors.isbn = 'O ISBN-10 deve possuir 10 caracteres.'
  } else if (normalizedIsbn13 && normalizedIsbn13.length !== 13) {
    errors.isbn = 'O ISBN-13 deve possuir 13 números.'
  }

  if (anoPublicacao && (!Number.isInteger(Number(anoPublicacao)) || Number(anoPublicacao) <= 0)) {
    errors.anoPublicacao = 'Informe um ano positivo.'
  }

  return errors
}

export const BookManagementPage = () => {
  const [books, setBooks] = useState(initialBooks)
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingBookId, setEditingBookId] = useState(null)
  const [formValues, setFormValues] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const [bookToHide, setBookToHide] = useState(null)
  const [message, setMessage] = useState('')
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
    setEditingBookId(null)
    setFormValues(emptyForm)
    setFormErrors({})
    setFormOpen(true)
  }

  const handleOpenEdit = (book) => {
    setEditingBookId(book.id)
    setFormValues(bookToForm(book))
    setFormErrors({})
    setFormOpen(true)
  }

  const handleFormChange = (field, value) => {
    setFormValues((currentValues) => ({ ...currentValues, [field]: value }))
    setFormErrors((currentErrors) => ({ ...currentErrors, [field]: '', isbn: '' }))
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingBookId(null)
    setFormErrors({})
  }

  const handleSave = (event) => {
    event.preventDefault()
    const errors = validateBook(formValues)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    if (editingBookId) {
      setBooks((currentBooks) => updateBook(currentBooks, editingBookId, formValues))
      setMessage(`“${formValues.titulo.trim()}” foi atualizado com sucesso.`)
    } else {
      setBooks((currentBooks) => createBook(currentBooks, formValues))
      setMessage(`“${formValues.titulo.trim()}” foi cadastrado com sucesso.`)
    }

    handleCloseForm()
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
            Feature I
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ mt: 0.5, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            CRUD de livros
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, fontSize: '1.05rem' }}>
            Demonstração local das operações de cadastro, consulta, edição e ocultação.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddRoundedIcon />}
          onClick={handleOpenCreate}
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
                      <Button
                        startIcon={<EditRoundedIcon />}
                        onClick={() => handleOpenEdit(book)}
                      >
                        Editar
                      </Button>
                      <Button
                        color="error"
                        startIcon={<VisibilityOffRoundedIcon />}
                        onClick={() => setBookToHide(book)}
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

      <Dialog open={formOpen} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogTitle>{editingBookId ? 'Editar livro' : 'Cadastrar livro'}</DialogTitle>
        <DialogContent dividers>
          <BookForm
            values={formValues}
            errors={formErrors}
            submitLabel={editingBookId ? 'Salvar alterações' : 'Cadastrar livro'}
            onChange={handleFormChange}
            onSubmit={handleSave}
            onCancel={handleCloseForm}
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
