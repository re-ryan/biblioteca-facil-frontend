import { useContext } from 'react'
import { BooksContext } from './BooksContext'

export const useBooks = () => {
  const context = useContext(BooksContext)

  if (!context) {
    throw new Error('useBooks deve ser utilizado dentro de BooksProvider.')
  }

  return context
}
