import { useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Container,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import { BookForm } from '../features/books/components/BookForm'
import { useBook, useCreateBook, useUpdateBook } from '../features/books/hooks/useBooks'
import { useIsbnLookup } from '../features/books/hooks/useIsbnLookup'

const initialValues = {
  titulo: '',
  isbn10: '',
  isbn13: '',
  editora: '',
  anoPublicacao: '',
  edicao: '',
  descricao: '',
  urlImagemCapa: '',
}

const normalizeIsbn = (isbn) => isbn.replace(/[-\s]/g, '').toUpperCase()

const mapBookToForm = (book) => ({
  titulo: book.titulo || '',
  isbn10: book.isbn10 || '',
  isbn13: book.isbn13 || '',
  editora: book.editora || '',
  anoPublicacao: book.anoPublicacao ? String(book.anoPublicacao) : '',
  edicao: book.edicao || '',
  descricao: book.descricao || '',
  urlImagemCapa: book.urlImagemCapa || '',
})

const validate = (values) => {
  const errors = {}
  const isbn10 = normalizeIsbn(values.isbn10)
  const isbn13 = normalizeIsbn(values.isbn13)

  if (!values.titulo.trim()) {
    errors.titulo = 'Informe o título do livro.'
  }

  if (!isbn10 && !isbn13) {
    errors.isbn = 'Informe o ISBN-10 ou o ISBN-13.'
  } else if (isbn10 && isbn10.length !== 10) {
    errors.isbn = 'O ISBN-10 deve possuir 10 caracteres.'
  } else if (isbn13 && isbn13.length !== 13) {
    errors.isbn = 'O ISBN-13 deve possuir 13 números.'
  }

  if (
    values.anoPublicacao &&
    (!Number.isInteger(Number(values.anoPublicacao)) || Number(values.anoPublicacao) <= 0)
  ) {
    errors.anoPublicacao = 'Informe um ano positivo.'
  }

  return errors
}

const emptyToNull = (value) => value.trim() || null

const mapFormToRequest = (values) => ({
  titulo: values.titulo.trim(),
  isbn10: emptyToNull(values.isbn10),
  isbn13: emptyToNull(values.isbn13),
  editora: emptyToNull(values.editora),
  anoPublicacao: values.anoPublicacao ? Number(values.anoPublicacao) : null,
  edicao: emptyToNull(values.edicao),
  descricao: emptyToNull(values.descricao),
  urlImagemCapa: emptyToNull(values.urlImagemCapa),
})

const BookFormEditor = ({ book, bookId, isEditing }) => {
  const navigate = useNavigate()
  const createBook = useCreateBook()
  const updateBook = useUpdateBook()
  const isbnLookup = useIsbnLookup()
  const [values, setValues] = useState(() => (book ? mapBookToForm(book) : initialValues))
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null)

  const handleChange = (field, value) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [field]: '', isbn: '' }))
    setFeedback(null)
  }

  const handleIsbnLookup = async () => {
    const isbn = values.isbn13 || values.isbn10

    if (!isbn.trim()) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        isbn: 'Informe um ISBN antes de realizar a consulta.',
      }))
      return
    }

    try {
      const metadata = await isbnLookup.mutateAsync(isbn)
      const normalizedIsbn = normalizeIsbn(metadata.isbn || isbn)

      setValues((currentValues) => ({
        ...currentValues,
        titulo: metadata.titulo || currentValues.titulo,
        isbn10: normalizedIsbn.length === 10 ? normalizedIsbn : currentValues.isbn10,
        isbn13: normalizedIsbn.length === 13 ? normalizedIsbn : currentValues.isbn13,
        editora: metadata.editora || currentValues.editora,
        anoPublicacao: metadata.anoPublicacao
          ? String(metadata.anoPublicacao)
          : currentValues.anoPublicacao,
        descricao: metadata.descricao || currentValues.descricao,
        urlImagemCapa: metadata.urlImagemCapa || currentValues.urlImagemCapa,
      }))
      setErrors((currentErrors) => ({ ...currentErrors, isbn: '', titulo: '' }))
      setFeedback({ severity: 'success', message: 'Dados bibliográficos encontrados pelo ISBN.' })
    } catch (lookupError) {
      setFeedback({ severity: 'error', message: lookupError.message })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setFeedback({ severity: 'warning', message: 'Revise os campos destacados antes de salvar.' })
      return
    }

    const request = mapFormToRequest(values)

    try {
      if (isEditing) {
        await updateBook.mutateAsync({ id: bookId, book: request })
        navigate('/biblioteca/livros', {
          replace: true,
          state: { message: 'Livro atualizado com sucesso.' },
        })
      } else {
        await createBook.mutateAsync(request)
        navigate('/biblioteca/livros', {
          replace: true,
          state: { message: 'Livro cadastrado com sucesso.' },
        })
      }
    } catch {
      // A mensagem da mutação é apresentada abaixo do formulário.
    }
  }

  const saveMutation = isEditing ? updateBook : createBook

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        color="inherit"
        onClick={() => navigate('/biblioteca/livros')}
        sx={{ mb: 3 }}
      >
        Voltar para livros
      </Button>

      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          Módulo Biblioteca
        </Typography>
        <Typography component="h1" variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
          {isEditing ? 'Editar livro' : 'Cadastrar livro'}
        </Typography>
        <Typography color="text.secondary">
          {isEditing
            ? 'Atualize os dados bibliográficos do registro selecionado.'
            : 'Adicione uma nova obra ao catálogo da plataforma.'}
        </Typography>
      </Stack>

      <Card>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <BookForm
            values={values}
            errors={errors}
            feedback={feedback}
            saving={saveMutation.isPending}
            lookingUpIsbn={isbnLookup.isPending}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/biblioteca/livros')}
            onIsbnLookup={handleIsbnLookup}
          />

          {saveMutation.isError && (
            <Alert severity="error" sx={{ mt: 3 }}>
              <AlertTitle>Não foi possível salvar o livro</AlertTitle>
              {saveMutation.error.message}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

BookFormEditor.propTypes = {
  book: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    isbn10: PropTypes.string,
    isbn13: PropTypes.string,
    editora: PropTypes.string,
    anoPublicacao: PropTypes.number,
    edicao: PropTypes.string,
    descricao: PropTypes.string,
    urlImagemCapa: PropTypes.string,
  }),
  bookId: PropTypes.number,
  isEditing: PropTypes.bool.isRequired,
}

export const BookFormPage = () => {
  const { bookId: bookIdParam } = useParams()
  const isEditing = Boolean(bookIdParam)
  const bookId = Number(bookIdParam)
  const validBookId = !isEditing || (Number.isInteger(bookId) && bookId > 0)
  const { data: book, isPending, isError, error, refetch } = useBook(
    isEditing && validBookId ? bookId : null,
  )

  if (!validBookId) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
        <Alert severity="error">O identificador do livro é inválido.</Alert>
      </Container>
    )
  }

  if (isEditing && isPending) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
        <Skeleton variant="rounded" height={620} />
      </Container>
    )
  }

  if (isEditing && isError) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 9 } }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" startIcon={<RefreshRoundedIcon />} onClick={() => refetch()}>
              Tentar novamente
            </Button>
          }
        >
          <AlertTitle>Não foi possível carregar o livro</AlertTitle>
          {error.message}
        </Alert>
      </Container>
    )
  }

  return (
    <BookFormEditor
      key={book?.id || 'new-book'}
      book={book}
      bookId={isEditing ? bookId : undefined}
      isEditing={isEditing}
    />
  )
}
