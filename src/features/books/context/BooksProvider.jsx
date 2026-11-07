import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { initialBooks } from '../data/initialBooks'
import {
  createBook as createBookInList,
  hideBook as hideBookInList,
  updateBook as updateBookInList,
} from '../services/bookCrud'
import { BooksContext } from './BooksContext'

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(initialBooks)

  const addBook = useCallback((formValues) => {
    setBooks((currentBooks) => createBookInList(currentBooks, formValues))
  }, [])

  const editBook = useCallback((bookId, formValues) => {
    setBooks((currentBooks) => updateBookInList(currentBooks, bookId, formValues))
  }, [])

  const hideBook = useCallback((bookId) => {
    setBooks((currentBooks) => hideBookInList(currentBooks, bookId))
  }, [])

  const value = useMemo(
    () => ({ books, addBook, editBook, hideBook }),
    [books, addBook, editBook, hideBook],
  )

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}

BooksProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
