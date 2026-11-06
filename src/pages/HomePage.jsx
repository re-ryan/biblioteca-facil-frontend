import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const modules = [
  {
    icon: <SearchRoundedIcon fontSize="large" />,
    audience: 'Módulo Catálogo',
    title: 'Leitor',
    description:
      'Encontra livros nas bibliotecas cadastradas, consulta os detalhes do acervo e solicita reservas.',
    features: ['Pesquisar livros', 'Consultar disponibilidade', 'Solicitar reservas'],
    action: 'Acessar catálogo',
    path: '/catalogo',
  },
  {
    icon: <AdminPanelSettingsRoundedIcon fontSize="large" />,
    audience: 'Módulo Administração',
    title: 'Administrador',
    description:
      'Gerencia as informações da sua biblioteca, mantém o acervo atualizado e acompanha as solicitações dos leitores.',
    features: ['Gerenciar a biblioteca', 'Cadastrar e atualizar o acervo', 'Acompanhar solicitações'],
    action: 'Conhecer área administrativa',
    path: '/admin',
  },
]

export const HomePage = () => (
  <>
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        background:
          'radial-gradient(circle at 86% 18%, rgba(213, 139, 43, 0.22), transparent 28%), linear-gradient(135deg, #e8f3ee 0%, #f6f4ee 56%, #f9e4c5 145%)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 11 } }}>
        <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Chip
                label="Biblioteca Fácil"
                color="secondary"
                variant="outlined"
                sx={{ width: 'fit-content', fontWeight: 700 }}
              />
              <Typography
                component="h1"
                variant="h1"
                sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '4.75rem' } }}
              >
                O livro que você procura pode estar mais perto do que imagina.
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 680, fontWeight: 400 }}
              >
                O Biblioteca Fácil conecta leitores e bibliotecas: quem procura um livro
                consulta o catálogo e solicita reservas, enquanto cada administrador mantém
                sua biblioteca organizada.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <Button
                  component="a"
                  href="#modulos"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  Entender como funciona
                </Button>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  size="large"
                  startIcon={<LoginRoundedIcon />}
                >
                  Entrar na plataforma
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                color: 'primary.contrastText',
                bgcolor: 'primary.dark',
                border: 'none',
                borderRadius: 4,
                boxShadow: '0 28px 80px rgba(14, 70, 61, 0.28)',
              }}
            >
              <CardContent sx={{ p: { xs: 3.5, sm: 4.5 } }}>
                <Stack spacing={3}>
                  <Box>
                    <AutoStoriesRoundedIcon sx={{ fontSize: 58, color: 'secondary.light', mb: 2 }} />
                    <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                      Uma experiência para cada usuário
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.72)' }}>
                      Leitores encontram livros. Administradores cuidam de suas bibliotecas.
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.16)' }} />

                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <SearchRoundedIcon sx={{ color: 'secondary.light' }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>Leitor</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Consulta o catálogo e solicita reservas
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <AdminPanelSettingsRoundedIcon sx={{ color: 'secondary.light' }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>Administrador</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Gerencia sua biblioteca e o acervo
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>

    <Container id="modulos" maxWidth="lg" sx={{ py: { xs: 7, md: 10 }, scrollMarginTop: 88 }}>
      <Stack spacing={1} sx={{ mb: 5, maxWidth: 720 }}>
        <Typography color="secondary.dark" sx={{ fontWeight: 800, letterSpacing: '0.04em' }}>
          PERFIS DE USO
        </Typography>
        <Typography
          component="h2"
          variant="h2"
          sx={{ fontSize: { xs: '2.35rem', md: '3rem' } }}
        >
          Como cada usuário utiliza o site
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
          Cada perfil acessa as ferramentas necessárias para consultar ou administrar uma
          biblioteca, sem misturar responsabilidades.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {modules.map(({ icon, audience, title, description, features, action, path }) => (
          <Grid key={title} size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: { xs: 3.5, sm: 4 }, flexGrow: 1 }}>
                <Stack spacing={2.5}>
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: 3,
                      color: 'primary.main',
                      bgcolor: 'primary.light',
                    }}
                  >
                    {icon}
                  </Box>
                  <Box>
                    <Typography color="secondary.dark" variant="overline" sx={{ fontWeight: 800 }}>
                      {audience}
                    </Typography>
                    <Typography component="h3" variant="h4">
                      {title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">{description}</Typography>
                  <Stack spacing={1.25}>
                    {features.map((feature) => (
                      <Stack key={feature} direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                        <CheckCircleRoundedIcon color="primary" fontSize="small" />
                        <Typography variant="body2">{feature}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
              <CardActions sx={{ px: { xs: 3.5, sm: 4 }, pb: 4 }}>
                <Button
                  component={RouterLink}
                  to={path}
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  {action}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

    <Box sx={{ bgcolor: 'primary.light' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={1.25}>
              <Typography component="h2" variant="h3">
                Já faz parte de uma biblioteca parceira?
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
                A página de acesso identifica quem utiliza as funções administrativas e prepara
                o caminho para as futuras rotas protegidas da aplicação.
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack sx={{ alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                size="large"
                startIcon={<LoginRoundedIcon />}
              >
                Ir para o login
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)
