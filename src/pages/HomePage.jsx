import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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

const modules = [
  {
    icon: <MenuBookRoundedIcon fontSize="large" />,
    audience: 'Módulo Leitor',
    description:
      'Encontra livros nas bibliotecas cadastradas, consulta os detalhes do acervo e solicita reservas.',
    features: ['Pesquisar livros', 'Consultar disponibilidade', 'Solicitar reservas'],
  },
  {
    icon: <AccountBalanceRoundedIcon fontSize="large" />,
    audience: 'Módulo Biblioteca',
    description:
      'Gerencia as informações da sua biblioteca, mantém o acervo atualizado e acompanha as solicitações dos leitores.',
    features: ['Gerenciar a biblioteca', 'Cadastrar e atualizar o acervo', 'Acompanhar solicitações'],
  },
]

const steps = [
  {
    title: 'Entre na plataforma',
    description: 'Leitores e responsáveis pela biblioteca utilizam a mesma página de acesso.',
  },
  {
    title: 'Acesse seu módulo',
    description: 'O perfil direciona cada usuário para o módulo adequado às suas atividades.',
  },
  {
    title: 'Utilize os recursos',
    description: 'Consulte e reserve livros ou gerencie a biblioteca, o acervo e as solicitações.',
  },
]

const questions = [
  {
    question: 'Preciso de uma conta para consultar o catálogo?',
    answer:
      'Sim. O catálogo e os demais recursos do Módulo Leitor ficam disponíveis depois da identificação do usuário.',
  },
  {
    question: 'Como funciona a reserva de um livro?',
    answer:
      'O leitor consulta a disponibilidade do livro e envia uma solicitação para a biblioteca responsável pelo exemplar.',
  },
  {
    question: 'Quem pode administrar uma biblioteca?',
    answer:
      'Usuários vinculados ao Módulo Biblioteca podem manter os dados da instituição, atualizar o acervo e acompanhar solicitações.',
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
                  href="#como-funciona"
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
            <Box
              sx={{
                minHeight: { xs: 280, sm: 340 },
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: { xs: 250, sm: 320 },
                  height: { xs: 250, sm: 320 },
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '50%',
                  color: 'primary.contrastText',
                  bgcolor: 'primary.dark',
                  boxShadow: '0 28px 80px rgba(14, 70, 61, 0.28)',
                }}
              >
                <AutoStoriesRoundedIcon sx={{ fontSize: { xs: 118, sm: 150 } }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>

    <Container id="modulos" maxWidth="lg" sx={{ py: { xs: 7, md: 10 }, scrollMarginTop: 88 }}>
      <Stack spacing={1} sx={{ mb: 5, maxWidth: 720 }}>
        <Typography color="secondary.dark" sx={{ fontWeight: 800, letterSpacing: '0.04em' }}>
          PERFIS DE USO
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
          Cada perfil acessa as ferramentas necessárias para consultar ou administrar uma
          biblioteca, sem misturar responsabilidades.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {modules.map(({ icon, audience, description, features }) => (
          <Grid key={audience} size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 3.5, sm: 4 } }}>
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
                    <Typography
                      component="h2"
                      color="secondary.dark"
                      variant="overline"
                      sx={{ fontWeight: 800 }}
                    >
                      {audience}
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

    <Box id="como-funciona" sx={{ bgcolor: 'primary.light', scrollMarginTop: 88 }}>
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 9 } }}>
        <Stack spacing={1} sx={{ mb: 5, maxWidth: 680 }}>
          <Typography color="secondary.dark" sx={{ fontWeight: 800, letterSpacing: '0.04em' }}>
            COMO FUNCIONA
          </Typography>
          <Typography component="h2" variant="h3">
            Como funciona o acesso
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
            A identificação do usuário organiza o acesso aos recursos de cada módulo.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {steps.map(({ title, description }, index) => (
            <Grid key={title} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: { xs: 3.5, sm: 4 } }}>
                  <Stack spacing={2.5}>
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: '50%',
                        color: 'primary.contrastText',
                        bgcolor: 'primary.main',
                        fontWeight: 800,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography component="h3" variant="h5">
                      {title}
                    </Typography>
                    <Typography color="text.secondary">{description}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
      <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'flex-start' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={1.5}>
            <Typography color="secondary.dark" sx={{ fontWeight: 800, letterSpacing: '0.04em' }}>
              PERGUNTAS FREQUENTES
            </Typography>
            <Typography component="h2" variant="h3">
              Dúvidas sobre o acesso
            </Typography>
            <Typography color="text.secondary">
              Informações rápidas para entender como utilizar o Biblioteca Fácil.
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {questions.map(({ question, answer }) => (
              <Accordion
                key={question}
                disableGutters
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'rgba(23, 107, 91, 0.16)',
                  borderRadius: '16px !important',
                  overflow: 'hidden',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon color="primary" />}>
                  <Typography component="h3" sx={{ fontWeight: 700 }}>
                    {question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  </>
)
