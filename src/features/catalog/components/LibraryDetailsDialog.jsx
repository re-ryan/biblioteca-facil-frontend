import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { useLibraryDetails } from '../hooks/useLibraryDetails'

const formatAddress = (address) => {
  if (!address) {
    return 'Endereço não informado.'
  }

  const street = [address.logradouro, address.numero].filter(Boolean).join(', ')
  const locality = [address.bairro, address.cidade, address.uf].filter(Boolean).join(' · ')
  const complement = address.complemento ? ` · ${address.complemento}` : ''
  const postalCode = address.cep ? `CEP ${address.cep}` : ''

  return [street, `${locality}${complement}`, postalCode].filter(Boolean).join(' — ')
}

const DetailRow = ({ icon, label, children }) => (
  <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
    <Box
      sx={{
        width: 42,
        height: 42,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        borderRadius: 2,
        color: 'primary.main',
        bgcolor: 'primary.light',
      }}
    >
      {icon}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
        {label}
      </Typography>
      {children}
    </Box>
  </Stack>
)

DetailRow.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export const LibraryDetailsDialog = ({ library, onClose }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { data, error, isPending, refetch } = useLibraryDetails(library?.id)

  return (
    <Dialog
      open={Boolean(library)}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      aria-labelledby="library-details-title"
    >
      <DialogTitle id="library-details-title" sx={{ pr: 7 }}>
        {data?.nome || library?.nome || 'Dados da biblioteca'}
      </DialogTitle>
      <IconButton
        aria-label="Fechar dados da biblioteca"
        onClick={onClose}
        sx={{ position: 'absolute', top: 10, right: 10 }}
      >
        <CloseRoundedIcon />
      </IconButton>

      <DialogContent dividers>
        {isPending && (
          <Stack spacing={2} sx={{ minHeight: 220, alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress aria-label="Carregando dados da biblioteca" />
            <Typography color="text.secondary">Consultando a biblioteca...</Typography>
          </Stack>
        )}

        {error && (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => refetch()}>
                Tentar novamente
              </Button>
            }
          >
            {error.message}
          </Alert>
        )}

        {data && (
          <Stack spacing={3.5}>
            <DetailRow icon={<PhoneRoundedIcon />} label="Telefone">
              {data.telefone ? (
                <Link href={`tel:${data.telefone.replace(/\D/g, '')}`} underline="hover">
                  {data.telefone}
                </Link>
              ) : (
                <Typography>Telefone não informado.</Typography>
              )}
            </DetailRow>

            <DetailRow icon={<EmailRoundedIcon />} label="E-mail">
              {data.email ? (
                <Link href={`mailto:${data.email}`} underline="hover" sx={{ overflowWrap: 'anywhere' }}>
                  {data.email}
                </Link>
              ) : (
                <Typography>E-mail não informado.</Typography>
              )}
            </DetailRow>

            <DetailRow icon={<LocationOnRoundedIcon />} label="Endereço">
              <Typography>{formatAddress(data.endereco)}</Typography>
            </DetailRow>
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  )
}

LibraryDetailsDialog.propTypes = {
  library: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
}
