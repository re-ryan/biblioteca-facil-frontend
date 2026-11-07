import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { BooksProvider } from '../../features/books/context/BooksProvider'
import { queryClient } from '../queryClient'
import { theme } from '../theme'

export const AppProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <BooksProvider>{children}</BooksProvider>
    </QueryClientProvider>
  </ThemeProvider>
)

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
}
