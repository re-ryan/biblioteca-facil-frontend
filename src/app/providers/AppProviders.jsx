import { QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'
import PropTypes from 'prop-types'
import { SessionProvider } from '../../features/session/context/SessionContext'
import { queryClient } from './queryClient'
import { theme } from '../theme'

export const AppProviders = ({ children }) => (
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  </SessionProvider>
)

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
}
