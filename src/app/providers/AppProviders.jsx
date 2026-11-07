import { CssBaseline, ThemeProvider } from '@mui/material'
import PropTypes from 'prop-types'
import { theme } from '../theme'

export const AppProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
)

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
}
