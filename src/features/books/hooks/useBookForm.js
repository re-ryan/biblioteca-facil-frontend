import { useState } from 'react'

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

export const useBookForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [editingBookId, setEditingBookId] = useState(null)
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  const openCreate = () => {
    setEditingBookId(null)
    setValues(emptyForm)
    setErrors({})
    setIsOpen(true)
  }

  const openEdit = (book) => {
    setEditingBookId(book.id)
    setValues(bookToForm(book))
    setErrors({})
    setIsOpen(true)
  }

  const changeField = (field, value) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [field]: '', isbn: '' }))
  }

  const close = () => {
    setIsOpen(false)
    setErrors({})
  }

  const validate = () => {
    const nextErrors = validateBook(values)
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  return {
    isOpen,
    isEditing: Boolean(editingBookId),
    editingBookId,
    values,
    errors,
    openCreate,
    openEdit,
    changeField,
    close,
    validate,
  }
}
