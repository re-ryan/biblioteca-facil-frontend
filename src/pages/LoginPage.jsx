import { useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
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
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const initialCredentials = {
  login: '',
  password: '',
}

export const LoginPage = () => {
  const [credentials, setCredentials] = useState(initialCredentials)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setSubmitted(false)
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
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
                  A entrada identifica leitores e administradores e direciona cada perfil para
                  os recursos disponíveis.
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.64)' }}>
                Leitores acessam o catálogo e suas reservas. Administradores gerenciam os dados
                de sua biblioteca.
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
                      Informe suas credenciais de acesso para continuar.
                    </Typography>
                  </Box>

                  {submitted && (
                    <Alert severity="info">
                      Este formulário está pronto na interface. A autenticação será conectada ao
                      backend quando o serviço de acesso estiver disponível.
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

                  <FormControlLabel control={<Checkbox />} label="Lembrar meu acesso neste dispositivo" />

                  <Button type="submit" variant="contained" size="large">
                    Entrar
                  </Button>

                  <Divider>ou</Divider>

                  <Button
                    component={RouterLink}
                    to="/livros"
                    variant="outlined"
                    size="large"
                    startIcon={<AccountBalanceRoundedIcon />}
                  >
                    Ver demonstração do CRUD
                  </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Nesta etapa, os dados são mantidos apenas durante o uso da página.
                  </Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
