import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#176b5b',
      dark: '#0e463d',
      light: '#d9eee8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d58b2b',
      dark: '#9a5d13',
      light: '#f9e4c5',
    },
    background: {
      default: '#f6f4ee',
      paper: '#fffdf8',
    },
    text: {
      primary: '#1b2926',
      secondary: '#52615e',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(23, 107, 91, 0.12)',
          boxShadow: '0 18px 50px rgba(27, 41, 38, 0.08)',
        },
      },
    },
  },
})
