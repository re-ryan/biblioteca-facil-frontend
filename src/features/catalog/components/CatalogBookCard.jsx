import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'

const availabilityLabel = (quantity) => {
  if (quantity === 0) {
    return 'Indisponível'
  }

  return `${quantity} ${quantity === 1 ? 'disponível' : 'disponíveis'}`
}

export const CatalogBookCard = ({ book, onLibraryDetails }) => {
  const {
    titulo,
    isbn13,
    editora,
    anoPublicacao,
    urlImagemCapa,
    autores,
    categorias,
    bibliotecas,
  } = book

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%', p: 3.5 }}>
        <Stack spacing={3} sx={{ height: '100%' }}>
          <Stack direction="row" spacing={2.5} sx={{ alignItems: 'flex-start' }}>
            <Box
              sx={{
                width: 82,
                minWidth: 82,
                height: 116,
                display: 'grid',
                placeItems: 'center',
                overflow: 'hidden',
                borderRadius: 2,
                color: 'primary.main',
                bgcolor: 'primary.light',
              }}
            >
              {urlImagemCapa ? (
                <Box
                  component="img"
                  src={urlImagemCapa}
                  alt={`Capa do livro ${titulo}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <AutoStoriesRoundedIcon sx={{ fontSize: 42 }} />
              )}
            </Box>

            <Stack spacing={1} sx={{ minWidth: 0 }}>
              <Typography component="h2" variant="h5">
                {titulo}
              </Typography>
              <Typography color="text.secondary">
                {autores.length > 0 ? autores.join(', ') : 'Autor não informado'}
              </Typography>
              {(editora || anoPublicacao) && (
                <Typography variant="body2" color="text.secondary">
                  {[editora, anoPublicacao].filter(Boolean).join(' · ')}
                </Typography>
              )}
              {isbn13 && (
                <Typography variant="caption" color="text.secondary">
                  ISBN {isbn13}
                </Typography>
              )}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {categorias.length > 0 ? (
              categorias.map((categoria) => (
                <Chip key={categoria} label={categoria} size="small" variant="outlined" />
              ))
            ) : (
              <Chip label="Categoria não informada" size="small" variant="outlined" />
            )}
          </Stack>

          <Divider />

          <Stack spacing={1.5} sx={{ mt: 'auto' }}>
            <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 700 }}>
              Disponibilidade nas bibliotecas
            </Typography>
            {bibliotecas.map(({ id, nome, quantidadeDisponivel }) => (
              <ButtonBase
                key={id}
                aria-label={`Ver dados da ${nome}`}
                onClick={() => onLibraryDetails({ id, nome })}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1,
                  alignItems: { sm: 'center' },
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  bgcolor: 'rgba(23, 107, 91, 0.06)',
                  p: 1.5,
                  textAlign: 'left',
                  transition: 'background-color 160ms ease',
                  '&:hover': {
                    bgcolor: 'rgba(23, 107, 91, 0.12)',
                  },
                }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <AccountBalanceRoundedIcon color="primary" fontSize="small" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {nome}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Chip
                    label={availabilityLabel(quantidadeDisponivel)}
                    size="small"
                    color={quantidadeDisponivel > 0 ? 'success' : 'default'}
                  />
                  <ChevronRightRoundedIcon color="action" />
                </Stack>
              </ButtonBase>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

CatalogBookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    isbn13: PropTypes.string,
    editora: PropTypes.string,
    anoPublicacao: PropTypes.number,
    urlImagemCapa: PropTypes.string,
    autores: PropTypes.arrayOf(PropTypes.string).isRequired,
    categorias: PropTypes.arrayOf(PropTypes.string).isRequired,
    bibliotecas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        quantidadeDisponivel: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onLibraryDetails: PropTypes.func.isRequired,
}
