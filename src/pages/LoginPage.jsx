import { useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  DEMO_CREDENTIALS,
  getDefaultRoute,
  READER_DEMO_CREDENTIALS,
} from '../features/auth/authentication'
import { useAuth } from '../features/auth/context/useAuth'

const initialCredentials = {
  login: '',
  password: '',
}

export const LoginPage = () => {
  const [credentials, setCredentials] = useState(initialCredentials)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { isAuthenticated, login, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleChange = ({ target: { name, value } }) => {
    setErrorMessage('')
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const authenticatedUser = login(credentials)

    if (!authenticatedUser) {
      setErrorMessage('Login ou senha inválidos.')
      return
    }

    const requestedPath = location.state?.from?.pathname
    navigate(
      requestedPath && requestedPath !== '/login'
        ? requestedPath
        : getDefaultRoute(authenticatedUser),
      { replace: true },
    )
  }

  if (isAuthenticated) {
    return <Navigate to={getDefaultRoute(user)} replace />
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
      <Grid container spacing={0} sx={{ alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              height: '100%',
              minHeight: { xs: 340, md: 620 },
              display: 'flex',
              alignItems: 'flex-end',
              color: 'primary.contrastText',
              bgcolor: 'primary.dark',
              borderRadius: { xs: '24px 24px 0 0', md: '24px 0 0 24px' },
              backgroundImage:
                'radial-gradient(circle at 75% 20%, rgba(213, 139, 43, 0.35), transparent 30%)',
              p: { xs: 4, sm: 5 },
            }}
          >
            <Stack spacing={3}>
              <AutoStoriesRoundedIcon sx={{ fontSize: 72, color: 'secondary.light' }} />
              <Box>
                <Typography component="h1" variant="h3" sx={{ mb: 1.5 }}>
                  Acesse o Biblioteca Fácil
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.76)', fontSize: '1.05rem' }}>
                  Entre com sua conta para consultar o catálogo ou administrar a biblioteca.
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.64)' }}>
                Leitores consultam o catálogo. Administradores gerenciam os dados de sua
                biblioteca.
              </Typography>
            </Stack>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            sx={{
              height: '100%',
              minHeight: { md: 620 },
              display: 'flex',
              alignItems: 'center',
              borderRadius: { xs: '0 0 24px 24px', md: '0 24px 24px 0' },
              borderLeft: { md: 'none' },
              boxShadow: '0 24px 70px rgba(27, 41, 38, 0.1)',
            }}
          >
            <CardContent sx={{ width: '100%', p: { xs: 4, sm: 6, md: 7 } }}>
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Box>
                    <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                      Entrar na conta
                    </Typography>
                    <Typography color="text.secondary">
                      Digite seu login e sua senha para continuar.
                    </Typography>
                  </Box>

                  <Alert severity="info">
                    <Stack spacing={0.75}>
                      <span>
                        Biblioteca: login <strong>{DEMO_CREDENTIALS.login}</strong> e senha{' '}
                        <strong>{DEMO_CREDENTIALS.password}</strong>.
                      </span>
                      <span>
                        Leitor: login <strong>{READER_DEMO_CREDENTIALS.login}</strong> e senha{' '}
                        <strong>{READER_DEMO_CREDENTIALS.password}</strong>.
                      </span>
                    </Stack>
                  </Alert>

                  {errorMessage && (
                    <Alert severity="error">
                      {errorMessage}
                    </Alert>
                  )}

                  <TextField
                    fullWidth
                    required
                    label="E-mail ou login"
                    name="login"
                    value={credentials.login}
                    onChange={handleChange}
                    autoComplete="username"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleRoundedIcon color="action" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    required
                    label="Senha"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockRoundedIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                              edge="end"
                              onClick={() => setPasswordVisible((visible) => !visible)}
                            >
                              {passwordVisible ? (
                                <VisibilityOffRoundedIcon />
                              ) : (
                                <VisibilityRoundedIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <Button type="submit" variant="contained" size="large">
                    Entrar
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
