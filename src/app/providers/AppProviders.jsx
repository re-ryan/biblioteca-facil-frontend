import { CssBaseline, ThemeProvider } from '@mui/material'
import PropTypes from 'prop-types'
import { BooksProvider } from '../../features/books/context/BooksProvider'
import { theme } from '../theme'

export const AppProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BooksProvider>{children}</BooksProvider>
  </ThemeProvider>
)

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
}
