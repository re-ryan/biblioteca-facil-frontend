import { QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'
import PropTypes from 'prop-types'
import { queryClient } from './queryClient'
import { theme } from '../theme'

export const AppProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </QueryClientProvider>
)

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
}
