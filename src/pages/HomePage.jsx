import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const benefits = [
  {
    icon: <SearchRoundedIcon fontSize="large" />,
    title: 'Uma busca, várias bibliotecas',
    description: 'Consulte o catálogo das instituições parceiras em um só lugar.',
  },
  {
    icon: <LocationOnRoundedIcon fontSize="large" />,
    title: 'Encontre onde está',
    description: 'Descubra a biblioteca que possui o livro que você procura.',
  },
  {
    icon: <AutoStoriesRoundedIcon fontSize="large" />,
    title: 'Mais livros em circulação',
    description: 'Aproxime leitores dos acervos disponíveis na cidade.',
  },
]

export const HomePage = () => (
  <>
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        background:
          'radial-gradient(circle at 85% 15%, rgba(213, 139, 43, 0.24), transparent 28%), linear-gradient(135deg, #e8f3ee 0%, #f6f4ee 55%, #f9e4c5 140%)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 13 } }}>
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Chip
                label="Descubra. Encontre. Leia."
                color="secondary"
                variant="outlined"
                sx={{ width: 'fit-content' }}
              />
              <Typography
                component="h1"
                variant="h1"
                sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '5rem' } }}
              >
                O livro que você procura pode estar mais perto do que imagina.
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 680, fontWeight: 400 }}
              >
                Pesquise em um catálogo unificado e encontre livros nas bibliotecas parceiras da sua região.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <Button
                  component={RouterLink}
                  to="/catalogo"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  Explorar catálogo
                </Button>
                <Button component={RouterLink} to="/admin" variant="outlined" size="large">
                  Acessar administração
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                minHeight: 360,
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: { xs: 250, sm: 320 },
                  height: { xs: 250, sm: 320 },
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  boxShadow: '0 28px 80px rgba(14, 70, 61, 0.28)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'primary.contrastText',
                }}
              >
                <AutoStoriesRoundedIcon sx={{ fontSize: { xs: 120, sm: 160 } }} />
              </Box>
              <Chip
                label="Catálogo unificado"
                sx={{
                  position: 'absolute',
                  bottom: { xs: 20, sm: 10 },
                  right: { xs: 5, sm: 0 },
                  bgcolor: 'background.paper',
                  fontWeight: 700,
                  boxShadow: 3,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>

    <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
      <Stack spacing={1} sx={{ mb: 5, maxWidth: 620 }}>
        <Typography
          component="h2"
          variant="h2"
          sx={{ fontSize: { xs: '2.3rem', md: '3rem' } }}
        >
          Conhecimento ao alcance de todos
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
          Uma experiência simples para quem procura e uma gestão direta para quem cuida do acervo.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {benefits.map(({ icon, title, description }) => (
          <Grid key={title} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3.5 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {icon}
                </Box>
                <Typography component="h3" variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {title}
                </Typography>
                <Typography color="text.secondary">{description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </>
)
