import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { AuthProvider } from '../../features/auth/context/AuthProvider'
import { queryClient } from '../queryClient'
import { theme } from '../theme'

export const AppProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
)

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
}
