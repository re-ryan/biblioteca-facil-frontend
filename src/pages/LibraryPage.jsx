import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { useLibrary } from '../features/libraries/hooks/useLibrary'
import { useSession } from '../features/session/context/sessionContext'

const formatDocument = (value) => {
  if (!value || value.length !== 14) return value || 'Não informado'

  return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

const formatPhone = (value) => {
  if (!value) return 'Não informado'
  if (value.length === 11) return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')

  return value
}

const formatAddress = (address) => {
  if (!address) return 'Endereço ainda não cadastrado'

  return [
    address.logradouro,
    address.numero,
    address.complemento,
    address.bairro,
    address.cidade && address.uf ? `${address.cidade} - ${address.uf}` : address.cidade,
    address.cep,
  ]
    .filter(Boolean)
    .join(', ')
}

const InformationRow = ({ icon, label, value }) => (
  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
    <Box sx={{ color: 'primary.main', display: 'flex', pt: 0.25 }}>{icon}</Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ overflowWrap: 'anywhere' }}>{value}</Typography>
    </Box>
  </Stack>
)

InformationRow.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const LibraryPageLoading = () => (
  <Grid container spacing={3} aria-label="Carregando dados da biblioteca">
    <Grid size={{ xs: 12, md: 8 }}>
      <Skeleton variant="rounded" height={390} />
    </Grid>
    <Grid size={{ xs: 12, md: 4 }}>
      <Skeleton variant="rounded" height={260} />
    </Grid>
  </Grid>
)

export const LibraryPage = () => {
  const { session } = useSession()
  const { data: library, isPending, isError, error, refetch } = useLibrary(session.libraryId)

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 5, alignItems: { sm: 'flex-end' }, justifyContent: 'space-between' }}
      >
        <Box>
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 700, letterSpacing: '0.12em' }}
          >
            Módulo Biblioteca
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ mt: 0.5, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            {library?.nome || 'Área da biblioteca'}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, fontSize: '1.05rem' }}>
            Consulte os dados da instituição e acesse os recursos de gestão.
          </Typography>
        </Box>

        {library && (
          <Chip
            color={library.ativa ? 'success' : 'default'}
            icon={library.ativa ? <CheckCircleRoundedIcon /> : undefined}
            label={library.ativa ? 'Biblioteca ativa' : 'Biblioteca inativa'}
            variant="outlined"
          />
        )}
      </Stack>

      {isPending && <LibraryPageLoading />}

      {isError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" startIcon={<RefreshRoundedIcon />} onClick={() => refetch()}>
              Tentar novamente
            </Button>
          }
        >
          <AlertTitle>Não foi possível carregar a biblioteca</AlertTitle>
          {error.message}
        </Alert>
      )}

      {library && !isError && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: 3,
                        color: 'primary.contrastText',
                        bgcolor: 'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <AccountBalanceRoundedIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography component="h2" variant="h4">
                        Dados da instituição
                      </Typography>
                      <Typography color="text.secondary">
                        Informações atualmente registradas no Biblioteca Fácil.
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider />

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InformationRow
                        icon={<BadgeRoundedIcon />}
                        label="CNPJ"
                        value={formatDocument(library.cpfCnpj)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InformationRow
                        icon={<EmailRoundedIcon />}
                        label="E-mail"
                        value={library.email}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InformationRow
                        icon={<PhoneRoundedIcon />}
                        label="Telefone"
                        value={formatPhone(library.telefone)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InformationRow
                        icon={<LocationOnRoundedIcon />}
                        label="Endereço"
                        value={formatAddress(library.endereco)}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', bgcolor: 'primary.dark', color: 'primary.contrastText' }}>
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Stack spacing={2.5} sx={{ height: '100%' }}>
                  <AutoStoriesRoundedIcon sx={{ fontSize: 48, color: 'secondary.light' }} />
                  <Box>
                    <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                      Livros
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.74)' }}>
                      Consulte os livros cadastrados. O cadastro e a manutenção serão adicionados
                      na próxima etapa.
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    component={RouterLink}
                    to="/catalogo"
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Consultar catálogo
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}
