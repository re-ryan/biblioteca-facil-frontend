import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  createBook,
  hideBook as hideBookInApi,
  listBooks,
  updateBook,
} from '../services/bookApi'
import { BooksContext } from './BooksContext'

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const loadBooks = useCallback(async () => {
    setIsLoading(true)
    setError('')

    try {
      setBooks(await listBooks())
    } catch (requestError) {
      setBooks([])
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let isActive = true

    listBooks()
      .then((loadedBooks) => {
        if (isActive) {
          setBooks(loadedBooks)
        }
      })
      .catch((requestError) => {
        if (isActive) {
          setError(requestError.message)
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  const addBook = useCallback(async (formValues) => {
    setIsSaving(true)
    setError('')

    try {
      const createdBook = await createBook(formValues)
      setBooks((currentBooks) => [...currentBooks, createdBook])
      return createdBook
    } catch (requestError) {
      setError(requestError.message)
      throw requestError
    } finally {
      setIsSaving(false)
    }
  }, [])

  const editBook = useCallback(async (bookId, formValues) => {
    setIsSaving(true)
    setError('')

    try {
      const updatedBook = await updateBook(bookId, formValues)
      setBooks((currentBooks) =>
        currentBooks.map((book) => (book.id === bookId ? updatedBook : book)),
      )
      return updatedBook
    } catch (requestError) {
      setError(requestError.message)
      throw requestError
    } finally {
      setIsSaving(false)
    }
  }, [])

  const hideBook = useCallback(async (bookId) => {
    setIsSaving(true)
    setError('')

    try {
      await hideBookInApi(bookId)
      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== bookId))
    } catch (requestError) {
      setError(requestError.message)
      throw requestError
    } finally {
      setIsSaving(false)
    }
  }, [])

  const clearError = useCallback(() => setError(''), [])

  const value = useMemo(
    () => ({
      books,
      isLoading,
      isSaving,
      error,
      addBook,
      editBook,
      hideBook,
      loadBooks,
      clearError,
    }),
    [
      books,
      isLoading,
      isSaving,
      error,
      addBook,
      editBook,
      hideBook,
      loadBooks,
      clearError,
    ],
  )

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}

BooksProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
